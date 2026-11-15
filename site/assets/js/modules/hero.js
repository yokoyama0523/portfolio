// ホームの最初の画面：業種の言葉と、窓の中の画面を順番に入れ替える（[data-hero]）
// 画像は次の1枚だけ先に読む（全部を最初に読まない）
export function initHero({ gsap, motion, reduced }) {
  const hero = document.querySelector('[data-hero]');
  if (!hero) return;
  const slot = hero.querySelector('[data-slot]');
  const cap = hero.querySelector('[data-cap]');
  const idx = hero.querySelector('[data-idx]');
  const shots = [...hero.querySelectorAll('.hero-shot')];
  if (shots.length < 2) return;

  const load = (k) => { const img = shots[k].querySelector('img'); if (img.dataset.src) { img.src = img.dataset.src; delete img.dataset.src; } return img; };
  const ready = (img) => (img.complete ? Promise.resolve() : new Promise((r) => { img.onload = img.onerror = r; }));
  const label = (k) => { const s = shots[k].dataset; slot.textContent = s.word; cap.textContent = `${s.no}　${s.name}`; idx.textContent = s.no; };

  let i = 0, busy = false, visible = true;
  load(1);

  async function next() {
    if (busy) return;
    busy = true;
    const prev = shots[i];
    i = (i + 1) % shots.length;
    const cur = shots[i];
    await ready(load(i));
    load((i + 1) % shots.length);
    shots.forEach((s) => { s.style.zIndex = s === cur ? 2 : s === prev ? 1 : 0; });
    if (!motion) {
      shots.forEach((s) => { s.style.clipPath = s === cur ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)'; });
      label(i); busy = false; return;
    }
    gsap.timeline({ onComplete: () => { prev.style.clipPath = 'inset(0% 0% 100% 0%)'; busy = false; } })
      .to(slot, { yPercent: -70, opacity: 0, duration: 0.32, ease: 'power2.in' })
      .add(() => label(i))
      .fromTo(slot, { yPercent: 70, opacity: 0, '--p': 0 }, { yPercent: 0, opacity: 1, '--p': 1, duration: 0.7, ease: 'power3.out' })
      .fromTo(cur, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.05, ease: 'expo.inOut' }, 0.05)
      .fromTo(cur.querySelector('img'), { scale: 1.14 }, { scale: 1, duration: 1.5, ease: 'expo.out' }, 0.05);
  }

  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(hero);
  setInterval(() => { if (visible && !document.hidden) next(); }, reduced ? 5200 : 3400);

  if (motion) {
    const lines = hero.querySelectorAll('.hero-title .line');
    gsap.from(lines, { yPercent: 110, duration: 1.15, ease: 'power4.out', stagger: 0.1, delay: 0.1 });
    gsap.from(hero.querySelectorAll('.hero-kicker, .hero-lead, .hero-act'), { opacity: 0, y: 24, duration: 1, ease: 'power3.out', stagger: 0.12, delay: 0.45 });
    gsap.from(hero.querySelector('[data-window]'), { xPercent: 12, opacity: 0, rotateY: -22, duration: 1.6, ease: 'expo.out', delay: 0.25 });
  }
}
