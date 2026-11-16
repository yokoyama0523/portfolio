import { site } from "~/config";
import { absoluteUrl } from "~/shared/meta";
import { CtaPanels } from "~/site/components/CtaPanels";
import { Lines } from "~/site/components/Lines";
import { PageTitle } from "~/site/components/PageTitle";
import { Process } from "~/site/components/Process";
import { ResponsiveImg } from "~/site/components/ResponsiveImg";
import { about } from "~/site/data/copy";
import { processSteps, stepNumber } from "~/site/data/process";
import { servicePageCopy as text } from "~/site/data/servicePage";
import { services } from "~/site/data/services";
import { breadcrumb, ids, pageMeta } from "~/site/seo";

export const meta = () =>
  pageMeta({
    title: `${site.brand}｜${text.title.en}`,
    description: services.map((s) => s.text.join("")).join(""),
    path: site.paths.service,
    graph: [
      ...services.map((s) => ({
        "@type": "Service",
        "@id": absoluteUrl(s.href),
        name: s.jp,
        description: s.text.join(""),
        serviceType: s.items,
        provider: { "@id": ids.person },
        areaServed: site.country,
      })),
      breadcrumb(text.crumbs),
    ],
  });

export default function Service() {
  return (
    <main>
      <section className="px-5 pt-32 pb-24 md:px-12 md:pt-40 md:pb-36">
        <div className="mx-auto max-w-content">
          <PageTitle {...text.title} crumbs={text.crumbs}>
            <p className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-2 font-latin text-display-lead tracking-2 text-ink">
              <span className="h-px w-8 bg-charcoal" aria-hidden="true" />
              {services.map((s, i) => (
                <span key={s.id} className="flex items-center gap-4">
                  {i > 0 && (
                    <span className="size-1.5 rounded-full bg-charcoal" aria-hidden="true" />
                  )}
                  {s.en}
                </span>
              ))}
            </p>
            <p className="mt-8 text-base leading-airy tracking-8">
              <Lines lines={about} always={[1]} />
            </p>
          </PageTitle>

          <figure className="mt-20 md:mt-28" data-reveal>
            <div className="grid gap-4 md:grid-cols-2">
              {services.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="group block border border-charcoal p-6 transition-colors duration-300 hover:bg-charcoal hover:text-white md:p-8"
                >
                  <span className="flex items-baseline justify-between gap-4">
                    <span className="font-latin text-2xl font-light -tracking-1">{s.en}</span>
                    <span className="text-xs font-medium tracking-10 opacity-70">{s.jp}</span>
                  </span>
                  <span className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {s.items.map((item) => (
                      <span
                        key={item}
                        className="border border-current/30 px-3 py-2 text-center text-xs tracking-4 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </span>
                </a>
              ))}
            </div>
            <ol className="mt-4 grid grid-cols-2 gap-2 bg-charcoal p-4 text-white sm:grid-cols-5 md:p-5">
              {processSteps.map((step, i) => (
                <li
                  key={step.title}
                  className="flex items-center justify-center gap-2 text-xs tracking-8"
                >
                  <span className="font-latin text-white/60">{stepNumber(i)}</span>
                  {step.title}
                </li>
              ))}
            </ol>
          </figure>
        </div>
      </section>

      {services.map((s) => (
        <section
          key={s.id}
          id={s.id}
          aria-labelledby={`${s.id}-title`}
          className="scroll-mt-24 border-t border-line px-5 py-24 md:px-12 md:py-36"
        >
          <div className="mx-auto max-w-content">
            <h2 id={`${s.id}-title`} data-reveal>
              <span className="block font-latin text-display-service font-light leading-none -tracking-2 text-ink">
                {s.en}
              </span>
              <span className="mt-5 block text-md font-medium tracking-12 text-mute">{s.jp}</span>
            </h2>
            <div className="mt-14 grid gap-14 md:mt-20 md:grid-cols-feature md:gap-20">
              <div data-reveal>
                <div className="relative aspect-screen overflow-hidden bg-mist">
                  <ResponsiveImg
                    image={s.image.media.thumb}
                    sizes="(min-width: 768px) 55vw, 100vw"
                    className="absolute inset-0 size-full object-cover"
                  />
                </div>
                <p className="mt-10 text-base leading-airy tracking-8">
                  <Lines lines={s.text} />
                </p>
              </div>
              <dl className="self-start border-t border-charcoal text-sm tracking-6" data-reveal>
                <div className="grid grid-cols-term gap-4 border-b border-line py-6">
                  <dt className="font-bold text-ink">{text.terms.items}</dt>
                  <dd>
                    <ul className="flex flex-wrap gap-2">
                      {s.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-line px-3 py-1 text-xs"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div className="grid grid-cols-term gap-4 border-b border-line py-6">
                  <dt className="font-bold text-ink">{text.terms.works}</dt>
                  <dd>
                    <ul className="grid gap-3">
                      {s.works.map((c) => (
                        <li key={c.id}>
                          <a href={c.path} className="group flex items-center gap-4">
                            <ResponsiveImg
                              image={c.media.thumb}
                              sizes="64px"
                              className="aspect-screen w-16 shrink-0 object-cover"
                            />
                            <span className="flex flex-col">
                              <span className="font-medium text-ink decoration-1 underline-offset-4 group-hover:underline">
                                {c.name}
                              </span>
                              <span className="text-2xs text-mute">{c.industry}</span>
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
  );
}
