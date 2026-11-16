import { samplePath } from "~/samples/catalog";

const home = samplePath("dental");

export const clinic = {
  name: "ひだまり歯科クリニック",
  latin: "HIDAMARI DENTAL CLINIC",
  copyright: "© Hidamari Dental Clinic",
  tel: "03-1234-5678",
  telHref: "tel:0312345678",
  zip: "〒156-0054",
  address: "東京都世田谷区桜丘 2-13-7 1F",
  paths: {
    home,
    treatment: `${home}treatment/`,
    news: `${home}news/`,
    reserve: `${home}reserve/`,
    section: (id: string) => `${home}#${id}`,
  },
};

export const hours = {
  label: "診療時間",
  days: ["月", "火", "水", "木", "金", "土", "日"],
  rows: [
    { time: "9:30〜13:00", marks: ["●", "●", "●", "／", "●", "●", "●"] },
    { time: "14:30〜19:00", marks: ["●", "●", "●", "／", "●", "★", "★"] },
  ],
  shortNote: "★ 土日の午後は17:30まで　休診：木曜・祝日",
};

export const reserveLabel = "24時間WEB予約";
