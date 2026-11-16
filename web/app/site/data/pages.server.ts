import { existsSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

export const countPages = () => {
  const samples = resolve("app/samples");
  return readdirSync(samples)
    .map((id) => join(samples, id, "pages"))
    .filter((dir) => existsSync(dir))
    .reduce((sum, dir) => sum + readdirSync(dir).filter((name) => name.endsWith(".tsx")).length, 0);
};
