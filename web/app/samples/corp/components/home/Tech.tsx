import { Img } from "~/samples/shared/Img";
import { home } from "../../content/home";
import { SectionHead } from "./SectionHead";

const { tech } = home;

export function Tech() {
  return (
    <section className="sec tech" id={tech.id}>
      <SectionHead label={tech.label} title={tech.title} text={tech.text} />
      <div className="wrap">
        <div>
          <div className="fig">
            <Img image={tech.image} alt={tech.alt} />
            <svg
              className="dl draw"
              viewBox="0 0 1280 720"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <line x1="120" y1="640" x2="620" y2="640" />
              <line x1="120" y1="600" x2="120" y2="660" />
              <line x1="620" y1="600" x2="620" y2="660" />
              <path className="ar" d="M120 640 l12 -4 v8 z" />
              <path className="ar" d="M620 640 l-12 -4 v8 z" />
              <text x="370" y="628" textAnchor="middle">
                {tech.marks.length}
              </text>
              <line x1="1140" y1="120" x2="1140" y2="420" />
              <line x1="1100" y1="120" x2="1180" y2="120" />
              <line x1="1100" y1="420" x2="1180" y2="420" />
              <path className="ar" d="M1140 120 l-4 12 h8 z" />
              <path className="ar" d="M1140 420 l-4 -12 h8 z" />
              <text x="1160" y="276" writingMode="tb" textAnchor="middle">
                {tech.marks.bore}
              </text>
              <path d="M700 200 l60 -60 h120" />
              <text x="884" y="135">
                {tech.marks.surface}
              </text>
            </svg>
          </div>
          <div className="cols">
            {tech.specs.map((spec) => (
              <div key={spec.label}>
                <h3>
                  <b className="value">
                    {spec.value}
                    {spec.unit && <small className="unit">{spec.unit}</small>}
                  </b>
                  {spec.label}
                </h3>
                <p>{spec.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
