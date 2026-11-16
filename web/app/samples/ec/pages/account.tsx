import { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router";
import { sampleMeta } from "~/samples/shared/meta";
import { AddressBook } from "../account/AddressBook";
import { AuthForms } from "../account/AuthForms";
import { OrderHistory } from "../account/OrderHistory";
import { ProfileForm } from "../account/ProfileForm";
import { WishList } from "../account/WishList";
import { Breadcrumb } from "../components/Breadcrumb";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { accountPage as text } from "../content/account";
import { paths } from "../content/paths";
import { useShop } from "../store/ShopContext";
import "../styles/account.css";

export const meta = () => sampleMeta("ec", text.meta);

const [firstTab] = text.tabs;

export default function EcAccount() {
  const { loaded, auth } = useShop();
  const location = useLocation();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const registerEmail = useRef<HTMLInputElement | null>(null);
  const user = auth.user;
  const hash = location.hash.replace("#", "");
  const tab = text.tabs.find((item) => item.id === hash)?.id ?? firstTab.id;
  const next = params.get("next");

  useEffect(() => {
    if (loaded && !user && hash === "register") registerEmail.current?.focus();
  }, [loaded, user, hash]);

  const afterLogin = () => {
    if (next?.startsWith(paths.home)) {
      navigate(next);
      return;
    }
    navigate(paths.account(firstTab.id), { replace: true });
  };

  const logout = () => {
    auth.logout();
    navigate(paths.account(), { replace: true });
  };

  const title = user ? text.memberTitle(user.name) : text.guestTitle;
  return (
    <>
      <Header />
      <main className="wrap">
        <Breadcrumb items={[{ label: user ? text.memberCrumb : text.guestCrumb }]} />
        <h1 className="ttl">{loaded ? title : text.guestTitle}</h1>
        {loaded && !user && (
          <AuthForms
            onDone={afterLogin}
            emailRef={(element) => {
              registerEmail.current = element;
            }}
          />
        )}
        {user && (
          <div className="lay">
            <nav className="mn" aria-label={text.menuLabel}>
              {text.tabs.map((item) => (
                <Link
                  key={item.id}
                  to={paths.account(item.id)}
                  aria-current={item.id === tab ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}
              <button type="button" className="out" onClick={logout}>
                {text.logout}
              </button>
            </nav>
            <div>
              <section className="tab">
                <h2>{text.tabs.find((item) => item.id === tab)?.label}</h2>
                {tab === "orders" && <OrderHistory email={user.email} />}
                {tab === "addr" && <AddressBook user={user} />}
                {tab === "wish" && <WishList />}
                {tab === "profile" && <ProfileForm key={user.email} user={user} />}
              </section>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
