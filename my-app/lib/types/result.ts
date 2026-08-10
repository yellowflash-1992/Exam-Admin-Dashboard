export type ExamType =
  | "WAEC"
  | "JAMB"
  | "NECO"
  | "NABTEB";

export type ResultStatus =
  | "Verified"
  | "Pending"
  | "Rejected";

export type Result = {
  id: number;
  candidate: string;
  exam: ExamType;
  subject: string;
  score: number;
  grade: string;
  status: ResultStatus;
  centre: string;
  date: Date;
};