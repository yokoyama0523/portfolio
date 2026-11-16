import { copyFileSync, existsSync, readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { site } from "../app/config.ts";
import { writeHeaders, writeRedirects } from "./hosting.ts";
import { writeSitemap } from "./sitemap.ts";

const here = import.meta.dirname;
const out = resolve(here, "../build/client");
const samples = resolve(here, "../app/samples");

const ids = readdirSync(samples).filter((id) => existsSync(join(samples, id, "case.json")));
const retired: string[] = JSON.parse(readFileSync(join(here, "retired-paths.json"), "utf8"));

const pages = writeSitemap(out, site.url);
copyFileSync(join(out, "__spa-fallback.html"), join(out, "404.html"));
writeHeaders(out);
writeRedirects(out, ids, retired);
console.log(`finish-build: ${pages} pages in sitemap, ${ids.length} samples`);
