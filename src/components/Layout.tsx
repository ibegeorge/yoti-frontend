import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  CalendarDays,
  BookOpen,
  Heart,
  ArrowUpRight,
  Globe2,
  Menu,
  X,
  ChevronDown,
  Info,
  LifeBuoy,
  ShieldCheck,
  BarChart3,
  Users,
} from "lucide-react";
import { useApp } from "../contexts/AppContext";
import type { Role } from "../data/mock";
import { Modal } from "./UI";
export function Layout() {
  const { t, lang, setLang, role, setRole, notice, reports } = useApp();
  const [mobile, setMobile] = useState(false);
  const [help, setHelp] = useState(false);
  const navigate = useNavigate();
  const sidebarRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!mobile) return;
    const previous = document.activeElement as HTMLElement | null;
    const sidebar = sidebarRef.current;
    sidebar?.querySelector<HTMLButtonElement>(".mobile-close")?.focus();
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobile(false);
        return;
      }
      if (e.key === "Tab") {
        const controls = Array.from(
          sidebar?.querySelectorAll<HTMLElement>("a,button") || [],
        ).filter((el) => el.getClientRects().length);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", handle);
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handle);
      document.body.style.overflow = oldOverflow;
      previous?.focus();
    };
  }, [mobile]);
  const roleLabel =
    role === "student"
      ? t("Student", "Élève")
      : role === "counsellor"
        ? t("Counsellor", "Conseiller")
        : t("Administrator / NGO", "Administration / ONG");
  const nav = [
    { to: "/", icon: LayoutDashboard, label: t("Overview", "Vue d’ensemble") },
    {
      to: "/reports",
      icon: role === "student" ? FileText : Users,
      label:
        role === "student"
          ? t("My reports", "Mes signalements")
          : t("Case management", "Gestion des dossiers"),
    },
    {
      to: "/appointments",
      icon: CalendarDays,
      label: t("Counselling", "Accompagnement"),
    },
    {
      to: "/resources",
      icon: BookOpen,
      label: t("Wellbeing resources", "Ressources bien-être"),
    },
  ];
  if (role === "admin")
    nav.splice(1, 2, {
      to: "/insights",
      icon: BarChart3,
      label: t("Reporting insights", "Analyses des signalements"),
    });
  return (
    <div className="app-shell">
      <a
        className="skip-link"
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main")?.focus();
          document.getElementById("main")?.scrollIntoView();
        }}
      >
        {t("Skip to content", "Aller au contenu")}
      </a>
      {mobile && (
        <div className="sidebar-scrim" onClick={() => setMobile(false)} />
      )}
      <aside
        ref={sidebarRef}
        role={mobile ? "dialog" : undefined}
        aria-modal={mobile ? true : undefined}
        aria-label={t("Navigation menu", "Menu de navigation")}
        className={`sidebar ${mobile ? "is-open" : ""}`}
      >
        <Link to="/" className="brand" onClick={() => setMobile(false)}>
          <span className="brand-symbol">
            <Heart size={24} />
            <span />
          </span>
          <span>
            yoti<span className="brand-dot">.</span>
          </span>
        </Link>
        <button
          className="mobile-close icon-button"
          aria-label={t("Close menu", "Fermer le menu")}
          onClick={() => setMobile(false)}
        >
          <X />
        </button>
        <div className="workspace">
          <span className="workspace-icon">Y</span>
          <div>
            <strong>
              {t("Your wellbeing space", "Votre espace bien-être")}
            </strong>
            <small>
              {t("Cameroon · Demo campus", "Cameroun · Campus démo")}
            </small>
          </div>
        </div>
        <p className="nav-caption">{t("YOUR SPACE", "VOTRE ESPACE")}</p>
        <nav aria-label={t("Main navigation", "Navigation principale")}>
          {nav.map(({ to, icon: Icon, label }) => (
            <NavLink
              to={to}
              key={to}
              end={to === "/"}
              onClick={() => setMobile(false)}
            >
              <Icon size={20} />
              <span>{label}</span>
              {to === "/reports" && (
                <span className="nav-count">
                  {role === "student"
                    ? reports.filter((r) => r.owner === "student").length
                    : reports.length}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="support-card">
            <span className="support-icon">
              <HeartHandshakeIcon />
            </span>
            <h3>
              {t(
                "A little support goes a long way.",
                "Un peu de soutien peut tout changer.",
              )}
            </h3>
            <p>
              {t(
                "You deserve to be heard. We’re here to help you find your next step.",
                "Vous méritez d’être écouté. Trouvons votre prochaine étape.",
              )}
            </p>
            <button
              onClick={() => {
                setHelp(true);
                setMobile(false);
              }}
            >
              {t("Find support", "Trouver du soutien")}
              <ArrowUpRight size={16} />
            </button>
          </div>
          <button className="help-link" onClick={() => setHelp(true)}>
            <LifeBuoy size={18} />
            {t("Help & guidance", "Aide et conseils")}
            <ArrowUpRight size={15} />
          </button>
          <div className="sidebar-footer">
            YOUTH ORIENTATION
            <br />
            TRACKING INITIATIVE
          </div>
        </div>
      </aside>
      <div className="main-shell" inert={mobile}>
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="menu-toggle icon-button"
              onClick={() => setMobile(true)}
              aria-label={t("Open menu", "Ouvrir le menu")}
            >
              <Menu />
            </button>
            <span className="portal-label">
              {roleLabel} {t("portal", " · portail")}
            </span>
            <span className="demo-pill">
              {t("FRONTEND DEMO", "DÉMO FRONTEND")}
            </span>
          </div>
          <div className="topbar-actions">
            <button
              className="language-button"
              onClick={() => setLang(lang === "en" ? "fr" : "en")}
              aria-label={t("Switch to French", "Passer en anglais")}
            >
              <Globe2 size={17} />
              <span>{lang === "en" ? "EN" : "FR"}</span>
              <ChevronDown size={13} />
            </button>
            <div className="topbar-divider" />
            <div className="role-control">
              <span className="avatar">
                {role === "student"
                  ? "AM"
                  : role === "counsellor"
                    ? "MN"
                    : "AD"}
              </span>
              <label>
                <span>{t("Explore as", "Explorer comme")}</span>
                <select
                  aria-label={t("Demo role", "Rôle de démonstration")}
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value as Role);
                    navigate("/");
                    setMobile(false);
                  }}
                >
                  <option value="student">{t("Student", "Élève")}</option>
                  <option value="counsellor">
                    {t("Counsellor", "Conseiller")}
                  </option>
                  <option value="admin">
                    {t("Administrator / NGO", "Administration / ONG")}
                  </option>
                </select>
              </label>
            </div>
          </div>
        </header>
        <main id="main" tabIndex={-1}>
          <Outlet />
        </main>
        <footer className="main-footer">
          <span>
            © 2026 YOTI <span className="footer-separator">·</span>{" "}
            {t("Every voice matters.", "Chaque voix compte.")}
          </span>
          <span>
            <Info size={13} />
            {t(
              "Demo only. Fictional data. Changes reset on refresh.",
              "Démo uniquement. Données fictives. Réinitialisation au rechargement.",
            )}
          </span>
        </footer>
      </div>
      {notice && (
        <div className="toast" role="status">
          <ShieldCheck size={20} />
          {notice}
        </div>
      )}
      {help && (
        <Modal
          title={t("You deserve support", "Vous méritez du soutien")}
          onClose={() => setHelp(false)}
        >
          <div className="notice-box">
            <Info size={20} />
            <p>
              {t(
                "YOTI is a frontend demonstration. Reports and requests are not sent to anyone. Do not enter real personal information.",
                "YOTI est une démonstration frontend. Aucun signalement ni demande n’est envoyé. N’entrez aucune donnée personnelle réelle.",
              )}
            </p>
          </div>
          <h3>
            {t("If you need help now", "Si vous avez besoin d’aide maintenant")}
          </h3>
          <p>
            {t(
              "If you are in immediate danger, move to a safer place if possible and contact local emergency services or a trusted adult in person. This prototype is not monitored.",
              "En cas de danger immédiat, rejoignez un lieu plus sûr si possible et contactez les services d’urgence locaux ou un adulte de confiance en personne. Ce prototype n’est pas surveillé.",
            )}
          </p>
          <p>
            {t(
              "For ongoing support, speak with your school counsellor or a qualified mental health professional. YOTI’s resources do not replace professional care.",
              "Pour un soutien régulier, adressez-vous à votre conseiller scolaire ou à un professionnel qualifié. Les ressources YOTI ne remplacent pas les soins professionnels.",
            )}
          </p>
          <Link
            className="button primary"
            to="/resources"
            onClick={() => setHelp(false)}
          >
            {t("Explore wellbeing resources", "Explorer les ressources")}
          </Link>
        </Modal>
      )}
    </div>
  );
}
function HeartHandshakeIcon() {
  return <Heart size={23} />;
}
