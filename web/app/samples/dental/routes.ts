import { index, layout, prefix, route } from "@react-router/dev/routes";
import { dentalBase } from "./routing";

export default prefix(dentalBase, [
  layout("samples/dental/layout.tsx", [
    index("samples/dental/pages/home.tsx"),
    route("treatment", "samples/dental/pages/treatment.tsx"),
    route("news", "samples/dental/pages/news.tsx"),
    route("news/:id", "samples/dental/pages/news-post.tsx"),
    route("reserve", "samples/dental/pages/reserve.tsx"),
    route("admin", "samples/dental/pages/admin.tsx"),
  ]),
]);
