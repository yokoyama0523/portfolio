import type { ReactNode } from "react";

export function SectionHead({
  label,
  title,
  text,
}: {
  label: string;
  title: ReactNode;
  text?: string;
}) {
  return (
    <div className="head">
      <div className="no">{label}</div>
      <div>
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
    </div>
  );
}
