import { execFileSync } from "node:child_process";
import {
  copyFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
} from "node:fs";
import { basename, join, relative, resolve } from "node:path";

const casesDir = resolve(import.meta.dirname, "../../cases");
const outDir = resolve(import.meta.dirname, "../public/portfolio");
const cacheDir = resolve(import.meta.dirname, "../.cache/shots");
const assetCache = resolve(import.meta.dirname, "../.cache/assets");

const keep = (root) => (src) => {
  const rel = relative(root, src);
  if (rel === "") return true;
  const name = basename(src);
  if (name === "case.json" || name === ".DS_Store") return false;
  if (rel.startsWith("_shots2")) return false;
  if (name.startsWith("_")) return false;
  return true;
};

const shot = (src, out, width) => {
  if (existsSync(out) && statSync(out).mtimeMs >= statSync(src).mtimeMs) return;
  execFileSync(
    "sips",
    [
      "-s",
      "format",
      "jpeg",
      "-s",
      "formatOptions",
      "72",
      "--resampleWidth",
      String(width),
      src,
      "--out",
      out,
    ],
    { stdio: "ignore" },
  );
};

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });
mkdirSync(cacheDir, { recursive: true });
for (const id of readdirSync(casesDir)) {
  const src = join(casesDir, id);
  const json = join(src, "case.json");
  if (!existsSync(json)) continue;
  cpSync(src, join(outDir, id), { recursive: true, filter: keep(src) });
  const media = JSON.parse(readFileSync(json, "utf8")).media;
  for (const [key, width, suffix] of [
    ["desktop", 1200, ""],
    ["desktop", 720, "-720"],
    ["mobile", 420, ""],
    ["thumb", 480, "-480"],
    ["thumb", 960, ""],
  ]) {
    const cached = join(cacheDir, `${id}-${key}${suffix}.jpg`);
    shot(join(src, media[key]), cached, width);
    const dest = join(outDir, id, media[key].replace(/\.(png|jpg)$/, `${suffix}.jpg`));
    mkdirSync(resolve(dest, ".."), { recursive: true });
    copyFileSync(cached, dest);
  }
}

execFileSync(
  "/usr/bin/python3",
  [resolve(import.meta.dirname, "../../tools/squeeze.py"), casesDir, assetCache, outDir],
  { stdio: "inherit" },
);
