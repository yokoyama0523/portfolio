// 入口：各モジュールは自分の要素がなければ何もしない（ページごとの分岐をここに書かない）
import { initHeader } from './modules/header.js';
import { initSmooth } from './modules/smooth.js';
import { initSplit } from './modules/split.js';
import { initReveal } from './modules/reveal.js';
import { initHero } from './modules/hero.js';
import { initCount } from './modules/count.js';
import { initParallax } from './modules/parallax.js';
import { initFilter } from './modules/filter.js';
import { initSteps } from './modules/steps.js';

const root = document.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const { gsap, ScrollTrigger } = window;
const motion = !reduced && !!gsap && !!ScrollTrigger;

if (motion) gsap.registerPlugin(ScrollTrigger);
else root.classList.remove('js-motion'); // ライブラリが読めない・動きを減らす設定 → 隠したものをすべて見せる

const ctx = { gsap, ScrollTrigger, motion, reduced };
window.__motion = motion; // 読み込みに失敗したときの保険（layout.html の head）
initHeader(ctx);
initFilter(ctx);
initHero(ctx);
if (motion) {
  initSmooth(ctx);
  initSplit(ctx);
  initReveal(ctx);
  initCount(ctx);
  initParallax(ctx);
  initSteps(ctx);
  addEventListener('load', () => ScrollTrigger.refresh());
}
