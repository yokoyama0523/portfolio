import { useState } from "react";
import { Img } from "~/samples/shared/Img";
import { image } from "../assets";
import { StatusPill } from "../components/StatusPill";
import { adminPage } from "../content/admin";
import { categories, products } from "../content/catalog";
import { orderStatus } from "../content/orderStatus";
import { priceOf, yen } from "../store/pricing";
import { useShop } from "../store/ShopContext";
import { useToast } from "../ui/ToastContext";
import { CommitInput } from "./CommitInput";
import { skus } from "./stats";

const text = adminPage.stock;
const low = adminPage.lowStock;

const rowClass = (left: number) => (left === 0 ? "out" : left <= low ? "low" : undefined);

export function StockView() {
  const { stock, admin } = useShop();
  const toast = useToast();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [lowOnly, setLowOnly] = useState(false);
  const keyword = query.toLowerCase();
  const rows = skus(
    products.filter(
      (product) =>
        (!category || product.category === category) &&
        (!keyword || product.name.toLowerCase().includes(keyword)),
    ),
  )
    .map((sku) => ({ ...sku, left: stock(sku.product.id, sku.variant.color, sku.size) }))
    .filter((sku) => !lowOnly || sku.left <= low);

  return (
    <>
      <div className="tools">
        <input
          type="search"
          placeholder={text.search}
          aria-label={text.search}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select
          aria-label={text.allCategories}
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="">{text.allCategories}</option>
          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <label className="check">
          <input
            type="checkbox"
            checked={lowOnly}
            onChange={(event) => setLowOnly(event.target.checked)}
          />
          {text.lowOnly}
        </label>
        <span className="note">{text.count(rows.length)}</span>
      </div>
      <div className="pnl">
        <table className="tb">
          <thead>
            <tr>
              <th />
              <th>{text.columns.product}</th>
              <th>{text.columns.color}</th>
              <th>{text.columns.size}</th>
              <th className="r">{text.columns.price}</th>
              <th>{text.columns.stock}</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.map(({ product, variant, size, left }) => (
              <tr key={`${product.id}|${variant.color}|${size}`} className={rowClass(left)}>
                <td>
                  <Img className="thumb" image={image(variant.images[0])} />
                </td>
                <td>{product.name}</td>
                <td>{variant.color}</td>
                <td>{size}</td>
                <td className="r">{yen(priceOf(product))}</td>
                <td>
                  <CommitInput
                    key={left}
                    type="number"
                    min={0}
                    defaultValue={left}
                    aria-label={text.stockLabel}
                    onCommit={(value) => {
                      admin.setStock(product.id, variant.color, size, Number(value));
                      toast(text.saved);
                    }}
                  />
                </td>
                <td>
                  {left === 0 ? (
                    <StatusPill status={orderStatus.cancelled} label={text.soldOut} />
                  ) : left <= low ? (
                    <StatusPill status={orderStatus.received} label={text.few} />
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
