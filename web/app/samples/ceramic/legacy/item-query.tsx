import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { sampleMeta } from "~/samples/shared/meta";
import { itemPage } from "../content/item";
import { isItemId, itemIds, items, store } from "../content/store";

export const meta = () => sampleMeta("ceramic", { ...itemPage.legacy, noindex: true });

export default function CeramicItemIndex() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const asked = params.get("id") ?? "";

  useEffect(() => {
    if (isItemId(asked)) navigate(store.paths.item(asked), { replace: true });
  }, [asked, navigate]);

  return (
    <main className="legacy">
      <h1>{itemPage.legacy.lead}</h1>
      <ul>
        {itemIds.map((id) => (
          <li key={id}>
            <Link to={store.paths.item(id)}>{items[id].name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
