import { samplePath } from "~/samples/catalog";

const home = samplePath("dental");

export const clinic = {
  name: "まどべ歯科",
  tagline: "家族で通う歯医者",
  copyright: "© Madobe Dental",
  tel: "03-0000-0000",
  telHref: "tel:0300000000",
  zip: "〒000-0000",
  addressParts: ["東京都まどべ市本町", "2-13-7 1階"],
  address: "東京都まどべ市本町2-13-7 1階",
  station: "まどべ駅 北口から徒歩3分",
  paths: {
    home,
    treatment: `${home}treatment/`,
    news: `${home}news/`,
    reserve: `${home}reserve/`,
    section: (id: string) => `${home}#${id}`,
  },
};

export const reserveLabel = "WEB予約";

export type Mark = "open" | "short" | "closed";

export const hours = {
  title: "診療時間",
  days: ["月", "火", "水", "木", "金", "土", "日"],
  rows: [
    {
      time: "9:30〜13:00",
      marks: ["open", "open", "open", "closed", "open", "open", "open"] as Mark[],
    },
    {
      time: "14:30〜19:00",
      marks: ["open", "open", "open", "closed", "open", "short", "short"] as Mark[],
    },
  ],
  symbols: { open: "●", short: "▲", closed: "−" } satisfies Record<Mark, string>,
  labels: { open: "診療", short: "17:30まで", closed: "休診" } satisfies Record<Mark, string>,
  notes: ["▲ 土曜・日曜の午後は17:30まで", "休診日　木曜・祝日"],
};
