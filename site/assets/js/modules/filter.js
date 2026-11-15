// 事例の絞り込み（[data-filter-group] のボタンと .case[data-cat]）
export function initFilter({ gsap, motion, ScrollTrigger }) {
  const group = document.querySelector('[data-filter-group]');
  if (!group) return;
  const buttons = [...group.querySelectorAll('button[data-filter]')];
  const cases = [...document.querySelectorAll('.case[data-cat]')];
  buttons.forEach((b) => {
    if (b.dataset.filter !== 'all') {
      const n = cases.filter((c) => c.dataset.cat === b.dataset.filter).length;
      b.insertAdjacentHTML('beforeend', `<span>${n}</span>`);
    }
    b.addEventListener('click', () => {
      const f = b.dataset.filter;
      buttons.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      const shown = [];
      cases.forEach((c) => { const on = f === 'all' || c.dataset.cat === f; c.hidden = !on; if (on) shown.push(c); });
      if (motion) {
        gsap.fromTo(shown, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.06, overwrite: true });
        ScrollTrigger.refresh();
      }
    });
  });
}
