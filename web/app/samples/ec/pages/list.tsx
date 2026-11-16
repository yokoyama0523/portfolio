import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { Lines } from "~/samples/shared/Lines";
import { sampleMeta } from "~/samples/shared/meta";
import { Breadcrumb } from "../components/Breadcrumb";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { ProductCard } from "../components/ProductCard";
import { categories, shop, swatchOf } from "../content/catalog";
import { listPage as text } from "../content/list";
import { paths } from "../content/paths";
import {
  allColors,
  allSizes,
  applyFilters,
  categoryName,
  type Filters,
  PER_PAGE,
  readFilters,
  writeFilters,
} from "../store/filter";
import { useShop } from "../store/ShopContext";
import "../styles/list.css";
import { useHydrated } from "~/samples/shared/useHydrated";
import type { Route } from "./+types/list";

const titleOf = (filters: Filters) =>
  filters.q
    ? text.titles.search(filters.q)
    : filters.isNew
      ? text.titles.isNew
      : filters.sale
        ? text.titles.sale
        : filters.cat
          ? categoryName(filters.cat)
          : text.titles.all;

export const meta = ({ location }: Route.MetaArgs) => {
  const filters = readFilters(new URLSearchParams(location.search));
  const filtered = Boolean(filters.q || filters.isNew || filters.sale || filters.cat);
  return sampleMeta(
    "ec",
    filtered ? { ...text.meta, title: `${titleOf(filters)}｜${shop.name}` } : text.meta,
  );
};

const toggle = (list: string[], value: string) =>
  list.includes(value) ? list.filter((item) => item !== value) : [...list, value];

const noParams = new URLSearchParams();

export default function EcList() {
  const [searchParams, setParams] = useSearchParams();
  const params = useHydrated() ? searchParams : noParams;
  const applied = readFilters(params);
  const [draft, setDraft] = useState(applied);
  const [open, setOpen] = useState(false);
  const { stockOverrides } = useShop();
  const paramKey = params.toString();

  useEffect(() => {
    setDraft(readFilters(new URLSearchParams(paramKey)));
  }, [paramKey]);

  const go = (next: Filters) => {
    setParams(writeFilters(next));
    setOpen(false);
  };
  const change = (patch: Partial<Filters>) => {
    const next = { ...draft, ...patch, page: 1 };
    setDraft(next);
    if (window.matchMedia(text.desktopQuery).matches) go(next);
  };

  const title = titleOf(applied);
  const found = applyFilters(applied, stockOverrides);
  const pages = Math.max(1, Math.ceil(found.length / PER_PAGE));
  const page = Math.min(applied.page, pages);
  const shown = found.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const lead = applied.sale ? text.leads.sale : applied.isNew ? text.leads.isNew : "";
  const chips = [
    ...applied.colors.map((color) => ({
      label: color,
      patch: { colors: applied.colors.filter((c) => c !== color) },
    })),
    ...applied.sizes.map((size) => ({
      label: text.chips.size(size),
      patch: { sizes: applied.sizes.filter((s) => s !== size) },
    })),
    ...(applied.price
      ? [
          {
            label: text.prices.find((p) => p.value === applied.price)?.label ?? "",
            patch: { price: "" },
          },
        ]
      : []),
    ...(applied.inStock ? [{ label: text.chips.inStock, patch: { inStock: false } }] : []),
    ...(applied.q ? [{ label: text.chips.search(applied.q), patch: { q: "" } }] : []),
  ];

  return (
    <>
      <Header />
      <main className={open ? "wrap filter-open" : "wrap"}>
        <Breadcrumb items={[{ label: title }]} />
        <h1 className="ttl">{title}</h1>
        <p className="note">{lead}</p>
        <div className="lay">
          <aside className="side" aria-label={text.filterLabel}>
            <button type="button" className="close" onClick={() => setOpen(false)}>
              {text.close}
            </button>
            <h3>{text.headings.category}</h3>
            <div>
              {[{ id: "", name: text.allCategories }, ...categories].map((category) => (
                <label key={category.id}>
                  <input
                    type="radio"
                    name="cat"
                    value={category.id}
                    checked={draft.cat === category.id}
                    onChange={() => change({ cat: category.id })}
                  />
                  {category.name}
                </label>
              ))}
            </div>
            <h3>{text.headings.color}</h3>
            <div>
              {allColors.map((color) => (
                <label key={color}>
                  <input
                    type="checkbox"
                    name="color"
                    value={color}
                    checked={draft.colors.includes(color)}
                    onChange={() => change({ colors: toggle(draft.colors, color) })}
                  />
                  <i className="sw" style={{ background: swatchOf(color) }} />
                  {color}
                </label>
              ))}
            </div>
            <h3>{text.headings.size}</h3>
            <div className="sizes">
              {allSizes.map((size) => (
                <label key={size}>
                  <input
                    type="checkbox"
                    name="size"
                    value={size}
                    checked={draft.sizes.includes(size)}
                    onChange={() => change({ sizes: toggle(draft.sizes, size) })}
                  />
                  {size}
                </label>
              ))}
            </div>
            <h3>{text.headings.price}</h3>
            <div>
              {text.prices.map((price) => (
                <label key={price.value}>
                  <input
                    type="radio"
                    name="price"
                    value={price.value}
                    checked={draft.price === price.value}
                    onChange={() => change({ price: price.value })}
                  />
                  {price.label}
                </label>
              ))}
            </div>
            <h3>{text.headings.stock}</h3>
            <label>
              <input
                type="checkbox"
                checked={draft.inStock}
                onChange={() => change({ inStock: !draft.inStock })}
              />
              {text.inStock}
            </label>
            <Link className="clear" to={paths.list()}>
              {text.clear}
            </Link>
            <button type="button" className="btn full apply" onClick={() => go(draft)}>
              {text.apply}
            </button>
          </aside>
          <div>
            <div className="bar">
              <div className="cnt">
                <b>{found.length}</b>
                {text.count}
              </div>
              <div className="chips">
                {chips.map((chip) => (
                  <button
                    key={chip.label}
                    type="button"
                    onClick={() => go({ ...applied, ...chip.patch, page: 1 })}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
              <div className="sorter">
                <button type="button" className="btn g sm fbtn" onClick={() => setOpen(true)}>
                  {text.open}
                </button>
                <select
                  aria-label={text.sortLabel}
                  value={applied.sort}
                  onChange={(event) => go({ ...applied, sort: event.target.value, page: 1 })}
                >
                  {text.sorts.map((sort) => (
                    <option key={sort.value} value={sort.value}>
                      {sort.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid">
              {shown.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {found.length === 0 && (
              <div className="empty">
                <Lines lines={text.empty} />
              </div>
            )}
            <nav className="pg" aria-label={text.pagesLabel}>
              {pages > 1 &&
                Array.from({ length: pages }, (_, i) => i + 1).map((n) =>
                  n === page ? (
                    <span key={n} aria-current="page">
                      {n}
                    </span>
                  ) : (
                    <Link key={n} to={`?${writeFilters({ ...applied, page: n })}`}>
                      {n}
                    </Link>
                  ),
                )}
            </nav>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
