// なめらかなスクロール（Lenis）。ScrollTrigger と同じ時計で動かす
export function initSmooth({ gsap, ScrollTrigger }) {
  if (!window.Lenis || matchMedia('(pointer: coarse)').matches) return; // タッチ端末は端末のスクロールのまま
  const lenis = new window.Lenis({ duration: 1.1, anchors: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
