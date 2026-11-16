type Props = { en: string; jp: string; tone?: "ink" | "white"; size?: "lg" | "sm" };

export function SectionTitle({ en, jp, tone = "ink", size = "lg" }: Props) {
  const white = tone === "white";
  const heading =
    size === "lg"
      ? `text-display-section -tracking-1 ${white ? "text-white" : "text-ink"}`
      : `text-base tracking-6 ${white ? "text-white" : "text-accent"}`;
  return (
    <div data-reveal>
      <h2 className={`font-latin font-light leading-none ${heading}`}>{en}</h2>
      <p
        className={`mt-4 text-sm font-medium tracking-12 ${white ? "text-white/70" : "text-mute"}`}
      >
        {jp}
      </p>
    </div>
  );
}
