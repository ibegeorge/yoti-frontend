import { Link } from "react-router-dom";
import { Sprout, ArrowLeft } from "lucide-react";
import { useApp } from "../contexts/AppContext";
export function NotFound() {
  const { t } = useApp();
  return (
    <div className="confirmation panel">
      <Sprout size={48} />
      <p className="eyebrow">404</p>
      <h1>{t("Let’s find your way back.", "Retrouvons votre chemin.")}</h1>
      <p>
        {t(
          "This page isn’t here, but your wellbeing space is just a step away.",
          "Cette page n’existe pas, mais votre espace bien-être est tout près.",
        )}
      </p>
      <Link to="/" className="button primary">
        <ArrowLeft size={16} />
        {t("Back to overview", "Retour à l’accueil")}
      </Link>
    </div>
  );
}
