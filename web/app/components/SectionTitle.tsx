type Props = { en: string; jp: string; tone?: "ink" | "white"; size?: "lg" | "sm" };

export function SectionTitle({ en, jp, tone = "ink", size = "lg" }: Props) {
  return (
    <div data-reveal>
      <h2
        className={`font-latin font-light leading-none tracking-[-0.01em] ${tone === "white" ? "text-white" : "text-ink"} ${
          size === "lg" ? "text-[clamp(44px,5vw,72px)]" : `text-[15px] tracking-[0.06em] ${tone === "white" ? "text-white" : "text-accent"}`
        }`}
      >
        {en}
      </h2>
      <p className={`mt-4 text-[13px] font-medium tracking-[0.12em] ${tone === "white" ? "text-white/70" : "text-mute"}`}>{jp}</p>
    </div>
  );
}
