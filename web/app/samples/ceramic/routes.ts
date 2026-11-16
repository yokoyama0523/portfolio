import { index, layout, prefix, route } from "@react-router/dev/routes";
import { ceramicBase } from "./content/items";

export default prefix(ceramicBase, [
  layout("samples/ceramic/layout.tsx", [
    index("samples/ceramic/pages/home.tsx"),
    route("item", "samples/ceramic/legacy/item-query.tsx"),
    route("item/:id", "samples/ceramic/pages/item.tsx"),
    route("checkout", "samples/ceramic/pages/checkout.tsx"),
  ]),
]);
