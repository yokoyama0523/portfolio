// 要素が画面に入ったら、下からふわっと出す（[data-reveal]）。並んだものは少しずつ遅らせる
export function initReveal({ gsap, ScrollTrigger }) {
  const items = gsap.utils.toArray('[data-reveal]');
  ScrollTrigger.batch(items, {
    start: 'top 94%',
    onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.09, overwrite: true }),
  });
}
