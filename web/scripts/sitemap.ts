import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";

const NOINDEX = 'name="robots" content="noindex';
const PAGE = "index.html";
const SKIPPED = ["assets/", "__"];
const PRIORITY = { home: "1.0", site: "0.9", sampleTop: "0.8", samplePage: "0.5" };
const SAMPLE_ROOT = "portfolio";
const SAMPLE_TOP_DEPTH = 3;

type Entry = { url: string; modified: string; priority: string };

const pagesUnder = (dir: string): string[] => {
  const entries = readdirSync(dir, { withFileTypes: true }).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  const here = entries.some((e) => e.isFile() && e.name === PAGE) ? [join(dir, PAGE)] : [];
  return [
    ...here,
    ...entries.filter((e) => e.isDirectory()).flatMap((e) => pagesUnder(join(dir, e.name))),
  ];
};

const priorityOf = (rel: string) => {
  const parts = rel.split("/");
  if (rel === PAGE) return PRIORITY.home;
  if (parts[0] !== SAMPLE_ROOT || parts.length < SAMPLE_TOP_DEPTH) return PRIORITY.site;
  return parts.length === SAMPLE_TOP_DEPTH ? PRIORITY.sampleTop : PRIORITY.samplePage;
};

const urlOf = (base: string, rel: string) => {
  const folder = dirname(rel);
  return folder === "." ? `${base}/` : `${base}/${folder}/`;
};

export const writeSitemap = (out: string, base: string) => {
  const entries: Entry[] = pagesUnder(out)
    .map((path) => ({ path, rel: relative(out, path).split(sep).join("/") }))
    .filter(({ path, rel }) => {
      if (SKIPPED.some((prefix) => rel.startsWith(prefix))) return false;
      return !readFileSync(path, "utf8").includes(NOINDEX);
    })
    .map(({ path, rel }) => ({
      url: urlOf(base, rel),
      modified: statSync(path).mtime.toISOString().slice(0, 10),
      priority: priorityOf(rel),
    }));
  const urls = entries.map(
    (e) =>
      `  <url><loc>${e.url}</loc><lastmod>${e.modified}</lastmod><priority>${e.priority}</priority></url>\n`,
  );
  writeFileSync(
    join(out, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("")}</urlset>\n`,
  );
  writeFileSync(
    join(out, "robots.txt"),
    `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`,
  );
  return entries.length;
};
