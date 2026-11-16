import { ProductCard } from "../components/ProductCard";
import { accountPage } from "../content/account";
import { productById } from "../store/pricing";
import { useShop } from "../store/ShopContext";

export function WishList() {
  const { wish } = useShop();
  const items = wish.ids.map((id) => productById[id]).filter(Boolean);
  if (items.length === 0) return <div className="empty">{accountPage.wish.empty}</div>;
  return (
    <div className="grid">
      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
