import { samplePath } from "~/samples/catalog";

const home = samplePath("corp");

export const company = {
  name: "ミナト精機",
  legalName: "株式会社ミナト精機",
  latin: "MINATO SEIKI CO., LTD.",
  mark: "M",
  tel: "045-123-4567",
  hours: "平日 8:30〜17:30",
  address: "神奈川県横浜市金沢区福浦 2-7-1",
  paths: { home, quote: `${home}quote/` },
};
