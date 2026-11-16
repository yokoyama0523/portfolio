import { useEffect, useRef } from "react";

type V3 = [number, number, number];
type Dot = { p: V3; sz: number; dc: number };

const LOOP = 24.1;
const START = 0;
const N = 240;
const NS = 190;
const NO = (N - NS) / 2;
const F = 4;
const RC = 0.78;
const RT = 1.0;
const ZMIN = -F + 0.3;
const ZLEN = 13;
const KIND_SCALE = [1, 1.7, 3, 1.9];
const GOLDEN = Math.PI * (3 - Math.sqrt(5));
const INK = "51,51,51";
const PAPER = "255,255,255";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
const mix = (a: number, b: number, k: number) => a + (b - a) * k;
const mix3 = (a: V3, b: V3, k: number): V3 => [mix(a[0], b[0], k), mix(a[1], b[1], k), mix(a[2], b[2], k)];
const scale3 = (a: V3, k: number): V3 => [a[0] * k, a[1] * k, a[2] * k];
const expoIn = (x: number) => (x <= 0 ? 0 : Math.pow(2, 10 * x - 10));
const expoOut = (x: number) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x));
const expoInOut = (x: number) =>
  x <= 0 ? 0 : x >= 1 ? 1 : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2;
const cubicOut = (x: number) => 1 - Math.pow(1 - clamp(x), 3);
const sineInOut = (x: number) => -(Math.cos(Math.PI * x) - 1) / 2;
const rotX = (p: V3, a: number): V3 => [p[0], p[1] * Math.cos(a) - p[2] * Math.sin(a), p[1] * Math.sin(a) + p[2] * Math.cos(a)];
const rotZ = (p: V3, a: number): V3 => [p[0] * Math.cos(a) - p[1] * Math.sin(a), p[0] * Math.sin(a) + p[1] * Math.cos(a), p[2]];
const wrap = (z: number) => ZMIN + ((((z - ZMIN) % ZLEN) + ZLEN) % ZLEN);

const rand = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const BLOOMS = [
  { n: 240, s: 1, r: 0, z: 0, w: 0.05, nx: 0, ny: 0 },
  { n: 170, s: 0.95, r: 0.3, z: -0.45, w: -0.04, nx: -0.92, ny: 0.8 },
  { n: 80, s: 0.45, r: 1.1, z: -0.1, w: 0.07, nx: -0.5, ny: 0.98 },
  { n: 90, s: 0.42, r: 0.8, z: 0.25, w: -0.08, nx: 0.64, ny: -0.4 },
  { n: 62, s: 0.3, r: 2.0, z: 0.5, w: 0.1, nx: 0.86, ny: -0.72 },
  { n: 48, s: 0.2, r: 1.4, z: 0.8, w: -0.12, nx: 1.0, ny: -0.98 },
  { n: 40, s: 0.14, r: 0.5, z: 1.0, w: 0.14, nx: 0.6, ny: -0.95 },
  { n: 44, s: 0.17, r: 2.6, z: 0.9, w: -0.1, nx: -0.78, ny: -0.6 },
  { n: 54, s: 0.24, r: 1.9, z: 0.6, w: 0.09, nx: 0.9, ny: 0.66 },
  { n: 36, s: 0.12, r: 0.9, z: 1.1, w: -0.15, nx: -0.15, ny: 0.94 },
];
const NA = Math.max(N, BLOOMS.reduce((a, b) => a + b.n, 0));

const ORBITS = [
  { tx: 0.22, rz: -0.28, r: 1.36, w: 0.8 },
  { tx: 0.7, rz: 0.62, r: 1.42, w: -0.55 },
];

const DOTS = (() => {
  const base = Array.from({ length: NA }, (_, i) => {
    const z0 = -1.1 + Math.pow(rand(i * 7 + 3), 0.65) * 7.5;
    const depth = (F + z0) / F;
    const show = i < N && rand(i * 7 + 5) < 0.24;
    const m = 0.7 + 2.6 * Math.pow(rand(i * 7 + 9), 4);
    const kr = rand(i * 7 + 10);
    const kind = i < ORBITS.length || i >= NS ? 0 : kr < 0.09 ? 2 : kr < 0.2 ? 1 : kr < 0.25 ? 3 : 0;
    const mul = kind === 2 ? Math.max(m, 2.2) + 0.8 : kind === 0 ? m : Math.max(m, 1.5) + 0.3;
    const qx = (rand(i * 7 + 1) * 2 - 1) * 2.5;
    const qy = (rand(i * 7 + 2) * 2 - 1) * 1.55;
    const y = 1 - (2 * (Math.min(i, NS - 1) + 0.5)) / NS;
    return {
      fx: qx * depth,
      fy: (qx > 1.4 && qy < -0.6 ? -qy : qy) * depth,
      fz: z0,
      fsz: show ? 0.0075 * Math.pow(mul, 1.8) : 0,
      mul,
      kind,
      ph: rand(i * 7 + 6) * Math.PI * 2,
      order: rand(i * 7 + 8),
      sy: y,
      sr: Math.sqrt(1 - y * y),
      phi: i * GOLDEN,
      ring: 0,
    };
  });
  base
    .slice(0, NS)
    .map((d, i) => [((d.phi % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2), i] as const)
    .sort((a, b) => a[0] - b[0])
    .forEach(([, i], rank) => {
      base[i].ring = (rank / NS) * Math.PI * 2;
    });
  for (let i = NS; i < NA; i++) base[i].ring = ((i - NS) / (N - NS)) * Math.PI * 2;
  return base;
})();

const orbitPoint = (k: number, q: number, t: number): V3 => {
  const o = ORBITS[k];
  const r = RC * o.r;
  return rotZ(rotX([Math.cos(q) * r, 0, Math.sin(q) * r], o.tx), o.rz + 0.06 * t);
};

const spin = (t: number) => 0.3 * t + 1.7 * expoInOut(seg(t, 6.3, 7.7));
const ringPitch = (t: number) => mix(-Math.PI / 2, -0.42, sineInOut(seg(t, 5.5, 7.5)));
const spherePitch = (t: number) => -0.42 + 0.14 * Math.sin(0.5 * Math.max(0, t - 7.5));
const travel = (t: number) => {
  const p = seg(t, 19.4, 23.4);
  return 6 * (p - Math.sin(2 * Math.PI * p) / (2 * Math.PI));
};
const fieldTime = (t: number) => (t < 12 ? t : t - LOOP);

const SAKURA_PATH = (() => {
  const B = 3600;
  const rmax = new Array<number>(B).fill(0);
  for (let k = 0; k < 5; k++) {
    const c = -Math.PI / 2 + (k * Math.PI * 2) / 5;
    for (let j = 0; j < 3000; j++) {
      const q = (j / 3000) * Math.PI * 2;
      const u = 0.44 * Math.cos(q) + 0.56;
      const v = 0.34 * Math.sin(q);
      const x = u * Math.cos(c) - v * Math.sin(c);
      const y = u * Math.sin(c) + v * Math.cos(c);
      const th = (Math.atan2(y, x) + Math.PI * 2) % (Math.PI * 2);
      const b = Math.floor((th / (Math.PI * 2)) * B) % B;
      rmax[b] = Math.max(rmax[b], Math.hypot(x, y));
    }
  }
  const step = (Math.PI * 2) / 5;
  const pts = rmax.map((r0, b): [number, number] => {
    const th = ((b + 0.5) / B) * Math.PI * 2;
    const m = (th + Math.PI / 2) % step;
    const rel = Math.min(m, step - m);
    const r = r0 - 0.11 * Math.exp(-((rel / 0.09) ** 2));
    return [Math.cos(th) * r, Math.sin(th) * r];
  });
  const len = [0];
  for (let j = 1; j < B; j++) len.push(len[j - 1] + Math.hypot(pts[j][0] - pts[j - 1][0], pts[j][1] - pts[j - 1][1]));
  const total = len[B - 1] + Math.hypot(pts[0][0] - pts[B - 1][0], pts[0][1] - pts[B - 1][1]);
  return { pts, len, total };
})();

const outline = (n: number) => {
  const { pts, len, total } = SAKURA_PATH;
  const out: [number, number][] = [];
  let j = 0;
  for (let i = 0; i < n; i++) {
    const target = (i / n) * total;
    while (j + 1 < pts.length && len[j + 1] < target) j++;
    out.push(pts[j]);
  }
  return out;
};

const BLOOM_DOTS = BLOOMS.flatMap((bl, b) => outline(bl.n).map((q, k) => ({ b, q, u: k / bl.n })));
const RS = 0.9;
let sakuraScale = RS;
let viewX = 1;
let viewY = 1;
const RMAX = Math.max(...SAKURA_PATH.pts.map(([x, y]) => Math.hypot(x, y)));
const placed = BLOOMS.map(() => ({ x: 0, y: 0, k: 1, on: true }));
const layoutBlooms = (top: number) => {
  const taken: { x: number; y: number; r: number }[] = [];
  BLOOMS.forEach((bl, b) => {
    const proj = F / (F + bl.z);
    const pad = b ? 0.1 / (1 + 0.8 * bl.z) : 0;
    const slot = placed[b];
    slot.on = false;
    for (let k = 1; k > 0.3 && !slot.on; k *= 0.85) {
      const r = (sakuraScale * bl.s * k * RMAX * 1.08 + pad) * proj + 0.03;
      for (let a = 0; a < 90; a++) {
        const spread = b ? Math.min(1, a / 15) * 1.1 : 0;
        const sx = (bl.nx + (rand(b * 131 + a * 7 + 1) * 2 - 1) * spread) * viewX * 0.92;
        const sy = (bl.ny + (rand(b * 131 + a * 7 + 2) * 2 - 1) * spread) * viewY * 0.86;
        const edge = r * (bl.s > 0.8 ? 0.3 : -0.25);
        if (b && (Math.abs(sx) > viewX + edge || Math.abs(sy) > viewY + edge || sy - r < -viewY + top)) continue;
        if (taken.some((o) => Math.hypot(o.x - sx, o.y - sy) < o.r + r)) continue;
        taken.push({ x: sx, y: sy, r });
        Object.assign(slot, { x: sx / proj, y: sy / proj, k, on: true });
        break;
      }
      if (!b) break;
    }
  });
};
const sakuraTilt = (t: number) => -0.22 + 0.1 * Math.sin(0.6 * t);


const hide = (f: (i: number, t: number) => Dot) => (i: number, t: number): Dot => (i < N ? f(i, t) : { ...f(i % N, t), sz: 0 });

const dotSakura = (i: number, t: number): Dot => {
  const bd = BLOOM_DOTS[i];
  if (!bd) return { ...dotSakura(i % BLOOM_DOTS.length, t), sz: 0 };
  const { b, q, u } = bd;
  const bl = BLOOMS[b];
  const slot = placed[b];
  const drift = b ? ((t - 16.0) * 0.04) / (1 + 0.8 * bl.z) : 0;
  const k = sakuraScale * bl.s * slot.k * (1 + 0.025 * Math.sin(0.9 * t + b));
  const f = rotX(rotZ([q[0] * k, q[1] * k, 0], bl.r + bl.w * t), sakuraTilt(t));
  const p: V3 = [f[0] + slot.x + drift * 0.8, f[1] + slot.y - drift * 0.6, f[2] + bl.z];
  if (!slot.on) return { p, sz: 0, dc: 1 };
  const wave = 0.82 + 0.36 * Math.pow(Math.sin(Math.PI * (u * 5 - 0.35 * t)), 2);
  return { p, sz: 0.0056 * Math.sqrt(DOTS[i].mul) * wave * (0.55 + 0.45 * bl.s), dc: 1 };
};

const dotFieldBase = (i: number, t: number): Dot => {
  const d = DOTS[i];
  const tau = fieldTime(t);
  return {
    p: [d.fx + 0.05 * Math.sin(0.55 * tau + d.ph), d.fy + 0.04 * Math.cos(0.45 * tau + d.ph), d.fz - 0.17 * tau],
    sz: d.fsz,
    dc: 0,
  };
};

const dotField = hide(dotFieldBase);

const dotCircleBase = (i: number, t: number): Dot => {
  const d = DOTS[i];
  if (i >= NS) {
    const a = d.ring - 0.5 * spin(t);
    const r = RC * 1.34;
    return { p: rotX([Math.cos(a) * r, 0, Math.sin(a) * r], ringPitch(t)), sz: 0.0036, dc: 1 };
  }
  const a = d.ring + spin(t);
  return { p: rotX([Math.cos(a) * RC, 0, Math.sin(a) * RC], ringPitch(t)), sz: 0.0058 * d.mul * (0.85 + 0.3 * Math.sin(3 * a + t)), dc: 1 };
};

const dotCircle = hide(dotCircleBase);


const dotSphereBase = (i: number, t: number): Dot => {
  if (i < ORBITS.length) return { p: orbitPoint(i, ORBITS[i].w * t + i * 2.1, t), sz: 0.015, dc: 1 };
  if (i >= NS) {
    const k = (i - NS) % 2;
    const j = Math.floor((i - NS) / 2);
    return { p: orbitPoint(k, (j / NO) * Math.PI * 2 + ORBITS[k].w * 0.35 * t, t), sz: 0.0036, dc: 1 };
  }
  const d = DOTS[i];
  const a = d.phi + spin(t);
  return { p: rotX([Math.cos(a) * d.sr * RC, d.sy * RC, Math.sin(a) * d.sr * RC], spherePitch(t)), sz: 0.0058 * d.mul, dc: 1 };
};

const dotSphere = hide(dotSphereBase);

const dotBurst = (i: number, t: number): Dot => {
  const s = dotSphere(i, t);
  return { p: scale3(s.p, 9), sz: s.sz, dc: 0 };
};

const dotTunnelBase = (i: number, t: number): Dot => {
  const a = i * GOLDEN + 0.45 * t;
  const zb = ZMIN + ZLEN * (1 - (i + 0.5) / N);
  return { p: [Math.cos(a) * RT, Math.sin(a) * RT, wrap(zb - travel(t))], sz: 0.009 * DOTS[i].mul, dc: 0 };
};

const dotTunnel = hide(dotTunnelBase);

type Form = (i: number, t: number) => Dot;
type Stage = { from: number; to: number; form: Form };
type Move = Stage & { next: Form; spread: number; ease: (x: number) => number; order: (i: number) => number };

const STAGES: (Stage | Move)[] = [
  { from: 0, to: 3.6, form: dotField },
  { from: 3.6, to: 5.2, form: dotField, next: dotCircle, spread: 0.55, ease: expoInOut, order: (i) => DOTS[i].order },
  { from: 5.2, to: 7.2, form: dotCircle },
  { from: 7.2, to: 8.4, form: dotCircle, next: dotSphere, spread: 0.32, ease: expoInOut, order: (i) => (i < NS ? Math.abs(DOTS[i].sy) : 0.5) },
  { from: 8.4, to: 11.3, form: dotSphere },
  { from: 11.3, to: 12.1, form: dotSphere, next: dotBurst, spread: 0.14, ease: expoIn, order: (i) => DOTS[i].order },
  { from: 12.1, to: 13.5, form: dotBurst, next: dotSakura, spread: 0.5, ease: expoOut, order: (i) => DOTS[i].order },
  { from: 13.5, to: 18.5, form: dotSakura },
  { from: 18.5, to: 19.7, form: dotSakura, next: dotTunnel, spread: 0.3, ease: expoInOut, order: (i) => 1 - (i % N) / N },
  { from: 19.7, to: 22.1, form: dotTunnel },
  { from: 22.1, to: LOOP, form: dotTunnel, next: dotField, spread: 0.7, ease: expoInOut, order: (i) => DOTS[i].order },
];

const isMove = (s: Stage | Move): s is Move => "next" in s;

const stageAt = (t: number) => STAGES.find((s) => t < s.to) ?? STAGES[STAGES.length - 1];

const dotAt = (st: Stage | Move, i: number, t: number): Dot => {
  const a = st.form(i, t);
  if (!isMove(st)) return a;
  const b = st.next(i, t);
  const d = st.to - st.from - st.spread;
  const from = st.from + st.order(i) * st.spread;
  const w = st.ease(seg(t, from, from + d));
  return { p: mix3(a.p, b.p, w), sz: mix(a.sz, b.sz, w), dc: mix(a.dc, b.dc, w) };
};

const depthAlpha = (s: number, dc: number) => clamp(Math.pow(s, 1.5 + 4 * dc)) * clamp((5 - s) / 2.5);

export function OrbitCanvas({ message, tagline }: { message: string; tagline: readonly string[] }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const words = useRef<(HTMLSpanElement | null)[]>([]);
  const lines = useRef<(HTMLSpanElement | null)[]>([]);
  const list = message.split(" ");

  useEffect(() => {
    const cv = canvas.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;
    let W = 0;
    let H = 0;
    let unit = 1;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const { width, height } = cv.getBoundingClientRect();
      W = width;
      H = height;
      unit = Math.min(width, height) * 0.42;
      sakuraScale = width < 640 ? RS * 1.14 : RS;
      viewX = width / 2 / unit;
      viewY = height / 2 / unit;
      layoutBlooms(100 / unit);
      cv.width = Math.round(width * dpr);
      cv.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(cv);

    const project = (p: V3) => {
      const d = F + p[2];
      if (d < 0.2) return null;
      const s = F / d;
      return { x: W / 2 + p[0] * s * unit, y: H / 2 + p[1] * s * unit, s };
    };

    type Item = { x: number; y: number; r: number; a: number; z: number; kind: number };
    const items: Item[] = [];

    const collect = (t: number) => {
      items.length = 0;
      const st = stageAt(t);
      for (let i = 0; i < NA; i++) {
        const d = dotAt(st, i, t);
        if (d.sz <= 0.0004) continue;
        const pt = project(d.p);
        if (!pt) continue;
        const kind = DOTS[i].kind;
        const r = Math.min(d.sz * Math.pow(pt.s, 1 + 1.2 * d.dc) * unit * KIND_SCALE[kind], 90);
        const a = depthAlpha(pt.s, d.dc);
        if (r < 0.35 || a < 0.01) continue;
        if (pt.x < -r || pt.x > W + r || pt.y < -r || pt.y > H + r) continue;
        items.push({ x: pt.x, y: pt.y, r, a, z: d.p[2], kind });
      }
      items.sort((a, b) => b.z - a.z);
    };

    const draw = (rgb: string) => {
      ctx.fillStyle = `rgb(${rgb})`;
      ctx.strokeStyle = `rgb(${rgb})`;
      for (const d of items) {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        if (d.kind === 1 || d.kind === 3) {
          ctx.globalAlpha = d.a;
          ctx.lineWidth = Math.max(0.8, d.r * 0.12);
          ctx.stroke();
          if (d.kind === 3) {
            ctx.beginPath();
            ctx.arc(d.x, d.y, d.r * 0.36, 0, Math.PI * 2);
            ctx.fill();
          }
        } else {
          ctx.globalAlpha = d.kind === 2 ? d.a * 0.2 : d.a;
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    let tone = "";
    const setTone = (next: string) => {
      if (next === tone) return;
      tone = next;
      if (next) document.documentElement.dataset.mv = next;
      else delete document.documentElement.dataset.mv;
    };

    const shown: string[] = [];
    const caption = (t: number) => {
      words.current.forEach((el, w) => {
        if (!el) return;
        const a = expoOut(seg(t, 0.2 + w * 0.16, 1.2 + w * 0.16));
        const b = expoIn(seg(t, 3.0 + w * 0.07, 3.55 + w * 0.07));
        const y = ((1 - a) * 110 - b * 110).toFixed(1);
        const o = (a * (1 - b)).toFixed(2);
        const key = `${y}|${o}`;
        if (shown[w] === key) return;
        shown[w] = key;
        el.style.transform = `translate3d(0, ${y}%, 0)`;
        el.style.opacity = o;
      });
    };

    const told: string[] = [];
    const tag = (t: number) => {
      lines.current.forEach((el, w) => {
        if (!el) return;
        const a = cubicOut(seg(t, 13.7 + w * 0.44, 15.5 + w * 0.44));
        const b = expoIn(seg(t, 17.95 + w * 0.07, 18.5 + w * 0.07));
        const y = ((1 - a) * 110 - b * 110).toFixed(1);
        const o = (a * (1 - b)).toFixed(2);
        const key = `${y}|${o}`;
        if (told[w] === key) return;
        told[w] = key;
        el.style.transform = `translate3d(0, ${y}%, 0)`;
        el.style.opacity = o;
      });
    };

    const frame = (t: number) => {
      caption(t);
      tag(t);
      const full = Math.hypot(W, H) / 2 + 4;
      const edge = Math.hypot(W * 0.36, H / 2 - 48);
      let dark = false;
      let hole = 0;
      if (t >= 6.05 && t < 7.3) {
        hole = mix(0, 0.034 * unit, expoOut(seg(t, 6.05, 6.5))) + full * expoIn(seg(t, 6.65, 7.3));
      } else if (t >= 7.3 && t < 11.65) {
        dark = true;
      } else if (t >= 11.65 && t < 12.6) {
        dark = true;
        hole = full * expoInOut(seg(t, 11.65, 12.6));
      }
      setTone((dark ? hole < edge : hole >= edge) ? "dark" : "");
      const outer = dark ? INK : PAPER;
      const inner = dark ? PAPER : INK;
      collect(t);
      ctx.fillStyle = `rgb(${outer})`;
      ctx.fillRect(0, 0, W, H);
      draw(inner);
      if (hole > 0.5) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(W / 2, H / 2, Math.min(hole, full), 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${inner})`;
        ctx.fill();
        ctx.clip();
        draw(outer);
        ctx.restore();
      }
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      frame(2);
      return () => ro.disconnect();
    }

    let raf = 0;
    let visible = false;
    let last = 0;
    let t = START;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = (now - last) / 1000;
      if (dt < 1 / 62) return;
      last = now;
      t = (t + Math.min(dt, 0.1)) % LOOP;
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
        setTone("");
      }
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      run();
    });
    io.observe(cv);
    document.addEventListener("visibilitychange", run);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", run);
      setTone("");
    };
  }, []);

  return (
    <>
      <canvas ref={canvas} className="block size-full" aria-hidden />
      <h1 className="pointer-events-none absolute inset-0 grid place-items-center px-5 font-latin text-[22px] font-medium leading-none tracking-[0.01em] text-[#333] md:text-[34px]">
        <span className="flex flex-wrap justify-center gap-x-[0.3em]">
          {list.map((w, i) => (
            <span key={w} className="block overflow-hidden pb-[0.12em]">
              {i > 0 && " "}
              <span
                ref={(el) => {
                  words.current[i] = el;
                }}
                className="block opacity-0 will-change-transform"
                style={{ transform: "translate3d(0, 110%, 0)" }}
              >
                {w}
              </span>
            </span>
          ))}
        </span>
      </h1>
      <p className="pointer-events-none absolute inset-0 grid place-items-center px-5 text-center text-[13px] font-medium leading-[2] tracking-[0.14em] text-[#333] md:text-[24px] md:tracking-[0.16em]">
        <span className="block">
          {tagline.map((l, i) => (
            <span key={l} className="block overflow-hidden">
              <span
                ref={(el) => {
                  lines.current[i] = el;
                }}
                className="block opacity-0 will-change-transform"
                style={{ transform: "translate3d(0, 110%, 0)" }}
              >
                {l}
              </span>
            </span>
          ))}
        </span>
      </p>
    </>
  );
}
