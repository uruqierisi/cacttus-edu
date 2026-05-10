import type { Training } from "@/types";

export const trainings: Training[] = [
  // Programim
  {
    id: "ai-ml",
    name: "Applied AI and Machine Learning",
    category: "Programim",
    startDate: "2026/04",
    format: "Online",
    instructor: "Arsim Susuri",
  },
  {
    id: "ai-security",
    name: "AI Security",
    category: "Programim",
    startDate: "2026/04",
    format: "Klasë",
    hours: 4,
    instructor: "Andi Ahmeti",
    city: "Prishtinë",
  },
  {
    id: "data-science",
    name: "Data Science",
    category: "Programim",
    startDate: "2026/03",
    format: "Klasë",
    hours: 120,
    instructor: "Hana Hoxha",
    city: "Prishtinë",
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "Programim",
    startDate: "2026/01",
    format: "Hibrid",
    hours: 30,
    instructor: "Ali Kaçamaku",
    city: "Prishtinë",
  },
  // Administrim
  {
    id: "qa-testing",
    name: "Software Testing QA and Automation",
    category: "Administrim",
    startDate: "2026/04",
    format: "Klasë",
    instructor: "Pegmatit Bruci",
    city: "Prishtinë",
  },
  {
    id: "cloud-devops",
    name: "Cloud and DevOps",
    category: "Administrim",
    startDate: "2026/03",
    format: "Klasë",
    instructor: "Alban Krasniqi",
    city: "Prishtinë",
  },
  // Siguri Kibernetike
  {
    id: "cyber-essentials",
    name: "Cyber Security Essentials",
    category: "Siguri Kibernetike",
    startDate: "2026/01",
    format: "Klasë",
    city: "Prishtinë",
  },
  {
    id: "ethical-hacking",
    name: "Ethical Hacking & Penetration Testing",
    category: "Siguri Kibernetike",
    startDate: "2026/04",
    format: "Klasë",
    hours: 60,
    instructor: "Mentor Berisha",
    city: "Prishtinë",
  },
  // Marketing & Dizajn
  {
    id: "graphic-ai",
    name: "Graphic Design with AI",
    category: "Marketing & Dizajn",
    startDate: "2026/04",
    format: "Online",
    hours: 40,
    city: "Online",
  },
  {
    id: "graphic-design",
    name: "Dizajn Grafik",
    category: "Marketing & Dizajn",
    startDate: "2026/01",
    format: "Hibrid",
    hours: 40,
    instructor: "Enes Sermaxhaj",
    city: "Prizren",
  },
  {
    id: "content-creation",
    name: "Content Creation",
    category: "Marketing & Dizajn",
    startDate: "2026/01",
    format: "Klasë",
    hours: 20,
    instructor: "Arber Gashi",
    city: "Prishtinë",
  },
  // Menaxhim i Projekteve
  {
    id: "pm-agile",
    name: "Project Management & Agile",
    category: "Menaxhim i Projekteve",
    startDate: "2026/04",
    format: "Online",
    hours: 30,
    city: "Online",
  },
  // Shkathtësi të buta
  {
    id: "soft-skills",
    name: "Komunikimi dhe Prezantimi Profesional",
    category: "Shkathtësi të buta",
    startDate: "2026/03",
    format: "Klasë",
    hours: 20,
    instructor: "Era Gjakova",
    city: "Prishtinë",
  },
];

export const trainingCategories = [
  "Programim",
  "Administrim",
  "Siguri Kibernetike",
  "Marketing & Dizajn",
  "Menaxhim i Projekteve",
  "Shkathtësi të buta",
] as const;

export const cities = ["Të gjitha", "Prishtinë", "Prizren", "Online", "Kamenicë"] as const;
