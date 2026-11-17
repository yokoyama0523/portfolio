import { useHours } from "../admin/hours";
import { hours } from "../content/clinic";

export function HoursTable({ caption }: { caption?: string }) {
  const { rows } = useHours();
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
        {rows.map((row) => (
          <tr key={row.part}>
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

export function HoursNotes() {
  const { notes } = useHours();
  return (
    <ul className="notes">
      {notes.map((note) => (
        <li key={note}>{note}</li>
      ))}
    </ul>
  );
}
