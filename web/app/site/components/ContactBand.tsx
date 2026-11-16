import { cases } from "~/site/data/cases";
import { contactCopy, links } from "~/site/data/copy";
import { Lines } from "./Lines";
import { PillButton } from "./PillButton";
import { ResponsiveImg } from "./ResponsiveImg";

export function ContactBand() {
  return (
    <section
      aria-label={contactCopy.label}
      className="relative isolate overflow-hidden bg-accent px-5 py-28 text-white md:px-12 md:py-36"
    >
      <div
        className="absolute inset-0 -z-10 grid -rotate-6 scale-125 grid-cols-5 gap-3 opacity-25 mix-blend-luminosity"
        aria-hidden="true"
      >
        {cases.map((c) => (
          <ResponsiveImg
            key={c.id}
            image={c.media.thumb}
            sizes="20vw"
            className="aspect-screen w-full object-cover"
          />
        ))}
      </div>
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-accent via-accent/85 to-accent/40"
        aria-hidden="true"
      />
      <div className="mx-auto flex max-w-content flex-col gap-14 md:flex-row md:items-end md:justify-between">
        <div data-reveal>
          <p className="font-latin text-base tracking-6 text-white/80">{contactCopy.title}</p>
          <p className="mt-8 font-latin text-display-contact font-light leading-heading -tracking-2">
            {contactCopy.catchphrase}
          </p>
          <p className="mt-8 text-md leading-loose tracking-8 text-white/85">
            <Lines lines={contactCopy.lines} />
          </p>
        </div>
        <div data-reveal>
          <PillButton {...links.contact} tone="ghost" external />
        </div>
      </div>
    </section>
  );
}
