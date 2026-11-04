import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  FileText,
  CalendarDays,
  BookOpen,
  Sun,
  ChevronRight,
  Clock3,
  Check,
  Leaf,
  Heart,
  MessageCircle,
  CircleCheck,
  ClipboardList,
} from "lucide-react";
import { useApp } from "../contexts/AppContext";
import { categories } from "../data/mock";
import { resources } from "../data/mock";
import { ResourceCard, StatusBadge } from "../components/UI";
import { Insights } from "./Insights";
export function Dashboard() {
  const { role } = useApp();
  return role === "student" ? (
    <StudentDashboard />
  ) : role === "admin" ? (
    <Insights />
  ) : (
    <CounsellorDashboard />
  );
}
function StudentDashboard() {
  const { t, reports, appointments, mood, setMood, date } = useApp();
  const mine = reports.filter((r) => r.owner === "student");
  const next = appointments
    .filter((a) => a.owner === "student" && a.status !== "cancelled")
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))[0];
  const moods = [
    ["Difficult", "Difficile"],
    ["A little low", "Un peu bas"],
    ["Okay", "Ça va"],
    ["Good", "Bien"],
    ["Great", "Très bien"],
  ];
  return (
    <>
      <div className="welcome-heading">
        <div>
          <p className="eyebrow">
            <Sun size={15} />
            {t(
              "A NEW DAY, AT YOUR OWN PACE",
              "UN NOUVEAU JOUR, À VOTRE RYTHME",
            )}
          </p>
          <h1>
            {t("Hello, Alex", "Bonjour, Alex")} <span className="wave">✺</span>
          </h1>
          <p className="muted">
            {t(
              "It’s good to have you here. How can we support you today?",
              "Heureux de vous retrouver. Comment pouvons-nous vous aider ?",
            )}
          </p>
        </div>
        <div className="date-label">
          <CalendarDays size={16} />
          {t("Tuesday, 3 November 2026", "Mardi 3 novembre 2026")}
        </div>
      </div>
      <section className="hero">
        <div className="hero-content">
          <span className="hero-kicker">
            <span />
            {t("A SPACE FOR YOU", "UN ESPACE POUR VOUS")}
          </span>
          <h2>
            {t("Your voice matters.", "Votre voix compte.")}
            <br />
            <span>{t("Your wellbeing, too.", "Votre bien-être aussi.")}</span>
          </h2>
          <p>
            {t(
              "Big feelings or small worries — you don’t have to navigate them alone. Take the first step. We’re here to help.",
              "Grandes émotions ou petits soucis : vous n’avez pas à les traverser seul. Faites le premier pas.",
            )}
          </p>
          <Link to="/appointments" className="button light">
            {t("Let’s talk", "Parlons-en")}
            <ArrowUpRight size={17} />
          </Link>
          <span className="hero-footnote">
            <Heart size={13} />
            {t(
              "Support starts with a conversation",
              "Le soutien commence par un échange",
            )}
          </span>
        </div>
        <GardenIllustration />
      </section>
      <div className="quick-grid">
        <Link className="quick-card" to="/reports/new">
          <span className="quick-icon peach-icon">
            <FileText />
          </span>
          <div>
            <h3>{t("Share a concern", "Partager une préoccupation")}</h3>
            <p>
              {t(
                "Take a step towards support",
                "Un premier pas vers du soutien",
              )}
            </p>
          </div>
          <ArrowUpRight size={20} />
        </Link>
        <Link className="quick-card" to="/appointments">
          <span className="quick-icon sage-icon">
            <CalendarDays />
          </span>
          <div>
            <h3>{t("Talk to a counsellor", "Parler à un conseiller")}</h3>
            <p>
              {t(
                "Make time for your wellbeing",
                "Prenez soin de votre bien-être",
              )}
            </p>
          </div>
          <ArrowUpRight size={20} />
        </Link>
        <Link className="quick-card" to="/resources">
          <span className="quick-icon lavender-icon">
            <BookOpen />
          </span>
          <div>
            <h3>{t("Find your balance", "Trouver votre équilibre")}</h3>
            <p>
              {t(
                "Little tools for everyday life",
                "Des outils pour le quotidien",
              )}
            </p>
          </div>
          <ArrowUpRight size={20} />
        </Link>
      </div>
      <div className="dashboard-columns">
        <div className="dashboard-main">
          <section className="panel reports-preview">
            <div className="section-heading">
              <h2>
                {t(
                  "Your reports, at a glance",
                  "Vos signalements en un regard",
                )}
              </h2>
              <Link className="text-link" to="/reports">
                {t("View all", "Voir tout")}
                <ArrowRight size={15} />
              </Link>
            </div>
            <p className="section-subtitle">
              {t(
                "Keep up with the steps being taken.",
                "Suivez les étapes de vos démarches.",
              )}
            </p>
            <div className="report-stat-row">
              <div>
                <strong>{mine.length.toString().padStart(2, "0")}</strong>
                <span>{t("Total reports", "Signalements")}</span>
              </div>
              <div>
                <strong>
                  {mine
                    .filter((r) => r.status !== "resolved")
                    .length.toString()
                    .padStart(2, "0")}
                </strong>
                <span>
                  <i className="dot amber" />
                  {t("In progress", "En cours")}
                </span>
              </div>
              <div>
                <strong>
                  {mine
                    .filter((r) => r.status === "resolved")
                    .length.toString()
                    .padStart(2, "0")}
                </strong>
                <span>
                  <i className="dot green" />
                  {t("Resolved", "Résolus")}
                </span>
              </div>
            </div>
            <div className="compact-reports">
              {mine.slice(0, 2).map((r) => (
                <Link to={`/reports?case=${r.id}`} key={r.id}>
                  <span className="small-icon">
                    <FileText size={18} />
                  </span>
                  <div>
                    <strong>{t(...categories[r.category])}</strong>
                    <small>
                      {r.id} <span>·</span> {date(r.date)}
                    </small>
                  </div>
                  <StatusBadge status={r.status} />
                  <ChevronRight size={16} />
                </Link>
              ))}
            </div>
          </section>
          <section className="resources-preview">
            <div className="section-heading">
              <div>
                <p className="eyebrow">
                  {t("SMALL STEPS, BETTER DAYS", "PETITS PAS, JOURS MEILLEURS")}
                </p>
                <h2>
                  {t(
                    "A little care for your mind",
                    "Un peu de soin pour votre esprit",
                  )}
                </h2>
              </div>
              <Link className="text-link" to="/resources">
                {t("Explore all", "Tout explorer")}
                <ArrowRight size={15} />
              </Link>
            </div>
            <div className="resource-grid two">
              {resources.slice(0, 2).map((r) => (
                <ResourceCard key={r.id} resource={r} />
              ))}
            </div>
          </section>
        </div>
        <aside className="dashboard-side">
          <section className="panel mood-panel">
            <span className="eyebrow">
              {t("A MOMENT FOR YOU", "UN MOMENT POUR VOUS")}
            </span>
            <h2>{t("How are you feeling?", "Comment vous sentez-vous ?")}</h2>
            <p>
              {t(
                "There’s no right or wrong answer.",
                "Il n’y a pas de bonne ou mauvaise réponse.",
              )}
            </p>
            <div className="mood-options">
              {moods.map((label, i) => (
                <button
                  key={i}
                  className={mood === i ? "selected" : ""}
                  aria-label={t(...(label as [string, string]))}
                  aria-pressed={mood === i}
                  onClick={() => setMood(i)}
                >
                  <MoodFace index={i} />
                </button>
              ))}
            </div>
            <div className="mood-labels">
              <span>{t("Not so great", "Pas très bien")}</span>
              <span>{t("Feeling good", "Très bien")}</span>
            </div>
            <div className="mood-response" aria-live="polite">
              {mood === null ? (
                <>
                  <Leaf size={14} />
                  {t(
                    "A small check-in can make a difference.",
                    "Un petit bilan peut faire la différence.",
                  )}
                </>
              ) : (
                <>
                  <Check size={15} />
                  {mood < 2
                    ? t(
                        "Thank you for checking in. Support is here when you need it.",
                        "Merci pour ce bilan. Du soutien est à votre disposition.",
                      )
                    : t(
                        "Thanks for making a little space for yourself.",
                        "Merci d’avoir pris un moment pour vous.",
                      )}
                </>
              )}
            </div>
            {mood !== null && mood < 2 && (
              <Link className="text-link" to="/appointments">
                {t("Explore counselling", "Explorer l’accompagnement")}
                <ArrowRight size={14} />
              </Link>
            )}
          </section>
          <section className="panel appointment-preview">
            <div className="section-heading">
              <h2>{t("Your next conversation", "Votre prochain échange")}</h2>
              <CalendarDays size={18} />
            </div>
            {next ? (
              <>
                <div className="counsellor-profile">
                  <div className="avatar large">MN</div>
                  <div>
                    <strong>{t("Marie N.", "Marie N.")}</strong>
                    <small>
                      {t(
                        "School counsellor · Demo profile",
                        "Conseillère scolaire · Profil fictif",
                      )}
                    </small>
                  </div>
                </div>
                <div className="appointment-time">
                  <CalendarDays size={16} />
                  <span>{date(next.date)}</span>
                  <Clock3 size={16} />
                  <span>{next.time}</span>
                </div>
                <div className="appointment-preview-bottom">
                  <StatusBadge status={next.status} />
                  <Link to="/appointments" className="text-link">
                    {t("Details", "Détails")}
                    <ArrowUpRight size={15} />
                  </Link>
                </div>
              </>
            ) : (
              <>
                <p>
                  {t(
                    "Make space for a conversation at your own pace.",
                    "Prenez le temps d’un échange à votre rythme.",
                  )}
                </p>
                <Link className="text-link" to="/appointments">
                  {t("Find a time", "Choisir un créneau")}
                  <ArrowRight size={15} />
                </Link>
              </>
            )}
          </section>
          <div className="gentle-note">
            <span>“</span>
            <p>
              {t(
                "You don’t have to have it all figured out to take the next step.",
                "Vous n’avez pas besoin de tout comprendre pour faire le prochain pas.",
              )}
            </p>
            <small>{t("ONE DAY AT A TIME", "UN JOUR À LA FOIS")}</small>
          </div>
        </aside>
      </div>
      <div className="prototype-note">
        <span className="small-icon">
          <Heart size={18} />
        </span>
        <p>
          <strong>
            {t(
              "A thoughtful space, still taking shape.",
              "Un espace attentionné, encore en construction.",
            )}
          </strong>{" "}
          {t(
            "This is a demo. Please use fictional information; no reports or appointments are sent.",
            "Ceci est une démo. Utilisez des informations fictives ; rien n’est envoyé.",
          )}
        </p>
      </div>
    </>
  );
}
function MoodFace({ index }: { index: number }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <circle
        cx="20"
        cy="20"
        r="17"
        fill={["#e8d8cc", "#ece1bf", "#e7e4bf", "#dbe4bd", "#c7debe"][index]}
      />
      <circle cx="14" cy="17" r="1.3" fill="currentColor" />
      <circle cx="26" cy="17" r="1.3" fill="currentColor" />
      <path
        d={
          index === 0
            ? "M13 27 Q20 19 27 27"
            : index === 1
              ? "M14 26 Q20 22 26 26"
              : index === 2
                ? "M14 25 H26"
                : index === 3
                  ? "M13 23 Q20 30 27 23"
                  : "M12 22 Q20 34 28 22 Z"
        }
        fill={index === 4 ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
function GardenIllustration() {
  return (
    <svg
      className="garden-art"
      viewBox="0 0 430 300"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="252" cy="149" r="112" fill="#285e50" />
      <circle cx="315" cy="65" r="31" fill="#dbe4a7" />
      <path
        d="M93 272C108 172 167 102 217 70"
        stroke="#598474"
        strokeWidth="1.3"
        strokeDasharray="4 7"
      />
      <path
        d="M338 273C373 215 371 170 342 132"
        stroke="#598474"
        strokeWidth="1.3"
        strokeDasharray="4 7"
      />
      <ellipse cx="238" cy="278" rx="148" ry="10" fill="#12453d" />
      <path d="M176 271V152a57 57 0 01114 0v119" fill="#deccad" />
      <path d="M191 269V154a42 42 0 0184 0v115" fill="#628879" />
      <path d="M232 271V168" stroke="#d6dfc0" strokeWidth="3" />
      <path
        d="M231 218C190 218 187 184 191 175c30-1 42 18 40 43Z"
        fill="#d3df9d"
      />
      <path
        d="M233 200C269 195 277 164 271 154c-30 4-40 24-38 46Z"
        fill="#edf0c9"
      />
      <path
        d="M233 251C273 250 286 222 282 208c-31-1-49 19-49 43Z"
        fill="#b3c982"
      />
      <path d="M230 244c-25 0-47-18-47-39 28 0 46 19 47 39Z" fill="#8fb4a0" />
      <path d="M136 275V203" stroke="#a0b79b" strokeWidth="3" />
      <path d="M136 245c-31-2-41-19-40-35 24-1 40 13 40 35Z" fill="#96b29c" />
      <path d="M137 225c28-1 38-21 34-33-24 2-34 16-34 33Z" fill="#cad697" />
      <path d="M124 274h26l7-31h-40l7 31Z" fill="#d49a7b" />
      <path d="M324 273v-60" stroke="#9bb79a" strokeWidth="3" />
      <path d="M325 246c23-4 31-20 28-31-20 3-29 16-28 31Z" fill="#c7d69a" />
      <path d="M324 235c-21 1-33-15-31-25 19-2 30 9 31 25Z" fill="#87ad97" />
      <path d="M308 251h31l-5 23h-21l-5-23Z" fill="#e0c7a0" />
      <path
        d="M122 122l5 10 11 2-8 8 2 12-10-6-10 6 2-12-8-8 11-2 5-10Z"
        fill="#d3df9d"
      />
      <path
        d="M344 172v13m-6-6h12"
        stroke="#e1ccad"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="182" cy="56" r="4" fill="#8da890" />
      <circle cx="368" cy="111" r="3" fill="#8da890" />
      <path d="M242 47c-13-15-23 5 0 15 23-10 13-30 0-15Z" fill="#d9a78a" />
    </svg>
  );
}
function CounsellorDashboard() {
  const { t, reports, appointments, date } = useApp();
  return (
    <>
      <div className="welcome-heading">
        <div>
          <p className="eyebrow">
            {t("COUNSELLOR WORKSPACE", "ESPACE CONSEILLER")}
          </p>
          <h1>
            {t(
              "A little care. A real difference.",
              "Un peu de soin. Un vrai changement.",
            )}
          </h1>
          <p className="muted">
            {t(
              "Welcome, Marie. Here’s a look at your demo caseload.",
              "Bienvenue, Marie. Voici un aperçu de vos dossiers fictifs.",
            )}
          </p>
        </div>
        <Link to="/reports" className="button primary">
          {t("Manage cases", "Gérer les dossiers")}
          <ArrowRight size={17} />
        </Link>
      </div>
      <div className="metric-grid">
        {[
          [
            ClipboardList,
            t("Assigned cases", "Dossiers attribués"),
            reports.length,
          ],
          [
            MessageCircle,
            t("Pending review", "À examiner"),
            reports.filter((r) => r.status === "submitted").length,
          ],
          [
            Clock3,
            t("Need follow-up", "Suivi nécessaire"),
            reports.filter((r) => r.status === "followup").length,
          ],
          [
            CircleCheck,
            t("Scheduled sessions", "Séances programmées"),
            appointments.filter((a) => a.status === "confirmed").length,
          ],
        ].map(([Icon, label, value]) => {
          const I = Icon as typeof ClipboardList;
          return (
            <div className="panel metric" key={String(label)}>
              <I size={21} />
              <span>{String(label)}</span>
              <strong>{String(value).padStart(2, "0")}</strong>
              <small>
                {t("Current demo workspace", "Espace de démonstration")}
              </small>
            </div>
          );
        })}
      </div>
      <div className="counsellor-grid">
        <section className="panel">
          <div className="section-heading">
            <h2>
              {t(
                "Cases needing your attention",
                "Dossiers nécessitant votre attention",
              )}
            </h2>
            <Link to="/reports" className="text-link">
              {t("View all", "Voir tout")}
              <ArrowRight size={16} />
            </Link>
          </div>
          {reports
            .filter((r) => r.status !== "resolved")
            .map((r) => (
              <Link
                key={r.id}
                className="case-list-item"
                to={`/reports?case=${r.id}`}
              >
                <span className="small-icon">
                  <FileText size={18} />
                </span>
                <div>
                  <strong>{r.id}</strong>
                  <small>
                    {t(...categories[r.category])} · {date(r.date)}
                  </small>
                </div>
                <StatusBadge status={r.status} />
                <ChevronRight size={16} />
              </Link>
            ))}
        </section>
        <section className="panel">
          <div className="section-heading">
            <h2>{t("Upcoming sessions", "Séances à venir")}</h2>
            <CalendarDays size={20} />
          </div>
          {appointments
            .filter((a) => a.status !== "cancelled")
            .map((a) => (
              <div className="session-row" key={a.id}>
                <div className="date-square">
                  {a.date.slice(-2)}
                  <small>NOV</small>
                </div>
                <div>
                  <strong>
                    {a.time} · {t("Counselling", "Accompagnement")}
                  </strong>
                  <small>
                    {a.id} · {t("Fictional student", "Élève fictif")}
                  </small>
                  <StatusBadge status={a.status} />
                </div>
              </div>
            ))}
          <Link className="button secondary full" to="/appointments">
            {t("Open schedule", "Ouvrir le planning")}
            <ArrowRight size={16} />
          </Link>
        </section>
      </div>
      <section className="panel activity-panel">
        <h2>{t("Recent case activity", "Activité récente des dossiers")}</h2>
        {reports.slice(0, 3).map((r) => (
          <div className="activity-row" key={r.id}>
            <span className="activity-dot" />
            <div>
              <strong>{r.id}</strong>
              <p>
                {t("Case status:", "Statut du dossier :")}{" "}
                <StatusBadge status={r.status} />
              </p>
            </div>
            <small>{date(r.date)}</small>
          </div>
        ))}
      </section>
    </>
  );
}
