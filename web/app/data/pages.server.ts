import { readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

export const countPages = () => {
  const root = resolve("../cases");
  let pages = 0;
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      if (name.startsWith("_") || name === "case") continue;
      const p = join(dir, name);
      if (statSync(p).isDirectory()) walk(p);
      else if (name.endsWith(".html")) pages += 1;
    }
  };
  for (const id of readdirSync(root)) if (statSync(join(root, id)).isDirectory()) walk(join(root, id));
  return pages;
};
