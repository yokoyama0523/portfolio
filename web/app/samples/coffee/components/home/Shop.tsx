import { Fragment, type Ref } from "react";
import { home } from "../../content/home";
import { store } from "../../content/store";

const { shop } = home;

export function Shop({ sectionRef }: { sectionRef: Ref<HTMLElement> }) {
  return (
    <section ref={sectionRef} id={shop.id} className="blk s shop">
      <div>
        <h3 className="t">{shop.title}</h3>
        <div className="jp2">{shop.lead}</div>
        <dl>
          {shop.rows.map((row) => (
            <Fragment key={row.term}>
              <dt>{row.term}</dt>
              <dd>{row.value}</dd>
            </Fragment>
          ))}
        </dl>
      </div>
      <footer className="ft">
        <div className="logo">{store.name}</div>
        <div>{shop.copy}</div>
      </footer>
    </section>
  );
}
