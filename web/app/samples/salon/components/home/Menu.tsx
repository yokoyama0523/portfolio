import { Fragment } from "react";
import { home } from "../../content/home";

const { menu } = home;
const lastColumn = menu.columns.length - 1;

export function Menu() {
  return (
    <section className="sec menu" id={menu.id}>
      <h2>{menu.title}</h2>
      <div className="cols">
        {menu.columns.map((groups, column) => (
          <div key={groups[0].title}>
            {groups.map((group) => (
              <Fragment key={group.title}>
                <h3>{group.title}</h3>
                <table>
                  <tbody>
                    {group.items.map((item) => (
                      <tr key={item.name}>
                        <td>
                          {item.name}
                          {item.note && <small>{item.note}</small>}
                        </td>
                        <td>{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Fragment>
            ))}
            {column === lastColumn && <p className="note">{menu.note}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
