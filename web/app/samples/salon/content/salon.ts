import { samplePath } from "~/samples/catalog";

const home = samplePath("salon");

export const salon = {
  name: "SOU.hair",
  mark: "SOU.",
  markSuffix: "hair",
  tel: "03-1234-5678",
  telHref: "tel:0312345678",
  address: "目黒区上目黒 1-12-8　2F",
  paths: { home, reserve: `${home}reserve/` },
};
