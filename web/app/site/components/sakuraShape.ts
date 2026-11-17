export type Point = readonly [number, number];

export const PETAL_ANGLES = [0, 72, 144, 216, 288];
export const CENTER_RADIUS = 1.3;

export const PETAL_EDGE = {
  base: [0, -1.2],
  c1: [-3.4, -3.2],
  c2: [-4.2, -8.2],
  tip: [-1.7, -10.6],
  notch: [0, -9.2],
} as const satisfies Record<string, Point>;

const mirror = ([x, y]: Point): Point => [x === 0 ? 0 : -x, y];
const pt = ([x, y]: Point) => `${x} ${y}`;

export const PETAL_PATH = (() => {
  const { base, c1, c2, tip, notch } = PETAL_EDGE;
  return [
    `M${pt(base)}`,
    `C ${pt(c1)} ${pt(c2)} ${pt(tip)}`,
    `L ${pt(notch)}`,
    `L ${pt(mirror(tip))}`,
    `C ${pt(mirror(c2))} ${pt(mirror(c1))} ${pt(base)}`,
    "Z",
  ].join(" ");
})();

const cubic = (a: Point, b: Point, c: Point, d: Point, steps: number): Point[] =>
  Array.from({ length: steps }, (_, i) => {
    const t = i / steps;
    const u = 1 - t;
    return [
      u ** 3 * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * c[0] + t ** 3 * d[0],
      u ** 3 * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * c[1] + t ** 3 * d[1],
    ];
  });

export const petalOutline = (steps: number): Point[] => {
  const { base, c1, c2, tip, notch } = PETAL_EDGE;
  return [
    ...cubic(base, c1, c2, tip, steps),
    tip,
    notch,
    ...cubic(mirror(tip), mirror(c2), mirror(c1), base, steps),
  ];
};
