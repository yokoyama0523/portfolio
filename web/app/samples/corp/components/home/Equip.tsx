import { Img } from "~/samples/shared/Img";
import { home } from "../../content/home";
import { SectionHead } from "./SectionHead";

const { equip } = home;

export function Equip() {
  return (
    <section className="sec equip" id={equip.id}>
      <SectionHead label={equip.label} title={equip.title} text={equip.text} />
      <div className="wrap">
        <div>
          <table>
            <thead>
              <tr>
                <th>{equip.columns.name}</th>
                <th>{equip.columns.model}</th>
                <th className="hide">{equip.columns.spec}</th>
                <th>{equip.columns.count}</th>
              </tr>
            </thead>
            <tbody>
              {equip.rows.map((row) => (
                <tr key={row.name}>
                  <td>{row.name}</td>
                  <td>{row.model}</td>
                  <td className="hide">{row.spec}</td>
                  <td>{row.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pics">
            {equip.photos.map((photo) => (
              <figure key={photo.caption}>
                <div className="im">
                  <Img image={photo.image} />
                </div>
                <figcaption>{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
