import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { Img } from "~/samples/shared/Img";
import { gsap } from "../animation";
import { studio } from "../content/studio";

const { works } = studio;

export function Works({ animate }: { animate: boolean }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!animate || !track.current) return;
      const element = track.current;
      const distance = () => element.scrollWidth - window.innerWidth;
      gsap.to(element, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: root, dependencies: [animate] },
  );

  return (
    <section ref={root} className="works" id={works.id}>
      <div className="head">
        <b>{works.title}</b>
        <span className="jp">{works.years}</span>
      </div>
      <div ref={track} className="track">
        {works.items.map((item, i) => (
          <div key={item.name} className="card" data-cur={works.cursor}>
            <span className="n">{String(i + 1).padStart(2, "0")}</span>
            <div className="im">
              <Img image={item.image} />
            </div>
            <div className="t">
              <b>{item.name}</b>
              <span>{item.note}</span>
            </div>
          </div>
        ))}
        <div className="end">
          {works.end.before} <i>{works.end.italic}</i> {works.end.after}
        </div>
      </div>
    </section>
  );
}
