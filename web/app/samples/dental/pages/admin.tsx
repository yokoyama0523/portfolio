import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { startOfToday } from "~/samples/shared/dates";
import { sampleMeta } from "~/samples/shared/meta";
import { AdminLogin } from "../admin/AdminLogin";
import { DayView, type Slot } from "../admin/DayView";
import { Drawer } from "../admin/Drawer";
import { ListView } from "../admin/ListView";
import { NewsEditor } from "../admin/NewsEditor";
import { NewsView } from "../admin/NewsView";
import { SettingsView } from "../admin/SettingsView";
import { clinicActions, newNewsId, useClinic } from "../admin/store";
import { WindowMark } from "../components/Icons";
import { adminPage as text } from "../content/admin";
import { clinic as site } from "../content/clinic";
import "../styles/admin.css";

export const meta = () => sampleMeta("dental", text.meta);

const [firstView] = text.views;

const parse = (date: string) => {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export default function DentalAdmin() {
  const data = useClinic();
  const location = useLocation();
  const navigate = useNavigate();
  const view = text.views.find((item) => item.id === location.hash.replace("#", "")) ?? firstView;
  const [date, setDate] = useState<Date | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [slot, setSlot] = useState<Slot | null>(null);
  const [newsId, setNewsId] = useState<string | null>(null);

  useEffect(() => setDate(startOfToday()), []);

  const close = useCallback(() => {
    setOpenId(null);
    setSlot(null);
  }, []);
  const closeNews = useCallback(() => setNewsId(null), []);
  const openReservation = (id: string) => {
    setSlot(null);
    setOpenId(id);
  };
  const openNew = (next: Slot) => {
    setOpenId(null);
    setSlot(next);
  };
  const created = (id: string) => {
    setSlot(null);
    setOpenId(id);
  };
  const openFromList = (id: string) => {
    const found = data?.reservations.find((r) => r.id === id);
    if (found) setDate(parse(found.date));
    openReservation(id);
  };

  if (!data || !date) return <div className="adm" />;
  if (!data.signedIn)
    return (
      <div className="adm">
        <AdminLogin />
      </div>
    );

  return (
    <div className="adm">
      <div className="adm-app">
        <aside className="adm-side">
          <p className="adm-brand">
            <WindowMark />
            <span>
              <b>{site.name}</b>
              <small>{text.brand}</small>
            </span>
          </p>
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
          <div className="adm-side-ft">
            <a href={site.paths.home} target="_blank" rel="noopener">
              {text.openSite}
            </a>
            <button
              type="button"
              onClick={() => {
                clinicActions.signOut();
                navigate({ hash: "" });
              }}
            >
              {text.logout}
            </button>
          </div>
        </aside>
        <main className="adm-main">
          <h1>{view.label}</h1>
          {view.id === "day" && (
            <DayView
              date={date}
              reservations={data.reservations}
              settings={data.settings}
              onDate={setDate}
              onOpen={openReservation}
              onNew={openNew}
            />
          )}
          {view.id === "list" && (
            <ListView reservations={data.reservations} onOpen={openFromList} />
          )}
          {view.id === "news" && (
            <NewsView news={data.news} onOpen={setNewsId} onNew={() => setNewsId(newNewsId())} />
          )}
          {view.id === "settings" && <SettingsView settings={data.settings} />}
        </main>
      </div>
      <Drawer data={data} openId={openId} slot={slot} onClose={close} onCreated={created} />
      {newsId && <NewsEditor key={newsId} id={newsId} news={data.news} onClose={closeNews} />}
    </div>
  );
}
