import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { Img } from "~/samples/shared/Img";
import { sampleMeta } from "~/samples/shared/meta";
import { image } from "../assets";
import { Breadcrumb } from "../components/Breadcrumb";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { type Added, MiniCart } from "../components/item/MiniCart";
import { Purchase } from "../components/item/Purchase";
import { Reviews } from "../components/item/Reviews";
import { SizeGuide } from "../components/item/SizeGuide";
import { Measurements } from "../components/Measurements";
import { ProductCard } from "../components/ProductCard";
import { WishButton } from "../components/WishButton";
import { type Product, products } from "../content/catalog";
import { itemPage as text } from "../content/item";
import { paths } from "../content/paths";
import { categoryName } from "../store/filter";
import { productById, yen } from "../store/pricing";
import { useShop } from "../store/ShopContext";
import "../styles/item.css";
import { useHydrated } from "~/samples/shared/useHydrated";
import type { Route } from "./+types/item";

export const meta = ({ params }: Route.MetaArgs) => {
  const product = productById[params.id];
  return product
    ? sampleMeta("ec", { title: text.title(product.name), slug: `item/${product.id}/` })
    : sampleMeta("ec", { title: text.notFound.title, noindex: true });
};

function ItemView({ product }: { product: Product }) {
  const [params, setParams] = useSearchParams();
  const hydrated = useHydrated();
  const askedColor = hydrated ? params.get("c") : null;
  const initialColor = Math.max(
    0,
    product.variants.findIndex((variant) => variant.color === askedColor),
  );
  const [colorIndex, setColorIndex] = useState(initialColor);
  const [size, setSize] = useState<string | null>(
    product.sizes.length === 1 ? product.sizes[0] : null,
  );
  const [quantity, setQuantity] = useState(1);
  const [soldOutNotice, setSoldOutNotice] = useState(false);
  const [guide, setGuide] = useState(false);
  const [added, setAdded] = useState<Added | null>(null);
  const [miniOpen, setMiniOpen] = useState(false);
  const { loaded, cart, recent, viewed, wish } = useShop();
  const [recentIds, setRecentIds] = useState<string[]>([]);
  const recentAtOpen = useRef(recent);
  recentAtOpen.current = recent;

  useEffect(() => {
    if (!loaded) return;
    setRecentIds(recentAtOpen.current.filter((id) => id !== product.id));
    viewed(product.id);
  }, [loaded, product.id, viewed]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setGuide(false);
      setMiniOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const variant = product.variants[colorIndex];
  const related = products.filter(
    (other) => other.category === product.category && other.id !== product.id,
  );

  const chooseColor = (index: number) => {
    setColorIndex(index);
    setSize(product.sizes.length === 1 ? product.sizes[0] : null);
    setSoldOutNotice(false);
    setParams({ c: product.variants[index].color }, { replace: true, preventScrollReset: true });
  };
  const add = () => {
    if (!size) return;
    cart.add(product.id, variant.color, size, quantity);
    setAdded({ colorIndex, size, quantity });
    setMiniOpen(true);
  };

  return (
    <>
      <Header />
      <main className="wrap">
        <Breadcrumb
          items={[
            { label: categoryName(product.category), to: paths.list(`cat=${product.category}`) },
            { label: product.name },
          ]}
        />
        <div className="pd">
          <div className="gal">
            {variant.images.map((name, i) => (
              <figure key={name}>
                <Img
                  image={image(name)}
                  alt={text.imageAlt(product.name, variant.color, i + 1)}
                  priority={i === 0}
                />
              </figure>
            ))}
          </div>
          <div className="buy">
            <div className="cat">
              {categoryName(product.category)}
              {text.separator}
              {product.madeIn}
            </div>
            <h1>{product.name}</h1>
            <div className="pr">
              {product.sale ? (
                <>
                  <s>{yen(product.price)}</s>
                  <span className="sale">{yen(product.sale)}</span>
                </>
              ) : (
                yen(product.price)
              )}
              <small>税込</small>
            </div>
            <Purchase
              product={product}
              colorIndex={colorIndex}
              size={size}
              quantity={quantity}
              soldOutNotice={soldOutNotice}
              onColor={chooseColor}
              onSize={(option) => {
                setSize(option);
                setSoldOutNotice(false);
              }}
              onQuantity={setQuantity}
              onSoldOut={() => setSoldOutNotice(true)}
              onAdd={add}
              onGuide={() => setGuide(true)}
            />
            <WishButton id={product.id} className="wishb">
              <span>{wish.has(product.id) ? text.wishAdded : text.wishAdd}</span>
            </WishButton>
            <div className="ship">
              {text.shipping.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </div>
            <div className="acc">
              <details open>
                <summary>{text.sections.description}</summary>
                <div className="b">{product.description}</div>
              </details>
              <details>
                <summary>{text.sections.material}</summary>
                <div className="b">
                  {text
                    .materialLines(product.material, product.madeIn, product.care)
                    .map((line, i) => (
                      <span key={line}>
                        {i > 0 && <br />}
                        {line}
                      </span>
                    ))}
                </div>
              </details>
              <details>
                <summary>{text.sections.measurements}</summary>
                <div className="b">
                  <Measurements product={product} />
                </div>
              </details>
              <details>
                <summary>{text.sections.delivery}</summary>
                <div className="b">
                  {text.delivery[0]}
                  <br />
                  {text.delivery[1]}
                  <Link className="underline" to={text.deliveryLink.to}>
                    {text.deliveryLink.label}
                  </Link>
                </div>
              </details>
            </div>
          </div>
        </div>
        <Reviews product={product} />
        <section className="sec">
          <div className="h">
            <h2 className="small-title">{text.relatedTitle}</h2>
          </div>
          <div className="grid">
            {related.slice(0, text.relatedCount).map((other) => (
              <ProductCard key={other.id} product={other} />
            ))}
          </div>
        </section>
        {recentIds.length > 0 && (
          <section className="sec flush">
            <div className="h">
              <h2 className="small-title">{text.recentTitle}</h2>
            </div>
            <div className="grid">
              {recentIds.slice(0, text.recentCount).map((id) => (
                <ProductCard key={id} product={productById[id]} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
      <SizeGuide product={product} open={guide} onClose={() => setGuide(false)} />
      <MiniCart
        product={product}
        added={added}
        open={miniOpen}
        onClose={() => setMiniOpen(false)}
      />
    </>
  );
}

export default function EcItem({ params }: Route.ComponentProps) {
  const product = productById[params.id];
  if (!product) {
    return (
      <>
        <Header />
        <main className="wrap legacy">
          <h1 className="ttl">{text.notFound.text}</h1>
          <Link to={paths.list()}>{text.notFound.back}</Link>
        </main>
        <Footer />
      </>
    );
  }
  return <ItemView key={product.id} product={product} />;
}
