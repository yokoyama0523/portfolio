import { SectionTitle } from "./SectionTitle";

export const steps = [
  ["ヒアリング", "目的・ターゲット・ご予算を伺います。"],
  ["提案・見積", "サイトマップとお見積もりをご提示します。お見積もりは3日以内です。"],
  ["デザイン", "ワイヤーフレームをもとに、デザインを作成します。"],
  ["コーディング", "レスポンシブ対応でコーディングし、テストを行います。"],
  ["公開・運用", "操作マニュアルを添えて納品します。公開後2週間は、無償で修正に対応します。"],
];

export function Process() {
  return (
    <section id="process" className="bg-[#f5f5f5] px-5 py-28 md:px-12 md:py-40">
      <div className="mx-auto grid max-w-[1280px] gap-14 md:grid-cols-[4fr_7fr] md:gap-24">
        <SectionTitle en="Process" jp="制作の流れ" />
        <ol className="border-t border-[#d9d9d9]">
          {steps.map(([title, text], i) => (
            <li key={title} data-reveal className="group grid grid-cols-[56px_1fr] gap-x-6 border-b border-[#d9d9d9] py-8 md:grid-cols-[72px_1fr_48px]">
              <span className="font-latin text-[15px] tracking-[0.06em] text-accent">{String(i + 1).padStart(2, "0")}</span>
              <span>
                <span className="block text-[17px] font-bold tracking-[0.06em] text-ink">{title}</span>
                <span className="mt-2 block text-[13px] leading-[2] tracking-[0.06em] text-text">{text}</span>
              </span>
              <span className="hidden size-12 place-items-center self-center rounded-full border border-[#cfcfcf] text-ink transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white md:grid" aria-hidden>
                <svg viewBox="0 0 24 24" className="size-4">
                  <path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
