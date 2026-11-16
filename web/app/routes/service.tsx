import { CtaPanels } from "~/components/CtaPanels";
import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";
import { Lines } from "~/components/Lines";
import { MotionRoot } from "~/components/MotionRoot";
import { PageTitle } from "~/components/PageTitle";
import { Process, steps } from "~/components/Process";
import { caseAsset, caseSmall, caseUrl } from "~/data/cases";
import { about } from "~/data/copy";
import { services } from "~/data/services";
import { breadcrumb, ids, pageMeta } from "~/seo";
import { site } from "~/site";

const crumbs: [string, string][] = [
  ["トップ", "/"],
  ["サービス", "/service/"],
];

export const meta = () =>
  pageMeta({
    title: `${site.brand}｜Service`,
    description: services.map((s) => s.text.join("")).join(""),
    path: "/service/",
    graph: [
      ...services.map((s) => ({
        "@type": "Service",
        "@id": `${site.url}/service/#${s.id}`,
        name: s.jp,
        description: s.text.join(""),
        serviceType: s.items,
        provider: { "@id": ids.person },
        areaServed: "JP",
      })),
      breadcrumb(crumbs),
    ],
  });

export default function Service() {
  return (
    <>
      <MotionRoot />
      <Header />
      <main>
        <section className="px-5 pb-24 pt-32 md:px-12 md:pb-36 md:pt-40">
          <div className="mx-auto max-w-[1280px]">
            <PageTitle en="Service" jp="サービス" crumbs={crumbs}>
              <p className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-2 font-latin text-[clamp(18px,1.6vw,22px)] tracking-[0.02em] text-ink">
                <span className="h-px w-8 bg-[#333]" aria-hidden />
                {services.map((s, i) => (
                  <span key={s.id} className="flex items-center gap-4">
                    {i > 0 && <span className="size-1.5 rounded-full bg-[#333]" aria-hidden />}
                    {s.en}
                  </span>
                ))}
              </p>
              <p className="mt-8 text-[15px] leading-[2.2] tracking-[0.08em]">
                <Lines lines={about} always={[1]} />
              </p>
            </PageTitle>

            <figure className="mt-20 md:mt-28" data-reveal>
              <div className="grid gap-4 md:grid-cols-2">
                {services.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="group block border border-[#333] p-6 transition-colors duration-300 hover:bg-[#333] hover:text-white md:p-8"
                  >
                    <span className="flex items-baseline justify-between gap-4">
                      <span className="font-latin text-[22px] font-light tracking-[-0.01em]">{s.en}</span>
                      <span className="text-[12px] font-medium tracking-[0.1em] opacity-70">{s.jp}</span>
                    </span>
                    <span className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {s.items.map((item) => (
                        <span
                          key={item}
                          className="border border-current/30 px-3 py-2 text-center text-[12px] tracking-[0.04em] transition-colors"
                        >
                          {item}
                        </span>
                      ))}
                    </span>
                  </a>
                ))}
              </div>
              <ol className="mt-4 grid grid-cols-2 gap-2 bg-[#333] p-4 text-white sm:grid-cols-5 md:p-5">
                {steps.map(([title], i) => (
                  <li key={title} className="flex items-center justify-center gap-2 text-[12px] tracking-[0.08em]">
                    <span className="font-latin text-white/60">{String(i + 1).padStart(2, "0")}</span>
                    {title}
                  </li>
                ))}
              </ol>
            </figure>
          </div>
        </section>

        {services.map((s) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="scroll-mt-24 border-t border-line px-5 py-24 md:px-12 md:py-36">
            <div className="mx-auto max-w-[1280px]">
              <h2 id={`${s.id}-title`} data-reveal>
                <span className="block font-latin text-[clamp(44px,6vw,96px)] font-light leading-none tracking-[-0.02em] text-ink">{s.en}</span>
                <span className="mt-5 block text-[14px] font-medium tracking-[0.12em] text-mute">{s.jp}</span>
              </h2>
              <div className="mt-14 grid gap-14 md:mt-20 md:grid-cols-[6fr_5fr] md:gap-20">
                <div data-reveal>
                  <div className="relative aspect-[16/10] overflow-hidden bg-mist">
                    <img
                      src={caseAsset(s.image, "thumb")}
                      srcSet={`${caseSmall(s.image, "thumb")} 480w, ${caseAsset(s.image, "thumb")} 960w`}
                      sizes="(min-width: 768px) 55vw, 100vw"
                      alt=""
                      width={960}
                      height={600}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 size-full object-cover"
                    />
                  </div>
                  <p className="mt-10 text-[15px] leading-[2.2] tracking-[0.08em]">
                    <Lines lines={s.text} />
                  </p>
                </div>
                <dl className="self-start border-t border-[#333] text-[13px] tracking-[0.06em]" data-reveal>
                  <div className="grid grid-cols-[96px_1fr] gap-4 border-b border-line py-6">
                    <dt className="font-bold text-ink">対応内容</dt>
                    <dd>
                      <ul className="flex flex-wrap gap-2">
                        {s.items.map((item) => (
                          <li key={item} className="rounded-full border border-line px-3 py-1 text-[12px]">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  <div className="grid grid-cols-[96px_1fr] gap-4 border-b border-line py-6">
                    <dt className="font-bold text-ink">制作事例</dt>
                    <dd>
                      <ul className="grid gap-3">
                        {s.works.map((c) => (
                          <li key={c.id}>
                            <a href={caseUrl(c)} className="group flex items-center gap-4">
                              <img
                                src={caseSmall(c, "thumb")}
                                alt=""
                                width={96}
                                height={60}
                                loading="lazy"
                                decoding="async"
                                className="aspect-[16/10] w-16 shrink-0 object-cover"
                              />
                              <span className="flex flex-col">
                                <span className="font-medium text-ink decoration-1 underline-offset-4 group-hover:underline">{c.name}</span>
                                <span className="text-[11px] text-mute">{c.industry}</span>
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>
        ))}

        <Process />
        <CtaPanels />
      </main>
      <Footer />
    </>
  );
}
