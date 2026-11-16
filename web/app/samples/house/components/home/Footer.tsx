import { home } from "../../content/home";

export function Footer() {
  return (
    <footer className="ft">
      <div>{home.footer.note}</div>
      <nav aria-label={home.footer.navLabel}>
        {home.nav.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </footer>
  );
}
