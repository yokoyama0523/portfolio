import { Link } from "react-router";
import { Img } from "~/samples/shared/Img";
import { sampleMeta } from "~/samples/shared/meta";
import { CartDrawer } from "../components/CartDrawer";
import { Gallery } from "../components/item/Gallery";
import { Header } from "../components/item/Header";
import { Purchase } from "../components/item/Purchase";
import { home } from "../content/home";
import { itemPage } from "../content/item";
import { FEW_STOCK, isItemId, itemIds, items, store, yen } from "../content/store";
import "../styles/item.css";
import type { Route } from "./+types/item";

export const meta = ({ params }: Route.MetaArgs) =>
  isItemId(params.id)
    ? sampleMeta("ceramic", {
        title: itemPage.title(items[params.id].name),
        slug: `item/${params.id}/`,
      })
    : [{ title: itemPage.notFound.title }, { name: "robots", content: "noindex" }];

function NotFound() {
  return (
    <main className="legacy">
      <h1>{itemPage.notFound.text}</h1>
      <Link to={store.paths.pieces}>{itemPage.notFound.back}</Link>
    </main>
  );
}

export default function CeramicItem({ params }: Route.ComponentProps) {
  const { id } = params;
  if (!isItemId(id)) return <NotFound />;
  const item = items[id];
  const related = itemIds.filter((other) => other !== id).slice(0, itemPage.relatedCount);
  return (
    <>
      <Header />
      <nav className="crumb" aria-label={itemPage.crumbLabel}>
        <Link to={store.paths.home}>{store.name}</Link>
        {itemPage.crumbSeparator}
        <Link to={store.paths.pieces}>{itemPage.piecesLabel}</Link>
        {itemPage.crumbSeparator}
        <span aria-current="page">{item.name}</span>
      </nav>
      <main>
        <section className="item">
          <Gallery key={id} images={[item.image, ...itemPage.extraImages]} alt={item.name} />
          <div className="info">
            <div className="col">
              <div className="kan">{item.no}</div>
              <h1 className="v">
                {item.name}
                <small className="latin">{item.en}</small>
              </h1>
            </div>
            <div className="txt">
              <div className="price">
                {item.price.toLocaleString("ja-JP")}
                <small className="tax">{itemPage.taxIncluded}</small>
              </div>
              <div className={item.stock <= FEW_STOCK ? "stock few" : "stock"}>
                {itemPage.stock(item.stock)}
              </div>
              <Purchase key={id} id={id} />
              <p>{item.long}</p>
              <dl>
                <dt>{itemPage.terms.maker}</dt>
                <dd>{item.maker}</dd>
                <dt>{itemPage.terms.size}</dt>
                <dd>{item.size}</dd>
                <dt>{itemPage.terms.weight}</dt>
                <dd>{item.weight}</dd>
                <dt>{itemPage.terms.delivery}</dt>
                <dd>{itemPage.delivery}</dd>
              </dl>
              <p className="care">
                {itemPage.carePrefix}
                {item.care}
              </p>
            </div>
          </div>
        </section>
        <section className="rel">
          <h2>{itemPage.related}</h2>
          <div className="grid">
            {related.map((other) => (
              <Link key={other} to={store.paths.item(other)}>
                <div className="im">
                  <Img image={items[other].image} />
                </div>
                <b className="rname">{items[other].name}</b>
                <small className="rprice">{yen(items[other].price)}</small>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <footer className="ft">
        <div className="logo">{store.name}</div>
        <div>{home.footer.copy}</div>
      </footer>
      <CartDrawer />
    </>
  );
}
