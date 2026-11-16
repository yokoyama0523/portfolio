import { footers } from "../content/chrome";
import { clinic, hours } from "../content/clinic";
import { Mark } from "./Mark";
import { NavLink } from "./NavLink";

export function Footer({ variant }: { variant: "home" | "sub" }) {
  const footer = footers[variant];
  return (
    <footer className="ft">
      <div className="in">
        <div>
          <div className="logo">
            <Mark />
            {footer.showLatin ? (
              <span>
                <b>{clinic.name}</b>
                <small>{clinic.latin}</small>
              </span>
            ) : (
              clinic.name
            )}
          </div>
          <address>
            {clinic.zip} {clinic.address}
            <br />
            {footers.telPrefix}
            {clinic.tel}
          </address>
        </div>
        <div>
          <h3>{footers.hoursTitle}</h3>
          <table>
            <tbody>
              <tr>
                <td />
                {hours.days.map((day) => (
                  <td key={day}>{day}</td>
                ))}
              </tr>
              {hours.rows.map((row) => (
                <tr key={row.time}>
                  <td>{row.time}</td>
                  {row.marks.map((mark, i) => (
                    <td key={hours.days[i]}>{mark}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="hours-note">{hours.shortNote}</p>
        </div>
        <div>
          <h3>{footers.menuTitle}</h3>
          <ul>
            {footer.menu.map((item) => (
              <li key={item.label}>
                <NavLink item={item} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="copy">
        <span>{clinic.copyright}</span>
        <span>{footer.note}</span>
      </div>
    </footer>
  );
}
