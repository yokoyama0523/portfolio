import { existsSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const YEAR = 31536000;
const WEEK = 604800;

export const writeHeaders = (out: string) =>
  writeFileSync(
    join(out, "_headers"),
    `/assets/*
  Cache-Control: public, max-age=${YEAR}, immutable
/og/*
  Cache-Control: public, max-age=${WEEK}
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
`,
  );

const redirect = (from: string, to: string) => `${from} ${to} 301\n`;

const pageFolders = (out: string, id: string) => {
  const dir = join(out, "portfolio", id);
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && existsSync(join(dir, entry.name, "index.html")))
    .map((entry) => `/portfolio/${id}/${entry.name}`);
};

export const writeRedirects = (out: string, ids: string[], retired: string[]) => {
  const moved = ids.flatMap((id) => [
    redirect(`/${id}`, `/portfolio/${id}/`),
    redirect(`/${id}/*`, `/portfolio/${id}/:splat`),
  ]);
  const renamed = ids
    .flatMap((id) => pageFolders(out, id))
    .map((path) => redirect(`${path}.html`, `${path}/`));
  const gone = retired.flatMap((path) => [redirect(path, "/"), redirect(`${path}/*`, "/")]);
  writeFileSync(join(out, "_redirects"), [...moved, ...renamed, ...gone].join(""));
};
