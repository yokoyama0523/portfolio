import { home } from "../../content/home";
import { Address } from "../Address";
import { Sentences } from "../Sentences";

const text = home.access;
const { map } = text;

function AccessMap() {
  return (
    <svg className="map" viewBox="0 0 560 400" role="img" aria-label={text.mapLabel}>
      <rect className="map-ground" width="560" height="400" />
      <path className="map-road" d="M0 250H560M300 0V400M120 250V400M300 120H560" />
      <rect className="map-park" x="330" y="150" width="150" height="80" rx="4" />
      <text className="map-label" x="405" y="196" textAnchor="middle">
        {map.park}
      </text>
      <path className="map-rail" d="M0 330H560" />
      <path className="map-rail-tie" d="M0 330H560" />
      <rect className="map-station" x="40" y="314" width="150" height="32" rx="3" />
      <text className="map-station-label" x="115" y="335" textAnchor="middle">
        {map.station}
      </text>
      <text className="map-small" x="150" y="300">
        {map.exit}
      </text>
      <rect className="map-block" x="196" y="196" width="78" height="38" rx="3" />
      <text className="map-label" x="235" y="220" textAnchor="middle">
        {map.post}
      </text>
      <path className="map-route" d="M140 314V262H300V112" />
      <circle className="map-pin" cx="300" cy="94" r="14" />
      <text className="map-pin-label" x="322" y="99">
        {map.clinic}
      </text>
      <text className="map-small" x="420" y="350">
        {map.line}
      </text>
    </svg>
  );
}

export function Access() {
  return (
    <section className="access" id={text.id} aria-labelledby="access-title">
      <div className="sec-head">
        <h2 id="access-title" className="h2">
          {text.title}
        </h2>
      </div>
      <div className="access-grid">
        <AccessMap />
        <dl>
          {text.rows.map((row) => (
            <div key={row.term}>
              <dt>{row.term}</dt>
              <dd>{row.address ? <Address withZip /> : <Sentences text={row.value} />}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
