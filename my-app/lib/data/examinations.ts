import type { Examination } from "../types/examination";

export const examinations: Examination[] = [
  {
    id: 1,
    name: "WAEC",
    status: "Registration Open",
    description: "Candidate registration is currently open",
    dateLabel: "Registration closes",
    date: "30 April 2026",
  },
  {
    id: 2,
    name: "JAMB",
    status: "Ongoing",
    description: "Examination is currently in progress",
    dateLabel: "Examination period",
    date: "15 May – 20 June 2026",
  },
  {
    id: 3,
    name: "NECO",
    status: "Upcoming",
    description: "Examination cycle has not started",
    dateLabel: "Examination starts",
    date: "10 July 2026",
  },
  {
    id: 4,
    name: "NABTEB",
    status: "Completed",
    description: "Examination cycle has been completed",
    dateLabel: "Completed",
    date: "18 March 2026",
  },
];
