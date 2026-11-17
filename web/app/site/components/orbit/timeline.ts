import { cubicOut, expoIn, expoInOut, expoOut, mix, mix3, seg } from "./math";
import {
  DOT_COUNT,
  DOTS,
  type Dot,
  dotBurst,
  dotCircle,
  dotField,
  dotSakura,
  dotSphere,
  dotTunnel,
  type Form,
  type Layout,
  LOOP,
  SPHERE_DOTS,
} from "./scene";

type Stage = { from: number; to: number; form: Form };
type Move = Stage & {
  next: Form;
  spread: number;
  ease: (x: number) => number;
  order: (i: number) => number;
};

const randomOrder = (i: number) => DOTS[i % DOT_COUNT].order;

const STAGES: (Stage | Move)[] = [
  { from: 0, to: 3.6, form: dotField },
  {
    from: 3.6,
    to: 5.2,
    form: dotField,
    next: dotCircle,
    spread: 0.55,
    ease: expoInOut,
    order: randomOrder,
  },
  { from: 5.2, to: 7.2, form: dotCircle },
  {
    from: 7.2,
    to: 8.4,
    form: dotCircle,
    next: dotSphere,
    spread: 0.32,
    ease: expoInOut,
    order: (i) => (i < SPHERE_DOTS ? Math.abs(DOTS[i].sy) : 0.5),
  },
  { from: 8.4, to: 11.3, form: dotSphere },
  {
    from: 11.3,
    to: 12.1,
    form: dotSphere,
    next: dotBurst,
    spread: 0.14,
    ease: expoIn,
    order: randomOrder,
  },
  {
    from: 12.1,
    to: 13.5,
    form: dotBurst,
    next: dotSakura,
    spread: 0.5,
    ease: expoOut,
    order: randomOrder,
  },
  { from: 13.5, to: 18.5, form: dotSakura },
  {
    from: 18.5,
    to: 19.7,
    form: dotSakura,
    next: dotTunnel,
    spread: 0.3,
    ease: expoInOut,
    order: (i) => 1 - (i % DOT_COUNT) / DOT_COUNT,
  },
  { from: 19.7, to: 22.1, form: dotTunnel },
  {
    from: 22.1,
    to: LOOP,
    form: dotTunnel,
    next: dotField,
    spread: 0.7,
    ease: expoInOut,
    order: randomOrder,
  },
];

const isMove = (s: Stage | Move): s is Move => "next" in s;

export const showsBlooms = (st: Stage | Move) =>
  st.form === dotSakura || (isMove(st) && st.next === dotSakura);

export const stageAt = (t: number) => STAGES.find((s) => t < s.to) ?? STAGES[STAGES.length - 1];

export const dotAt = (st: Stage | Move, i: number, t: number, layout: Layout): Dot => {
  const a = st.form(i, t, layout);
  if (!isMove(st)) return a;
  const b = st.next(i, t, layout);
  const d = st.to - st.from - st.spread;
  const from = st.from + st.order(i) * st.spread;
  const w = st.ease(seg(t, from, from + d));
  return {
    p: mix3(a.p, b.p, w),
    sz: mix(a.sz, b.sz, w),
    dc: mix(a.dc, b.dc, w),
    bloom: mix(a.bloom ?? 0, b.bloom ?? 0, w),
  };
};

export const LIFT = 110;

type Reveal = {
  inFrom: number;
  inTo: number;
  inStagger: number;
  outFrom: number;
  outTo: number;
  outStagger: number;
  ease: (x: number) => number;
};

export const CAPTION: Reveal = {
  inFrom: 0.2,
  inTo: 1.2,
  inStagger: 0.16,
  outFrom: 3.0,
  outTo: 3.55,
  outStagger: 0.07,
  ease: expoOut,
};

export const TAGLINE: Reveal = {
  inFrom: 13.7,
  inTo: 15.5,
  inStagger: 0.44,
  outFrom: 17.95,
  outTo: 18.5,
  outStagger: 0.07,
  ease: cubicOut,
};

export const reveal = (r: Reveal, t: number, w: number) => {
  const a = r.ease(seg(t, r.inFrom + w * r.inStagger, r.inTo + w * r.inStagger));
  const b = expoIn(seg(t, r.outFrom + w * r.outStagger, r.outTo + w * r.outStagger));
  return { y: ((1 - a) * LIFT - b * LIFT).toFixed(1), o: (a * (1 - b)).toFixed(2) };
};

const INVERT = {
  open: 6.05,
  seeded: 6.5,
  seedRadius: 0.034,
  grow: 6.65,
  dark: 7.3,
  close: 18.45,
  light: 19.4,
};

export const invertAt = (t: number, unit: number, full: number) => {
  if (t >= INVERT.open && t < INVERT.dark)
    return {
      dark: false,
      hole:
        mix(0, INVERT.seedRadius * unit, expoOut(seg(t, INVERT.open, INVERT.seeded))) +
        full * expoIn(seg(t, INVERT.grow, INVERT.dark)),
    };
  if (t >= INVERT.dark && t < INVERT.close) return { dark: true, hole: 0 };
  if (t >= INVERT.close && t < INVERT.light)
    return { dark: true, hole: full * expoInOut(seg(t, INVERT.close, INVERT.light)) };
  return { dark: false, hole: 0 };
};
