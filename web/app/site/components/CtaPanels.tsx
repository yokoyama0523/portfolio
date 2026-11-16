import { contactCopy, links, worksLead } from "~/site/data/copy";
import { Lines } from "./Lines";
import { PillButton } from "./PillButton";

export function CtaPanels() {
  return (
    <section aria-label={contactCopy.label} className="grid md:grid-cols-2">
      <div className="bg-charcoal px-8 py-20 text-white md:px-16 md:py-28" data-reveal>
        <p className="font-latin text-display-cta font-light leading-none -tracking-1">
          {contactCopy.title}
        </p>
        <p className="mt-4 text-sm font-medium tracking-12 text-white/70">{contactCopy.subtitle}</p>
        <p className="mt-10 text-md leading-loose tracking-8 text-white/85">
          <Lines lines={contactCopy.lines} />
        </p>
        <div className="mt-12">
          <PillButton {...links.contact} tone="ghost" external />
        </div>
      </div>
      <div className="border-y border-line bg-white px-8 py-20 md:px-16 md:py-28" data-reveal>
        <p className="font-latin text-display-cta font-light leading-none -tracking-1 text-ink">
          {contactCopy.works.title}
        </p>
        <p className="mt-4 text-sm font-medium tracking-12 text-mute">
          {contactCopy.works.subtitle}
        </p>
        <p className="mt-10 text-md leading-loose tracking-8">
          <Lines lines={worksLead} />
        </p>
        <div className="mt-12">
          <PillButton {...links.works} />
        </div>
      </div>
    </section>
  );
}
