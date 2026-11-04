import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Plus,
  Search,
  FileText,
  Check,
  Info,
  UserRound,
  EyeOff,
  CheckCircle2,
} from "lucide-react";
import { useApp } from "../contexts/AppContext";
import { categories, statuses } from "../data/mock";
import type { Category, Report, Status } from "../data/mock";
import { Empty, Modal, PageHeading, StatusBadge } from "../components/UI";
export function Reports() {
  const { t, role, reports, setReports, date, notify } = useApp();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [params, setParams] = useSearchParams();
  const selected = reports.find((r) => r.id === params.get("case"));
  const mine =
    role === "student" ? reports.filter((r) => r.owner === "student") : reports;
  const filtered = mine.filter(
    (r) =>
      (filter === "all" || r.status === filter) &&
      `${r.id} ${t(...categories[r.category])}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  if (role === "admin")
    return (
      <div className="panel">
        <h1>{t("Aggregated insights", "Analyses agrégées")}</h1>
        <p>
          {t(
            "This demo administrator view contains aggregated information only.",
            "Cette vue administrateur ne contient que des données agrégées.",
          )}
        </p>
        <Link className="button primary" to="/insights">
          {t("View insights", "Voir les analyses")}
        </Link>
      </div>
    );
  return (
    <>
      <PageHeading
        eyebrow={t("A STEP TOWARDS SUPPORT", "UN PAS VERS LE SOUTIEN")}
        title={
          role === "student"
            ? t("Your voice, followed through.", "Votre voix, accompagnée.")
            : t("Case management", "Gestion des dossiers")
        }
        description={
          role === "student"
            ? t(
                "Follow your reports and see what happens next.",
                "Suivez vos signalements et les prochaines étapes.",
              )
            : t(
                "Review fictional cases, plan follow-ups and update their status.",
                "Examinez les dossiers fictifs et mettez leur statut à jour.",
              )
        }
        action={
          role === "student" && (
            <Link to="/reports/new" className="button primary">
              <Plus size={18} />
              {t("Share a concern", "Partager une préoccupation")}
            </Link>
          )
        }
      />
      <div className="notice-box">
        <Info size={19} />
        <p>
          {t(
            "Demo records only. Reports stay in this browser session and are not sent to a school or counsellor.",
            "Dossiers fictifs uniquement. Les signalements restent dans cette session et ne sont envoyés à personne.",
          )}
        </p>
      </div>
      <section className="panel">
        <div className="table-toolbar">
          <div
            className="filter-tabs"
            aria-label={t("Filter reports", "Filtrer les signalements")}
          >
            {[
              ["all", t("All reports", "Tous")],
              ["review", t("In review", "En cours")],
              ["followup", t("Follow-up", "Suivi")],
              ["resolved", t("Resolved", "Résolus")],
            ].map(([value, label]) => (
              <button
                key={value}
                onClick={() => setFilter(value)}
                aria-pressed={filter === value}
                className={filter === value ? "active" : ""}
              >
                {label}
              </button>
            ))}
          </div>
          <label className="search-field">
            <Search size={17} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t(
                "Search reference or category",
                "Référence ou catégorie",
              )}
              aria-label={t("Search reports", "Rechercher un signalement")}
            />
          </label>
        </div>
        {filtered.length ? (
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>{t("Reference", "Référence")}</th>
                  <th>{t("Category", "Catégorie")}</th>
                  <th>{t("Submitted", "Date")}</th>
                  {role === "counsellor" && (
                    <th>{t("Priority", "Priorité")}</th>
                  )}
                  <th>{t("Status", "Statut")}</th>
                  <th>
                    <span className="sr-only">{t("Actions", "Actions")}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <strong className="reference">{r.id}</strong>
                      <small>
                        {r.anonymous
                          ? t("Anonymous", "Anonyme")
                          : t("Identified · demo", "Identifié · démo")}
                      </small>
                    </td>
                    <td>{t(...categories[r.category])}</td>
                    <td>{date(r.date)}</td>
                    {role === "counsellor" && (
                      <td>
                        <span className={`priority ${r.priority}`}>
                          {r.priority === "high"
                            ? t("High", "Élevée")
                            : t("Normal", "Normale")}
                        </span>
                      </td>
                    )}
                    <td>
                      <StatusBadge status={r.status} />
                    </td>
                    <td>
                      <button
                        className="text-link"
                        onClick={() => setParams({ case: r.id })}
                      >
                        {t("View", "Voir")}
                        <ArrowRight size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Empty
            text={t(
              "No reports match your search. Try another category or filter.",
              "Aucun résultat. Essayez une autre catégorie ou un autre filtre.",
            )}
            action={
              <button
                className="button secondary"
                onClick={() => {
                  setQuery("");
                  setFilter("all");
                }}
              >
                {t("Clear filters", "Effacer les filtres")}
              </button>
            }
          />
        )}
        <div className="table-foot">
          {filtered.length} {t("demo reports", "signalements fictifs")}
        </div>
      </section>
      {selected && mine.some((r) => r.id === selected.id) && (
        <Modal title={selected.id} onClose={() => setParams({})}>
          <div className="detail-heading">
            <span className="quick-icon sage-icon">
              <FileText />
            </span>
            <div>
              <h3>{t(...categories[selected.category])}</h3>
              <p>{date(selected.date)}</p>
            </div>
            <StatusBadge status={selected.status} />
          </div>
          <div className="detail-grid">
            <div>
              <small>{t("Reporting mode", "Mode de signalement")}</small>
              <strong>
                {selected.anonymous
                  ? t("Anonymous", "Anonyme")
                  : t(
                      "Identified · fictional profile",
                      "Identifié · profil fictif",
                    )}
              </strong>
            </div>
            <div>
              <small>{t("Assigned counsellor", "Conseillère attribuée")}</small>
              <strong>Marie N. · {t("Demo", "Démo")}</strong>
            </div>
            <div>
              <small>{t("Location", "Lieu")}</small>
              <strong>
                {selected.location || t("Not specified", "Non précisé")}
              </strong>
            </div>
            <div>
              <small>{t("Priority", "Priorité")}</small>
              <strong>
                {selected.priority === "high"
                  ? t("High", "Élevée")
                  : t("Normal", "Normale")}
              </strong>
            </div>
          </div>
          {selected.incidentDate && (
            <p className="fine-print">
              {t("Incident date:", "Date de l’incident :")}{" "}
              {date(selected.incidentDate)}
            </p>
          )}
          <h3>{t("What was shared", "Description")}</h3>
          <p className="report-description">{selected.description}</p>
          <h3>{t("Report progress", "Progression")}</h3>
          <ol className="progress-list">
            {Object.entries(statuses).map(([value, label], i) => (
              <li
                className={
                  Object.keys(statuses).indexOf(selected.status) >= i
                    ? "complete"
                    : ""
                }
                key={value}
              >
                <span>
                  <Check size={13} />
                </span>
                {t(...label)}
              </li>
            ))}
          </ol>
          {role === "counsellor" && (
            <label className="field">
              {t("Update case status", "Mettre à jour le statut")}
              <select
                value={selected.status}
                onChange={(e) => {
                  setReports((prev) =>
                    prev.map((r) =>
                      r.id === selected.id
                        ? { ...r, status: e.target.value as Status }
                        : r,
                    ),
                  );
                  notify(
                    t("Demo case status updated.", "Statut fictif mis à jour."),
                  );
                }}
              >
                {Object.entries(statuses).map(([v, l]) => (
                  <option key={v} value={v}>
                    {t(...l)}
                  </option>
                ))}
              </select>
            </label>
          )}
          <p className="fine-print">
            {t(
              "Fictional demonstration. No actual case is being managed.",
              "Démonstration fictive. Aucun dossier réel n’est traité.",
            )}
          </p>
        </Modal>
      )}
    </>
  );
}
export function ReportForm() {
  const { t, setReports, date } = useApp();
  const [category, setCategory] = useState<Category | "">("");
  const [anonymous, setAnonymous] = useState(false);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [incidentDate, setIncidentDate] = useState("");
  const [support, setSupport] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [created, setCreated] = useState<Report | null>(null);
  const [step, setStep] = useState(1);
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (description.trim().length < 20) {
      setError(
        t(
          "Please add at least 20 characters of fictional detail.",
          "Ajoutez au moins 20 caractères de détails fictifs.",
        ),
      );
      return;
    }
    if (!consent) {
      setError(
        t(
          "Please confirm that you are using fictional information.",
          "Confirmez l’utilisation d’informations fictives.",
        ),
      );
      return;
    }
    const report: Report = {
      id: `YT-DEMO-${Date.now().toString().slice(-6)}`,
      category: category as Category,
      date: new Date().toLocaleDateString("en-CA", {
        timeZone: "Africa/Lagos",
      }),
      status: "submitted",
      anonymous,
      description:
        description.trim() + (support.trim() ? `\n\n${support.trim()}` : ""),
      location: location.trim(),
      incidentDate: incidentDate || undefined,
      priority: "normal",
      owner: "student",
    };
    setReports((prev) => [report, ...prev]);
    setCreated(report);
  }
  if (created)
    return (
      <div className="confirmation panel">
        <span className="confirmation-icon">
          <CheckCircle2 size={38} />
        </span>
        <p className="eyebrow">
          {t("DEMO COMPLETE", "DÉMONSTRATION TERMINÉE")}
        </p>
        <h1>
          {t("You’ve taken a first step.", "Vous avez fait un premier pas.")}
        </h1>
        <p>
          {t(
            "Your fictional report has been added to this demo session. No report has been sent and no one has been notified.",
            "Votre signalement fictif a été ajouté à cette session. Rien n’a été envoyé et personne n’a été informé.",
          )}
        </p>
        <div className="confirmation-reference">
          <small>{t("Your demo reference", "Votre référence fictive")}</small>
          <strong>{created.id}</strong>
          <span>{date(created.date)}</span>
        </div>
        <p className="fine-print">
          {t(
            "This record disappears when you refresh the page. If you need real help, contact a trusted adult or your school counsellor directly.",
            "Ce dossier disparaît au rechargement. Pour une aide réelle, contactez directement un adulte de confiance ou votre conseiller scolaire.",
          )}
        </p>
        <Link className="button primary" to="/reports">
          {t("View my reports", "Voir mes signalements")}
          <ArrowRight size={17} />
        </Link>
      </div>
    );
  return (
    <>
      <Link className="back-link" to="/reports">
        <ArrowLeft size={16} />
        {t("Back to reports", "Retour aux signalements")}
      </Link>
      <PageHeading
        eyebrow={t("YOUR VOICE MATTERS", "VOTRE VOIX COMPTE")}
        title={t(
          "Let’s take this one step at a time.",
          "Avançons un pas à la fois.",
        )}
        description={t(
          "Share only what you feel comfortable sharing. Use fictional details in this demo.",
          "Partagez à votre rythme. Utilisez uniquement des détails fictifs dans cette démo.",
        )}
      />
      <div className="form-layout">
        <section className="panel form-panel">
          <div className="form-steps">
            <span className={step === 1 ? "active" : ""}>
              01 <span>{t("Your concern", "Votre préoccupation")}</span>
            </span>
            <div />
            <span className={step === 2 ? "active" : ""}>
              02 <span>{t("A few details", "Quelques détails")}</span>
            </span>
          </div>
          <form onSubmit={submit}>
            {step === 1 ? (
              <>
                <h2>
                  {t(
                    "What would you like support with?",
                    "Pour quoi souhaitez-vous du soutien ?",
                  )}
                </h2>
                <p className="muted">
                  {t(
                    "Choose the category that feels closest to your concern.",
                    "Choisissez la catégorie qui correspond le mieux.",
                  )}
                </p>
                <fieldset className="category-choices">
                  <legend className="sr-only">
                    {t("Incident category", "Catégorie")}
                  </legend>
                  {Object.entries(categories).map(([v, label]) => (
                    <label
                      className={category === v ? "choice selected" : "choice"}
                      key={v}
                    >
                      <FileText size={19} />
                      <span>{t(...label)}</span>
                      <input
                        type="radio"
                        name="category"
                        value={v}
                        checked={category === v}
                        onChange={() => setCategory(v as Category)}
                      />
                    </label>
                  ))}
                </fieldset>
                <h3>
                  {t(
                    "How would you like to share?",
                    "Comment souhaitez-vous signaler ?",
                  )}
                </h3>
                <div className="report-mode">
                  <button
                    type="button"
                    aria-pressed={!anonymous}
                    className={!anonymous ? "selected" : ""}
                    onClick={() => setAnonymous(false)}
                  >
                    <UserRound size={21} />
                    <strong>
                      {t("Identified report", "Signalement identifié")}
                    </strong>
                    <small>
                      {t(
                        "Uses a fictional student profile. In a real service, ask how confidentiality is handled.",
                        "Utilise un profil fictif. Dans un service réel, renseignez-vous sur la confidentialité.",
                      )}
                    </small>
                  </button>
                  <button
                    type="button"
                    aria-pressed={anonymous}
                    className={anonymous ? "selected" : ""}
                    onClick={() => setAnonymous(true)}
                  >
                    <EyeOff size={21} />
                    <strong>
                      {t("Anonymous report", "Signalement anonyme")}
                    </strong>
                    <small>
                      {t(
                        "No name attached. A real service may have limited ways to follow up.",
                        "Aucun nom associé. Le suivi peut être limité dans un service réel.",
                      )}
                    </small>
                  </button>
                </div>
                <button
                  type="button"
                  className="button primary full"
                  disabled={category === ""}
                  onClick={() => {
                    setStep(2);
                    setError("");
                  }}
                >
                  {t("Continue to details", "Continuer")}
                  <ArrowRight size={17} />
                </button>
              </>
            ) : (
              <>
                <h2>
                  {t("Tell us a little more", "Dites-nous en un peu plus")}
                </h2>
                <div className="notice-box">
                  <Info size={18} />
                  <p>
                    {t(
                      "Frontend demo only. Do not include real names, contact details or personal incidents.",
                      "Démo frontend uniquement. N’incluez aucun nom, contact ou incident réel.",
                    )}
                  </p>
                </div>
                <label className="field">
                  {t("What happened?", "Que s’est-il passé ?")}{" "}
                  <span className="required">*</span>
                  <textarea
                    required
                    minLength={20}
                    maxLength={3000}
                    rows={5}
                    placeholder={t(
                      "Describe a fictional situation…",
                      "Décrivez une situation fictive…",
                    )}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <small>
                    {description.length}/3000 ·{" "}
                    {t("At least 20 characters", "Au moins 20 caractères")}
                  </small>
                </label>
                <div className="form-row">
                  <label className="field">
                    {t(
                      "When did it happen? (optional)",
                      "Date de l’incident (facultatif)",
                    )}
                    <input
                      type="date"
                      value={incidentDate}
                      max={new Date().toLocaleDateString("en-CA", {
                        timeZone: "Africa/Lagos",
                      })}
                      onChange={(e) => setIncidentDate(e.target.value)}
                    />
                  </label>
                  <label className="field">
                    {t("Where? (optional)", "Lieu (facultatif)")}
                    <input
                      maxLength={150}
                      placeholder={t("e.g. Demo campus", "Ex. Campus fictif")}
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </label>
                </div>
                <label className="field">
                  {t(
                    "Anything else? (optional)",
                    "Autres informations (facultatif)",
                  )}
                  <textarea
                    rows={3}
                    maxLength={1000}
                    value={support}
                    onChange={(e) => setSupport(e.target.value)}
                    placeholder={t(
                      "Any fictional context that may help",
                      "Un contexte fictif qui pourrait être utile",
                    )}
                  />
                </label>
                <label className="checkbox-field">
                  <input
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                  />
                  <span>
                    {t(
                      "I am using fictional details and understand this report will not be sent to anyone.",
                      "J’utilise des informations fictives et comprends que ce signalement ne sera envoyé à personne.",
                    )}
                  </span>
                </label>
                {error && (
                  <p role="alert" className="error-text">
                    {error}
                  </p>
                )}
                <div className="form-actions">
                  <button
                    type="button"
                    className="button secondary"
                    onClick={() => setStep(1)}
                  >
                    <ArrowLeft size={17} />
                    {t("Back", "Retour")}
                  </button>
                  <button type="submit" className="button primary">
                    {t("Submit demo report", "Envoyer le signalement fictif")}
                    <ArrowRight size={17} />
                  </button>
                </div>
              </>
            )}
          </form>
        </section>
        <aside className="form-aside">
          <span className="quick-icon sage-icon">
            <HeartIcon />
          </span>
          <h2>{t("At your own pace.", "À votre rythme.")}</h2>
          <p>
            {t(
              "You can go back, take a break or leave this form at any time. Your words and your comfort matter.",
              "Vous pouvez revenir en arrière, faire une pause ou quitter ce formulaire. Votre confort compte.",
            )}
          </p>
          <hr />
          <h3>
            {t(
              "What happens in this demo?",
              "Que se passe-t-il dans cette démo ?",
            )}
          </h3>
          <p>
            {t(
              "Your fictional report appears in “My reports”. It stays in memory until the page is refreshed. There is no permanent storage or real submission.",
              "Votre signalement fictif apparaît dans « Mes signalements ». Il reste en mémoire jusqu’au rechargement. Il n’y a ni stockage permanent ni envoi réel.",
            )}
          </p>
          <h3>{t("Need immediate help?", "Besoin d’aide immédiate ?")}</h3>
          <p>
            {t(
              "This app is not monitored. Seek help in person from a trusted adult or local emergency services if you are in danger.",
              "Cette application n’est pas surveillée. En cas de danger, contactez un adulte de confiance ou les services d’urgence locaux.",
            )}
          </p>
        </aside>
      </div>
    </>
  );
}
function HeartIcon() {
  return <Info size={23} />;
}
