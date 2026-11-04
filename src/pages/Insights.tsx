import { useState } from "react";
import {
  BarChart3,
  FileText,
  Clock3,
  CircleCheck,
  CalendarDays,
  Download,
  ArrowUpRight,
  Info,
} from "lucide-react";
import { useApp } from "../contexts/AppContext";
import { categories } from "../data/mock";
import type { Category } from "../data/mock";
import { PageHeading } from "../components/UI";
export function Insights() {
  const { t, reports, appointments, notify } = useApp();
  const [period, setPeriod] = useState("all");
  const visible = reports.filter(
    (r) => period === "all" || r.date.startsWith("2026-11"),
  );
  const counts = (Object.keys(categories) as Category[]).map((key) => ({
    key,
    count: visible.filter((r) => r.category === key).length,
  }));
  function download() {
    const csv = [
      "Category,Reports",
      ...counts.map((c) => `"${t(...categories[c.key])}",${c.count}`),
    ].join("\n");
    const url = URL.createObjectURL(
      new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "yoti-demo-aggregated-insights.csv";
    a.click();
    URL.revokeObjectURL(url);
    notify(
      t(
        "Fictional aggregated insights exported.",
        "Analyses agrégées fictives exportées.",
      ),
    );
  }
  const resolved = visible.filter((r) => r.status === "resolved").length;
  return (
    <>
      <PageHeading
        eyebrow={t("SCHOOL & NGO WORKSPACE", "ESPACE ÉTABLISSEMENTS ET ONG")}
        title={t(
          "A clearer picture of wellbeing.",
          "Une vision plus claire du bien-être.",
        )}
        description={t(
          "Aggregated demo insights to help you understand where support is needed.",
          "Des analyses agrégées fictives pour mieux comprendre les besoins.",
        )}
        action={
          <button className="button secondary" onClick={download}>
            <Download size={17} />
            {t("Export insights", "Exporter les analyses")}
          </button>
        }
      />
      <div className="insights-toolbar">
        <span className="demo-data-label">
          <i className="dot green" />
          {t("Fictional demo campus", "Campus de démonstration fictif")}
        </span>
        <label>
          {t("Reporting period", "Période")}
          <select value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option value="all">
              {t("All demo data", "Toutes les données fictives")}
            </option>
            <option value="month">{t("November 2026", "Novembre 2026")}</option>
          </select>
        </label>
      </div>
      <div className="metric-grid">
        {[
          {
            icon: FileText,
            label: t("Total reports", "Total des signalements"),
            value: visible.length,
          },
          {
            icon: Clock3,
            label: t("Open cases", "Dossiers ouverts"),
            value: visible.length - resolved,
          },
          {
            icon: CircleCheck,
            label: t("Resolved cases", "Dossiers résolus"),
            value: resolved,
          },
          {
            icon: CalendarDays,
            label: t("Pending sessions", "Séances en attente"),
            value: appointments.filter(
              (a) =>
                a.status === "pending" &&
                (period === "all" || a.date.startsWith("2026-11")),
            ).length,
          },
        ].map(({ icon: Icon, label, value }) => (
          <div className="panel metric" key={label}>
            <Icon size={21} />
            <span>{label}</span>
            <strong>{String(value).padStart(2, "0")}</strong>
            <small>
              {t(
                "In the selected demo period",
                "Sur la période fictive choisie",
              )}
            </small>
          </div>
        ))}
      </div>
      <div className="insights-grid">
        <section className="panel">
          <div className="section-heading">
            <div>
              <h2>
                {t(
                  "Understanding the concerns",
                  "Comprendre les préoccupations",
                )}
              </h2>
              <p className="section-subtitle">
                {t(
                  "Reports by incident category",
                  "Signalements par catégorie",
                )}
              </p>
            </div>
            <BarChart3 size={21} />
          </div>
          <div className="bar-chart">
            {counts.map((c, i) => (
              <div className="bar-row" key={c.key}>
                <div>
                  <span>{t(...categories[c.key])}</span>
                  <strong>{c.count}</strong>
                </div>
                <div className="bar-track">
                  <span
                    style={{
                      width: `${visible.length ? (c.count / visible.length) * 100 : 0}%`,
                      background: [
                        "#3b7667",
                        "#86a993",
                        "#bdce9f",
                        "#dab49b",
                        "#beb2cd",
                      ][i],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="fine-print">
            {t(
              "Counts are derived from fictional cases in this session.",
              "Les valeurs proviennent des dossiers fictifs de cette session.",
            )}
          </p>
        </section>
        <section className="panel resolution-panel">
          <h2>{t("Moving towards resolution", "Vers une résolution")}</h2>
          <p className="section-subtitle">
            {t(
              "A snapshot of demo case progress",
              "Un aperçu de la progression fictive",
            )}
          </p>
          <div
            className="donut"
            style={{
              background: `conic-gradient(#245e50 0 ${visible.length ? (resolved / visible.length) * 100 : 0}%, #e9eee4 0 100%)`,
            }}
          >
            <div>
              <strong>
                {visible.length
                  ? Math.round((resolved / visible.length) * 100)
                  : 0}
                %
              </strong>
              <span>{t("resolved", "résolus")}</span>
            </div>
          </div>
          <div className="chart-legend">
            <span>
              <i className="dot green" />
              {t("Resolved", "Résolus")} <strong>{resolved}</strong>
            </span>
            <span>
              <i className="dot pale" />
              {t("Open", "Ouverts")}{" "}
              <strong>{visible.length - resolved}</strong>
            </span>
          </div>
        </section>
      </div>
      <section className="panel aggregate-activity">
        <div className="section-heading">
          <h2>{t("At a glance", "En un regard")}</h2>
          <ArrowUpRight size={20} />
        </div>
        <div className="aggregate-grid">
          <div>
            <span className="small-icon">
              <FileText size={19} />
            </span>
            <h3>{t("Every concern counts", "Chaque préoccupation compte")}</h3>
            <p>
              {t(
                `${visible.length} fictional reports in the selected period. No student names or report descriptions are included in this view.`,
                `${visible.length} signalements fictifs sur cette période. Aucun nom ni description individuelle n’apparaît dans cette vue.`,
              )}
            </p>
          </div>
          <div>
            <span className="small-icon">
              <Clock3 size={19} />
            </span>
            <h3>{t("Keep support moving", "Maintenir le soutien")}</h3>
            <p>
              {t(
                `${visible.filter((r) => r.status === "followup").length} demo cases currently need follow-up. Counsellors can review their case queue in their workspace.`,
                `${visible.filter((r) => r.status === "followup").length} dossiers fictifs nécessitent un suivi. Les conseillers disposent de leur propre espace de gestion.`,
              )}
            </p>
          </div>
        </div>
      </section>
      <div className="notice-box">
        <Info size={19} />
        <p>
          {t(
            "Demonstration analytics only. Role selection is for previewing interfaces; it is not authentication or access control.",
            "Analyses de démonstration uniquement. La sélection de rôle sert à prévisualiser les interfaces ; elle n’est pas un contrôle d’accès.",
          )}
        </p>
      </div>
    </>
  );
}
