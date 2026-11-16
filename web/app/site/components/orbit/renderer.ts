import { clamp, TAU, type V3 } from "./math";
import {
  ALL_DOTS,
  createLayout,
  DOTS,
  FOCAL,
  KIND,
  KIND_SCALE,
  LOOP,
  layoutBlooms,
  SAKURA_SCALE,
} from "./scene";
import { CAPTION, dotAt, invertAt, reveal, stageAt, TAGLINE } from "./timeline";

const MAX_PIXEL_RATIO = 1.5;
const VIEW_SCALE = 0.42;
const NARROW_WIDTH = 640;
const NARROW_SAKURA_BOOST = 1.14;
const HEADER_RESERVE = 100;
const NEAR_CLIP = 0.2;
const MIN_SIZE = 0.0004;
const PERSPECTIVE_GROWTH = 1.2;
const MAX_RADIUS = 90;
const MIN_RADIUS = 0.35;
const MIN_ALPHA = 0.01;
const DEPTH_FADE = { curve: 1.5, focus: 4, far: 5, length: 2.5 };
const RING_STROKE = { min: 0.8, ratio: 0.12 };
const TARGET_CORE = 0.36;
const GLOW_ALPHA = 0.2;
const COVER_MARGIN = 4;
const TONE_EDGE = { x: 0.36, top: 48 };
const MIN_HOLE = 0.5;
const STILL_TIME = 2;
const MS_PER_SECOND = 1000;
const MIN_FRAME = 1 / 62;
const MAX_STEP = 0.1;
const START = 0;

type Colors = { ink: string; paper: string };
type Targets = {
  canvas: HTMLCanvasElement;
  words: (HTMLSpanElement | null)[];
  lines: (HTMLSpanElement | null)[];
  colors: Colors;
  onTone: (dark: boolean) => void;
  still: boolean;
};
type Item = { x: number; y: number; r: number; a: number; z: number; kind: number };

const depthAlpha = (s: number, dc: number) =>
  clamp(s ** (DEPTH_FADE.curve + DEPTH_FADE.focus * dc)) *
  clamp((DEPTH_FADE.far - s) / DEPTH_FADE.length);

const animate = (
  els: (HTMLSpanElement | null)[],
  cache: string[],
  at: (w: number) => { y: string; o: string },
) => {
  els.forEach((el, w) => {
    if (!el) return;
    const { y, o } = at(w);
    const key = `${y}|${o}`;
    if (cache[w] === key) return;
    cache[w] = key;
    el.style.transform = `translate3d(0, ${y}%, 0)`;
    el.style.opacity = o;
  });
};

export function startOrbit({ canvas, words, lines, colors, onTone, still }: Targets) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};
  const layout = createLayout();
  let W = 0;
  let H = 0;
  let unit = 1;

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
    const { width, height } = canvas.getBoundingClientRect();
    W = width;
    H = height;
    unit = Math.min(width, height) * VIEW_SCALE;
    layout.scale = width < NARROW_WIDTH ? SAKURA_SCALE * NARROW_SAKURA_BOOST : SAKURA_SCALE;
    layout.viewX = width / 2 / unit;
    layout.viewY = height / 2 / unit;
    layoutBlooms(layout, HEADER_RESERVE / unit);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  const project = (p: V3) => {
    const d = FOCAL + p[2];
    if (d < NEAR_CLIP) return null;
    const s = FOCAL / d;
    return { x: W / 2 + p[0] * s * unit, y: H / 2 + p[1] * s * unit, s };
  };

  const items: Item[] = [];
  const collect = (t: number) => {
    items.length = 0;
    const st = stageAt(t);
    for (let i = 0; i < ALL_DOTS; i++) {
      const d = dotAt(st, i, t, layout);
      if (d.sz <= MIN_SIZE) continue;
      const pt = project(d.p);
      if (!pt) continue;
      const kind = DOTS[i].kind;
      const r = Math.min(
        d.sz * pt.s ** (1 + PERSPECTIVE_GROWTH * d.dc) * unit * KIND_SCALE[kind],
        MAX_RADIUS,
      );
      const a = depthAlpha(pt.s, d.dc);
      if (r < MIN_RADIUS || a < MIN_ALPHA) continue;
      if (pt.x < -r || pt.x > W + r || pt.y < -r || pt.y > H + r) continue;
      items.push({ x: pt.x, y: pt.y, r, a, z: d.p[2], kind });
    }
    items.sort((a, b) => b.z - a.z);
  };

  const draw = (color: string) => {
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    for (const d of items) {
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, TAU);
      if (d.kind === KIND.ring || d.kind === KIND.target) {
        ctx.globalAlpha = d.a;
        ctx.lineWidth = Math.max(RING_STROKE.min, d.r * RING_STROKE.ratio);
        ctx.stroke();
        if (d.kind === KIND.target) {
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.r * TARGET_CORE, 0, TAU);
          ctx.fill();
        }
      } else {
        ctx.globalAlpha = d.kind === KIND.glow ? d.a * GLOW_ALPHA : d.a;
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  };

  let dark: boolean | null = null;
  const setTone = (next: boolean) => {
    if (next === dark) return;
    dark = next;
    onTone(next);
  };

  const shown: string[] = [];
  const told: string[] = [];

  const frame = (t: number) => {
    animate(words, shown, (w) => reveal(CAPTION, t, w));
    animate(lines, told, (w) => reveal(TAGLINE, t, w));
    const full = Math.hypot(W, H) / 2 + COVER_MARGIN;
    const edge = Math.hypot(W * TONE_EDGE.x, H / 2 - TONE_EDGE.top);
    const state = invertAt(t, unit, full);
    setTone(state.dark ? state.hole < edge : state.hole >= edge);
    const outer = state.dark ? colors.ink : colors.paper;
    const inner = state.dark ? colors.paper : colors.ink;
    collect(t);
    ctx.fillStyle = outer;
    ctx.fillRect(0, 0, W, H);
    draw(inner);
    if (state.hole > MIN_HOLE) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(W / 2, H / 2, Math.min(state.hole, full), 0, TAU);
      ctx.fillStyle = inner;
      ctx.fill();
      ctx.clip();
      draw(outer);
      ctx.restore();
    }
  };

  if (still) {
    frame(STILL_TIME);
    return () => ro.disconnect();
  }

  let raf = 0;
  let visible = false;
  let last = 0;
  let t = START;
  const loop = (now: number) => {
    raf = requestAnimationFrame(loop);
    const dt = (now - last) / MS_PER_SECOND;
    if (dt < MIN_FRAME) return;
    last = now;
    t = (t + Math.min(dt, MAX_STEP)) % LOOP;
    frame(t);
  };
  const run = () => {
    const on = visible && !document.hidden;
    if (on && !raf) {
      last = performance.now();
      raf = requestAnimationFrame(loop);
    } else if (!on && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
      setTone(false);
    }
  };
  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    run();
  });
  io.observe(canvas);
  document.addEventListener("visibilitychange", run);
  return () => {
    cancelAnimationFrame(raf);
    io.disconnect();
    ro.disconnect();
    document.removeEventListener("visibilitychange", run);
    setTone(false);
  };
}
