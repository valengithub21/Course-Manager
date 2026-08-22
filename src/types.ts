export interface Topic {
  id: string;
  title: string;
  deadline: string;
  completed: boolean;
}

export interface Unit {
  id: string;
  title: string;
  topics: Topic[];
}

export interface Exam {
  id: string;
  title: string;
  date: string;
  type: 'es' | 'parcial' | 'recuperatorio';
}

export interface Subject {
  id: string;
  name: string;
  color: string;
  bgLight: string;
  icon?: string;
  professor?: string;
  schedule?: string;
  status: 'active' | 'passed';
  units: Unit[];
  exams: Exam[];
}

export type ViewState = 'home' | 'calendar' | 'passed' | 'subject';
