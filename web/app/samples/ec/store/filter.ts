import { categories, type Product, products } from "../content/catalog";
import { priceOf } from "./pricing";
import { productStock, type StockOverrides } from "./stock";

export type Filters = {
  cat: string;
  q: string;
  isNew: boolean;
  sale: boolean;
  colors: string[];
  sizes: string[];
  price: string;
  inStock: boolean;
  sort: string;
  page: number;
};

export const PER_PAGE = 12;

export const allColors = [
  ...new Set(products.flatMap((product) => product.variants.map((v) => v.color))),
];
export const allSizes = [...new Set(products.flatMap((product) => product.sizes))];

export const categoryName = (id: string) =>
  categories.find((category) => category.id === id)?.name ?? "";

const list = (value: string | null) => (value ?? "").split(",").filter(Boolean);

export const readFilters = (params: URLSearchParams): Filters => ({
  cat: params.get("cat") ?? "",
  q: (params.get("q") ?? "").trim(),
  isNew: params.get("new") === "1",
  sale: params.get("sale") === "1",
  colors: list(params.get("color")),
  sizes: list(params.get("size")),
  price: params.get("price") ?? "",
  inStock: params.get("instock") === "1",
  sort: params.get("sort") ?? "rec",
  page: Number(params.get("page") ?? 1) || 1,
});

export const writeFilters = (filters: Filters) => {
  const params = new URLSearchParams();
  if (filters.cat) params.set("cat", filters.cat);
  if (filters.q) params.set("q", filters.q);
  if (filters.isNew) params.set("new", "1");
  if (filters.sale) params.set("sale", "1");
  if (filters.colors.length) params.set("color", filters.colors.join(","));
  if (filters.sizes.length) params.set("size", filters.sizes.join(","));
  if (filters.price) params.set("price", filters.price);
  if (filters.inStock) params.set("instock", "1");
  if (filters.sort !== "rec") params.set("sort", filters.sort);
  if (filters.page > 1) params.set("page", String(filters.page));
  return params;
};

const newFirst = (a: Product, b: Product) =>
  Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)) || a.rank - b.rank;

const sorters: Record<string, (a: Product, b: Product) => number> = {
  rec: newFirst,
  new: newFirst,
  rank: (a, b) => a.rank - b.rank,
  asc: (a, b) => priceOf(a) - priceOf(b),
  desc: (a, b) => priceOf(b) - priceOf(a),
};

export const applyFilters = (filters: Filters, stock: StockOverrides) => {
  let found = products.filter(
    (product) =>
      (!filters.cat || product.category === filters.cat) &&
      (!filters.isNew || product.isNew) &&
      (!filters.sale || product.sale) &&
      (!filters.colors.length || product.variants.some((v) => filters.colors.includes(v.color))) &&
      (!filters.sizes.length || product.sizes.some((size) => filters.sizes.includes(size))) &&
      (!filters.inStock || productStock(stock, product) > 0),
  );
  if (filters.q) {
    const keyword = filters.q.toLowerCase();
    found = found.filter((product) =>
      [
        product.name,
        product.description,
        product.material,
        categoryName(product.category),
        product.variants.map((v) => v.color).join(),
      ]
        .join("")
        .toLowerCase()
        .includes(keyword),
    );
  }
  if (filters.price) {
    const [low, high] = filters.price.split("-").map(Number);
    found = found.filter(
      (product) => priceOf(product) >= low && (!high || priceOf(product) < high),
    );
  }
  return [...found].sort(sorters[filters.sort] ?? (() => 0));
};
