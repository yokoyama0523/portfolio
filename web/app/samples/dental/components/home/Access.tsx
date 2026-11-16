import { Fragment } from "react";
import { clinic } from "../../content/clinic";
import { home } from "../../content/home";

const { access } = home;

function AccessMap() {
  const { map } = access;
  return (
    <svg viewBox="0 0 480 340" aria-label={access.mapLabel} role="img">
      <title>{access.mapLabel}</title>
      <rect className="map-bg" width="480" height="340" />
      <path className="map-road" d="M120 0 V340 M300 0 V340 M0 120 H480" />
      <path className="map-rail" d="M0 250 H480" />
      <path className="map-rail-dash" d="M0 250 H480" />
      <rect className="map-station" x="200" y="226" width="100" height="48" rx="6" />
      <text className="map-label-strong" x="250" y="256" textAnchor="middle">
        {map.station}
      </text>
      <path className="map-route" d="M250 226 V176 H160 V150" />
      <circle className="map-pin" cx="160" cy="132" r="20" />
      <text className="map-label-pin" x="160" y="137" textAnchor="middle">
        {map.clinic}
      </text>
      <text className="map-label" x="330" y="110">
        {map.post}
      </text>
      <rect className="map-block" x="330" y="118" width="60" height="30" rx="4" />
      <text className="map-label" x="30" y="300">
        {map.store}
      </text>
      <rect className="map-block" x="30" y="306" width="50" height="26" rx="4" />
      <text className="map-label" x="430" y="236" textAnchor="end">
        {map.line}
      </text>
    </svg>
  );
}

export function Access() {
  return (
    <section className="sec access" id={access.id}>
      <h2>{access.title}</h2>
      <div className="box">
        <AccessMap />
        <div>
          <div className="addr">
            {clinic.zip}
            <br />
            {clinic.address}
          </div>
          <dl>
            {access.rows.map((row) => (
              <Fragment key={row.term}>
                <dt>{row.term}</dt>
                <dd>{row.value}</dd>
              </Fragment>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
