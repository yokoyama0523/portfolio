import type { ReactNode } from "react";
import { Breadcrumb } from "./Breadcrumb";

type Props = { en: string; jp: string; crumbs: [string, string][]; children?: ReactNode };

export function PageTitle({ en, jp, crumbs, children }: Props) {
  return (
    <div>
      <Breadcrumb items={crumbs} />
      <h1 className="mt-14 md:mt-20">
        <span className="block font-latin text-[clamp(56px,9vw,140px)] font-light leading-[0.92] tracking-[-0.03em] text-ink">
          {en}
        </span>{" "}
        <span className="mt-6 block text-[14px] font-medium tracking-[0.12em] text-mute">{jp}</span>
      </h1>
      {children}
    </div>
  );
}
