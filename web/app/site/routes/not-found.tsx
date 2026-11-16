import { Link } from "react-router";

export const meta = () => [
  { title: "ページが見つかりません" },
  { name: "robots", content: "noindex" },
];

export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center px-5 text-center">
      <div>
        <p className="font-latin text-[64px] font-light leading-none text-text">404</p>
        <p className="mt-6">ページが見つかりません。</p>
        <Link to="/" className="mt-10 inline-block underline underline-offset-4">
          トップへ戻る
        </Link>
      </div>
    </main>
  );
}
