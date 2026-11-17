import { PETAL_ANGLES } from "../sakuraShape";
import { expoInOut, mix, rand, rotX, rotZ, scale3, seg, sineInOut, TAU, type V3 } from "./math";
import { type PackSize, PETAL_AREA, packPetal, turnPetal } from "./petalPack";

export type Dot = { p: V3; sz: number; dc: number; bloom?: number };

export const LOOP = 24.1;
export const DOT_COUNT = 240;
export const SPHERE_DOTS = 190;
export const FOCAL = 4;

const TRAIL_DOTS = (DOT_COUNT - SPHERE_DOTS) / 2;
const CORE_RADIUS = 0.78;
const TUNNEL_RADIUS = 1.0;
const NEAR_MARGIN = 0.3;
const Z_MIN = -FOCAL + NEAR_MARGIN;
const Z_SPAN = 13;
const GOLDEN = Math.PI * (3 - Math.sqrt(5));
const SEED_STRIDE = 7;
const SEED = {
  x: 1,
  y: 2,
  depth: 3,
  bloomKind: 4,
  visible: 5,
  phase: 6,
  order: 8,
  mass: 9,
  kind: 10,
};

export const KIND = { solid: 0, ring: 1, glow: 2, target: 3 } as const;
export const KIND_SCALE = [1, 1.7, 3, 1.9];
const KIND_SHARE = { glow: 0.09, ring: 0.2, target: 0.25 };
const KIND_MASS = { glowMin: 2.2, glowAdd: 0.8, ringMin: 1.5, ringAdd: 0.3 };
const MASS = { base: 0.7, range: 2.6, curve: 4 };

const FIELD = {
  near: -1.1,
  depthCurve: 0.65,
  depthRange: 7.5,
  visibleShare: 0.24,
  spreadX: 2.5,
  spreadY: 1.55,
  mirrorX: 1.4,
  mirrorY: -0.6,
  size: 0.0075,
  sizeCurve: 1.8,
  swayX: 0.05,
  swayRateX: 0.55,
  swayY: 0.04,
  swayRateY: 0.45,
  drift: 0.17,
  wrapAt: 12,
};

const SPIN = { rate: 0.3, boost: 1.7, from: 6.3, to: 7.7 };
const RING_TILT = { end: -0.42, from: 5.5, to: 7.5 };
const SPHERE_TILT = { sway: 0.14, rate: 0.5, from: 7.5 };
const ORBIT_PRECESSION = 0.06;
const HALO = { counterSpin: 0.5, radius: 1.34, size: 0.0036 };
const TRAIL = { speed: 0.35, size: 0.0036 };
const DOT_SIZE = 0.0058;
const RIPPLE = { base: 0.85, amount: 0.3, lobes: 3 };
const SATELLITE = { phase: 2.1, size: 0.015 };
const BURST_SCALE = 9;
const TUNNEL = { spin: 0.45, size: 0.009, from: 19.4, to: 23.4, distance: 6 };

export const SAKURA_SCALE = 0.9;
const SAKURA_TILT = { base: -0.22, sway: 0.1, rate: 0.6 };
const BLOOM_PULSE = { amount: 0.025, rate: 0.9 };
const BLOOM_DRIFT = { from: 16.0, rate: 0.04, x: 0.8, y: -0.6 };
const PETAL_COUNT = 5;
const FILL = { draw: 1, shimmer: 0.16, speed: 0.35 };
const FILL_SIZE = {
  min: 0.016,
  max: 0.07,
  gap: 0.003,
  curve: 1.6,
  density: 5,
  minTries: 300,
  maxTries: 4000,
  bySize: 0.85,
  seedStride: 7919,
  petalStride: 104729,
  plainBelow: 1.8,
};
const BLOOM_FIT = {
  padding: 0.1,
  depthFalloff: 0.8,
  shrink: 0.85,
  shrinkLimit: 0.3,
  margin: 1.08,
  gap: 0.03,
  tries: 90,
  spreadRamp: 15,
  spread: 1.1,
  seedStride: 131,
  viewX: 0.92,
  viewY: 0.86,
  large: 0.8,
  largeEdge: 0.3,
  smallEdge: -0.25,
};

const BLOOMS = [
  { s: 1, r: 0, z: 0, w: 0.05, nx: 0, ny: 0 },
  { s: 0.95, r: 0.3, z: -0.45, w: -0.04, nx: -0.92, ny: 0.8 },
  { s: 0.45, r: 1.1, z: -0.1, w: 0.07, nx: -0.5, ny: 0.98 },
  { s: 0.42, r: 0.8, z: 0.25, w: -0.08, nx: 0.64, ny: -0.4 },
  { s: 0.3, r: 2.0, z: 0.5, w: 0.1, nx: 0.86, ny: -0.72 },
  { s: 0.2, r: 1.4, z: 0.8, w: -0.12, nx: 1.0, ny: -0.98 },
  { s: 0.14, r: 0.5, z: 1.0, w: 0.14, nx: 0.6, ny: -0.95 },
  { s: 0.17, r: 2.6, z: 0.9, w: -0.1, nx: -0.78, ny: -0.6 },
  { s: 0.24, r: 1.9, z: 0.6, w: 0.09, nx: 0.9, ny: 0.66 },
  { s: 0.12, r: 0.9, z: 1.1, w: -0.15, nx: -0.15, ny: 0.94 },
];

const fillSize = (scale: number): PackSize => {
  const k = scale ** -FILL_SIZE.bySize;
  const min = FILL_SIZE.min * k;
  const tries = Math.round((PETAL_AREA / (min * min)) * FILL_SIZE.density);
  return {
    min,
    max: FILL_SIZE.max * k,
    gap: FILL_SIZE.gap * k,
    curve: FILL_SIZE.curve,
    tries: Math.min(FILL_SIZE.maxTries, Math.max(FILL_SIZE.minTries, tries)),
  };
};

type BloomDot = { b: number; q: readonly [number, number]; r: number; u: number };

const BLOOM_DOTS: BloomDot[] = [];
export const BLOOM_KINDS: number[] = [];
const BLOOM_JOBS = BLOOMS.flatMap((_, b) => PETAL_ANGLES.map((deg, k) => ({ b, deg, k })));
let nextJob = 0;

const ORBITS = [
  { tx: 0.22, rz: -0.28, r: 1.36, w: 0.8 },
  { tx: 0.7, rz: 0.62, r: 1.42, w: -0.55 },
];

const seed = (i: number, key: number) => i * SEED_STRIDE + key;

const pickKind = (roll: number) => {
  if (roll < KIND_SHARE.glow) return KIND.glow;
  if (roll < KIND_SHARE.ring) return KIND.ring;
  if (roll < KIND_SHARE.target) return KIND.target;
  return KIND.solid;
};

const kindOf = (i: number, roll: number) =>
  i < ORBITS.length || i >= SPHERE_DOTS ? KIND.solid : pickKind(roll);

export const bloomCount = () => BLOOM_DOTS.length;
export const bloomsReady = () => nextJob >= BLOOM_JOBS.length;

export const prepareBlooms = (budget: () => number) => {
  while (!bloomsReady() && budget() > 0) {
    const { b, deg, k } = BLOOM_JOBS[nextJob++];
    const size = fillSize(BLOOMS[b].s);
    const petal = packPetal(size, b * FILL_SIZE.seedStride + k * FILL_SIZE.petalStride);
    for (const d of turnPetal(petal, deg)) {
      BLOOM_KINDS.push(
        d.r < size.min * FILL_SIZE.plainBelow
          ? KIND.solid
          : pickKind(rand(seed(BLOOM_DOTS.length, SEED.bloomKind))),
      );
      BLOOM_DOTS.push({
        b,
        q: [d.x, d.y],
        r: d.r,
        u: ((Math.atan2(d.y, d.x) + TAU) % TAU) / TAU,
      });
    }
  }
};

const massOf = (kind: number, m: number) =>
  kind === KIND.glow
    ? Math.max(m, KIND_MASS.glowMin) + KIND_MASS.glowAdd
    : kind === KIND.solid
      ? m
      : Math.max(m, KIND_MASS.ringMin) + KIND_MASS.ringAdd;

export const DOTS = (() => {
  const base = Array.from({ length: DOT_COUNT }, (_, i) => {
    const z0 = FIELD.near + rand(seed(i, SEED.depth)) ** FIELD.depthCurve * FIELD.depthRange;
    const depth = (FOCAL + z0) / FOCAL;
    const show = rand(seed(i, SEED.visible)) < FIELD.visibleShare;
    const m = MASS.base + MASS.range * rand(seed(i, SEED.mass)) ** MASS.curve;
    const kind = kindOf(i, rand(seed(i, SEED.kind)));
    const mul = massOf(kind, m);
    const qx = (rand(seed(i, SEED.x)) * 2 - 1) * FIELD.spreadX;
    const qy = (rand(seed(i, SEED.y)) * 2 - 1) * FIELD.spreadY;
    const y = 1 - (2 * (Math.min(i, SPHERE_DOTS - 1) + 0.5)) / SPHERE_DOTS;
    return {
      fx: qx * depth,
      fy: (qx > FIELD.mirrorX && qy < FIELD.mirrorY ? -qy : qy) * depth,
      fz: z0,
      fsz: show ? FIELD.size * mul ** FIELD.sizeCurve : 0,
      mul,
      kind,
      ph: rand(seed(i, SEED.phase)) * TAU,
      order: rand(seed(i, SEED.order)),
      sy: y,
      sr: Math.sqrt(1 - y * y),
      phi: i * GOLDEN,
      ring: 0,
    };
  });
  base
    .slice(0, SPHERE_DOTS)
    .map((d, i) => [((d.phi % TAU) + TAU) % TAU, i] as const)
    .sort((a, b) => a[0] - b[0])
    .forEach(([, i], rank) => {
      base[i].ring = (rank / SPHERE_DOTS) * TAU;
    });
  for (let i = SPHERE_DOTS; i < DOT_COUNT; i++)
    base[i].ring = ((i - SPHERE_DOTS) / (DOT_COUNT - SPHERE_DOTS)) * TAU;
  return base;
})();

const wrapDepth = (z: number) => Z_MIN + ((((z - Z_MIN) % Z_SPAN) + Z_SPAN) % Z_SPAN);

const orbitPoint = (k: number, q: number, t: number): V3 => {
  const o = ORBITS[k];
  const r = CORE_RADIUS * o.r;
  return rotZ(rotX([Math.cos(q) * r, 0, Math.sin(q) * r], o.tx), o.rz + ORBIT_PRECESSION * t);
};

const spin = (t: number) => SPIN.rate * t + SPIN.boost * expoInOut(seg(t, SPIN.from, SPIN.to));
const ringPitch = (t: number) =>
  mix(-Math.PI / 2, RING_TILT.end, sineInOut(seg(t, RING_TILT.from, RING_TILT.to)));
const spherePitch = (t: number) =>
  RING_TILT.end + SPHERE_TILT.sway * Math.sin(SPHERE_TILT.rate * Math.max(0, t - SPHERE_TILT.from));
const travel = (t: number) => {
  const p = seg(t, TUNNEL.from, TUNNEL.to);
  return TUNNEL.distance * (p - Math.sin(TAU * p) / TAU);
};
const fieldTime = (t: number) => (t < FIELD.wrapAt ? t : t - LOOP);

type Slot = { x: number; y: number; k: number; on: boolean };
export type Layout = {
  scale: number;
  viewX: number;
  viewY: number;
  clearX: number;
  clearY: number;
  slots: Slot[];
};

export const createLayout = (): Layout => ({
  scale: SAKURA_SCALE,
  viewX: 1,
  viewY: 1,
  clearX: 0,
  clearY: 0,
  slots: BLOOMS.map(() => ({ x: 0, y: 0, k: 1, on: true })),
});

const MAIN_BLEED = 0.25;

const hitsText = (layout: Layout, x: number, y: number, r: number) =>
  Math.hypot(Math.max(0, Math.abs(x) - layout.clearX), Math.max(0, Math.abs(y) - layout.clearY)) <
  r;

const mainSpot = (layout: Layout, r: number) => {
  const wide = layout.viewX >= layout.viewY;
  const x = wide ? layout.clearX + r : 0;
  const y = wide ? 0 : layout.clearY + r;
  const room = wide ? layout.viewX - x : layout.viewY - y;
  return { x, y, fits: room >= r * (1 - MAIN_BLEED) };
};

const depthShrink = (z: number) => 1 + BLOOM_FIT.depthFalloff * z;

export const layoutBlooms = (layout: Layout, top: number) => {
  const { viewX, viewY } = layout;
  const taken: { x: number; y: number; r: number }[] = [];
  BLOOMS.forEach((bl, b) => {
    const proj = FOCAL / (FOCAL + bl.z);
    const pad = b ? BLOOM_FIT.padding / depthShrink(bl.z) : 0;
    const slot = layout.slots[b];
    slot.on = false;
    for (let k = 1; k > BLOOM_FIT.shrinkLimit && !slot.on; k *= BLOOM_FIT.shrink) {
      const r = (layout.scale * bl.s * k * BLOOM_FIT.margin + pad) * proj + BLOOM_FIT.gap;
      if (!b) {
        const spot = mainSpot(layout, r);
        if (!spot.fits && k * BLOOM_FIT.shrink > BLOOM_FIT.shrinkLimit) continue;
        taken.push({ x: spot.x, y: spot.y, r });
        Object.assign(slot, { x: spot.x / proj, y: spot.y / proj, k, on: true });
        break;
      }
      for (let a = 0; a < BLOOM_FIT.tries; a++) {
        const spread = Math.min(1, a / BLOOM_FIT.spreadRamp) * BLOOM_FIT.spread;
        const at = b * BLOOM_FIT.seedStride + a * SEED_STRIDE;
        const sx = (bl.nx + (rand(at + SEED.x) * 2 - 1) * spread) * viewX * BLOOM_FIT.viewX;
        const sy = (bl.ny + (rand(at + SEED.y) * 2 - 1) * spread) * viewY * BLOOM_FIT.viewY;
        const edge = r * (bl.s > BLOOM_FIT.large ? BLOOM_FIT.largeEdge : BLOOM_FIT.smallEdge);
        if (Math.abs(sx) > viewX + edge || Math.abs(sy) > viewY + edge || sy - r < -viewY + top)
          continue;
        if (hitsText(layout, sx, sy, r)) continue;
        if (taken.some((o) => Math.hypot(o.x - sx, o.y - sy) < o.r + r)) continue;
        taken.push({ x: sx, y: sy, r });
        Object.assign(slot, { x: sx / proj, y: sy / proj, k, on: true });
        break;
      }
    }
  });
};

const sakuraTilt = (t: number) =>
  SAKURA_TILT.base + SAKURA_TILT.sway * Math.sin(SAKURA_TILT.rate * t);

export type Form = (i: number, t: number, layout: Layout) => Dot;

const hide =
  (f: Form): Form =>
  (i, t, layout) =>
    i < DOT_COUNT ? f(i, t, layout) : { ...f(i % DOT_COUNT, t, layout), sz: 0 };

export const dotSakura: Form = (i, t, layout) => {
  const bd = BLOOM_DOTS[i];
  if (!bd)
    return BLOOM_DOTS.length
      ? { ...dotSakura(i % BLOOM_DOTS.length, t, layout), sz: 0 }
      : { p: [0, 0, 0], sz: 0, dc: 1, bloom: 1 };
  const { b, q, r, u } = bd;
  const bl = BLOOMS[b];
  const slot = layout.slots[b];
  const drift = b ? ((t - BLOOM_DRIFT.from) * BLOOM_DRIFT.rate) / depthShrink(bl.z) : 0;
  const k =
    layout.scale * bl.s * slot.k * (1 + BLOOM_PULSE.amount * Math.sin(BLOOM_PULSE.rate * t + b));
  const f = rotX(rotZ([q[0] * k, q[1] * k, 0], bl.r + bl.w * t), sakuraTilt(t));
  const p: V3 = [
    f[0] + slot.x + drift * BLOOM_DRIFT.x,
    f[1] + slot.y + drift * BLOOM_DRIFT.y,
    f[2] + bl.z,
  ];
  if (!slot.on) return { p, sz: 0, dc: 1, bloom: 1 };
  const shimmer = Math.sin(Math.PI * (u * PETAL_COUNT - FILL.speed * t)) ** 2;
  return { p, sz: r * k * (FILL.draw - FILL.shimmer * shimmer), dc: 1, bloom: 1 };
};

export const dotField = hide((i, t) => {
  const d = DOTS[i];
  const tau = fieldTime(t);
  return {
    p: [
      d.fx + FIELD.swayX * Math.sin(FIELD.swayRateX * tau + d.ph),
      d.fy + FIELD.swayY * Math.cos(FIELD.swayRateY * tau + d.ph),
      d.fz - FIELD.drift * tau,
    ],
    sz: d.fsz,
    dc: 0,
  };
});

export const dotCircle = hide((i, t) => {
  const d = DOTS[i];
  if (i >= SPHERE_DOTS) {
    const a = d.ring - HALO.counterSpin * spin(t);
    const r = CORE_RADIUS * HALO.radius;
    return { p: rotX([Math.cos(a) * r, 0, Math.sin(a) * r], ringPitch(t)), sz: HALO.size, dc: 1 };
  }
  const a = d.ring + spin(t);
  return {
    p: rotX([Math.cos(a) * CORE_RADIUS, 0, Math.sin(a) * CORE_RADIUS], ringPitch(t)),
    sz: DOT_SIZE * d.mul * (RIPPLE.base + RIPPLE.amount * Math.sin(RIPPLE.lobes * a + t)),
    dc: 1,
  };
});

export const dotSphere = hide((i, t) => {
  if (i < ORBITS.length)
    return {
      p: orbitPoint(i, ORBITS[i].w * t + i * SATELLITE.phase, t),
      sz: SATELLITE.size,
      dc: 1,
    };
  if (i >= SPHERE_DOTS) {
    const k = (i - SPHERE_DOTS) % 2;
    const j = Math.floor((i - SPHERE_DOTS) / 2);
    return {
      p: orbitPoint(k, (j / TRAIL_DOTS) * TAU + ORBITS[k].w * TRAIL.speed * t, t),
      sz: TRAIL.size,
      dc: 1,
    };
  }
  const d = DOTS[i];
  const a = d.phi + spin(t);
  return {
    p: rotX(
      [Math.cos(a) * d.sr * CORE_RADIUS, d.sy * CORE_RADIUS, Math.sin(a) * d.sr * CORE_RADIUS],
      spherePitch(t),
    ),
    sz: DOT_SIZE * d.mul,
    dc: 1,
  };
});

export const dotBurst: Form = (i, t, layout) => {
  const s = dotSphere(i, t, layout);
  return { p: scale3(s.p, BURST_SCALE), sz: s.sz, dc: 0 };
};

export const dotTunnel = hide((i, t) => {
  const a = i * GOLDEN + TUNNEL.spin * t;
  const zb = Z_MIN + Z_SPAN * (1 - (i + 0.5) / DOT_COUNT);
  return {
    p: [Math.cos(a) * TUNNEL_RADIUS, Math.sin(a) * TUNNEL_RADIUS, wrapDepth(zb - travel(t))],
    sz: TUNNEL.size * DOTS[i].mul,
    dc: 0,
  };
});
