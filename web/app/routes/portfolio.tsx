import { useEffect, useState } from "react";
import { ContactBand } from "~/components/ContactBand";
import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";
import { Lines } from "~/components/Lines";
import { MotionRoot } from "~/components/MotionRoot";
import { PageTitle } from "~/components/PageTitle";
import { caseAsset, caseSmall, cases, caseUrl } from "~/data/cases";
import { worksLead } from "~/data/copy";
import { ScrollTrigger } from "~/hooks/useMotion";
import { breadcrumb, ids, pageMeta } from "~/seo";
import { site } from "~/site";

const crumbs: [string, string][] = [
  ["トップ", "/"],
  ["制作事例", "/portfolio/"],
];

export const meta = () =>
  pageMeta({
    title: `${site.brand}｜Works`,
    description: worksLead.join(""),
    path: "/portfolio/",
    graph: [
      {
        "@type": "CollectionPage",
        "@id": `${site.url}/portfolio/#page`,
        url: `${site.url}/portfolio/`,
        name: "制作事例",
        isPartOf: { "@id": ids.website },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: cases.map((c, i) => ({ "@type": "ListItem", position: i + 1, url: `${site.url}${caseUrl(c)}`, name: `${c.name}（${c.industry}）` })),
        },
      },
      breadcrumb(crumbs),
    ],
  });

const categories = [...new Set(cases.map((c) => c.category))];
const sizes = "(min-width: 1280px) 400px, (min-width: 640px) 45vw, calc(100vw - 40px)";

export const links = () => [
  {
    rel: "preload",
    as: "image",
    href: caseAsset(cases[0], "desktop"),
    imageSrcSet: `${caseSmall(cases[0], "desktop")} 720w, ${caseAsset(cases[0], "desktop")} 1200w`,
    imageSizes: sizes,
    fetchPriority: "high",
  },
];

export default function Portfolio() {
  const [category, setCategory] = useState<string | null>(null);
  const [filtered, setFiltered] = useState(false);
  const choose = (k: string | null) => {
    setFiltered(true);
    setCategory(k);
  };
  const shown = category ? cases.filter((c) => c.category === category) : cases;

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [category]);

  return (
    <>
      <MotionRoot />
      <Header />
      <main className="px-5 pb-32 pt-32 md:px-12 md:pb-44 md:pt-40">
        <div className="mx-auto max-w-[1280px]">
          <PageTitle en="Works" jp="制作事例" crumbs={crumbs}>
            <p className="mt-10 text-[15px] leading-[2.2] tracking-[0.08em]">
              <Lines lines={worksLead} />
            </p>
          </PageTitle>

          <div className="mt-20 grid gap-12 md:mt-28 lg:grid-cols-[1fr_240px] lg:gap-16">
            <aside aria-label="カテゴリで絞り込む" className="lg:sticky lg:top-32 lg:col-start-2 lg:row-start-1 lg:self-start">
              <p className="border-b border-[#333] pb-3 text-[13px] font-bold tracking-[0.08em] text-ink">カテゴリ</p>
              <ul className="flex flex-wrap gap-2 pt-4 lg:block lg:pt-0">
                {[null, ...categories].map((k) => {
                  const n = k ? cases.filter((c) => c.category === k).length : cases.length;
                  const on = category === k;
                  return (
                    <li key={k ?? "all"}>
                      <button
                        type="button"
                        aria-pressed={on}
                        onClick={() => choose(k)}
                        className={`group flex items-center gap-3 rounded-full border px-4 py-2 text-[13px] tracking-[0.06em] transition-colors lg:w-full lg:justify-between lg:rounded-none lg:border-x-0 lg:border-t-0 lg:border-b-line lg:px-0 lg:py-4 ${
                          on ? "border-[#333] bg-[#333] text-white lg:bg-transparent lg:font-bold lg:text-ink" : "border-line text-text hover:text-ink"
                        }`}
                      >
                        <span>{k ?? "すべて"}</span>
                        <span className="flex items-center gap-3">
                          <span className={`font-latin text-[12px] ${on ? "text-white/70 lg:text-mute" : "text-mute"}`}>{n}</span>
                          <svg viewBox="0 0 24 24" className="hidden size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 lg:block" aria-hidden>
                            <path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.6" />
                          </svg>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </aside>

            <ul className="grid gap-x-8 gap-y-16 sm:grid-cols-2 xl:grid-cols-3 lg:col-start-1 lg:row-start-1">
              {shown.map((c, i) => (
                <li
                  key={`${category ?? "all"}-${c.id}`}
                  className={filtered ? "animate-fade-up motion-reduce:animate-none" : undefined}
                  style={filtered ? { animationDelay: `${Math.min(i, 8) * 60}ms` } : undefined}
                >
                  <a href={caseUrl(c)} className="group block">
                    <span className="block aspect-[4/3] overflow-hidden bg-mist">
                      <img
                        src={caseAsset(c, "desktop")}
                        srcSet={`${caseSmall(c, "desktop")} 720w, ${caseAsset(c, "desktop")} 1200w`}
                        sizes={sizes}
                        alt={`${c.name}（${c.industry}）のトップページ`}
                        width={1200}
                        height={900}
                        loading={i === 0 ? "eager" : "lazy"}
                        fetchPriority={i === 0 ? "high" : "auto"}
                        decoding="async"
                        className="size-full object-cover object-top transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
                      />
                    </span>
                    <span className="mt-5 flex items-baseline gap-3 font-latin text-[12px] tracking-[0.08em] text-mute">
                      <span>{String(c.order).padStart(2, "0")}</span>
                      <span>{c.industry_en}</span>
                    </span>
                    <span className="mt-2 block text-[17px] font-bold leading-[1.6] tracking-[0.04em] text-ink decoration-1 underline-offset-4 group-hover:underline">
                      {c.name}
                    </span>
                    <span className="mt-3 block text-[13px] leading-[1.9] tracking-[0.04em]">{c.summary}</span>
                  </a>
                  <p className="mt-4 text-[12px] font-medium tracking-[0.06em] text-ink">{c.industry}</p>
                  <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] leading-[1.8] tracking-[0.04em] text-mute">
                    <button type="button" onClick={() => choose(c.category)} className="underline underline-offset-2 transition-colors hover:text-ink">
                      {c.category}
                    </button>
                    {c.tech.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <ContactBand />
      <Footer />
    </>
  );
}
