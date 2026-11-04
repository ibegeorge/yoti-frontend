import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import {
  X,
  ArrowUpRight,
  HeartHandshake,
  Sprout,
  Sun,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import { statuses } from "../data/mock";
import type { Status, Resource } from "../data/mock";
export function StatusBadge({
  status,
}: {
  status: Status | "pending" | "confirmed" | "cancelled";
}) {
  const { t } = useApp();
  const labels =
    status in statuses
      ? statuses[status as Status]
      : status === "pending"
        ? ["Pending", "En attente"]
        : status === "confirmed"
          ? ["Confirmed", "Confirmé"]
          : ["Cancelled", "Annulé"];
  return (
    <span className={`badge ${status}`}>
      <i />
      {t(labels[0], labels[1])}
    </span>
  );
}
export function PageHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="page-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="muted">{description}</p>
      </div>
      {action}
    </div>
  );
}
export function Empty({ text, action }: { text: string; action?: ReactNode }) {
  return (
    <div className="empty">
      <Sprout size={34} />
      <p>{text}</p>
      {action}
    </div>
  );
}
export function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const { t } = useApp();
  useEffect(() => {
    const dialog = ref.current;
    const prior = document.activeElement as HTMLElement | null;
    dialog?.showModal();
    return () => {
      dialog?.close();
      prior?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="modal"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-top">
        <h2>{title}</h2>
        <button
          className="icon-button"
          onClick={onClose}
          aria-label={t("Close", "Fermer")}
        >
          <X />
        </button>
      </div>
      {children}
    </dialog>
  );
}
export function ResourceArt({ theme }: { theme: string }) {
  return (
    <div className={`resource-art ${theme}`} aria-hidden="true">
      <span className="art-circle" />
      <span className="art-orbit" />
      {theme === "sage" ? (
        <Sprout />
      ) : theme === "peach" ? (
        <Sun />
      ) : theme === "lavender" ? (
        <HeartHandshake />
      ) : (
        <BookOpen />
      )}
      <span className="art-dot" />
    </div>
  );
}
export function ResourceCard({ resource }: { resource: Resource }) {
  const { t } = useApp();
  return (
    <Link to={`/resources/${resource.id}`} className="resource-card">
      <ResourceArt theme={resource.theme} />
      <div className="resource-copy">
        <div className="resource-meta">
          {resource.category === "stress"
            ? t("STRESS & BALANCE", "STRESS ET ÉQUILIBRE")
            : resource.category === "support"
              ? t("FINDING SUPPORT", "TROUVER DU SOUTIEN")
              : t("EMOTIONAL WELLBEING", "BIEN-ÊTRE ÉMOTIONNEL")}
          <span>
            {resource.minutes} {t("min read", "min de lecture")}
          </span>
        </div>
        <h3>{t(...resource.title)}</h3>
        <p>{t(...resource.summary)}</p>
        <span className="text-link">
          {t("Take a moment", "Prenez un moment")} <ArrowUpRight size={16} />
        </span>
      </div>
    </Link>
  );
}
