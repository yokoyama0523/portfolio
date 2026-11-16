import { type PointerEvent, useRef } from "react";
import { gsap } from "../animation";
import { studio } from "../content/studio";

const { contact } = studio;
const PULL = 0.35;

export function Contact({ magnetic }: { magnetic: boolean }) {
  const button = useRef<HTMLAnchorElement>(null);

  const pull = (event: PointerEvent<HTMLAnchorElement>) => {
    if (!magnetic || !button.current) return;
    const box = button.current.getBoundingClientRect();
    gsap.to(button.current, {
      x: (event.clientX - box.left - box.width / 2) * PULL,
      y: (event.clientY - box.top - box.height / 2) * PULL,
      duration: 0.4,
    });
  };
  const release = () => {
    if (magnetic) gsap.to(button.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,.4)" });
  };

  return (
    <section className="contact" id={contact.id}>
      <div className="big">
        {contact.big.before} <i>{contact.big.italic}</i>
      </div>
      <div className="row">
        <div className="info">
          <b>{contact.email}</b>
          {contact.address}
          <br />
          {contact.note}
        </div>
        <a
          ref={button}
          className="mag"
          href={`mailto:${contact.email}`}
          data-cur=""
          onPointerMove={pull}
          onPointerLeave={release}
        >
          {contact.button}
        </a>
      </div>
    </section>
  );
}
