import { Link } from "react-router";
import { site } from "~/config";
import { cases } from "~/site/data/cases";
import { layoutCopy } from "~/site/data/layout";
import { Logo } from "./Logo";

const text = layoutCopy.footer;
const linkClass = "w-fit underline-grow";
const titleClass = `font-latin text-md tracking-6 text-ink ${linkClass}`;

export function Footer() {
  return (
    <footer className="px-5 pt-24 md:px-12 md:pt-32">
      <div className="mx-auto grid max-w-content gap-12 text-sm tracking-6 md:grid-cols-footer">
        <div>
          <Link to={text.works.href} className={titleClass}>
            {text.works.title}
          </Link>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2">
            {cases.map((c) => (
              <li key={c.id}>
                <a href={c.path} className={linkClass}>
                  {c.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {text.groups.map((group) => (
          <div key={group.title}>
            <Link to={group.href} className={titleClass}>
              {group.title}
            </Link>
            <ul className="mt-5 grid gap-2">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <p className="font-latin text-md tracking-6 text-ink">{text.contact.title}</p>
          <ul className="mt-5 grid gap-2">
            {text.contact.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noopener" className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-xs leading-relaxed text-mute">
          {text.notes.map((note, i) => (
            <p key={note} className={i > 0 ? "mt-2" : undefined}>
              {note}
            </p>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-20 flex max-w-content items-center justify-between border-t border-line py-8">
        <Link to={site.paths.home} aria-label={layoutCopy.homeLabel}>
          <Logo />
        </Link>
        <p className="font-latin text-xs tracking-6 text-mute">{text.copyright}</p>
      </div>
    </footer>
  );
}
