import { home } from "../../content/home";

const { price } = home;
const lastPlan = price.head.plans.length - 1;
const hideOnPhone = (i: number) => (i === lastPlan ? "hide" : "");

export function Price() {
  return (
    <section className="sec price" id={price.id}>
      <h2>{price.title}</h2>
      <p className="lead">{price.lead}</p>
      <table>
        <thead>
          <tr>
            <th>{price.head.sales}</th>
            {price.head.plans.map((plan, i) => (
              <th key={plan} className={hideOnPhone(i) || undefined}>
                {plan}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {price.rows.map((row) => (
            <tr key={row.sales}>
              <th>{row.sales}</th>
              {row.fees.map((fee, i) => (
                <td
                  key={fee.monthly + fee.closing}
                  className={["n", "num", hideOnPhone(i)].filter(Boolean).join(" ")}
                >
                  {fee.monthly}
                  <small>{fee.closing}</small>
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <th>{price.custom.sales}</th>
            <td colSpan={price.head.plans.length}>{price.custom.text}</td>
          </tr>
        </tbody>
      </table>
      <p className="notes">{price.notes}</p>
    </section>
  );
}
