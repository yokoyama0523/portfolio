// 事例のカードを、列ごとに違う速さで流す（パソコンの幅だけ）
export function initParallax({ gsap, ScrollTrigger }) {
  ScrollTrigger.matchMedia({
    '(min-width: 901px)': () => {
      document.querySelectorAll('[data-parallax]').forEach((el, i) => {
        const img = el.querySelector('img');
        gsap.fromTo(el, { y: i % 2 ? 80 : 30 }, { y: i % 2 ? -80 : -30, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
        if (img) gsap.fromTo(img, { yPercent: -4 }, { yPercent: 4, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
    },
  });
}
