import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { sampleMeta } from "~/samples/shared/meta";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { products } from "../content/catalog";
import { itemPage } from "../content/item";
import { paths } from "../content/paths";
import { productById } from "../store/pricing";

export const meta = () => sampleMeta("ec", { ...itemPage.legacy, noindex: true });

export default function EcItemIndex() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const id = params.get("id") ?? "";
  const color = params.get("c") ?? undefined;

  useEffect(() => {
    if (productById[id]) navigate(paths.item(id, color), { replace: true });
  }, [id, color, navigate]);

  return (
    <>
      <Header />
      <main className="wrap legacy">
        <h1 className="ttl">{itemPage.legacy.lead}</h1>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <Link to={paths.item(product.id)}>{product.name}</Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
