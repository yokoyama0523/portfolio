import type { ReactNode } from "react";
import { Breadcrumb } from "./Breadcrumb";

type Props = { en: string; jp: string; crumbs: [string, string][]; children?: ReactNode };

export function PageTitle({ en, jp, crumbs, children }: Props) {
  return (
    <div>
      <Breadcrumb items={crumbs} />
      <h1 className="mt-14 md:mt-20">
        <span className="block font-latin text-display-page font-light leading-display -tracking-3 text-ink">
          {en}
        </span>{" "}
        <span className="mt-6 block text-md font-medium tracking-12 text-mute">{jp}</span>
      </h1>
      {children}
    </div>
  );
}
