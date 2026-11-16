import { Link } from "react-router";
import { useMagnetic } from "~/site/hooks/useMagnetic";

type Props = {
  href: string;
  en: string;
  jp: string;
  tone?: "dark" | "light" | "ghost";
  external?: boolean;
};

const tones = {
  dark: { base: "bg-[#333] text-white", fill: "bg-[#4a4a4a]", sub: "text-white/65" },
  light: { base: "bg-white text-ink", fill: "bg-[#ededed]", sub: "text-ink/60" },
  ghost: {
    base: "bg-transparent text-white ring-1 ring-inset ring-white/70 transition-colors hover:text-[#333]",
    fill: "bg-white",
    sub: "text-white/65 transition-colors group-hover:text-[#333]/60",
  },
};

export function PillButton({ href, en, jp, tone = "dark", external }: Props) {
  const ref = useMagnetic<HTMLAnchorElement>(0.12);
  const t = tones[tone];
  const className = `group relative isolate mx-auto flex h-16 w-fit min-w-[300px] md:mx-0 md:inline-flex items-center justify-between gap-10 overflow-hidden rounded-full pl-8 pr-7 transition-[padding] duration-500 ease-out-soft hover:pr-6 ${t.base}`;
  const content = (
    <>
      <span
        className={`absolute inset-0 -z-10 origin-left scale-x-0 rounded-full transition-transform duration-500 ease-out-soft group-hover:scale-x-100 ${t.fill}`}
        aria-hidden="true"
      />
      <span className="flex flex-col leading-[1.35]">
        <span className="font-latin text-[14px] tracking-[0.08em]">{en}</span>
        <span className={`mt-0.5 text-[11px] tracking-[0.1em] ${t.sub}`}>{jp}</span>
      </span>
      <svg
        viewBox="0 0 24 24"
        className="size-4 shrink-0 transition-transform duration-500 ease-out-soft group-hover:translate-x-1"
        aria-hidden="true"
      >
        <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    </>
  );
  if (external) {
    return (
      <a ref={ref} href={href} target="_blank" rel="noopener" className={className}>
        {content}
      </a>
    );
  }
  return (
    <Link ref={ref} to={href} className={className}>
      {content}
    </Link>
  );
}
