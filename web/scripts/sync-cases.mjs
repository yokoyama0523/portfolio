import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { basename, join, relative, resolve } from "node:path";

const casesDir = resolve(import.meta.dirname, "../../cases");
const outDir = resolve(import.meta.dirname, "../public/portfolio");
const assetCache = resolve(import.meta.dirname, "../.cache/assets");

const keep = (root) => (src) => {
  const name = basename(src);
  return relative(root, src) === "" || !(name.startsWith("_") || name === ".DS_Store");
};

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });
for (const id of readdirSync(casesDir)) {
  const src = join(casesDir, id);
  if (!existsSync(join(src, "index.html"))) continue;
  cpSync(src, join(outDir, id), { recursive: true, filter: keep(src) });
}

execFileSync(
  "/usr/bin/python3",
  [resolve(import.meta.dirname, "../../tools/squeeze.py"), casesDir, assetCache, outDir],
  { stdio: "inherit" },
);
