import { type Ref, useState } from "react";
import { Link } from "react-router";
import { Lines } from "~/samples/shared/Lines";
import { home } from "../../content/home";
import { perMonth, plans } from "../../content/plans";
import { store } from "../../content/store";

const text = home.subscription;

export function Subscription({ sectionRef }: { sectionRef: Ref<HTMLElement> }) {
  const [plan, setPlan] = useState(plans[0].name);
  return (
    <section ref={sectionRef} id={text.id} className="blk s sub">
      <div>
        <h2>
          <Lines lines={text.title} />
        </h2>
        <div className="jp">{text.lead}</div>
        <p>{text.text}</p>
        <fieldset className="plans" aria-label={text.plansLabel}>
          {plans.map((item) => (
            <label key={item.name}>
              <input
                type="radio"
                name="plan"
                value={item.name}
                checked={plan === item.name}
                onChange={() => setPlan(item.name)}
              />
              <b>{item.name}</b>
              <small>{item.homeNote}</small>
              <span className="pr">{perMonth(item.price)}</span>
            </label>
          ))}
        </fieldset>
        <Link className="btn" to={`${store.paths.checkout}?sub=1`}>
          {text.start}
        </Link>
        <div className="note">{text.note}</div>
      </div>
    </section>
  );
}
