import { hours } from "../content/clinic";

export function HoursTable({ caption }: { caption?: string }) {
  return (
    <table className="hours">
      {caption && <caption>{caption}</caption>}
      <thead>
        <tr>
          <td />
          {hours.days.map((day) => (
            <th key={day} scope="col">
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {hours.rows.map((row) => (
          <tr key={row.time}>
            <th scope="row">{row.time}</th>
            {row.marks.map((mark, i) => (
              <td key={hours.days[i]} className={mark}>
                <span aria-hidden="true">{hours.symbols[mark]}</span>
                <span className="sr">{hours.labels[mark]}</span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
