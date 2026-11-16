import { type Mode, quote } from "../content/quote";

const modes: Mode[] = ["quote", "visit"];

export function ModeTabs({ mode, onChange }: { mode: Mode; onChange: (mode: Mode) => void }) {
  return (
    <div className="tabs">
      {modes.map((item) => (
        <button
          key={item}
          type="button"
          className={item === mode ? "on" : undefined}
          aria-pressed={item === mode}
          onClick={() => onChange(item)}
        >
          {quote.modes[item].tab}
        </button>
      ))}
    </div>
  );
}
