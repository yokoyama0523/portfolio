import { Img } from "~/samples/shared/Img";
import { Lines } from "~/samples/shared/Lines";
import { home } from "../../content/home";
import { SectionHead } from "./SectionHead";

const { biz } = home;

export function Biz() {
  return (
    <section className="sec biz" id={biz.id}>
      <SectionHead label={biz.label} title={<Lines lines={biz.title} />} text={biz.text} />
      <div className="wrap">
        <div>
          <div className="bom">
            <table>
              <thead>
                <tr>
                  {biz.columns.map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {biz.rows.map((row) => (
                  <tr key={row.no}>
                    <td className="b">{row.no}</td>
                    <td className="n">
                      <h3>{row.name}</h3>
                    </td>
                    <td className="d">{row.text}</td>
                    <td className="q">
                      <Lines lines={row.scope} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="fig">
            <Img image={biz.image} alt={biz.alt} />
            <span className="cap">{biz.caption}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
