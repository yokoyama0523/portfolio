import { type CSSProperties, type ReactNode, useEffect, useState } from "react";
import { Link } from "react-router";
import { site } from "~/config";
import { Breadcrumb } from "~/site/components/Breadcrumb";
import { CtaPanels } from "~/site/components/CtaPanels";
import { Lines } from "~/site/components/Lines";
import { PillButton } from "~/site/components/PillButton";
import { cases } from "~/site/data/cases";
import { about } from "~/site/data/copy";
import { services } from "~/site/data/services";
import { breadcrumb, ids, pageMeta } from "~/site/seo";

const crumbs: [string, string][] = [
  ["トップ", "/"],
  ["運営者情報", "/about/"],
];

const address = {
  postalCode: "531-0071",
  region: "大阪府",
  locality: "大阪市北区",
  street: "中津1-15-26",
};
const addressText = `${address.region}${address.locality}${address.street}`;
const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressText)}`;

const sections = [
  { id: "message", en: "Message" },
  { id: "business", en: "Business" },
  { id: "profile", en: "Profile" },
  { id: "access", en: "Access" },
];

const box =
  "scroll-mt-24 ml-6 -mr-5 px-6 md:ml-12 md:-mr-12 md:px-14 lg:ml-0 lg:mr-[calc(var(--bleed)*-1)] lg:pl-20 lg:pr-[calc(var(--bleed)_+_2rem)]";

const bizImages: Record<string, { src: string; alt: string }> = {
  corporate: { src: "/about/web-cc1f2d4d", alt: "モニターとキーボードを置いた仕事机" },
  ec: { src: "/about/ec-52b52a76", alt: "ショッピングバッグを持った手" },
};

function Sakura({ className }: { className: string }) {
  return (
    <svg viewBox="-100 -100 200 200" className={className} aria-hidden="true">
      <g transform="scale(9)">
        {[0, 72, 144, 216, 288].map((deg) => (
          <path
            key={deg}
            transform={`rotate(${deg})`}
            d="M0 -1.2 C -3.4 -3.2 -4.2 -8.2 -1.7 -10.6 L 0 -9.2 L 1.7 -10.6 C 4.2 -8.2 3.4 -3.2 0 -1.2 Z"
            fill="#333"
          />
        ))}
        <circle r="1.3" fill="#fff" />
      </g>
    </svg>
  );
}

export const meta = () =>
  pageMeta({
    title: `${site.brand}｜About`,
    description: `${site.brand}（${site.name}）の運営者情報。${about.join("")}`,
    path: "/about/",
    graph: [
      {
        "@type": "ProfilePage",
        "@id": `${site.url}/about/#page`,
        url: `${site.url}/about/`,
        name: "運営者情報",
        isPartOf: { "@id": ids.website },
        mainEntity: {
          "@type": "Person",
          "@id": ids.person,
          name: site.name,
          url: `${site.url}/`,
          brand: site.brand,
          address: {
            "@type": "PostalAddress",
            postalCode: address.postalCode,
            addressRegion: address.region,
            addressLocality: address.locality,
            streetAddress: address.street,
            addressCountry: "JP",
          },
          sameAs: site.profiles,
        },
      },
      breadcrumb(crumbs),
    ],
  });

function SectionLabel({ id, index, en }: { id: string; index: number; en: string }) {
  return (
    <h2
      id={id}
      className="flex items-center gap-3 font-latin text-[15px] font-medium tracking-[0.04em] text-ink"
    >
      <span>{String(index).padStart(2, "0")}</span>
      <span className="h-3 w-px bg-ink" aria-hidden="true" />
      <span>{en}</span>
    </h2>
  );
}

function SideNav() {
  const [active, setActive] = useState(sections[0].id);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return (
    <nav aria-label="このページの目次" className="hidden lg:block lg:pt-[96px]">
      <ol className="sticky top-[120px] grid">
        {sections.map((s, i) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              aria-current={active === s.id ? "true" : undefined}
              className={`flex h-[60px] items-center gap-3 border-b-2 font-latin text-[15px] font-medium tracking-[0.04em] transition-colors ${
                active === s.id ? "border-ink text-ink" : "border-line text-mute hover:text-ink"
              }`}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              <span className="h-3 w-px bg-current" aria-hidden="true" />
              <span>{s.en}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default function About() {
  const profile: [string, ReactNode][] = [
    ["Name", site.brand],
    ["Owner", site.name],
    ["Business", services.map((s) => s.jp).join("／")],
    [
      "Works",
      <Link
        key="works"
        to="/portfolio/"
        className="underline decoration-1 underline-offset-4 hover:no-underline"
      >
        制作事例 {cases.length}サイト
      </Link>,
    ],
    [
      "Contact",
      <a
        key="contact"
        href={site.crowdworks}
        target="_blank"
        rel="noopener"
        className="underline decoration-1 underline-offset-4 hover:no-underline"
      >
        クラウドワークス
      </a>,
    ],
  ];

  return (
    <main
      className="overflow-x-clip"
      style={{ "--bleed": "max(3rem, calc((100vw - 1280px) / 2))" } as CSSProperties}
    >
      <section className="relative px-5 pb-16 pt-36 md:px-12 md:pb-24 lg:pb-[100px] lg:pt-[200px]">
        <div className="mx-auto max-w-[1280px]">
          <h1>
            <span className="block text-[15px] font-medium tracking-[0.12em] text-ink">
              運営者情報
            </span>
            <span className="mt-4 block font-latin text-[clamp(60px,7.4vw,90px)] font-light leading-none tracking-[-0.02em] text-ink md:mt-6">
              About
            </span>
          </h1>
        </div>
        <Sakura className="pointer-events-none absolute -bottom-[35px] right-[55px] z-10 w-[64px] md:-bottom-[38px] md:right-[112px] md:w-[96px] lg:bottom-auto lg:left-[calc(50%+385px)] lg:right-auto lg:top-[223px] lg:w-[200px]" />
      </section>

      <div className="px-5 md:px-12">
        <div className="mx-auto grid max-w-[1280px] lg:grid-cols-[200px_1fr] lg:gap-x-[83px]">
          <SideNav />
          <div>
            <section
              id="message"
              aria-labelledby="message-label"
              className={`${box} bg-mist pb-14 pt-24 md:pb-20 md:pt-28 lg:pb-[74px] lg:pt-28`}
            >
              <SectionLabel id="message-label" index={1} en="Message" />
              <p className="mt-8 text-[clamp(24px,3.2vw,40px)] font-medium leading-[1.6] tracking-[0.08em] text-ink md:mt-10">
                {site.tagline.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </p>
              <p className="mt-5 font-latin text-[16px] font-medium tracking-[0.02em] text-ink">
                {site.message}
              </p>
              <p className="mt-8 text-[15px] leading-[30px] tracking-[0.06em] md:text-[16px]">
                <Lines lines={about} always={[1]} />
              </p>
            </section>

            <section
              id="business"
              aria-labelledby="business-label"
              className={`${box} pb-24 pt-20 md:pb-28 md:pt-28 lg:pb-[114px] lg:pt-28`}
            >
              <SectionLabel id="business-label" index={2} en="Business" />
              <p className="mt-8 font-latin text-[clamp(44px,6.2vw,80px)] font-light leading-[1.05] tracking-[-0.02em] text-ink md:mt-10">
                {services.map((s, i) => (
                  <span key={s.id} className="inline-block whitespace-nowrap">
                    {i > 0 && "/ "}
                    {s.en}
                    {i < services.length - 1 && " "}
                  </span>
                ))}
              </p>
              <div className="mt-14 grid gap-20 md:mt-16 md:gap-24">
                {services.map((s) => (
                  <div key={s.id} data-reveal>
                    <img
                      src={`${bizImages[s.id].src}-1600.jpg`}
                      srcSet={`${bizImages[s.id].src}-800.jpg 800w, ${bizImages[s.id].src}-1600.jpg 1600w`}
                      sizes="(min-width: 1024px) 790px, 100vw"
                      alt={bizImages[s.id].alt}
                      width={1600}
                      height={1067}
                      loading="lazy"
                      className="block aspect-[3/2] h-auto w-full object-cover"
                    />
                    <h3 className="mt-10 text-[clamp(22px,2.8vw,36px)] font-medium leading-[1.6] tracking-[0.08em] text-ink">
                      {s.jp}
                    </h3>
                    <p className="mt-6 text-[15px] leading-[30px] tracking-[0.06em] md:text-[16px]">
                      <Lines lines={s.text} />
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-16">
                <PillButton
                  href="/service/"
                  en="View Service"
                  jp="サービス内容を見る"
                  tone="dark"
                />
              </div>
            </section>

            <section
              id="profile"
              aria-labelledby="profile-label"
              className={`${box} pb-24 pt-4 md:pb-28 lg:grid lg:grid-cols-[214px_1fr] lg:gap-x-[93px] lg:pb-32 lg:pl-[45px] lg:pt-0`}
            >
              <div className="lg:pt-[116px]">
                <div className="lg:sticky lg:top-32">
                  <SectionLabel id="profile-label" index={3} en="Profile" />
                  <p className="mt-6 text-[22px] font-medium tracking-[0.1em] text-ink md:text-[24px]">
                    運営者情報
                  </p>
                </div>
              </div>
              <dl className="mt-12 grid gap-16 md:gap-20 lg:mt-0 lg:pt-[116px]">
                {profile.map(([en, value]) => (
                  <div key={en} data-reveal>
                    <dt className="font-latin text-[clamp(48px,6.2vw,80px)] font-light leading-none tracking-[-0.02em] text-ink">
                      {en}
                    </dt>
                    <dd className="mt-6 text-[15px] leading-[1.9] tracking-[0.06em] md:mt-8 md:text-[16px]">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        </div>
      </div>

      <section
        id="access"
        aria-labelledby="access-label"
        className="scroll-mt-24 px-5 pb-28 pt-24 md:px-12 md:pb-36 md:pt-[114px]"
      >
        <div className="mx-auto max-w-[1280px]">
          <SectionLabel id="access-label" index={4} en="Access" />
          <p className="mt-6 text-[22px] font-medium tracking-[0.1em] text-ink md:text-[24px]">
            所在地
          </p>
          <div className="mt-14 md:mt-20 lg:ml-[264px] lg:max-w-[656px]" data-reveal>
            <img
              src="/about/office-3dcf4223-1600.jpg"
              srcSet="/about/office-3dcf4223-800.jpg 800w, /about/office-3dcf4223-1600.jpg 1600w"
              sizes="(min-width: 1024px) 656px, 100vw"
              alt="木の受付カウンターと植物のあるオフィス"
              width={1600}
              height={1067}
              loading="lazy"
              className="block aspect-[3/2] h-auto w-full object-cover"
            />
            <p className="mt-10 font-latin text-[clamp(24px,2.6vw,30px)] font-medium tracking-[0.02em] text-ink">
              {site.brand}
            </p>
            <address className="mt-5 text-[15px] not-italic leading-[2] tracking-[0.06em]">
              〒{address.postalCode}
              <br />
              {addressText}
            </address>
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener"
              className="mt-8 inline-flex items-center gap-3 border-b-2 border-ink pb-3 text-[14px] font-medium tracking-[0.06em] text-ink transition-opacity hover:opacity-60"
            >
              Google マップで見る
              <span className="h-3 w-px bg-ink" aria-hidden="true" />
              <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
                <path
                  d="M12 21s-6.5-6.2-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 14.8 12 21 12 21Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <circle cx="12" cy="9.8" r="2.3" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <CtaPanels />

      <div className="bg-mist px-5 md:px-12">
        <div className="mx-auto flex min-h-16 max-w-[1280px] items-center py-5">
          <Breadcrumb items={crumbs} />
        </div>
      </div>
    </main>
  );
}
