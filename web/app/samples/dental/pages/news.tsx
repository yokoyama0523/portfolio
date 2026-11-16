import { sampleMeta } from "~/samples/shared/meta";
import { Reveal } from "~/samples/shared/Reveal";
import { Footer } from "../components/Footer";
import { MobileBar } from "../components/MobileBar";
import { Header } from "../components/sub/Header";
import { PageHead } from "../components/sub/PageHead";
import { newsItems } from "../content/news";
import { newsPage } from "../content/newsPage";
import "../styles/sub.css";

export const meta = () => sampleMeta("dental", newsPage.meta);

export default function DentalNews() {
  return (
    <>
      <Header />
      <main>
        <PageHead en={newsPage.en} title={newsPage.title} />
        <div className="nl">
          {newsItems.map((item) => (
            <Reveal key={item.id} as="article" id={item.id}>
              <time dateTime={item.iso}>{item.date}</time>
              <span className="cat">{item.category}</span>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </div>
      </main>
      <Footer variant="sub" />
      <MobileBar onHome={false} />
    </>
  );
}
