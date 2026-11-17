import { Lines } from "~/samples/shared/Lines";
import { sampleMeta } from "~/samples/shared/meta";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { MobileBar } from "../components/MobileBar";
import { PageHead } from "../components/PageHead";
import { ReserveTab } from "../components/ReserveTab";
import { newsItems, newsPage as page } from "../content/news";
import "../styles/sub.css";

export const meta = () => sampleMeta("dental", page.meta);

export default function DentalNews() {
  return (
    <>
      <Header onHome={false} />
      <main className="sub">
        <PageHead title={page.title} lead={page.lead} image={page.image} alt={page.alt} />
        <div className="news-list">
          {newsItems.map((item) => (
            <article key={item.id} id={item.id} aria-labelledby={`${item.id}-title`}>
              <p className="news-meta">
                <time dateTime={item.iso}>{item.date}</time>
                <span>{item.category}</span>
              </p>
              <h2 id={`${item.id}-title`}>{item.title}</h2>
              <p className="prose">
                <Lines lines={item.text} />
              </p>
            </article>
          ))}
        </div>
      </main>
      <Footer onHome={false} />
      <ReserveTab />
      <MobileBar onHome={false} />
    </>
  );
}
