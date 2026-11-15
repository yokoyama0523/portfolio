/* 共通：保存（localStorage）、かご、お気に入り、会員、注文、在庫、ヘッダー／フッター */
const DB = {
  key: k => 'asagi_' + k,
  get(k, d) { try { const v = localStorage.getItem(this.key(k)); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(this.key(k), JSON.stringify(v)); } catch (e) {} },
};
const yen = n => '¥' + Math.round(n).toLocaleString('ja-JP');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const q = s => document.querySelector(s), qa = s => [...document.querySelectorAll(s)];
const param = k => new URLSearchParams(location.search).get(k);
const img = (name, w) => `assets/${name}.jpg`;
const price = p => p.sale || p.price;
const catName = id => (CATS.find(c => c.id === id) || {}).name || '';
const skuKey = (id, c, s) => `${id}|${c}|${s}`;
const today = () => new Date();
const ymd = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const jdate = s => { const d = new Date(s); return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`; };

/* 管理画面で変えた設定（送料・クーポン）を反映 */
(function(){ const S = DB.get('settings', null); if (S) { SHOP.ship = S.ship; SHOP.freeShip = S.freeShip; SHOP.coupons = S.coupons; } })();
/* 在庫：基準は決まった式。注文と管理画面の変更は上書きとして保存 */
function baseStock(id, c, s) {
  let h = 0; for (const ch of skuKey(id, c, s)) h = (h * 31 + ch.charCodeAt(0)) % 997;
  if (h % 11 === 0) return 0;          // 売り切れ
  if (h % 7 === 0) return 1 + (h % 3);  // 残りわずか
  return 6 + (h % 20);
}
function stock(id, c, s) { const o = DB.get('stock', {}); const k = skuKey(id, c, s); return k in o ? o[k] : baseStock(id, c, s); }
function setStock(id, c, s, n) { const o = DB.get('stock', {}); o[skuKey(id, c, s)] = Math.max(0, n | 0); DB.set('stock', o); }
function productStock(p) { let t = 0; p.v.forEach(v => p.sizes.forEach(s => t += stock(p.id, v.c, s))); return t; }

/* かご */
const Cart = {
  get() { return DB.get('cart', []); },
  set(c) { DB.set('cart', c); renderCounts(); },
  add(id, c, s, qty = 1) { const cart = this.get(); const f = cart.find(x => x.id === id && x.c === c && x.s === s); const max = stock(id, c, s); if (f) f.qty = Math.min(max, f.qty + qty); else cart.push({ id, c, s, qty: Math.min(max, qty) }); this.set(cart); },
  update(i, qty) { const cart = this.get(); if (!cart[i]) return; const max = stock(cart[i].id, cart[i].c, cart[i].s); cart[i].qty = Math.max(1, Math.min(max, qty | 0)); this.set(cart); },
  remove(i) { const cart = this.get(); cart.splice(i, 1); this.set(cart); },
  clear() { this.set([]); },
  count() { return this.get().reduce((a, x) => a + x.qty, 0); },
  subtotal() { return this.get().reduce((a, x) => a + price(P[x.id]) * x.qty, 0); },
  coupon() { return DB.get('coupon', ''); },
  totals(opt = {}) {
    const sub = this.subtotal(); const code = this.coupon(); const cp = SHOP.coupons[code];
    let discount = 0; if (cp && cp.type === 'rate') discount = Math.floor(sub * cp.value / 100);
    let ship = sub === 0 ? 0 : (sub - discount >= SHOP.freeShip ? 0 : SHOP.ship); if (cp && cp.type === 'ship') ship = 0;
    const cod = opt.pay === 'cod' ? SHOP.codFee : 0; const gift = opt.gift ? SHOP.giftFee : 0;
    return { sub, discount, ship, cod, gift, total: sub - discount + ship + cod + gift, code: cp ? code : '' };
  },
};
/* お気に入り */
const Wish = {
  get() { return DB.get('wish', []); },
  has(id) { return this.get().includes(id); },
  toggle(id) { const w = this.get(); const i = w.indexOf(id); if (i >= 0) w.splice(i, 1); else w.unshift(id); DB.set('wish', w); renderCounts(); return i < 0; },
};
/* 会員 */
const Auth = {
  users() { return DB.get('users', {}); },
  user() { const e = DB.get('session', null); return e ? (this.users()[e] ? { email: e, ...this.users()[e] } : null) : null; },
  login(email, pw) { const u = this.users()[email]; if (!u || u.pw !== pw) return false; DB.set('session', email); renderCounts(); return true; },
  logout() { DB.set('session', null); renderCounts(); },
  register(email, pw, name, kana) { const us = this.users(); if (us[email]) return false; us[email] = { pw, name, kana, tel: '', addresses: [], since: ymd(today()) }; DB.set('users', us); DB.set('session', email); return true; },
  save(email, data) { const us = this.users(); us[email] = { ...us[email], ...data }; DB.set('users', us); },
};
/* 注文 */
const Orders = {
  all() { return DB.get('orders', []); },
  mine(email) { return this.all().filter(o => o.email === email).sort((a, b) => b.at.localeCompare(a.at)); },
  place(o) {
    const list = this.all(); const d = today(); const no = `AS-${ymd(d).replace(/-/g, '')}-${String(1000 + list.length + 1).slice(-4)}`;
    o.no = no; o.at = d.toISOString(); o.status = '受付'; list.push(o); DB.set('orders', list);
    o.items.forEach(it => setStock(it.id, it.c, it.s, stock(it.id, it.c, it.s) - it.qty));
    return o;
  },
  update(no, patch) { const list = this.all(); const o = list.find(x => x.no === no); if (o) Object.assign(o, patch); DB.set('orders', list); },
};
/* 最近見た */
function viewed(id) { const r = DB.get('recent', []).filter(x => x !== id); if (id) r.unshift(id); DB.set('recent', r.slice(0, 8)); return r; }

/* はじめて開いたとき：デモ会員と過去の注文を入れる（管理画面の数字のため） */
function seed() {
  if (DB.get('seeded')) return;
  const us = {};
  us['demo@example.com'] = { pw: 'demo1234', name: '佐藤 あおい', kana: 'サトウ アオイ', tel: '090-1234-5678', since: '2025-04-12', addresses: [{ name: '佐藤 あおい', kana: 'サトウ アオイ', zip: '150-0001', pref: '東京都', addr1: '渋谷区神宮前 3-12-8', addr2: 'レジデンス神宮前 402', tel: '090-1234-5678', main: true }, { name: '佐藤 あおい', kana: 'サトウ アオイ', zip: '390-0811', pref: '長野県', addr1: '松本市中央 2-4-1', addr2: '', tel: '0263-12-3456', main: false }] };
  const names = [['田中 健', 'tanaka@example.com'], ['鈴木 美咲', 'suzuki@example.com'], ['高橋 蓮', 'takahashi@example.com'], ['伊藤 さくら', 'ito@example.com'], ['渡辺 大輔', 'watanabe@example.com'], ['山本 結衣', 'yamamoto@example.com'], ['中村 悠真', 'nakamura@example.com'], ['小林 陽菜', 'kobayashi@example.com'], ['加藤 翔', 'kato@example.com'], ['吉田 美月', 'yoshida@example.com']];
  names.forEach(([n, e]) => { us[e] = { pw: 'demo1234', name: n, kana: '', tel: '', since: '2025-0' + (1 + (n.length % 9)) + '-10', addresses: [] }; });
  DB.set('users', us);
  const orders = []; let seq = 1; const d0 = today();
  const pick = i => PRODUCTS[(i * 7) % PRODUCTS.length];
  for (let day = 45; day >= 1; day--) {
    const n = (day * 13) % 4 + (day % 5 === 0 ? 2 : 0);
    for (let k = 0; k < n; k++) {
      const d = new Date(d0); d.setDate(d0.getDate() - day); d.setHours(9 + (k * 5) % 12, (day * 7) % 60);
      const who = (day + k) % 9 === 0 ? ['佐藤 あおい', 'demo@example.com'] : names[(day * 3 + k) % names.length];
      const items = []; const cnt = 1 + ((day + k) % 3);
      for (let j = 0; j < cnt; j++) { const p = pick(day + k + j * 5); const v = p.v[(day + j) % p.v.length]; const s = p.sizes[(k + j) % p.sizes.length]; items.push({ id: p.id, c: v.c, s, qty: 1 + ((day + j) % 2), price: price(p) }); }
      const sub = items.reduce((a, x) => a + x.price * x.qty, 0); const ship = sub >= SHOP.freeShip ? 0 : SHOP.ship;
      const st = day > 7 ? '完了' : day > 3 ? '発送済' : day > 1 ? '発送準備' : '受付';
      orders.push({ no: `AS-${ymd(d).replace(/-/g, '')}-${String(1000 + seq++).slice(-4)}`, at: d.toISOString(), status: st, email: who[1], name: who[0], items, sub, discount: 0, ship, cod: 0, gift: 0, total: sub + ship, pay: ['card', 'cvs', 'cod'][(day + k) % 3], addr: { name: who[0], zip: '150-0001', pref: '東京都', addr1: '渋谷区神宮前 3-12-8', addr2: '', tel: '090-0000-0000' }, delivery: { date: '指定なし', time: '指定なし' }, tracking: day <= 7 && day > 1 ? 'YM' + String(1000000000 + day * 7919).slice(-10) : '' });
    }
  }
  DB.set('orders', orders); DB.set('seeded', 1);
}
seed();

/* 見た目の共通部品 */
function renderCounts() { qa('[data-cart-count]').forEach(e => { const n = Cart.count(); e.textContent = n; e.hidden = n === 0; }); qa('[data-wish-count]').forEach(e => { const n = Wish.get().length; e.textContent = n; e.hidden = n === 0; }); const u = Auth.user(); qa('[data-user]').forEach(e => e.textContent = u ? u.name.split(' ')[0] : ''); }
function shell() {
  const here = location.pathname.split('/').pop() || 'index.html';
  const nav = [['list.html?new=1', '新着'], ...CATS.map(c => [`list.html?cat=${c.id}`, c.name]), ['list.html?sale=1', 'セール'], ['index.html#looks', 'ルック'], ['guide.html', 'ガイド']];
  const hd = `<header class="hd"><div class="hd-in">
    <button class="burger" aria-label="メニュー" aria-expanded="false"><span></span></button>
    <a class="logo" href="index.html">${SHOP.name}</a>
    <nav class="gnav" aria-label="カテゴリー">${nav.map(([h, t]) => `<a href="${h}"${here + location.search === h ? ' aria-current="page"' : ''}>${t}</a>`).join('')}</nav>
    <form class="search" action="list.html" role="search"><input type="search" name="q" placeholder="商品を探す" aria-label="商品を探す" value="${esc(param('q') || '')}"><button type="submit" aria-label="検索"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg></button></form>
    <div class="tools">
      <a href="account.html" aria-label="マイページ"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg><span class="u" data-user></span></a>
      <a href="account.html#wish" aria-label="お気に入り"><svg viewBox="0 0 24 24"><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/></svg><b data-wish-count hidden>0</b></a>
      <a href="cart.html" aria-label="カート"><svg viewBox="0 0 24 24"><path d="M5 7h14l-1 12H6z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg><b data-cart-count hidden>0</b></a>
    </div>
  </div>
  <div class="drawer" id="drawer"><nav aria-label="メニュー">${nav.map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}<a href="account.html">マイページ</a><a href="cart.html">カート</a></nav></div></header>`;
  const ft = `<footer class="ft"><div class="ft-in">
    <div><div class="logo">${SHOP.name}</div><p>${SHOP.tagline}</p><p class="sm">東京都渋谷区神宮前 5-6-7　／　平日 10:00〜18:00　03-1234-5678</p></div>
    <div><h3>ショッピング</h3>${CATS.map(c => `<a href="list.html?cat=${c.id}">${c.name}</a>`).join('')}<a href="list.html?sale=1">セール</a></div>
    <div><h3>ご利用ガイド</h3><a href="guide.html#ship">送料・配送</a><a href="guide.html#return">返品・交換</a><a href="guide.html#pay">お支払い方法</a><a href="guide.html#size">サイズガイド</a><a href="guide.html#faq">よくある質問</a></div>
    <div><h3>アカウント</h3><a href="account.html">ログイン／会員登録</a><a href="account.html#orders">注文履歴</a><a href="account.html#wish">お気に入り</a><a href="admin/">管理画面（デモ）</a></div>
  </div><div class="copy"><span>© ${SHOP.name}　｜　このサイトはポートフォリオ用の架空の店です。注文・決済は実際には行われません。</span><span>写真はフリー素材（ぱくたそ・Unsplash・Pexels）で、人物はモデルです。</span></div></footer>`;
  const h = q('#hd'); if (h) h.outerHTML = hd; const f = q('#ft'); if (f) f.outerHTML = ft;
  const b = q('.burger'); if (b) b.addEventListener('click', () => { const on = document.body.classList.toggle('nav-open'); b.setAttribute('aria-expanded', on); });
  renderCounts();
}
function card(p, opt = {}) {
  const v = p.v[0]; const low = productStock(p); const tags = [];
  if (p.sale) tags.push('<i class="tag sale">SALE</i>'); if (p.new) tags.push('<i class="tag">NEW</i>'); if (low === 0) tags.push('<i class="tag out">SOLD OUT</i>'); else if (low <= 8) tags.push('<i class="tag few">残りわずか</i>');
  return `<article class="card"><a class="im" href="item.html?id=${p.id}"><img src="${img(v.img[0])}" alt="${esc(p.name)} ${esc(v.c)}" width="600" height="800" loading="lazy">${tags.join('')}</a>
    <button type="button" class="wish${Wish.has(p.id) ? ' on' : ''}" data-wish="${p.id}" aria-label="お気に入り" aria-pressed="${Wish.has(p.id)}"><svg viewBox="0 0 24 24"><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/></svg></button>
    <div class="cl">${p.v.slice(0, 6).map(x => `<i style="background:${COLOR_HEX[x.c] || '#ccc'}" title="${x.c}"></i>`).join('')}${p.v.length > 6 ? `<small>+${p.v.length - 6}</small>` : ''}</div>
    <a class="nm" href="item.html?id=${p.id}">${esc(p.name)}</a>
    <div class="pr">${p.sale ? `<s>${yen(p.price)}</s> <b class="sale">${yen(p.sale)}</b>` : `<b>${yen(p.price)}</b>`}<small>税込</small></div></article>`;
}
function bindWish(root = document) { root.querySelectorAll('[data-wish]').forEach(b => b.addEventListener('click', e => { e.preventDefault(); const on = Wish.toggle(b.dataset.wish); b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); toast(on ? 'お気に入りに追加しました' : 'お気に入りから外しました'); })); }
function toast(msg, link) { let t = q('.toast'); if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); } t.innerHTML = esc(msg) + (link ? ` <a href="${link[0]}">${esc(link[1])}</a>` : ''); t.classList.add('on'); clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('on'), 2600); }
document.addEventListener('DOMContentLoaded', shell);
