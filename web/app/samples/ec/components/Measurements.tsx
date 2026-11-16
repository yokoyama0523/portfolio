import { measurementLabels, type Product } from "../content/catalog";
import { itemPage } from "../content/item";

const SKIP = "-";

export function Measurements({ product }: { product: Product }) {
  const labels = measurementLabels[product.category] ?? [];
  const rows = Object.entries(product.measurements);
  if (rows.length === 0) return <p className="note">{itemPage.shoesNote}</p>;
  const shown = labels.map((label, i) => ({ label, i })).filter((column) => column.label !== SKIP);
  return (
    <table className="meas">
      <tbody>
        <tr>
          <th>{itemPage.sizeColumn}</th>
          {shown.map((column) => (
            <th key={column.label}>{column.label}</th>
          ))}
        </tr>
        {rows.map(([size, values]) => (
          <tr key={size}>
            <th>{size}</th>
            {shown.map((column) => (
              <td key={column.label}>{values[column.i]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
