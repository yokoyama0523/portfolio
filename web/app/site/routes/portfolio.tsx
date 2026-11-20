import { useState } from "react";
import { flushSync } from "react-dom";
import { site } from "~/config";
import { absoluteUrl } from "~/shared/meta";
import { ContactBand } from "~/site/components/ContactBand";
import { Lines } from "~/site/components/Lines";
import { PageTitle } from "~/site/components/PageTitle";
import { ResponsiveImg } from "~/site/components/ResponsiveImg";
import { cases } from "~/site/data/cases";
import { worksLead } from "~/site/data/copy";
import { portfolioCopy as text } from "~/site/data/portfolio";
import { ScrollTrigger } from "~/site/hooks/useMotion";
import { breadcrumb, ids, pageMeta } from "~/site/seo";

const STAGGER_MS = 60;
const STAGGER_LIMIT = 8;

export const meta = () =>
  pageMeta({
    title: `${site.brand}｜${text.title.en}`,
    description: worksLead.join(""),
    path: site.paths.works,
    graph: [
      {
        "@type": "CollectionPage",
        "@id": absoluteUrl(`${site.paths.works}#page`),
        url: absoluteUrl(site.paths.works),
        name: text.title.jp,
        isPartOf: { "@id": ids.website },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: cases.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: absoluteUrl(c.path),
            name: text.caseName(c.name, c.industry),
          })),
        },
      },
      breadcrumb(text.crumbs),
    ],
  });

const categories = [...new Set(cases.map((c) => c.category))];
const sizes = "(min-width: 1280px) 400px, (min-width: 640px) 45vw, calc(100vw - 40px)";
const caseNumber = (order: number) => String(order).padStart(2, "0");

export const links = () => [
  {
    rel: "preload",
    as: "image",
    href: cases[0].media.desktop.src,
    imageSrcSet: cases[0].media.desktop.srcSet,
    imageSizes: sizes,
    fetchPriority: "high",
  },
];

export default function Portfolio() {
  const [category, setCategory] = useState<string | null>(null);
  const [filtered, setFiltered] = useState(false);
  const choose = (k: string | null) => {
    flushSync(() => {
      setFiltered(true);
      setCategory(k);
    });
    ScrollTrigger.refresh();
  };
  const shown = category ? cases.filter((c) => c.category === category) : cases;

  return (
    <>
      <main className="px-5 pt-32 pb-32 md:px-12 md:pt-40 md:pb-44">
        <div className="mx-auto max-w-content">
          <PageTitle {...text.title} crumbs={text.crumbs}>
            <p className="mt-10 text-base leading-airy tracking-8">
              <Lines lines={worksLead} />
            </p>
          </PageTitle>

          <div className="mt-20 grid gap-12 md:mt-28 lg:grid-cols-filter lg:gap-16">
            <aside
              aria-label={text.filterLabel}
              className="lg:sticky lg:top-32 lg:col-start-2 lg:row-start-1 lg:self-start"
            >
              <p className="border-b border-charcoal pb-3 text-sm font-bold tracking-8 text-ink">
                {text.filterTitle}
              </p>
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
                        className={`group flex items-center gap-3 rounded-full border px-4 py-2 text-sm tracking-6 transition-colors lg:w-full lg:justify-between lg:rounded-none lg:border-x-0 lg:border-t-0 lg:border-b-line lg:px-0 lg:py-4 ${
                          on
                            ? "border-charcoal bg-charcoal text-white lg:bg-transparent lg:font-bold lg:text-ink"
                            : "border-line text-text hover:text-ink"
                        }`}
                      >
                        <span>{k ?? text.all}</span>
                        <span className="flex items-center gap-3">
                          <span
                            className={`font-latin text-xs ${on ? "text-white/70 lg:text-mute" : "text-mute"}`}
                          >
                            {n}
                          </span>
                          <svg
                            viewBox="0 0 24 24"
                            className="hidden size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 lg:block"
                            aria-hidden="true"
                          >
                            <path
                              d="m9 5 7 7-7 7"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.6"
                            />
                          </svg>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </aside>

            <ul className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:col-start-1 lg:row-start-1 xl:grid-cols-3">
              {shown.map((c, i) => (
                <li
                  key={`${category ?? "all"}-${c.id}`}
                  data-reveal
                  className={filtered ? "animate-fade-up motion-reduce:animate-none" : undefined}
                  style={
                    filtered
                      ? { animationDelay: `${Math.min(i, STAGGER_LIMIT) * STAGGER_MS}ms` }
                      : undefined
                  }
                >
                  <a href={c.path} className="group block">
                    <span data-curtain className="block aspect-shot overflow-hidden bg-mist">
                      <ResponsiveImg
                        image={c.media.desktop}
                        sizes={sizes}
                        alt={text.shotAlt(c.name, c.industry)}
                        loading={i === 0 ? "eager" : "lazy"}
                        fetchPriority={i === 0 ? "high" : "auto"}
                        className="size-full object-cover object-top transition-transform duration-700 ease-out-soft group-hover:scale-104"
                      />
                    </span>
                    <span className="mt-5 flex items-baseline gap-3 font-latin text-xs tracking-8 text-mute">
                      <span>{caseNumber(c.order)}</span>
                      <span>{c.industry_en}</span>
                    </span>
                    <span className="mt-2 block text-xl font-bold leading-snug tracking-4 text-ink decoration-1 underline-offset-4 group-hover:underline">
                      {c.name}
                    </span>
                    <span className="mt-3 block text-sm leading-body tracking-4">{c.summary}</span>
                  </a>
                  <p className="mt-4 text-xs font-medium tracking-6 text-ink">{c.industry}</p>
                  <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-2xs leading-tag tracking-4 text-mute">
                    <button
                      type="button"
                      onClick={() => choose(c.category)}
                      className="underline underline-offset-2 transition-colors hover:text-ink"
                    >
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
    </>
  );
}
