import { worksLead } from "~/data/copy";
import { site } from "~/site";
import { Lines } from "./Lines";
import { PillButton } from "./PillButton";

export function CtaPanels() {
  return (
    <section aria-label="ご相談" className="grid md:grid-cols-2">
      <div className="bg-[#333] px-8 py-20 text-white md:px-16 md:py-28" data-reveal>
        <p className="font-latin text-[clamp(36px,4vw,56px)] font-light leading-none tracking-[-0.01em]">Contact</p>
        <p className="mt-4 text-[13px] font-medium tracking-[0.12em] text-white/70">ご相談・お見積もり</p>
        <p className="mt-10 text-[14px] leading-[2.1] tracking-[0.08em] text-white/85">
          ご相談・お見積もりは、クラウドワークスからお問い合わせください。
          <br className="hidden md:inline" />
          お見積もりは3日以内にご提示します。
        </p>
        <div className="mt-12">
          <PillButton href={site.crowdworks} en="Contact" jp="クラウドワークスで相談する" tone="ghost" external />
        </div>
      </div>
      <div className="border-y border-line bg-white px-8 py-20 md:px-16 md:py-28" data-reveal>
        <p className="font-latin text-[clamp(36px,4vw,56px)] font-light leading-none tracking-[-0.01em] text-ink">Works</p>
        <p className="mt-4 text-[13px] font-medium tracking-[0.12em] text-mute">制作事例</p>
        <p className="mt-10 text-[14px] leading-[2.1] tracking-[0.08em]">
          <Lines lines={worksLead} />
        </p>
        <div className="mt-12">
          <PillButton href="/portfolio/" en="View Works" jp="制作事例一覧へ" />
        </div>
      </div>
    </section>
  );
}
