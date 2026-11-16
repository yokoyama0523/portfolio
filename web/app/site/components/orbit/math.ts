export type V3 = [number, number, number];

export const TAU = Math.PI * 2;

const HASH = { x: 127.1, y: 311.7, scale: 43758.5453 };

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
export const mix = (a: number, b: number, k: number) => a + (b - a) * k;
export const mix3 = (a: V3, b: V3, k: number): V3 => [
  mix(a[0], b[0], k),
  mix(a[1], b[1], k),
  mix(a[2], b[2], k),
];
export const scale3 = (a: V3, k: number): V3 => [a[0] * k, a[1] * k, a[2] * k];

export const expoIn = (x: number) => (x <= 0 ? 0 : 2 ** (10 * x - 10));
export const expoOut = (x: number) => (x >= 1 ? 1 : 1 - 2 ** (-10 * x));
export const expoInOut = (x: number) =>
  x <= 0 ? 0 : x >= 1 ? 1 : x < 0.5 ? 2 ** (20 * x - 10) / 2 : (2 - 2 ** (-20 * x + 10)) / 2;
export const cubicOut = (x: number) => 1 - (1 - clamp(x)) ** 3;
export const sineInOut = (x: number) => -(Math.cos(Math.PI * x) - 1) / 2;

export const rotX = (p: V3, a: number): V3 => [
  p[0],
  p[1] * Math.cos(a) - p[2] * Math.sin(a),
  p[1] * Math.sin(a) + p[2] * Math.cos(a),
];
export const rotZ = (p: V3, a: number): V3 => [
  p[0] * Math.cos(a) - p[1] * Math.sin(a),
  p[0] * Math.sin(a) + p[1] * Math.cos(a),
  p[2],
];

export const rand = (seed: number) => {
  const x = Math.sin(seed * HASH.x + HASH.y) * HASH.scale;
  return x - Math.floor(x);
};
