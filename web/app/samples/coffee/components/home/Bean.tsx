import type { Ref } from "react";
import { Lines } from "~/samples/shared/Lines";
import { home } from "../../content/home";
import { products, store, yen } from "../../content/store";

type Props = {
  bean: (typeof home.beans)[number];
  index: number;
  sectionRef: Ref<HTMLElement>;
  onAdd: () => void;
};

const steps = Array.from({ length: home.roastSteps }, (_, i) => i + 1);

export function Bean({ bean, index, sectionRef, onAdd }: Props) {
  return (
    <section ref={sectionRef} id={index === 0 ? home.beansId : undefined} className="blk bean">
      <div>
        <div className="no">
          {index + 1}
          <i>/{String(home.beans.length).padStart(2, "0")}</i>
        </div>
        <h2>
          <Lines lines={bean.title} />
        </h2>
        <div className="jp">{bean.origin}</div>
        <div className="roast">
          <span className="dots">
            {steps.map((n) => (
              <i key={n} className={n <= bean.roast ? "on" : undefined} />
            ))}
          </span>
          {bean.roastLabel}
        </div>
        <div className="notes">
          {bean.notes.map((note) => (
            <span key={note}>{note}</span>
          ))}
        </div>
        <p>{bean.text}</p>
        <div className="buy">
          <div className="price">
            {yen(products[bean.id].price)}
            <small className="size">{store.bagSize}</small>
          </div>
          <button type="button" className="btn" onClick={onAdd}>
            {home.addLabel}
          </button>
          <span className="qty">{bean.stock}</span>
        </div>
      </div>
    </section>
  );
}
