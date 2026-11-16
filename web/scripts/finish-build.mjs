import { execFileSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const out = resolve(import.meta.dirname, "../build/client");
const samplesDir = resolve(import.meta.dirname, "../app/samples");
const ogCache = join(root, ".cache/og");
const ids = readdirSync(samplesDir).filter((id) => existsSync(join(samplesDir, id, "case.json")));

if (ids.some((id) => !existsSync(join(ogCache, `${id}.jpg`))))
  execFileSync("python3", ["-I", join(root, "tools/og.py")], { stdio: "inherit" });
mkdirSync(join(out, "og"), { recursive: true });
for (const id of ids) copyFileSync(join(ogCache, `${id}.jpg`), join(out, "og", `${id}.jpg`));

execFileSync("python3", ["-I", join(root, "tools/seo.py"), out, root], { stdio: "inherit" });

copyFileSync(join(out, "__spa-fallback.html"), join(out, "404.html"));

writeFileSync(
  join(out, "_headers"),
  `/assets/*
  Cache-Control: public, max-age=31536000, immutable
/og/*
  Cache-Control: public, max-age=604800
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
`,
);

const retired = JSON.parse(readFileSync(join(import.meta.dirname, "retired-paths.json"), "utf8"));
const moved = ids.map(
  (id) => `/${id} /portfolio/${id}/ 301\n/${id}/* /portfolio/${id}/:splat 301\n`,
);
const gone = retired.map((path) => `${path} / 301\n${path}/* / 301\n`);
writeFileSync(join(out, "_redirects"), [...moved, ...gone].join(""));
