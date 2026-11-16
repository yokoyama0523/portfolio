import { samplePath } from "~/samples/catalog";

const home = samplePath("house");

export const builder = {
  name: "杉浦工務店",
  tel: "053-123-4567",
  paths: { home, openhouse: `${home}openhouse/` },
};
