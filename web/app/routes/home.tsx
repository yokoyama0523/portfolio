import { ContactBand } from "~/components/ContactBand";
import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";
import { MotionRoot } from "~/components/MotionRoot";
import { Mv } from "~/components/Mv";
import { Process } from "~/components/Process";
import { ServicePanels } from "~/components/ServicePanels";
import { WhatIDo } from "~/components/WhatIDo";
import { Works } from "~/components/Works";
import { about } from "~/data/copy";
import { countPages } from "~/data/pages.server";
import { ids, pageMeta } from "~/seo";
import { site } from "~/site";
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
    <>
      <MotionRoot />
      <Header />
      <main>
        <Mv />
        <WhatIDo />
        <ServicePanels />
        <Works pages={loaderData.pages} />
        <ContactBand />
        <Process />
      </main>
      <Footer />
    </>
  );
}
