export type ExaminationName =
  | "WAEC"
  | "JAMB"
  | "NECO"
  | "NABTEB";

export type ExaminationStatus =
  | "Registration Open"
  | "Ongoing"
  | "Upcoming"
  | "Completed";

export type Examination = {
  id: number;
  name: ExaminationName;
  status: ExaminationStatus;
  description: string;
  dateLabel: string;
  date: string;
};