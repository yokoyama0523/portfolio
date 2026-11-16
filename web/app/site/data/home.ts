import { stats } from "./cases";

export const homeCopy = {
  mvLabel: "はじめに",
  scroll: "Scroll",
  statement: ["Websites", "that", "fit", "the", "business."],
  servicesLabel: "サービス",
  serviceMore: { en: "View More", jp: "詳しく見る" },
  stats: (pages: number) => [
    { en: "Industries", jp: "業種", value: stats.industries },
    { en: "Pages", jp: "ページ", value: pages },
    { en: "Forms", jp: "予約・購入フォーム", value: stats.forms },
  ],
  person: {
    jobTitle: "Web制作",
    knowsAbout: ["Webサイト制作", "ECサイト", "HTML", "CSS", "JavaScript"],
  },
};
