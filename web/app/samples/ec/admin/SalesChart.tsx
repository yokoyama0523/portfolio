import { adminPage } from "../content/admin";
import { yen } from "../store/pricing";

const WIDTH = 600;
const HEIGHT = 200;
const BASE = 170;
const RANGE = 150;
const STEP = 20;
const BAR = 14;
const PAD = 3;
const LABEL_Y = 188;
const MAX_Y = 12;
const LABEL_EVERY = 7;
const LABEL_OFFSET = 1;
const GRID = [0, 0.5, 1];

const text = adminPage.dash;

export function SalesChart({ days }: { days: { day: string; total: number }[] }) {
  const max = Math.max(1, ...days.map((d) => d.total));
  const last = days.length - 1;
  return (
    <svg
      className="chart"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="none"
      role="img"
      aria-label={text.chartLabel}
    >
      {GRID.map((r) => (
        <line key={r} x1="0" x2={WIDTH} y1={BASE - RANGE * r} y2={BASE - RANGE * r} />
      ))}
      {days.map((d, i) => {
        const height = (RANGE * d.total) / max;
        return (
          <rect
            key={d.day}
            x={i * STEP + PAD}
            y={BASE - height}
            width={BAR}
            height={height}
            className={i === last ? undefined : "w"}
          >
            <title>{`${d.day} ${yen(d.total)}`}</title>
          </rect>
        );
      })}
      {days.map((d, i) =>
        i % LABEL_EVERY === LABEL_OFFSET ? (
          <text key={d.day} x={i * STEP + PAD} y={LABEL_Y}>
            {d.day.slice(5).replace("-", "/")}
          </text>
        ) : null,
      )}
      <text x={WIDTH} y={MAX_Y} textAnchor="end">
        {text.chartMax(yen(max))}
      </text>
    </svg>
  );
}
