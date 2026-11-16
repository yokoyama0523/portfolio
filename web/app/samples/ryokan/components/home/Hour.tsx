import type { Ref } from "react";
import { Img } from "~/samples/shared/Img";
import { Lines } from "~/samples/shared/Lines";
import { Reveal } from "~/samples/shared/Reveal";
import type { home } from "../../content/home";

type Props = { hour: (typeof home.hours)[number]; sectionRef: Ref<HTMLElement> };

export function Hour({ hour, sectionRef }: Props) {
  return (
    <section ref={sectionRef} className="t" id={hour.id}>
      <Reveal className="pic">
        <Img
          image={hour.image}
          alt={hour.alt}
          style={"focus" in hour && hour.focus ? { objectPosition: hour.focus } : undefined}
        />
      </Reveal>
      <Reveal className="tx">
        <div className="when">{hour.when}</div>
        <h2>
          <Lines lines={hour.title} />
        </h2>
        {hour.paragraphs.map((text) => (
          <p key={text}>{text}</p>
        ))}
        {"list" in hour && hour.list && (
          <ul className="menu">
            {hour.list.map((item) => (
              <li key={item.term}>
                <span>{item.term}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        )}
        {"photos" in hour && hour.photos && (
          <div className="pics2">
            {hour.photos.map((photo) => (
              <div key={photo.src}>
                <Img image={photo} />
              </div>
            ))}
          </div>
        )}
        {"note" in hour && hour.note && <p className="note">{hour.note}</p>}
      </Reveal>
    </section>
  );
}
