import { type ReactNode, useRef } from "react";
import { useInView } from "./useInView";

const options = { threshold: 0.1 };

type Props = { className?: string; children: ReactNode; as?: "div" | "article" };

export function Reveal({ className, children, as: Tag = "div" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, options);
  const classes = [className, "r", seen ? "in" : ""].filter(Boolean).join(" ");
  return (
    <Tag ref={ref} className={classes}>
      {children}
    </Tag>
  );
}
