import { Fragment, type ReactNode, useEffect, useState } from "react";
import { Link } from "react-router";
import { site } from "~/config";
import { absoluteUrl } from "~/shared/meta";
import { Breadcrumb } from "~/site/components/Breadcrumb";
import { CtaPanels } from "~/site/components/CtaPanels";
import { Lines } from "~/site/components/Lines";
import { PillButton } from "~/site/components/PillButton";
import { SakuraPetals } from "~/site/components/SakuraMark";
import { aboutPageCopy as text } from "~/site/data/aboutPage";
import { cases } from "~/site/data/cases";
import { about, links } from "~/site/data/copy";
import { services } from "~/site/data/services";
import { breadcrumb, ids, pageMeta } from "~/site/seo";

const PHOTO = { width: 1600, height: 1067 };
const ACTIVE_BAND = "-40% 0px -55% 0px";
const sectionNumber = (index: number) => String(index).padStart(2, "0");

const box =
  "scroll-mt-24 ml-6 -mr-5 px-6 md:ml-12 md:-mr-12 md:px-14 lg:ml-0 lg:-mr-bleed lg:pr-bleed-inset";

const { address } = text.access;

export const meta = () =>
  pageMeta({
    title: `${site.brand}｜${text.title.en}`,
    description: text.description(site.brand, site.name, about.join("")),
    path: site.paths.about,
    graph: [
      {
        "@type": "ProfilePage",
        "@id": absoluteUrl(`${site.paths.about}#page`),
        url: absoluteUrl(site.paths.about),
        name: text.title.jp,
        isPartOf: { "@id": ids.website },
        mainEntity: {
          "@type": "Person",
          "@id": ids.person,
          name: site.name,
          url: absoluteUrl(site.paths.home),
          brand: site.brand,
          address: {
            "@type": "PostalAddress",
            postalCode: address.postalCode,
            addressRegion: address.region,
            addressLocality: address.locality,
            streetAddress: address.street,
            addressCountry: site.country,
          },
          sameAs: site.profiles,
        },
      },
      breadcrumb(text.crumbs),
    ],
  });

function SectionLabel({ id, index, en }: { id: string; index: number; en: string }) {
  return (
    <h2
      id={id}
      className="flex items-center gap-3 font-latin text-base font-medium tracking-4 text-ink"
    >
      <span>{sectionNumber(index)}</span>
      <span className="h-3 w-px bg-ink" aria-hidden="true" />
      <span>{en}</span>
    </h2>
  );
}

function SideNav() {
  const [active, setActive] = useState(text.sections[0].id);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: ACTIVE_BAND },
    );
    for (const s of text.sections) {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, []);
  return (
    <nav aria-label={text.tocLabel} className="hidden lg:block lg:pt-24">
      <ol className="sticky top-30 grid">
        {text.sections.map((s, i) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              aria-current={active === s.id ? "true" : undefined}
              className={`flex h-15 items-center gap-3 border-b-2 font-latin text-base font-medium tracking-4 transition-colors ${
                active === s.id ? "border-ink text-ink" : "border-line text-mute hover:text-ink"
              }`}
            >
              <span>{sectionNumber(i + 1)}</span>
              <span className="h-3 w-px bg-current" aria-hidden="true" />
              <span>{s.en}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function Photo({
  photo,
  sizes,
}: {
  photo: { src: string; srcSet: string; alt: string };
  sizes: string;
}) {
  return (
    <img
      src={photo.src}
      srcSet={photo.srcSet}
      sizes={sizes}
      alt={photo.alt}
      width={PHOTO.width}
      height={PHOTO.height}
      loading="lazy"
      className="block aspect-photo h-auto w-full object-cover"
    />
  );
}

const textLink = "underline decoration-1 underline-offset-4 hover:no-underline";

export default function About() {
  const p = text.profile;
  const profile: [string, ReactNode][] = [
    [p.name, site.brand],
    [p.owner, site.name],
    [p.business, services.map((s) => s.jp).join(p.businessSeparator)],
    [
      p.works,
      <Link key="works" to={site.paths.works} className={textLink}>
        {p.worksLink(cases.length)}
      </Link>,
    ],
    [
      p.contact,
      <a key="contact" href={site.crowdworks} target="_blank" rel="noopener" className={textLink}>
        {p.contactLink}
      </a>,
    ],
  ];
  const [message, business, profileSection, access] = text.sections;

  return (
    <main className="overflow-x-clip">
      <section className="relative px-5 pt-36 pb-16 md:px-12 md:pb-24 lg:pt-50 lg:pb-25">
        <div className="mx-auto max-w-content">
          <h1>
            <span className="block text-base font-medium tracking-12 text-ink">
              {text.title.jp}
            </span>
            <span className="mt-4 block font-latin text-display-about font-light leading-none -tracking-2 text-ink md:mt-6">
              {text.title.en}
            </span>
          </h1>
        </div>
        <svg
          viewBox="-100 -100 200 200"
          className="pointer-events-none absolute right-13.75 -bottom-8.75 z-10 w-16 text-charcoal md:right-28 md:-bottom-9.5 md:w-24 lg:top-55.75 lg:right-auto lg:bottom-auto lg:left-sakura-x lg:w-50"
          aria-hidden="true"
        >
          <g transform="scale(9)">
            <SakuraPetals centerClassName="fill-white" />
          </g>
        </svg>
      </section>

      <div className="px-5 md:px-12">
        <div className="mx-auto grid max-w-content lg:grid-cols-toc lg:gap-x-20.75">
          <SideNav />
          <div>
            <section
              id={message.id}
              aria-labelledby={`${message.id}-label`}
              className={`${box} bg-mist pt-24 pb-14 md:pt-28 md:pb-20 lg:pt-28 lg:pb-18.5 lg:pl-20`}
            >
              <SectionLabel id={`${message.id}-label`} index={1} en={message.en} />
              <p className="mt-8 text-display-tagline font-medium leading-snug tracking-8 text-ink md:mt-10">
                {site.tagline.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </p>
              <p className="mt-5 font-latin text-lg font-medium tracking-2 text-ink">
                {site.message}
              </p>
              <p className="mt-8 text-base leading-7.5 tracking-6 md:text-lg">
                <Lines lines={about} always={[1]} />
              </p>
            </section>

            <section
              id={business.id}
              aria-labelledby={`${business.id}-label`}
              className={`${box} pt-20 pb-24 md:pt-28 md:pb-28 lg:pt-28 lg:pb-28.5 lg:pl-20`}
            >
              <SectionLabel id={`${business.id}-label`} index={2} en={business.en} />
              <p className="mt-8 font-latin text-display-business font-light leading-heading -tracking-2 text-ink md:mt-10">
                {services.map((s, i) => (
                  <Fragment key={s.id}>
                    {i > 0 && " "}
                    <span className="inline-block whitespace-nowrap">
                      {i > 0 && "/ "}
                      {s.en}
                    </span>
                  </Fragment>
                ))}
              </p>
              <div className="mt-14 grid gap-20 md:mt-16 md:gap-24">
                {services.map((s) => (
                  <div key={s.id} data-reveal>
                    <Photo
                      photo={text.businessPhotos[s.id]}
                      sizes="(min-width: 1024px) 790px, 100vw"
                    />
                    <h3 className="mt-10 text-display-subhead font-medium leading-snug tracking-8 text-ink">
                      {s.jp}
                    </h3>
                    <p className="mt-6 text-base leading-7.5 tracking-6 md:text-lg">
                      <Lines lines={s.text} />
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-16">
                <PillButton {...links.service} tone="dark" />
              </div>
            </section>

            <section
              id={profileSection.id}
              aria-labelledby={`${profileSection.id}-label`}
              className={`${box} pt-4 pb-24 md:pb-28 lg:grid lg:grid-cols-profile lg:gap-x-23.25 lg:pt-0 lg:pb-32 lg:pl-11.25`}
            >
              <div className="lg:pt-29">
                <div className="lg:sticky lg:top-32">
                  <SectionLabel
                    id={`${profileSection.id}-label`}
                    index={3}
                    en={profileSection.en}
                  />
                  <p className="mt-6 text-2xl font-medium tracking-10 text-ink md:text-3xl">
                    {text.profileTitle}
                  </p>
                </div>
              </div>
              <dl className="mt-12 grid gap-16 md:gap-20 lg:mt-0 lg:pt-29">
                {profile.map(([en, value]) => (
                  <div key={en} data-reveal>
                    <dt className="font-latin text-display-term font-light leading-none -tracking-2 text-ink">
                      {en}
                    </dt>
                    <dd className="mt-6 text-base leading-body tracking-6 md:mt-8 md:text-lg">
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
        id={access.id}
        aria-labelledby={`${access.id}-label`}
        className="scroll-mt-24 px-5 pt-24 pb-28 md:px-12 md:pt-28.5 md:pb-36"
      >
        <div className="mx-auto max-w-content">
          <SectionLabel id={`${access.id}-label`} index={4} en={access.en} />
          <p className="mt-6 text-2xl font-medium tracking-10 text-ink md:text-3xl">
            {text.access.title}
          </p>
          <div className="mt-14 md:mt-20 lg:ml-66 lg:max-w-access" data-reveal>
            <Photo photo={text.access.photo} sizes="(min-width: 1024px) 656px, 100vw" />
            <p className="mt-10 font-latin text-display-brand font-medium tracking-2 text-ink">
              {site.brand}
            </p>
            <address className="mt-5 text-base not-italic leading-relaxed tracking-6">
              {text.access.postal}
              <br />
              {text.access.addressText}
            </address>
            <a
              href={text.access.map.href}
              target="_blank"
              rel="noopener"
              className="mt-8 inline-flex items-center gap-3 border-b-2 border-ink pb-3 text-md font-medium tracking-6 text-ink transition-opacity hover:opacity-60"
            >
              {text.access.map.label}
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
        <div className="mx-auto flex min-h-16 max-w-content items-center py-5">
          <Breadcrumb items={text.crumbs} />
        </div>
      </div>
    </main>
  );
}
