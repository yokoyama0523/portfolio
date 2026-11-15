// 数字を 0 から数え上げる（[data-count]）
export function initCount({ gsap }) {
  document.querySelectorAll('[data-count]').forEach((el) => {
    const to = Number(el.dataset.count) || 0;
    const o = { v: 0 };
    el.textContent = '0';
    gsap.to(o, {
      v: to, duration: 1.6, ease: 'power2.out',
      onUpdate: () => { el.textContent = Math.round(o.v); },
      scrollTrigger: { trigger: el, start: 'top 85%' },
    });
  });
}
