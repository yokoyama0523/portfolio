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
    admin: `${home}admin/`,
    section: (id: string) => `${home}#${id}`,
  },
};

export const reserveLabel = "WEB予約";

export const hours = {
  title: "診療時間",
  days: ["月", "火", "水", "木", "金", "土", "日"],
  symbols: { open: "●", other: "▲", closed: "−" },
  labels: { open: "診療", other: "時間が違う日", closed: "休診" },
};
