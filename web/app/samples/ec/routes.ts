import { index, layout, prefix, route } from "@react-router/dev/routes";
import { ecBase } from "./routing";

export default prefix(ecBase, [
  layout("samples/ec/layout.tsx", [
    index("samples/ec/pages/home.tsx"),
    route("list", "samples/ec/pages/list.tsx"),
    route("item", "samples/ec/legacy/item-query.tsx"),
    route("item/:id", "samples/ec/pages/item.tsx"),
    route("cart", "samples/ec/pages/cart.tsx"),
    route("checkout", "samples/ec/pages/checkout.tsx"),
    route("account", "samples/ec/pages/account.tsx"),
    route("guide", "samples/ec/pages/guide.tsx"),
    route("admin", "samples/ec/pages/admin.tsx"),
  ]),
]);
