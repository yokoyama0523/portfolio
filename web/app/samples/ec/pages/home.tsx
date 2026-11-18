import { Link } from "react-router";
import { sampleMeta } from "~/samples/shared/meta";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { HeroSlides } from "../components/home/HeroSlides";
import { LookBand } from "../components/home/LookBand";
import { NewRail } from "../components/home/NewRail";
import { Promises } from "../components/home/Promises";
import { Tile } from "../components/home/Tile";
import { ProductCard } from "../components/ProductCard";
import { news, products } from "../content/catalog";
import { home } from "../content/home";
import { paths } from "../content/paths";
import "../styles/home.css";

export const meta = () => sampleMeta("ec", home.meta);

const newest = products.filter((product) => product.isNew).slice(0, home.newCount);
const ranking = [...products].sort((a, b) => a.rank - b.rank).slice(0, home.rankingCount);
const category = (id: string) => paths.list(`cat=${id}`);

export default function EcHome() {
  return (
    <>
      <Promises />
      <Header over />
      <main className="home">
        <HeroSlides />

        <section className="intro">
          <h2 className="sec-title">{home.intro.title}</h2>
          <p>
            {home.intro.lines.map((line) => (
              <span key={line} className="intro-line">
                {line}
              </span>
            ))}
          </p>
          <Link className="ul" to={home.intro.to}>
            {home.intro.link}
          </Link>
        </section>

        <div className="duo">
          {home.duo.map((item) => (
            <Tile
              key={item.id}
              to={category(item.id)}
              label={item.label}
              photo={item.image}
              tone={item.tone}
            />
          ))}
        </div>

        <section className="sec basics" aria-labelledby="basics-title">
          <h2 id="basics-title" className="sec-title">
            {home.basicsTitle}
          </h2>
          <div className="quad">
            {home.basics.map((item) => (
              <Tile
                key={item.id}
                to={category(item.id)}
                label={item.label}
                photo={item.image}
                tone={item.tone}
              />
            ))}
          </div>
        </section>

        <LookBand />

        <NewRail products={newest} />

        <section className="sec row" aria-labelledby="rank-title">
          <h2 id="rank-title" className="sec-title">
            {home.rankingTitle}
          </h2>
          <div className="rank">
            {ranking.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <p className="sec-more">
            <Link className="ul" to={paths.list("sort=rank")}>
              {home.seeAll}
            </Link>
          </p>
        </section>

        <section className="member">
          <h2 className="sec-title">{home.member.title}</h2>
          <p>
            {home.member.before}
            <code>{home.member.code}</code>
            {home.member.after}
          </p>
          <Link className="btn" to={paths.account("register")}>
            {home.member.button}
          </Link>
        </section>

        <section className="sec news-sec" aria-labelledby="news-title">
          <h2 id="news-title" className="sec-title">
            {home.newsTitle}
          </h2>
          <ul className="news">
            {news.map((item) => (
              <li key={item.iso}>
                <time dateTime={item.iso}>{item.date}</time>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
