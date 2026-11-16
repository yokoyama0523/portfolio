import { adminPage } from "../content/admin";
import { yen } from "../store/pricing";
import { useShop } from "../store/ShopContext";
import { customerRows } from "./stats";

const text = adminPage.customers;

export function CustomersView() {
  const { users, orders } = useShop();
  return (
    <div className="pnl">
      <table className="tb">
        <thead>
          <tr>
            {text.columns.map((column) => (
              <th key={column.label} className={"right" in column ? "r" : undefined}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {customerRows(users, orders.all).map((row) => (
            <tr key={row.email}>
              <td>{row.user.name}</td>
              <td>{row.email}</td>
              <td>{row.user.since}</td>
              <td className="r">{row.count}</td>
              <td className="r">{yen(row.total)}</td>
              <td>{row.last ? row.last.slice(0, 10) : text.none}</td>
              <td>{text.addresses(row.user.addresses.length)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
