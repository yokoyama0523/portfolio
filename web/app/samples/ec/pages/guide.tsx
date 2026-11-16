import { sampleMeta } from "~/samples/shared/meta";
import { Breadcrumb } from "../components/Breadcrumb";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { type GuideSection, guidePage as text } from "../content/guide";
import "../styles/guide.css";

export const meta = () => sampleMeta("ec", text.meta);

const blockKey = (block: GuideSection["blocks"][number]) =>
  block.kind === "p" ? block.text : block.kind === "list" ? block.items.join() : block.head.join();

function Block({ block }: { block: GuideSection["blocks"][number] }) {
  if (block.kind === "p") return <p>{block.text}</p>;
  if (block.kind === "list")
    return (
      <ul>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  return (
    <table>
      <thead>
        <tr>
          {block.head.map((cell) => (
            <th key={cell}>{cell}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {block.rows.map((row) => (
          <tr key={row[0]}>
            {row.map((cell, i) => (
              <td key={`${row[0]}-${block.head[i]}`}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const toc = [
  ...text.sections.map((section) => ({ id: section.id, label: section.toc })),
  { id: text.member.id, label: text.member.title },
  { id: text.faq.id, label: text.faq.title },
];

export default function EcGuide() {
  return (
    <>
      <Header />
      <main className="wrap">
        <Breadcrumb items={[{ label: text.title }]} />
        <h1 className="ttl">{text.title}</h1>
        <div className="lay">
          <nav className="toc" aria-label={text.tocLabel}>
            {toc.map((item) => (
              <a key={item.id} href={`#${item.id}`}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="g">
            {text.sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2>{section.title}</h2>
                {section.blocks.map((block) => (
                  <Block key={blockKey(block)} block={block} />
                ))}
              </section>
            ))}
            <section id={text.member.id}>
              <h2>{text.member.title}</h2>
              <p>
                {text.member.before}
                <b className="medium">{text.member.code}</b>
                {text.member.after}
              </p>
            </section>
            <section id={text.faq.id} className="faq">
              <h2>{text.faq.title}</h2>
              {text.faq.items.map((item) => (
                <details key={item.q}>
                  <summary>{item.q}</summary>
                  <div className="a">{item.a}</div>
                </details>
              ))}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
