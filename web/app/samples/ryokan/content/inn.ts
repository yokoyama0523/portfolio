import { samplePath } from "~/samples/catalog";

const home = samplePath("ryokan");

export const inn = {
  name: "湯宿 ゆらぎ",
  latin: "YURAGI · SHIBU ONSEN",
  tel: "0269-12-3456",
  telHours: "お電話は 9:00〜20:00",
  paths: { home, reserve: `${home}reserve/` },
};
