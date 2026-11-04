import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { initialReports, initialAppointments } from "../data/mock";
import type { Role, Report, Appointment } from "../data/mock";
type Context = {
  lang: "en" | "fr";
  setLang: (l: "en" | "fr") => void;
  t: (en: string, fr: string) => string;
  role: Role;
  setRole: (r: Role) => void;
  reports: Report[];
  setReports: React.Dispatch<React.SetStateAction<Report[]>>;
  appointments: Appointment[];
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  mood: number | null;
  setMood: (m: number) => void;
  notice: string;
  notify: (s: string) => void;
  date: (s: string) => string;
};
const AppContext = createContext<Context | null>(null);
export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<"en" | "fr">("en");
  const [role, setRole] = useState<Role>("student");
  const [reports, setReports] = useState(initialReports);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [mood, setMood] = useState<number | null>(null);
  const [notice, notify] = useState("");
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  useEffect(() => {
    if (notice) {
      const timer = setTimeout(() => notify(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [notice]);
  const t = (en: string, fr: string) => (lang === "en" ? en : fr);
  const date = (s: string) =>
    new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "fr-CM", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(s + "T12:00:00"));
  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        t,
        role,
        setRole,
        reports,
        setReports,
        appointments,
        setAppointments,
        mood,
        setMood,
        notice,
        notify,
        date,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
// Shared state intentionally lives in memory only.
// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("AppProvider is required");
  return context;
}
