import { Link } from "react-router";
import { site } from "~/config";
import { layoutCopy } from "~/site/data/layout";

const text = layoutCopy.notFound;

export const meta = () => [{ title: text.title }, { name: "robots", content: "noindex" }];

export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center px-5 text-center">
      <div>
        <p className="font-latin text-6xl font-light leading-none text-text">{text.code}</p>
        <p className="mt-6">{text.text}</p>
        <Link to={site.paths.home} className="mt-10 inline-block underline underline-offset-4">
          {text.back}
        </Link>
      </div>
    </main>
  );
}
