import { home } from "../../content/home";

const LOOP = 6;
const runs = Array.from({ length: LOOP }, (_, i) => `run-${i}`);

export function Promises() {
  return (
    <div className="ship">
      <ul className="still" aria-label={home.promisesLabel}>
        {home.promises.map((promise) => (
          <li key={promise}>{promise}</li>
        ))}
      </ul>
      <div className="run" aria-hidden="true">
        {[0, 1].map((half) => (
          <div key={half} className="half">
            {runs.map((run) =>
              home.promises.map((promise) => <span key={`${run}-${promise}`}>{promise}</span>),
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
