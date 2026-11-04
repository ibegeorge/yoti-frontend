import { useState } from "react";
import {
  CalendarDays,
  Clock3,
  ArrowRight,
  MapPin,
  Video,
  CheckCircle2,
  Info,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useApp } from "../contexts/AppContext";
import { PageHeading, StatusBadge, Modal, Empty } from "../components/UI";
import type { Appointment } from "../data/mock";
function dayString(offset: number) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toLocaleDateString("en-CA", { timeZone: "Africa/Lagos" });
}
export function Appointments() {
  const { t, role, appointments, setAppointments, date, notify } = useApp();
  const [selectedDate, setDate] = useState(dayString(1));
  const [time, setTime] = useState("");
  const [format, setFormat] = useState<"inperson" | "online">("inperson");
  const [confirmation, setConfirmation] = useState<Appointment | null>(null);
  const [cancel, setCancel] = useState<string | null>(null);
  const [week, setWeek] = useState(0);
  const [filter, setFilter] = useState("all");
  const mine =
    role === "student"
      ? appointments.filter((a) => a.owner === "student")
      : appointments;
  const slots = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00"];
  const occupied = (slot: string) =>
    appointments.some(
      (a) =>
        a.date === selectedDate && a.time === slot && a.status !== "cancelled",
    );
  function request(e: React.FormEvent) {
    e.preventDefault();
    if (!time || occupied(time)) return;
    const a: Appointment = {
      id: `AP-${Date.now().toString().slice(-6)}`,
      date: selectedDate,
      time,
      format,
      status: "pending",
      owner: "student",
    };
    setAppointments((prev) => [...prev, a]);
    setConfirmation(a);
    setTime("");
  }
  return (
    <>
      <PageHeading
        eyebrow={t("ROOM TO TALK, SPACE TO GROW", "PARLER ET GRANDIR")}
        title={
          role === "student"
            ? t(
                "A conversation can be a beginning.",
                "Un échange peut être un début.",
              )
            : t("Your counselling schedule", "Votre planning d’accompagnement")
        }
        description={
          role === "student"
            ? t(
                "Choose a time to preview a conversation with a school counsellor.",
                "Choisissez un créneau pour simuler un échange avec un conseiller.",
              )
            : t(
                "Manage fictional requests and upcoming counselling sessions.",
                "Gérez les demandes fictives et les séances à venir.",
              )
        }
      />
      <div className="appointment-layout">
        {role === "student" && (
          <section className="panel booking-panel">
            <div className="section-heading">
              <h2>{t("Find a time for you", "Un moment pour vous")}</h2>
              <span className="badge confirmed">
                {t("30 min session", "Séance de 30 min")}
              </span>
            </div>
            <div className="counsellor-profile">
              <div className="avatar large">MN</div>
              <div>
                <strong>Marie N.</strong>
                <small>
                  {t(
                    "School counsellor · Fictional profile",
                    "Conseillère scolaire · Profil fictif",
                  )}
                </small>
                <span className="fine-print">English · Français</span>
              </div>
            </div>
            <form onSubmit={request}>
              <div className="section-heading date-picker-heading">
                <h3>{t("1. Choose a date", "1. Choisissez une date")}</h3>
                <div>
                  <button
                    type="button"
                    className="icon-button"
                    disabled={week === 0}
                    aria-label={t("Previous dates", "Dates précédentes")}
                    onClick={() => {
                      setWeek((w) => w - 1);
                      setDate(dayString(1 + (week - 1) * 5));
                      setTime("");
                    }}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    className="icon-button"
                    disabled={week === 3}
                    aria-label={t("Next dates", "Dates suivantes")}
                    onClick={() => {
                      setWeek((w) => w + 1);
                      setDate(dayString(1 + (week + 1) * 5));
                      setTime("");
                    }}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
              <div className="date-options">
                {Array.from({ length: 5 }, (_, i) =>
                  dayString(1 + week * 5 + i),
                ).map((d) => (
                  <button
                    type="button"
                    key={d}
                    className={selectedDate === d ? "selected" : ""}
                    aria-pressed={selectedDate === d}
                    onClick={() => {
                      setDate(d);
                      setTime("");
                    }}
                  >
                    <small>
                      {new Intl.DateTimeFormat(t("en-GB", "fr-CM"), {
                        weekday: "short",
                      }).format(new Date(d + "T12:00"))}
                    </small>
                    <strong>{d.slice(-2)}</strong>
                    <small>
                      {new Intl.DateTimeFormat(t("en-GB", "fr-CM"), {
                        month: "short",
                      }).format(new Date(d + "T12:00"))}
                    </small>
                  </button>
                ))}
              </div>
              <h3>{t("2. Choose a time", "2. Choisissez un horaire")}</h3>
              <p className="fine-print">
                {t(
                  "Cameroon time (WAT · UTC+1)",
                  "Heure du Cameroun (WAT · UTC+1)",
                )}
              </p>
              <div className="time-options">
                {slots.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    disabled={occupied(slot)}
                    className={time === slot ? "selected" : ""}
                    aria-pressed={time === slot}
                    onClick={() => setTime(slot)}
                  >
                    <Clock3 size={15} />
                    {slot}
                    {occupied(slot) && (
                      <span className="sr-only">
                        {t("Unavailable", "Indisponible")}
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <h3>
                {t(
                  "3. How would you like to meet?",
                  "3. Comment souhaitez-vous échanger ?",
                )}
              </h3>
              <div className="format-options">
                <button
                  type="button"
                  aria-pressed={format === "inperson"}
                  className={format === "inperson" ? "selected" : ""}
                  onClick={() => setFormat("inperson")}
                >
                  <MapPin size={18} />
                  {t("In person", "En personne")}
                </button>
                <button
                  type="button"
                  aria-pressed={format === "online"}
                  className={format === "online" ? "selected" : ""}
                  onClick={() => setFormat("online")}
                >
                  <Video size={18} />
                  {t("Online", "En ligne")}
                </button>
              </div>
              <div className="notice-box">
                <Info size={18} />
                <p>
                  {t(
                    "This is a demo request. No real appointment is booked and no counsellor is notified.",
                    "Demande fictive. Aucun rendez-vous réel ni notification à un conseiller.",
                  )}
                </p>
              </div>
              <button
                className="button primary full"
                disabled={!time}
                type="submit"
              >
                {t(
                  "Request a demo appointment",
                  "Demander un rendez-vous fictif",
                )}
                <ArrowRight size={17} />
              </button>
            </form>
          </section>
        )}
        <section className="panel appointments-list">
          <div className="section-heading">
            <h2>
              {role === "student"
                ? t("Your appointments", "Vos rendez-vous")
                : t("Appointment requests", "Demandes de rendez-vous")}
            </h2>
            <CalendarDays size={20} />
          </div>
          <label className="field compact-field">
            {t("Show", "Afficher")}
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">
                {t("All appointments", "Tous les rendez-vous")}
              </option>
              <option value="pending">{t("Pending", "En attente")}</option>
              <option value="confirmed">{t("Confirmed", "Confirmés")}</option>
              <option value="cancelled">{t("Cancelled", "Annulés")}</option>
            </select>
          </label>
          {mine
            .filter((a) => filter === "all" || a.status === filter)
            .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
            .map((a) => (
              <article className="appointment-item" key={a.id}>
                <div className="section-heading">
                  <strong>{date(a.date)}</strong>
                  <StatusBadge status={a.status} />
                </div>
                <h3>
                  {role === "student"
                    ? t("A conversation with Marie", "Un échange avec Marie")
                    : t(
                        "Student counselling session",
                        "Séance avec un élève fictif",
                      )}
                </h3>
                <p className="appointment-time">
                  <Clock3 size={15} />
                  {a.time} · 30 min{" "}
                  {a.format === "online" ? (
                    <Video size={15} />
                  ) : (
                    <MapPin size={15} />
                  )}{" "}
                  {a.format === "online"
                    ? t("Online · demo", "En ligne · démo")
                    : t("Demo counselling room", "Bureau fictif")}
                </p>
                <small className="fine-print">
                  {a.id} · {t("Fictional appointment", "Rendez-vous fictif")}
                </small>
                {a.status !== "cancelled" && (
                  <div className="appointment-item-actions">
                    {role === "counsellor" && a.status === "pending" && (
                      <button
                        className="text-link"
                        onClick={() => {
                          setAppointments((prev) =>
                            prev.map((p) =>
                              p.id === a.id ? { ...p, status: "confirmed" } : p,
                            ),
                          );
                          notify(
                            t(
                              "Demo appointment confirmed.",
                              "Rendez-vous fictif confirmé.",
                            ),
                          );
                        }}
                      >
                        <CheckCircle2 size={16} />
                        {t("Confirm", "Confirmer")}
                      </button>
                    )}
                    <button
                      className="text-link danger-link"
                      onClick={() => setCancel(a.id)}
                    >
                      {t("Cancel request", "Annuler la demande")}
                    </button>
                  </div>
                )}
              </article>
            ))}
          {!mine.some((a) => filter === "all" || a.status === filter) && (
            <Empty
              text={t(
                "No appointments here yet.",
                "Aucun rendez-vous ici pour le moment.",
              )}
            />
          )}
          <p className="fine-print">
            {t(
              "This schedule uses fictional data. Changes last for this browser session only.",
              "Ce planning utilise des données fictives. Les modifications durent uniquement pendant cette session.",
            )}
          </p>
        </section>
      </div>
      {confirmation && (
        <Modal
          title={t(
            "A little time, just for you.",
            "Un moment rien que pour vous.",
          )}
          onClose={() => setConfirmation(null)}
        >
          <div className="success-message">
            <CheckCircle2 size={44} />
            <h3>
              {t("Demo appointment requested", "Rendez-vous fictif demandé")}
            </h3>
            <p>
              {date(confirmation.date)} · {confirmation.time} WAT
            </p>
            <p>
              {t(
                "Your request is marked as pending in this demo. No real appointment has been made.",
                "Votre demande est en attente dans cette démo. Aucun rendez-vous réel n’a été pris.",
              )}
            </p>
            <button
              className="button primary"
              onClick={() => setConfirmation(null)}
            >
              {t("Back to my appointments", "Retour à mes rendez-vous")}
            </button>
          </div>
        </Modal>
      )}
      {cancel && (
        <Modal
          title={t(
            "Cancel this demo appointment?",
            "Annuler ce rendez-vous fictif ?",
          )}
          onClose={() => setCancel(null)}
        >
          <p>
            {t(
              "The appointment will be marked as cancelled in this session. You can request another available time.",
              "Le rendez-vous sera marqué comme annulé. Vous pourrez demander un autre créneau disponible.",
            )}
          </p>
          <div className="form-actions">
            <button
              className="button secondary"
              onClick={() => setCancel(null)}
            >
              {t("Keep appointment", "Garder le rendez-vous")}
            </button>
            <button
              className="button danger"
              onClick={() => {
                setAppointments((prev) =>
                  prev.map((a) =>
                    a.id === cancel ? { ...a, status: "cancelled" } : a,
                  ),
                );
                setCancel(null);
                notify(
                  t(
                    "Demo appointment cancelled.",
                    "Rendez-vous fictif annulé.",
                  ),
                );
              }}
            >
              {t("Cancel appointment", "Annuler le rendez-vous")}
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
