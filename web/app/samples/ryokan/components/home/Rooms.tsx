import type { Ref } from "react";
import { Img } from "~/samples/shared/Img";
import { Reveal } from "~/samples/shared/Reveal";
import { home } from "../../content/home";
import { rooms, yen } from "../../content/rooms";

const text = home.rooms;

export function Rooms({ sectionRef }: { sectionRef: Ref<HTMLElement> }) {
  return (
    <section ref={sectionRef} className="rooms" id={text.id}>
      <Reveal className="head">
        <h2>{text.title}</h2>
        <p>{text.text}</p>
      </Reveal>
      <div className="list">
        {rooms.map((room) => (
          <Reveal key={room.id} as="article">
            <div className="pic">
              <Img image={room.image} />
            </div>
            <h3>
              {room.name}
              <small>{room.count}</small>
            </h3>
            <p>{room.text}</p>
            <div className="pr">
              {text.pricePrefix} {yen(room.price)}
              <small>{text.notes[room.id]}</small>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
