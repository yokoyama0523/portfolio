import { site } from "~/config";
import { SakuraPetals } from "./SakuraMark";

export function Logo({
  className = "",
  adaptive = false,
}: {
  className?: string;
  adaptive?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-charcoal transition-colors duration-500 ${adaptive ? "mv-dark:text-white" : ""} ${className}`}
    >
      <svg viewBox="-12 -12 24 24" className="size-5.5" aria-hidden="true">
        <SakuraPetals
          centerClassName={`fill-white transition-colors duration-500 ${adaptive ? "mv-dark:fill-charcoal" : ""}`}
        />
      </svg>
      <span className="font-latin text-2xl font-medium leading-none tracking-1">
        {site.brandMark.base}
        <span className="relative -top-[0.234em] ml-[calc(1px-0.0266em)] text-[1.084em] leading-0 font-[280]">
          {site.brandMark.exponent}
        </span>
      </span>
    </span>
  );
}
