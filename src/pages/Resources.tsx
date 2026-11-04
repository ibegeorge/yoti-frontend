import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Search,
  Heart,
  Clock3,
  Info,
} from "lucide-react";
import { resources } from "../data/mock";
import { useApp } from "../contexts/AppContext";
import {
  PageHeading,
  ResourceCard,
  ResourceArt,
  Empty,
} from "../components/UI";
import { NotFound } from "./NotFound";
export function Resources() {
  const { t } = useApp();
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const filtered = resources.filter(
    (r) =>
      (filter === "all" || r.category === filter) &&
      t(...r.title)
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <PageHeading
        eyebrow={t("SMALL STEPS, BETTER DAYS", "PETITS PAS, JOURS MEILLEURS")}
        title={t(
          "A little care for your mind.",
          "Un peu de soin pour votre esprit.",
        )}
        description={t(
          "Thoughtful reads and everyday tools to help you find your balance.",
          "Des lectures et des outils pour vous aider à trouver votre équilibre.",
        )}
      />
      <div className="resource-banner">
        <span className="quick-icon sage-icon">
          <Heart />
        </span>
        <div>
          <h2>
            {t(
              "You can start right where you are.",
              "Commencez là où vous en êtes.",
            )}
          </h2>
          <p>
            {t(
              "Take what you need, at your own pace. These resources support wellbeing and do not replace professional care.",
              "Avancez à votre rythme. Ces ressources soutiennent le bien-être et ne remplacent pas les soins professionnels.",
            )}
          </p>
        </div>
        <span className="banner-leaf" aria-hidden="true">
          ✳
        </span>
      </div>
      <div className="table-toolbar resource-toolbar">
        <div className="filter-tabs">
          {[
            ["all", t("All resources", "Toutes les ressources")],
            ["stress", t("Stress & balance", "Stress et équilibre")],
            ["wellbeing", t("Emotional wellbeing", "Bien-être émotionnel")],
            ["support", t("Finding support", "Trouver du soutien")],
          ].map(([v, l]) => (
            <button
              key={v}
              className={filter === v ? "active" : ""}
              aria-pressed={filter === v}
              onClick={() => setFilter(v)}
            >
              {l}
            </button>
          ))}
        </div>
        <label className="search-field">
          <Search size={17} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("Search resources", "Rechercher une ressource")}
            aria-label={t("Search resources", "Rechercher une ressource")}
          />
        </label>
      </div>
      <div className="resource-grid">
        {filtered.map((r) => (
          <ResourceCard key={r.id} resource={r} />
        ))}
      </div>
      {!filtered.length && (
        <Empty
          text={t(
            "No resources match. Try another search.",
            "Aucune ressource trouvée. Essayez une autre recherche.",
          )}
          action={
            <button
              className="button secondary"
              onClick={() => {
                setFilter("all");
                setQuery("");
              }}
            >
              {t("Clear filters", "Effacer les filtres")}
            </button>
          }
        />
      )}
      <section className="support-banner">
        <div>
          <span className="eyebrow">
            {t("WHEN YOU NEED MORE SUPPORT", "POUR PLUS DE SOUTIEN")}
          </span>
          <h2>
            {t(
              "You don’t have to work it out alone.",
              "Vous n’avez pas à tout résoudre seul.",
            )}
          </h2>
          <p>
            {t(
              "A qualified counsellor can help you explore what you are going through.",
              "Un conseiller qualifié peut vous aider à comprendre ce que vous traversez.",
            )}
          </p>
        </div>
        <Link className="button primary" to="/appointments">
          {t("Explore counselling", "Explorer l’accompagnement")}
          <ArrowRight size={17} />
        </Link>
      </section>
      <div className="notice-box">
        <Info size={20} />
        <p>
          {t(
            "If you are in immediate danger, seek help from local emergency services or a trusted adult in person. This demo is not monitored and cannot provide urgent support.",
            "En cas de danger immédiat, contactez les services d’urgence locaux ou un adulte de confiance en personne. Cette démo n’est pas surveillée et ne fournit pas d’aide urgente.",
          )}
        </p>
      </div>
    </>
  );
}
export function ResourceDetail() {
  const { id } = useParams();
  const { t, lang } = useApp();
  const r = resources.find((item) => item.id === id);
  if (!r) return <NotFound />;
  return (
    <>
      <Link to="/resources" className="back-link">
        <ArrowLeft size={16} />
        {t("Back to resources", "Retour aux ressources")}
      </Link>
      <article className="article panel">
        <ResourceArt theme={r.theme} />
        <div className="article-content">
          <p className="eyebrow">
            {t(
              "A LITTLE CARE FOR YOUR MIND",
              "UN PEU DE SOIN POUR VOTRE ESPRIT",
            )}
            <span>
              <Clock3 size={14} />
              {r.minutes} min
            </span>
          </p>
          <h1>{t(...r.title)}</h1>
          <p className="article-intro">{t(...r.summary)}</p>
          {r.body[lang === "en" ? 0 : 1].map((p) => (
            <p key={p}>{p}</p>
          ))}
          <div className="notice-box">
            <Info size={18} />
            <p>
              {t(
                "General wellbeing information, not medical advice. These demo resources are not a substitute for a qualified professional.",
                "Informations générales de bien-être, sans avis médical. Ces ressources ne remplacent pas un professionnel qualifié.",
              )}
            </p>
          </div>
          <Link to="/appointments" className="button primary">
            {t(
              "Explore a counselling conversation",
              "Explorer un échange avec un conseiller",
            )}
            <ArrowRight size={17} />
          </Link>
        </div>
      </article>
    </>
  );
}
