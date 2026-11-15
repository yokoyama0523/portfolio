// 進め方の線を、スクロールに合わせて伸ばす（[data-steps]）
export function initSteps({ ScrollTrigger }) {
  document.querySelectorAll('[data-steps]').forEach((el) => {
    ScrollTrigger.create({
      trigger: el, start: 'top 70%', end: 'bottom 60%', scrub: true,
      onUpdate: (s) => el.style.setProperty('--progress', s.progress.toFixed(3)),
    });
  });
}
