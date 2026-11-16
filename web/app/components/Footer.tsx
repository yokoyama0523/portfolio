import { cases, caseUrl } from "~/data/cases";
import { site } from "~/site";
import { Logo } from "./Logo";

const linkClass = "w-fit bg-[linear-gradient(currentColor,currentColor)] bg-[length:0_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 ease-out-soft hover:bg-[length:100%_1px]";

export function Footer() {
  return (
    <footer className="px-5 pt-24 md:px-12 md:pt-32">
      <div className="mx-auto grid max-w-[1280px] gap-12 text-[13px] tracking-[0.06em] md:grid-cols-[2fr_1fr_1fr_1fr_2fr]">
        <div>
          <a href="/portfolio/" className={`font-latin text-[14px] tracking-[0.06em] text-ink ${linkClass}`}>
            Works
          </a>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2">
            {cases.map((c) => (
              <li key={c.id}>
                <a href={caseUrl(c)} className={linkClass}>
                  {c.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <a href="/service/" className={`font-latin text-[14px] tracking-[0.06em] text-ink ${linkClass}`}>
            Service
          </a>
          <ul className="mt-5 grid gap-2">
            <li><a href="/service/" className={linkClass}>サービス</a></li>
            <li><a href="/service/#process" className={linkClass}>制作の流れ</a></li>
          </ul>
        </div>
        <div>
          <a href="/about/" className={`font-latin text-[14px] tracking-[0.06em] text-ink ${linkClass}`}>
            About
          </a>
          <ul className="mt-5 grid gap-2">
            <li><a href="/about/" className={linkClass}>運営者情報</a></li>
          </ul>
        </div>
        <div>
          <p className="font-latin text-[14px] tracking-[0.06em] text-ink">Contact</p>
          <ul className="mt-5 grid gap-2">
            <li><a href={site.crowdworks} target="_blank" rel="noopener" className={linkClass}>クラウドワークス</a></li>
          </ul>
        </div>
        <div className="text-[12px] leading-[2] text-mute">
          <p>掲載事例の企業・店舗・人物はすべて架空のものです。写真はフリー素材（ぱくたそ・Unsplash・Pexels・Pixabay）を使用しており、人物はモデルです。</p>
          <p className="mt-2">当サイトでは、アクセス解析のために Google アナリティクスを使用しています。</p>
        </div>
      </div>
      <div className="mx-auto mt-20 flex max-w-[1280px] items-center justify-between border-t border-line py-8">
        <a href="/" aria-label="Saku² トップ">
          <Logo />
        </a>
        <p className="font-latin text-[12px] tracking-[0.06em] text-mute">© 2026 {site.name}</p>
      </div>
    </footer>
  );
}
