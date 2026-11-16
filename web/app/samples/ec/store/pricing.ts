import { type Product, products, shop } from "../content/catalog";
import type { CartLine, Settings, Totals } from "./types";

export const productById = Object.fromEntries(
  products.map((product) => [product.id, product]),
) as Record<string, Product>;

export const priceOf = (product: Product) => product.sale ?? product.price;

export const yen = (value: number) => `¥${Math.round(value).toLocaleString("ja-JP")}`;

export const cartTotals = (
  lines: CartLine[],
  settings: Settings,
  code: string,
  options: { pay?: string; gift?: boolean } = {},
): Totals => {
  const sub = lines.reduce((sum, line) => sum + priceOf(productById[line.id]) * line.qty, 0);
  const coupon = settings.coupons[code];
  const discount = coupon?.type === "rate" ? Math.floor((sub * coupon.value) / 100) : 0;
  let ship = sub === 0 ? 0 : sub - discount >= settings.freeShippingFrom ? 0 : settings.shipping;
  if (coupon?.type === "ship") ship = 0;
  const cod = options.pay === "cod" ? shop.codFee : 0;
  const gift = options.gift ? shop.giftFee : 0;
  return {
    sub,
    discount,
    ship,
    cod,
    gift,
    total: sub - discount + ship + cod + gift,
    code: coupon ? code : "",
  };
};
