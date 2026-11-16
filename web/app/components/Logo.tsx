const petals = [0, 72, 144, 216, 288];

export function Logo({ className = "", adaptive = false }: { className?: string; adaptive?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-[#333] transition-colors duration-500 ${adaptive ? "[[data-mv=dark]_&]:text-white" : ""} ${className}`}
    >
      <svg viewBox="-12 -12 24 24" className="size-[22px]" aria-hidden>
        {petals.map((deg) => (
          <path
            key={deg}
            transform={`rotate(${deg})`}
            d="M0 -1.2 C -3.4 -3.2 -4.2 -8.2 -1.7 -10.6 L 0 -9.2 L 1.7 -10.6 C 4.2 -8.2 3.4 -3.2 0 -1.2 Z"
            fill="currentColor"
          />
        ))}
        <circle r="1.3" className={`fill-white transition-colors duration-500 ${adaptive ? "[[data-mv=dark]_&]:fill-[#333]" : ""}`} />
      </svg>
      <span className="font-latin text-[22px] font-medium leading-none tracking-[0.01em]">
        Saku<sup className="ml-px align-super text-[0.55em]">2</sup>
      </span>
    </span>
  );
}
