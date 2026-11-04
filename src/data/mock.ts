export type Role = "student" | "counsellor" | "admin";
export type Status = "submitted" | "review" | "followup" | "resolved";
export type Category = "abuse" | "harassment" | "bullying" | "mental" | "other";
export interface Report {
  id: string;
  category: Category;
  date: string;
  status: Status;
  anonymous: boolean;
  description: string;
  location: string;
  incidentDate?: string;
  priority: "normal" | "high";
  owner: "student" | "other";
}
export interface Appointment {
  id: string;
  date: string;
  time: string;
  format: "inperson" | "online";
  status: "pending" | "confirmed" | "cancelled";
  owner: "student" | "other";
}
export const categories: Record<Category, [string, string]> = {
  abuse: ["Abuse", "Maltraitance"],
  harassment: ["Harassment", "Harcèlement"],
  bullying: ["Bullying", "Intimidation"],
  mental: ["Mental health concern", "Santé mentale"],
  other: ["Other welfare concern", "Autre préoccupation"],
};
export const statuses: Record<Status, [string, string]> = {
  submitted: ["Submitted", "Soumis"],
  review: ["In review", "En cours"],
  followup: ["Follow-up", "Suivi"],
  resolved: ["Resolved", "Résolu"],
};
export const initialReports: Report[] = [
  {
    id: "YT-2026-042",
    category: "bullying",
    date: "2026-11-02",
    status: "review",
    anonymous: false,
    description:
      "A fictional student has asked for support with repeated unkind comments during group activities. They would like to discuss possible next steps with a counsellor.",
    location: "Demo campus · Study area",
    priority: "normal",
    owner: "student",
  },
  {
    id: "YT-2026-036",
    category: "mental",
    date: "2026-10-28",
    status: "followup",
    anonymous: false,
    description:
      "A fictional student is finding it difficult to balance coursework and rest. A follow-up conversation has been suggested.",
    location: "Demo campus",
    priority: "normal",
    owner: "student",
  },
  {
    id: "YT-2026-021",
    category: "harassment",
    date: "2026-10-19",
    status: "resolved",
    anonymous: true,
    description:
      "A fictional concern about unwanted messages was reviewed. The demo case has been closed after a supportive conversation.",
    location: "Not specified",
    priority: "normal",
    owner: "student",
  },
  {
    id: "YT-2026-043",
    category: "abuse",
    date: "2026-11-03",
    status: "submitted",
    anonymous: true,
    description:
      "An anonymous fictional student has requested a conversation about a difficult situation. This record is for demonstration only.",
    location: "Demo campus",
    priority: "high",
    owner: "other",
  },
  {
    id: "YT-2026-039",
    category: "other",
    date: "2026-10-30",
    status: "review",
    anonymous: false,
    description:
      "A fictional request for guidance about adjusting to a new school environment.",
    location: "Demo campus",
    priority: "normal",
    owner: "other",
  },
];
export const initialAppointments: Appointment[] = [
  {
    id: "AP-001",
    date: "2026-11-05",
    time: "10:00",
    format: "inperson",
    status: "confirmed",
    owner: "student",
  },
  {
    id: "AP-002",
    date: "2026-11-04",
    time: "14:00",
    format: "online",
    status: "pending",
    owner: "other",
  },
];
export interface Resource {
  id: string;
  category: "stress" | "wellbeing" | "support";
  title: [string, string];
  summary: [string, string];
  minutes: number;
  theme: string;
  body: [string[], string[]];
}
export const resources: Resource[] = [
  {
    id: "small-steps",
    category: "stress",
    title: [
      "A little less pressure, one step at a time",
      "Moins de pression, un pas à la fois",
    ],
    summary: [
      "Simple ways to make a busy study day feel more manageable.",
      "Des gestes simples pour mieux vivre une journée chargée.",
    ],
    minutes: 4,
    theme: "sage",
    body: [
      [
        "A full timetable can feel overwhelming. Start by choosing one small, realistic task for today. You do not have to solve everything at once.",
        "Make space for breaks, regular meals and rest where you can. Try writing down your priorities and asking someone you trust for help when the workload feels too heavy.",
        "If stress keeps affecting your daily life, consider speaking with a qualified counsellor.",
      ],
      [
        "Un emploi du temps chargé peut être pesant. Choisissez une petite tâche réaliste pour aujourd’hui. Vous n’avez pas à tout résoudre en même temps.",
        "Prévoyez des pauses, des repas réguliers et du repos si possible. Notez vos priorités et demandez de l’aide à une personne de confiance.",
        "Si le stress perturbe votre quotidien, envisagez de consulter un professionnel qualifié.",
      ],
    ],
  },
  {
    id: "feelings",
    category: "wellbeing",
    title: [
      "It’s okay to feel what you feel",
      "Vous avez le droit de ressentir",
    ],
    summary: [
      "Getting to know your emotions without judging yourself.",
      "Comprendre ses émotions sans se juger.",
    ],
    minutes: 3,
    theme: "peach",
    body: [
      [
        "Emotions can change from day to day. Giving a feeling a name can help you describe what you are experiencing.",
        "You might try writing a few words about your day, doing something you enjoy, or talking with a trusted person. Choose what feels comfortable for you.",
        "You deserve support even if you are not sure how to explain what is happening.",
      ],
      [
        "Les émotions changent au fil des jours. Mettre un mot sur ce que vous ressentez peut vous aider à en parler.",
        "Vous pouvez écrire quelques mots, faire une activité agréable ou parler à une personne de confiance. Choisissez ce qui vous convient.",
        "Vous méritez du soutien même si vous ne savez pas encore expliquer votre situation.",
      ],
    ],
  },
  {
    id: "first-session",
    category: "support",
    title: [
      "Your first conversation with a counsellor",
      "Votre premier échange avec un conseiller",
    ],
    summary: [
      "What to expect, and how to take that first step.",
      "À quoi s’attendre et comment faire le premier pas.",
    ],
    minutes: 5,
    theme: "lavender",
    body: [
      [
        "You can ask for counselling without having everything figured out. A first conversation is a chance to talk about what you would like help with.",
        "Before a real session, ask the counsellor about confidentiality, its limits, and how your information is handled. You can also ask about language and accessibility needs.",
        "This prototype lets you preview an appointment request. No real appointment is booked and no counsellor is contacted.",
      ],
      [
        "Vous pouvez demander un accompagnement sans avoir toutes les réponses. Un premier échange permet de parler de vos besoins.",
        "Avant une vraie séance, demandez au conseiller d’expliquer la confidentialité, ses limites et le traitement de vos informations. Précisez vos besoins linguistiques ou d’accessibilité.",
        "Ce prototype simule une demande. Aucun rendez-vous réel n’est réservé et aucun conseiller n’est contacté.",
      ],
    ],
  },
  {
    id: "connection",
    category: "wellbeing",
    title: [
      "You don’t have to carry it alone",
      "Vous n’avez pas à tout porter seul",
    ],
    summary: [
      "Finding people and places that help you feel supported.",
      "Trouver des personnes et des lieux qui vous soutiennent.",
    ],
    minutes: 4,
    theme: "sand",
    body: [
      [
        "Think of someone you feel comfortable speaking with: a trusted adult, friend, teacher or qualified professional.",
        "It can help to start with a small sentence, such as “I have been having a difficult time and would like to talk.” You can decide how much you want to share.",
        "If you feel in immediate danger, seek help in person from a trusted adult or local emergency service. This app is not monitored.",
      ],
      [
        "Pensez à une personne avec qui vous êtes à l’aise : un adulte de confiance, un ami, un enseignant ou un professionnel qualifié.",
        "Vous pouvez commencer simplement : « Je traverse une période difficile et j’aimerais en parler. » Vous choisissez ce que vous partagez.",
        "En cas de danger immédiat, cherchez de l’aide auprès d’un adulte de confiance ou des services d’urgence locaux. Cette application n’est pas surveillée.",
      ],
    ],
  },
];
