import { site } from "~/config";
import { ContactBand } from "~/site/components/ContactBand";
import { Mv } from "~/site/components/Mv";
import { Process } from "~/site/components/Process";
import { ServicePanels } from "~/site/components/ServicePanels";
import { WhatIDo } from "~/site/components/WhatIDo";
import { Works } from "~/site/components/Works";
import { about } from "~/site/data/copy";
import { countPages } from "~/site/data/pages.server";
import { ids, pageMeta } from "~/site/seo";
import type { Route } from "./+types/home";

export const meta = () =>
  pageMeta({
    title: site.brand,
    description: about.join(""),
    path: "/",
    graph: [
      {
        "@type": "WebSite",
        "@id": ids.website,
        url: `${site.url}/`,
        name: site.brand,
        inLanguage: "ja",
        publisher: { "@id": ids.person },
      },
      {
        "@type": "Person",
        "@id": ids.person,
        name: site.name,
        url: `${site.url}/`,
        jobTitle: "Web制作",
        knowsAbout: ["Webサイト制作", "ECサイト", "HTML", "CSS", "JavaScript"],
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
