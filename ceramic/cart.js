/* かご：localStorage。index.html・item.html・checkout.html で共有 */
const CART_KEY='tsuchi_cart';
const ITEMS={
 hakuji:{n:'白磁の碗',en:'HAKUJI BOWL',p:3300,maker:'小野 晴子（佐賀・有田）',size:'径 11.5cm　高さ 6.5cm',w:'約 180g',img:'assets/p-hakuji.jpg',stock:6,no:'一',
  d:'手のひらにおさまる、口縁の薄い碗。白磁は使ううちに茶渋がうっすらと入り、それが景色になります。電子レンジ可。',
  long:'有田の磁土を薄く挽いた碗です。光にかざすと指の影が透けるほどの薄さですが、縁は少し厚めに作ってあるので、日々の食卓で欠けにくい。ごはん茶碗にも、スープや汁ものにも。色は白ですが、釉薬のかかり具合で、ひとつずつわずかに青みが違います。',care:'電子レンジ・食洗機とも使えます。急な温度の変化は避けてください。'},
 seiji:{n:'青磁の碗と皿',en:'SEIJI CUP & SAUCER',p:5500,maker:'三谷工房（岐阜・多治見）',size:'碗 径 9cm　皿 径 14cm',w:'約 320g（一組）',img:'assets/p-seiji.jpg',stock:4,no:'二',
  d:'深い青磁釉を厚めにかけ、縁で釉が薄く白く抜けています。皿は小鉢としても。ふたつで一組。',
  long:'青磁の碗は中国・宋の時代から続く形ですが、三谷工房のものは少し背が低く、現代の食卓に合わせてあります。皿は碗の受け皿としても、和え物の小鉢としても。釉薬の溜まりが深いところは、ほとんど緑に見えます。',care:'手洗いをおすすめします。貫入に色が入ることがありますが、それも景色です。'},
 kohiki:{n:'粉引のマグ',en:'KOHIKI MUG',p:3850,maker:'小野 晴子（佐賀・有田）',size:'径 8.5cm　高さ 9cm　容量 280ml',w:'約 260g',img:'assets/p-kohiki.jpg',stock:2,no:'三',
  d:'白と飴の二色。粉引は貫入に色が入りやすいので、はじめにぬるま湯に浸けてからお使いください。持ち手は指二本分。',
  long:'赤土に白い化粧土をかけ、透明な釉で焼いた粉引です。化粧土の厚いところと薄いところで白の濃さが変わり、口縁には土の色が見えます。持ち手は指が二本入る大きさで、朝の大きめの一杯にちょうどいい。',care:'使う前にぬるま湯に10分ほど浸けると、染みが入りにくくなります。食洗機は避けてください。'},
 kaiyu:{n:'灰釉のマグ',en:'KAIYU MUG',p:4400,maker:'宮下 玄（長野・松本）',size:'径 8cm　高さ 9.5cm　容量 300ml',w:'約 290g',img:'assets/p-kaiyu.jpg',stock:5,no:'四',
  d:'薪の灰を釉にした、青みのある灰釉。窯の中の置き場所で色が変わるので、一点ごとに写真を撮っています。',
  long:'薪窯で焼いた灰釉のマグです。灰が多くかかった面は青く、少ない面は茶色に。火の近くに置かれたものは釉が流れて、縁にたまっています。写真のものをお送りしますが、照明によって色の見え方は変わります。',care:'電子レンジ可。食洗機は釉が傷むことがあるので手洗いで。'},
 kyusu:{n:'朱泥の急須',en:'SHUDEI KYUSU',p:11000,maker:'宮下 玄（長野・松本）',size:'幅 15cm　高さ 9cm　容量 300ml',w:'約 310g',img:'assets/p-kyusu.jpg',stock:3,no:'五',
  d:'企画展「湯呑と急須」から。茶こしは陶製の一体型で、金属を使っていません。二人分の茶が入ります。',
  long:'釉薬をかけない朱泥の急須です。注ぎ口の切れがよく、最後の一滴まで垂れません。茶こしは胴に直接穴を開けた陶製で、金属の匂いが茶に移りません。使い込むと、手の脂で艶が出てきます。',care:'洗剤は使わず、湯ですすいで乾かしてください。茶渋は味のうちです。'},
 yunomi:{n:'白釉の湯呑',en:'SHIROYU CUP',p:2750,maker:'三谷工房（岐阜・多治見）',size:'径 7.5cm　高さ 7cm',w:'約 150g',img:'assets/p-yunomi.jpg',stock:8,no:'六',
  d:'急須と合わせて作られた湯呑。口縁にわずかに青が差しています。木の匙は別売りです。',
  long:'朱泥の急須と一緒に使うことを考えて作られた湯呑です。白い釉薬の下に、口縁だけ青磁の釉を一筋。手にすっぽり収まる大きさで、二杯分の茶がちょうど入ります。',care:'電子レンジ・食洗機とも使えます。'}
};
const FREE_SHIP=11000,SHIP=770,BOX=880;
function cartGet(){try{return JSON.parse(localStorage.getItem(CART_KEY)||'{}')}catch(e){return{}}}
function cartSet(c){try{localStorage.setItem(CART_KEY,JSON.stringify(c))}catch(e){}}
function cartAdd(id,n=1){const c=cartGet();const q=(c[id]||0)+n;if(q<=0)delete c[id];else c[id]=Math.min(q,ITEMS[id].stock);cartSet(c)}
function cartCount(){return Object.values(cartGet()).reduce((a,b)=>a+b,0)}
function cartTotal(box){const c=cartGet();const sub=Object.entries(c).reduce((a,[k,q])=>a+ITEMS[k].p*q,0);const ship=sub===0||sub>=FREE_SHIP?0:SHIP;const b=box?BOX:0;return{sub,ship,box:b,total:sub+ship+b}}
/* ドロワー（index と item で共通） */
function mountCart(){
  document.body.insertAdjacentHTML('beforeend',`<div class="cdim" id="cdim"></div><aside class="cdrawer" id="cdrawer" aria-label="かご"><h2>かご</h2><button type="button" class="cx" id="cx">閉じる</button><div class="citems" id="citems"></div><div class="ctt" id="ctt"></div><p class="cnote">送料は全国一律 770円。11,000円以上で無料。器は一点ずつ紙で包みます。</p><a class="cgo" id="cgo" href="checkout.html">ご購入手続きへ</a></aside><div class="ctoast" id="ctoast"></div>`);
  const d=document.getElementById('cdrawer'),dim=document.getElementById('cdim');
  const open=()=>{d.classList.add('on');dim.classList.add('on');render()},close=()=>{d.classList.remove('on');dim.classList.remove('on')};
  document.getElementById('cx').addEventListener('click',close);dim.addEventListener('click',close);document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
  document.querySelectorAll('[data-cart-open]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();open()}));
  function render(){const c=cartGet(),ks=Object.keys(c);document.querySelectorAll('[data-cart-count]').forEach(e=>e.textContent=cartCount());
    document.getElementById('citems').innerHTML=ks.length?ks.map(k=>`<div class="cit"><a href="item.html?id=${k}" class="cim"><img src="${ITEMS[k].img}" alt=""></a><div><b>${ITEMS[k].n}</b><small>${ITEMS[k].maker}</small><div class="cq"><button type="button" data-d="${k}" aria-label="減らす">−</button><span>${c[k]}</span><button type="button" data-a="${k}" aria-label="増やす" ${c[k]>=ITEMS[k].stock?'disabled':''}>＋</button></div></div><div class="cp">${(ITEMS[k].p*c[k]).toLocaleString()}<small>円</small></div></div>`).join(''):'<div class="cempty">かごは空です。</div>';
    document.querySelectorAll('#citems [data-a]').forEach(b=>b.addEventListener('click',()=>{cartAdd(b.dataset.a,1);render()}));document.querySelectorAll('#citems [data-d]').forEach(b=>b.addEventListener('click',()=>{cartAdd(b.dataset.d,-1);render()}));
    const t=cartTotal(false);document.getElementById('ctt').innerHTML=ks.length?`<div><span>小計</span><span>${t.sub.toLocaleString()}円</span></div><div><span>送料</span><span>${t.ship?t.ship+'円':'無料'}</span></div><div class="g"><span>合計（税込）</span><span>${t.total.toLocaleString()}円</span></div>`:'';document.getElementById('cgo').classList.toggle('off',!ks.length)}
  document.querySelectorAll('[data-add]').forEach(b=>b.addEventListener('click',()=>{const q=+(b.dataset.qty?document.querySelector(b.dataset.qty).value:1);cartAdd(b.dataset.add,q);render();const t=document.getElementById('ctoast');t.textContent=ITEMS[b.dataset.add].n+' をかごに入れました';t.classList.add('on');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('on'),1800)}));
  render();
}
const CART_CSS=`
.cdim{position:fixed;inset:0;background:rgba(43,43,43,.3);z-index:40;opacity:0;pointer-events:none;transition:opacity .4s}.cdim.on{opacity:1;pointer-events:auto}
.cdrawer{position:fixed;top:0;right:0;bottom:0;width:min(420px,100%);background:#f7f6f2;color:#2b2b2b;z-index:41;transform:translateX(100%);transition:transform .45s cubic-bezier(.2,.7,.2,1);display:flex;flex-direction:column;padding:30px 28px 24px;font-family:'Zen Kaku Gothic Antique',sans-serif;font-size:13px;letter-spacing:.06em;line-height:1.9}
.cdrawer.on{transform:none}.cdrawer h2{font-family:'Zen Old Mincho',serif;font-weight:400;font-size:22px;letter-spacing:.3em;margin:0}.cdrawer .cx{position:absolute;right:22px;top:30px;font:inherit;font-size:11px;letter-spacing:.2em;background:none;border:0;color:inherit;cursor:pointer}
.citems{flex:1;overflow:auto;margin:16px 0;border-top:1px solid rgba(43,43,43,.16)}.cit{display:grid;grid-template-columns:64px 1fr auto;gap:14px;padding:14px 0;border-bottom:1px solid rgba(43,43,43,.16)}.cim{display:block;aspect-ratio:1;overflow:hidden}.cim img{width:100%;height:100%;object-fit:cover;display:block}
.cit b{font-family:'Zen Old Mincho',serif;font-weight:400;font-size:15px;letter-spacing:.14em;display:block;line-height:1.4}.cit small{color:#6e6d69;font-size:11px;display:block}.cp{font-family:'Zen Old Mincho',serif;font-size:16px;white-space:nowrap}.cp small{font-size:10px;margin-left:2px}
.cq{display:inline-flex;align-items:center;border:1px solid rgba(43,43,43,.3);margin-top:6px}.cq button{width:28px;height:28px;background:none;border:0;cursor:pointer;font:inherit;color:inherit}.cq button:disabled{opacity:.3}.cq span{min-width:22px;text-align:center;font-size:12px}
.cempty{padding:40px 0;text-align:center;color:#6e6d69}.ctt div{display:flex;justify-content:space-between;padding:4px 0;font-size:12.5px}.ctt .g{font-family:'Zen Old Mincho',serif;font-size:18px;border-top:1px solid #2b2b2b;padding-top:10px;margin-top:6px}
.cnote{font-size:11px;color:#6e6d69;margin:8px 0 14px}.cgo{display:block;text-align:center;background:#2b2b2b;color:#f7f6f2;padding:15px;font-size:11.5px;letter-spacing:.24em;text-decoration:none}.cgo.off{opacity:.3;pointer-events:none}
.ctoast{position:fixed;left:50%;bottom:28px;transform:translate(-50%,20px);background:#2b2b2b;color:#f7f6f2;padding:10px 18px;font-size:12px;letter-spacing:.1em;opacity:0;transition:all .4s;z-index:42;pointer-events:none}.ctoast.on{opacity:1;transform:translate(-50%,0)}
@media (prefers-reduced-motion:reduce){.cdrawer,.cdim,.ctoast{transition:none}}`;
document.head.insertAdjacentHTML('beforeend','<style>'+CART_CSS+'</style>');
