import { home } from "../../content/home";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="ft">
      <div className="row">
        <div className="logo">
          <Logo />
        </div>
        <nav aria-label={home.footer.navLabel}>
          {home.footer.nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="copy">{home.footer.copy}</div>
    </footer>
  );
}
