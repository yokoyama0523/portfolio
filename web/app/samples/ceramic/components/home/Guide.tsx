import { Reveal } from "~/samples/shared/Reveal";
import { home } from "../../content/home";

const { guide } = home;

export function Guide() {
  return (
    <section className="sec guide" id={guide.id}>
      <Reveal className="head">
        <h2>{guide.title}</h2>
      </Reveal>
      <Reveal>
        <table>
          <tbody>
            {guide.rows.map((row) => (
              <tr key={row.term}>
                <th scope="row">{row.term}</th>
                <td>{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
    </section>
  );
}
