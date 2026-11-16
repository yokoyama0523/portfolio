type Props = { className?: string };

export function Dummy({ className = "" }: Props) {
  return (
    <span className={`relative block border border-frame bg-mist ${className}`} aria-hidden>
      <svg className="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line x1="0" y1="0" x2="100" y2="100" className="stroke-frame" vectorEffect="non-scaling-stroke" />
        <line x1="100" y1="0" x2="0" y2="100" className="stroke-frame" vectorEffect="non-scaling-stroke" />
      </svg>
    </span>
  );
}
