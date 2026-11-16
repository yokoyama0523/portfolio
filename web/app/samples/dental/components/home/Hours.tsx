import { Link } from "react-router";
import { clinic, reserveLabel } from "../../content/clinic";
import { home } from "../../content/home";

const { hours } = home;
const headClass = (i: number) =>
  i === hours.weekendHeads.sat ? "sat" : i === hours.weekendHeads.sun ? "sun" : undefined;

export function Hours() {
  return (
    <section className="sec hours" id={hours.id}>
      <h2>{hours.title}</h2>
      <div className="box">
        <div>
          <table>
            <thead>
              <tr>
                <th />
                {hours.head.map((day, i) => (
                  <th key={day} className={headClass(i)}>
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hours.rows.map((row) => (
                <tr key={row.time}>
                  <td>{row.time}</td>
                  {row.marks.map((mark, i) => (
                    <td key={hours.head[i]}>
                      <span className={mark}>
                        {hours.symbols[mark as keyof typeof hours.symbols]}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="notes">{hours.notes}</p>
        </div>
        <div className="side">
          <small className="tel-label">{hours.telLabel}</small>
          <a className="tel" href={clinic.telHref}>
            {clinic.tel}
          </a>
          <Link className="btn" to={clinic.paths.reserve}>
            {reserveLabel}
          </Link>
          <a className="btn w" href="#first">
            {hours.first}
          </a>
        </div>
      </div>
    </section>
  );
}
