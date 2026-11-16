import { type Case, cases } from "./cases";

export type Service = {
  id: string;
  en: string;
  jp: string;
  text: string[];
  items: string[];
  image: Case;
  works: Case[];
};

const pick = (id: string) => cases.find((c) => c.id === id) ?? cases[0];

export const services: Service[] = [
  {
    id: "corporate",
    en: "Website",
    jp: "コーポレートサイト制作",
    text: [
      "コーポレートサイト・店舗サイトの制作。",
      "情報設計から、レスポンシブデザイン、",
      "SEO内部施策まで対応します。",
    ],
    items: ["コーポレートサイト", "店舗サイト", "情報設計", "レスポンシブデザイン", "SEO内部施策"],
    image: pick("dental"),
    works: cases.filter((c) => c.category !== "EC"),
  },
  {
    id: "ec",
    en: "E-commerce",
    jp: "ECサイト構築・予約フォーム",
    text: [
      "ECサイト構築と、予約・見積もりフォームの制作。",
      "購入や申し込みまでの導線設計に",
      "対応します。",
    ],
    items: ["ECサイト構築", "予約フォーム", "見積もりフォーム", "導線設計"],
    image: pick("ec"),
    works: cases.filter((c) => c.category === "EC"),
  },
];
