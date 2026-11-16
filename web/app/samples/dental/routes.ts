import { index, layout, prefix, route } from "@react-router/dev/routes";

export default prefix("portfolio/dental", [
  layout("samples/dental/layout.tsx", [
    index("samples/dental/pages/home.tsx"),
    route("treatment", "samples/dental/pages/treatment.tsx"),
    route("news", "samples/dental/pages/news.tsx"),
    route("reserve", "samples/dental/pages/reserve.tsx"),
  ]),
]);
