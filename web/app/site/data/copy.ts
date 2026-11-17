import { site } from "~/config";

export const specialty = "ハイクオリティホームページ";

export const about = [
  "ヒアリングからサイト設計、デザイン、コーディング、",
  "公開後の運用まで一貫して対応します。",
  "業種やターゲットに合わせた情報設計で、",
  `成果につながる${specialty}を制作します。`,
];

export const worksLead = [
  "架空のクライアントを想定した制作事例です。",
  "企画・情報設計・デザイン・コーディングまで",
  "一貫して制作しています。",
];

export const crumbHome: [string, string] = ["トップ", site.paths.home];

export const links = {
  works: { href: site.paths.works, en: "View Works", jp: "制作事例一覧へ" },
  service: { href: site.paths.service, en: "View Service", jp: "サービス内容を見る" },
  contact: { href: site.crowdworks, en: "Contact", jp: "クラウドワークスで相談する" },
};

export const contactCopy = {
  label: "ご相談",
  title: "Contact",
  subtitle: "ご相談・お見積もり",
  catchphrase: "Let's work together.",
  lines: [
    "ご相談・お見積もりは、クラウドワークスからお問い合わせください。",
    "お見積もりは3日以内にご提示します。",
  ],
  works: { title: "Works", subtitle: "制作事例" },
};

export const sectionTitles = {
  whatIDo: { en: "What I do", jp: "仕事内容" },
  works: { en: "Works", jp: "制作事例" },
  process: { en: "Process", jp: "制作の流れ" },
};
