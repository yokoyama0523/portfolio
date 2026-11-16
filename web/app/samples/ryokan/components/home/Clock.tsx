export type ClockFace = { time: string; label: string } | null;

export function Clock({ face, fallback }: { face: ClockFace; fallback: NonNullable<ClockFace> }) {
  const shown = face ?? fallback;
  return (
    <div className={face ? "clock" : "clock off"} aria-live="polite">
      <b>{shown.time}</b>
      <small>{shown.label}</small>
    </div>
  );
}
