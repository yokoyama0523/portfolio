import type { Product } from "../content/catalog";

export type StockOverrides = Record<string, number>;

const HASH_BASE = 31;
const HASH_MOD = 997;
const SOLD_OUT_EVERY = 11;
const FEW_EVERY = 7;
const FEW_SPREAD = 3;
const PLENTY_BASE = 6;
const PLENTY_SPREAD = 20;

export const skuKey = (id: string, color: string, size: string) => `${id}|${color}|${size}`;

export const baseStock = (id: string, color: string, size: string) => {
  let hash = 0;
  for (const char of skuKey(id, color, size))
    hash = (hash * HASH_BASE + char.charCodeAt(0)) % HASH_MOD;
  if (hash % SOLD_OUT_EVERY === 0) return 0;
  if (hash % FEW_EVERY === 0) return 1 + (hash % FEW_SPREAD);
  return PLENTY_BASE + (hash % PLENTY_SPREAD);
};

export const stockOf = (overrides: StockOverrides, id: string, color: string, size: string) => {
  const key = skuKey(id, color, size);
  return key in overrides ? overrides[key] : baseStock(id, color, size);
};

export const productStock = (overrides: StockOverrides, product: Product) =>
  product.variants.reduce(
    (sum, variant) =>
      sum +
      product.sizes.reduce(
        (inner, size) => inner + stockOf(overrides, product.id, variant.color, size),
        0,
      ),
    0,
  );
