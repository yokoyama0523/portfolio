import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { sampleMeta } from "~/samples/shared/meta";
import { AdminLogin } from "../admin/AdminLogin";
import { CustomersView } from "../admin/CustomersView";
import { Dashboard } from "../admin/Dashboard";
import { OrderDrawer } from "../admin/OrderDrawer";
import { OrdersView } from "../admin/OrdersView";
import { SettingsView } from "../admin/SettingsView";
import { StockView } from "../admin/StockView";
import { adminPage as text } from "../content/admin";
import { shop } from "../content/catalog";
import { paths } from "../content/paths";
import { useShop } from "../store/ShopContext";
import "../styles/admin.css";

export const meta = () => sampleMeta("ec", text.meta);

const [firstView] = text.views;
const pad = (value: number) => String(value).padStart(2, "0");
const stampOf = (date: Date) =>
  `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;

function Updated() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => setNow(new Date()), []);
  return <span className="d">{now ? text.updated(stampOf(now)) : ""}</span>;
}

export default function EcAdmin() {
  const { loaded, admin, orders } = useShop();
  const location = useLocation();
  const view = text.views.find((item) => item.id === location.hash.replace("#", "")) ?? firstView;
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const open = (no: string) => {
    setSelected(no);
    setDrawerOpen(true);
  };
  const openFromDashboard = (no: string) => {
    navigate({ hash: "orders" });
    open(no);
  };
  const close = useCallback(() => setDrawerOpen(false), []);

  if (!loaded) return <div className="admin" />;
  if (!admin.signedIn)
    return (
      <div className="admin">
        <AdminLogin />
      </div>
    );

  return (
    <div className="admin">
      <div className="app">
        <aside className="sb">
          <div className="logo">{shop.name}</div>
          <nav aria-label={text.navLabel}>
            {text.views.map((item) => (
              <Link
                key={item.id}
                to={{ hash: item.id }}
                aria-current={item.id === view.id ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="sb-ft">
            <a href={paths.home} target="_blank" rel="noopener">
              {text.openShop}
            </a>
            <button type="button" onClick={admin.signOut}>
              {text.logout}
            </button>
          </div>
        </aside>
        <main className="mainp">
          <div className="top">
            <h1>{view.label}</h1>
            <Updated key={view.id} />
          </div>
          {view.id === "dash" && <Dashboard onOpen={openFromDashboard} />}
          {view.id === "orders" && <OrdersView onOpen={open} />}
          {view.id === "stock" && <StockView />}
          {view.id === "customers" && <CustomersView />}
          {view.id === "settings" && <SettingsView />}
        </main>
      </div>
      <OrderDrawer
        order={orders.all.find((order) => order.no === selected) ?? null}
        open={drawerOpen}
        onClose={close}
      />
    </div>
  );
}
