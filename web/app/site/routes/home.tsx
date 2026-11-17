import { site } from "~/config";
import { absoluteUrl } from "~/shared/meta";
import { ContactBand } from "~/site/components/ContactBand";
import { Mv } from "~/site/components/Mv";
import { Process } from "~/site/components/Process";
import { ServicePanels } from "~/site/components/ServicePanels";
import { WhatIDo } from "~/site/components/WhatIDo";
import { Works } from "~/site/components/Works";
import { about, specialty } from "~/site/data/copy";
import { homeCopy } from "~/site/data/home";
import { countPages } from "~/site/data/pages.server";
import { ids, pageMeta } from "~/site/seo";
import type { Route } from "./+types/home";

export const meta = () =>
  pageMeta({
    title: `${site.brand}｜${specialty}`,
    description: about.join(""),
    path: site.paths.home,
    graph: [
      {
        "@type": "WebSite",
        "@id": ids.website,
        url: absoluteUrl(site.paths.home),
        name: site.brand,
        inLanguage: "ja",
        publisher: { "@id": ids.person },
      },
      {
        "@type": "Person",
        "@id": ids.person,
        name: site.name,
        url: absoluteUrl(site.paths.home),
        ...homeCopy.person,
        sameAs: site.profiles,
      },
    ],
  });

export const loader = () => ({ pages: countPages() });

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <main>
      <Mv />
      <WhatIDo />
      <ServicePanels />
      <Works pages={loaderData.pages} />
      <ContactBand />
      <Process />
    </main>
  );
}
