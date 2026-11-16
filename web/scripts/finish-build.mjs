import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const out = resolve(import.meta.dirname, "../build/client");
const ogCache = join(root, ".cache/og");
const ids = readdirSync(join(root, "cases")).filter((id) => existsSync(join(root, "cases", id, "case.json")));

if (ids.some((id) => !existsSync(join(ogCache, `${id}.jpg`)))) execFileSync("python3", ["-I", join(root, "tools/og.py")], { stdio: "inherit" });
mkdirSync(join(out, "og"), { recursive: true });
for (const id of ids) copyFileSync(join(ogCache, `${id}.jpg`), join(out, "og", `${id}.jpg`));

execFileSync("python3", ["-I", join(root, "tools/seo.py"), out, root], { stdio: "inherit" });

copyFileSync(join(out, "__spa-fallback.html"), join(out, "404.html"));

execFileSync("python3", ["-I", join(root, "tools/build_manage.py")], { stdio: "inherit" });
mkdirSync(join(out, "manage"), { recursive: true });
copyFileSync(join(root, "dist/manage/index.html"), join(out, "manage/index.html"));
for (const id of ids) {
  for (const name of ["desktop_01.png", "mobile_01.png"]) {
    const src = join(root, "cases", id, "_shots2", name);
    if (!existsSync(src)) continue;
    mkdirSync(join(out, "portfolio", id, "_shots2"), { recursive: true });
    copyFileSync(src, join(out, "portfolio", id, "_shots2", name));
  }
}

writeFileSync(
  join(out, "_headers"),
  `/manage/*
  X-Robots-Tag: noindex
/assets/*
  Cache-Control: public, max-age=31536000, immutable
/og/*
  Cache-Control: public, max-age=604800
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
`,
);

writeFileSync(join(out, "_redirects"), ids.map((id) => `/${id} /portfolio/${id}/ 301\n/${id}/* /portfolio/${id}/:splat 301\n`).join(""));
