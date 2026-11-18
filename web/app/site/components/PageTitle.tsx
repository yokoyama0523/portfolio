import type { ReactNode } from "react";
import { Breadcrumb } from "./Breadcrumb";
import { delayStyle, fadeUpClass, RiseText } from "./MotionText";

const SUBTITLE_DELAY_S = 0.35;
const BODY_DELAY_S = 0.5;

type Props = { en: string; jp: string; crumbs: [string, string][]; children?: ReactNode };

export function PageTitle({ en, jp, crumbs, children }: Props) {
  return (
    <div>
      <Breadcrumb items={crumbs} />
      <h1 className="mt-14 md:mt-20">
        <span className="block font-latin text-display-page font-light leading-display -tracking-3 text-ink">
          <RiseText text={en} />
        </span>{" "}
        <span
          className={`mt-6 block text-md font-medium tracking-12 text-mute ${fadeUpClass}`}
          style={delayStyle(SUBTITLE_DELAY_S)}
        >
          {jp}
        </span>
      </h1>
      {children && (
        <div className={fadeUpClass} style={delayStyle(BODY_DELAY_S)}>
          {children}
        </div>
      )}
    </div>
  );
}
