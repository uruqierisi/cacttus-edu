export interface Training {
  id: string;
  name: string;
  category: TrainingCategory;
  startDate: string;
  format: "Online" | "Klasë" | "Hibrid";
  hours?: number;
  instructor?: string;
  city?: string;
}

export type TrainingCategory =
  | "Programim"
  | "Administrim"
  | "Siguri Kibernetike"
  | "Marketing & Dizajn"
  | "Menaxhim i Projekteve"
  | "Shkathtësi të buta";

export type City = "Prishtinë" | "Prizren" | "Online" | "Kamenicë" | "Të gjitha";

export interface NavDropdownItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavItem {
  label: string;
  href?: string;
  dropdown?: NavDropdown;
}

export interface NavDropdown {
  type: "programs" | "business" | "projects" | "simple";
  title?: string;
  subtitle?: string;
  items: NavDropdownItem[];
}

export interface StatCard {
  value: string;
  label: string;
}

export interface Program {
  icon: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
}
