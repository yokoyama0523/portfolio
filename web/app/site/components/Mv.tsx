import { site } from "~/config";
import { homeCopy } from "~/site/data/home";
import { OrbitCanvas } from "./OrbitCanvas";

export function Mv() {
  return (
    <section aria-label={homeCopy.mvLabel} className="relative h-svh min-h-140 overflow-hidden">
      <div className="absolute inset-0">
        <OrbitCanvas message={site.message} tagline={site.tagline} />
      </div>
      <p
        className="absolute bottom-8 left-5 flex items-center gap-3 font-latin text-xs leading-4 tracking-12 text-white mix-blend-difference md:left-12"
        aria-hidden="true"
      >
        <span>{homeCopy.scroll}</span>
        <i className="relative block h-px w-16 overflow-hidden bg-white/25">
          <i className="absolute inset-0 animate-scroll-line bg-white motion-reduce:animate-none" />
        </i>
      </p>
    </section>
  );
}
