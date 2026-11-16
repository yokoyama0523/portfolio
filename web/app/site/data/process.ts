export const processSteps = [
  { title: "ヒアリング", text: "目的・ターゲット・ご予算を伺います。" },
  {
    title: "提案・見積",
    text: "サイトマップとお見積もりをご提示します。お見積もりは3日以内です。",
  },
  { title: "デザイン", text: "ワイヤーフレームをもとに、デザインを作成します。" },
  { title: "コーディング", text: "レスポンシブ対応でコーディングし、テストを行います。" },
  {
    title: "公開・運用",
    text: "操作マニュアルを添えて納品します。公開後2週間は、無償で修正に対応します。",
  },
];

export const stepNumber = (index: number) => String(index + 1).padStart(2, "0");
