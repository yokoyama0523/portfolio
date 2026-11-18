import type { ReactNode } from "react";

type Props = { en: string; jp: string; id?: string; children?: ReactNode };

export function SectionHead({ en, jp, id, children }: Props) {
  return (
    <div className="sh">
      <h2 id={id}>
        <span className="sh-en">{en}</span>
        <span className="sh-jp">{jp}</span>
      </h2>
      {children && <div className="sh-tools">{children}</div>}
    </div>
  );
}
