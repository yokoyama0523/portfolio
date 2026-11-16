import { home } from "../../content/home";

const { hero } = home;
const [ridge, rafter, sill, wall, floor] = hero.labels;

function Label({
  x,
  y,
  part,
  spec,
  end,
}: {
  x: number;
  y: number;
  part: string;
  spec: string;
  end?: boolean;
}) {
  return (
    <text className="lab" x={x} y={y} textAnchor={end ? "end" : undefined}>
      <tspan className="part">{part}</tspan>　{spec}
    </text>
  );
}

export function Hero() {
  return (
    <section className="hero" aria-label={hero.label}>
      <div>
        <h1 className="v">
          {hero.title.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h1>
        <div className="copy">
          <p>{hero.text}</p>
          <div className="meta">{hero.meta}</div>
        </div>
      </div>
      <div className="draw" aria-hidden="true">
        <svg viewBox="0 0 1200 640" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <defs>
            <clipPath id="room">
              <rect x="470" y="330" width="330" height="190" />
            </clipPath>
          </defs>
          <image
            href={hero.room.src}
            x="440"
            y="300"
            width="400"
            height="260"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#room)"
          />
          <path className="ln" d="M60 560 H1140" />
          <path className="ln thin" d="M60 572 H1140 M60 584 H1140" />
          <path className="ln" d="M300 560 V520 H1000 V560" />
          <path className="ln" d="M300 520 V140 M1000 520 V140 M300 330 H1000" />
          <path className="ln thin" d="M300 340 H1000" />
          <path className="ln" d="M260 150 L650 20 L1040 150" />
          <path className="ln" d="M300 140 L650 32 L1000 140" />
          <path
            className="ln thin"
            d="M650 32 V140 M475 86 V140 M825 86 V140 M400 110 V140 M900 110 V140"
          />
          <path className="ln thin" d="M300 140 H1000" />
          <path className="ln thin" d="M470 330 V520 M800 330 V520 M470 140 V330 M800 140 V330" />
          <path className="ln thin" d="M470 330 H800 M470 520 H800" />
          <path className="ln" d="M1000 400 H1080 V520 H1000" />
          <path className="ln thin" d="M1000 420 H1080 M1000 480 H1080" />
          <path className="ln thin" d="M300 380 V480 M312 380 V480" />
          <path
            className="ln thin"
            d="M820 520 h20 v-20 h20 v-20 h20 v-20 h20 v-20 h20 v-20 h20 v-20 h20 v-20 h20 v-20 h20"
          />
          <path className="dim" d="M300 610 H1000 M300 600 V620 M1000 600 V620" />
          <text className="dimt" x="650" y="634" textAnchor="middle">
            {hero.dimensions.width}
          </text>
          <path className="dim" d="M1120 140 V560 M1110 140 H1130 M1110 560 H1130" />
          <text className="dimt" x="1140" y="350" writingMode="tb">
            {hero.dimensions.height}
          </text>
          <path className="dim" d="M650 60 L720 60 L760 40" />
          <Label x={768} y={36} {...ridge} />
          <path className="dim" d="M475 110 L420 90 L360 90" />
          <Label x={352} y={86} {...rafter} end />
          <path className="dim" d="M1000 540 L1070 580 L1110 580" />
          <Label x={1116} y={584} {...sill} />
          <path className="dim" d="M300 440 L240 440 L200 420" />
          <Label x={194} y={416} {...wall} end />
          <path className="dim" d="M470 330 L430 300 L380 300" />
          <Label x={372} y={296} {...floor} end />
        </svg>
      </div>
    </section>
  );
}
