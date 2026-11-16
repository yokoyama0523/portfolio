import { samplePath } from "~/samples/catalog";

const home = samplePath("tax");

export const office = {
  name: "税理士法人あさひ会計",
  tel: "052-123-4567",
  hours: "平日 9:00〜18:00",
  address: "名古屋市中区栄 1-9-16　伏見ビル 6階",
  paths: { home, consult: `${home}consult/` },
};
