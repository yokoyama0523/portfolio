import type { CSSProperties } from "react";
import { sampleMeta } from "~/samples/shared/meta";
import { Book } from "../components/home/Book";
import { Clock, type ClockFace } from "../components/home/Clock";
import { Header } from "../components/home/Header";
import { Hero } from "../components/home/Hero";
import { Hour } from "../components/home/Hour";
import { Rooms } from "../components/home/Rooms";
import { useActiveSection } from "../components/home/useActiveSection";
import { darkTones, home, type Tone } from "../content/home";
import "../styles/home.css";

export const meta = () => sampleMeta("ryokan", home.meta);

type Scene = { tone: Tone; clock: ClockFace };

const scenes: Record<string, Scene> = {
  ...Object.fromEntries(
    home.hours.map((hour) => [hour.id, { tone: hour.tone, clock: hour.clock }]),
  ),
  [home.rooms.id]: { tone: "t10", clock: null },
  [home.book.id]: { tone: "t10", clock: null },
};

const first = home.hours[0];
const last = home.hours[home.hours.length - 1];

export default function RyokanHome() {
  const { active, refs } = useActiveSection<Scene>(scenes, {
    tone: first.tone,
    clock: first.clock,
  });
  const theme = { "--bg": `var(--${active.tone})` } as CSSProperties;
  return (
    <div className={darkTones.includes(active.tone) ? "page dark" : "page"} style={theme}>
      <Header />
      <Clock face={active.clock} fallback={last.clock} />
      <main>
        <Hero />
        {home.hours.map((hour) => (
          <Hour key={hour.id} hour={hour} sectionRef={refs[hour.id]} />
        ))}
        <Rooms sectionRef={refs[home.rooms.id]} />
        <Book sectionRef={refs[home.book.id]} />
      </main>
      <footer className="ft">
        <div>{home.footer.note}</div>
        <div>{home.footer.union}</div>
      </footer>
    </div>
  );
}
