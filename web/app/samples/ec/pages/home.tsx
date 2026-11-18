import { Link } from "react-router";
import { Img } from "~/samples/shared/Img";
import { sampleMeta } from "~/samples/shared/meta";
import { image } from "../assets";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { HeroSlides } from "../components/home/HeroSlides";
import { NewRail } from "../components/home/NewRail";
import { Promises } from "../components/home/Promises";
import { ProductCard } from "../components/ProductCard";
import { categories, looks, news, products } from "../content/catalog";
import { home } from "../content/home";
import { paths } from "../content/paths";
import { productById } from "../store/pricing";
import "../styles/home.css";

export const meta = () => sampleMeta("ec", home.meta);

const newest = products.filter((product) => product.isNew).slice(0, home.newCount);
const ranking = [...products].sort((a, b) => a.rank - b.rank).slice(0, home.rankingCount);

export default function EcHome() {
  return (
    <>
      <Header />
      <main>
        <Promises />
        <HeroSlides />
        <NewRail products={newest} />
        <section className="sec wrap flush">
          <div className="h">
            <h2>{home.categoriesTitle}</h2>
          </div>
          <div className="cats">
            {categories.map((category) => (
              <Link key={category.id} to={paths.list(`cat=${category.id}`)}>
                <div className="im">
                  <Img image={image(home.categoryImages[category.id])} />
                </div>
                <b>{category.name}</b>
              </Link>
            ))}
          </div>
        </section>
        <section className="sec wrap flush">
          <div className="h">
            <h2>{home.rankingTitle}</h2>
            <Link to={paths.list("sort=rank")}>{home.seeAll}</Link>
          </div>
          <div className="rank">
            {ranking.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
        <section className="sec wrap flush" id={home.looksId}>
          <div className="h">
            <h2>{home.looksTitle}</h2>
          </div>
          <div className="looks">
            {looks.map((look) => (
              <figure key={look.image}>
                <div className="im">
                  <Img image={image(look.image)} alt={look.title} />
                </div>
                <figcaption>
                  <b>{look.title}</b>
                  <div className="items">
                    {look.items.map((id) => (
                      <Link key={id} to={paths.item(id)}>
                        {productById[id].name}
                      </Link>
                    ))}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
        <section className="sec wrap flush">
          <div className="member">
            <div>
              <h2>{home.member.title}</h2>
              <p>
                {home.member.before}
                <code>{home.member.code}</code>
                {home.member.after}
              </p>
            </div>
            <Link className="btn" to={paths.account("register")}>
              {home.member.button}
            </Link>
          </div>
        </section>
        <section className="sec wrap flush">
          <div className="h">
            <h2>{home.newsTitle}</h2>
          </div>
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
