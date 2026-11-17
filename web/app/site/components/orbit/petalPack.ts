import { CENTER_RADIUS, PETAL_ANGLES, type Point, petalOutline } from "../sakuraShape";
import { rand } from "./math";

export type Disc = { x: number; y: number; r: number };
export type PackSize = { min: number; max: number; gap: number; curve: number; tries: number };

const OUTLINE_STEPS = 48;
const SEED = { x: 1, y: 2, size: 3 };
const FILL_FROM = 0.55;

const OUTLINE = petalOutline(OUTLINE_STEPS);
const REACH = Math.max(...OUTLINE.map(([x, y]) => Math.hypot(x, y)));
const POLY: Point[] = OUTLINE.map(([x, y]) => [x / REACH, y / REACH]);
const HOLE = CENTER_RADIUS / REACH;

const BOX = {
  x0: Math.min(...POLY.map((p) => p[0])),
  x1: Math.max(...POLY.map((p) => p[0])),
  y0: Math.min(...POLY.map((p) => p[1])),
  y1: Math.max(...POLY.map((p) => p[1])),
};

export const PETAL_AREA =
  Math.abs(
    POLY.reduce((sum, [x, y], i) => {
      const [nx, ny] = POLY[(i + 1) % POLY.length];
      return sum + x * ny - nx * y;
    }, 0),
  ) / 2;

const FIELD_STEP = 0.004;
const FIELD_SLACK = FIELD_STEP * 1.5;
const FAR = 1e20;
const FIELD_X0 = BOX.x0 - FIELD_STEP;
const FIELD_Y0 = BOX.y0 - FIELD_STEP;
const FIELD_COLS = Math.ceil((BOX.x1 - BOX.x0) / FIELD_STEP) + 3;
const FIELD_ROWS = Math.ceil((BOX.y1 - BOX.y0) / FIELD_STEP) + 3;

const crossings = (y: number) => {
  const xs: number[] = [];
  for (let i = 0, j = POLY.length - 1; i < POLY.length; j = i++) {
    const [xi, yi] = POLY[i];
    const [xj, yj] = POLY[j];
    if (yi > y !== yj > y) xs.push(((xj - xi) * (y - yi)) / (yj - yi) + xi);
  }
  return xs.sort((a, b) => a - b);
};

const squaredLine = (f: Float64Array, n: number) => {
  const d = new Float64Array(n);
  const v = new Int32Array(n);
  const z = new Float64Array(n + 1);
  const cut = (q: number, p: number) => (f[q] + q * q - (f[p] + p * p)) / (2 * q - 2 * p);
  let k = 0;
  z[0] = -FAR;
  z[1] = FAR;
  for (let q = 1; q < n; q++) {
    let s = cut(q, v[k]);
    while (s <= z[k]) {
      k--;
      s = cut(q, v[k]);
    }
    k++;
    v[k] = q;
    z[k] = s;
    z[k + 1] = FAR;
  }
  k = 0;
  for (let q = 0; q < n; q++) {
    while (z[k + 1] < q) k++;
    d[q] = (q - v[k]) ** 2 + f[v[k]];
  }
  return d;
};

const EDGE_FIELD = (() => {
  const grid = new Float64Array(FIELD_COLS * FIELD_ROWS);
  for (let row = 0; row < FIELD_ROWS; row++) {
    const y = FIELD_Y0 + row * FIELD_STEP;
    const xs = crossings(y);
    for (let k = 0; k + 1 < xs.length; k += 2) {
      const from = Math.max(0, Math.ceil((xs[k] - FIELD_X0) / FIELD_STEP));
      const to = Math.min(FIELD_COLS - 1, Math.floor((xs[k + 1] - FIELD_X0) / FIELD_STEP));
      for (let col = from; col <= to; col++)
        if (Math.hypot(FIELD_X0 + col * FIELD_STEP, y) > HOLE) grid[col + row * FIELD_COLS] = FAR;
    }
  }
  const column = new Float64Array(FIELD_ROWS);
  for (let col = 0; col < FIELD_COLS; col++) {
    for (let row = 0; row < FIELD_ROWS; row++) column[row] = grid[col + row * FIELD_COLS];
    const d = squaredLine(column, FIELD_ROWS);
    for (let row = 0; row < FIELD_ROWS; row++) grid[col + row * FIELD_COLS] = d[row];
  }
  const field = new Float32Array(FIELD_COLS * FIELD_ROWS);
  for (let row = 0; row < FIELD_ROWS; row++) {
    const d = squaredLine(grid.subarray(row * FIELD_COLS, (row + 1) * FIELD_COLS), FIELD_COLS);
    for (let col = 0; col < FIELD_COLS; col++)
      field[col + row * FIELD_COLS] = Math.sqrt(d[col]) * FIELD_STEP;
  }
  return field;
})();

const edgeRoom = (x: number, y: number) => {
  const col = Math.round((x - FIELD_X0) / FIELD_STEP);
  const row = Math.round((y - FIELD_Y0) / FIELD_STEP);
  if (col < 0 || row < 0 || col >= FIELD_COLS || row >= FIELD_ROWS) return -1;
  return EDGE_FIELD[col + row * FIELD_COLS] - FIELD_SLACK;
};

const packPetal = (size: PackSize, seed: number) => {
  const discs: Disc[] = [];
  const cell = 2 * size.max + size.gap;
  const cols = Math.ceil((BOX.x1 - BOX.x0) / cell) + 1;
  const rows = Math.ceil((BOX.y1 - BOX.y0) / cell) + 1;
  const grid: Disc[][] = Array.from({ length: cols * rows }, () => []);
  const at = (x: number, y: number) => [
    Math.floor((x - BOX.x0) / cell),
    Math.floor((y - BOX.y0) / cell),
  ];
  for (let a = 0; a < size.tries; a++) {
    const key = seed + a * 4;
    const x = BOX.x0 + rand(key + SEED.x) * (BOX.x1 - BOX.x0);
    const y = BOX.y0 + rand(key + SEED.y) * (BOX.y1 - BOX.y0);
    const room = edgeRoom(x, y) - size.gap;
    if (room < size.min) continue;
    let r = Math.min(
      room,
      a < size.tries * FILL_FROM
        ? size.min + (size.max - size.min) * rand(key + SEED.size) ** size.curve
        : size.max,
    );
    const [cx, cy] = at(x, y);
    for (let gx = Math.max(0, cx - 1); gx <= Math.min(cols - 1, cx + 1) && r >= size.min; gx++)
      for (let gy = Math.max(0, cy - 1); gy <= Math.min(rows - 1, cy + 1) && r >= size.min; gy++)
        for (const d of grid[gx + gy * cols])
          r = Math.min(r, Math.hypot(x - d.x, y - d.y) - d.r - size.gap);
    r = Math.min(r, room);
    if (r < size.min) continue;
    const disc = { x, y, r };
    discs.push(disc);
    grid[cx + cy * cols].push(disc);
  }
  return discs;
};

export const packBloom = (size: PackSize, seed: number): Disc[] => {
  const petal = packPetal(size, seed);
  return PETAL_ANGLES.flatMap((deg) => {
    const a = (deg * Math.PI) / 180;
    const c = Math.cos(a);
    const s = Math.sin(a);
    return petal.map((d) => ({ x: d.x * c - d.y * s, y: d.x * s + d.y * c, r: d.r }));
  });
};
