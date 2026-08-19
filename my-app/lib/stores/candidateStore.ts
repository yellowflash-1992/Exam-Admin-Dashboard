import { create } from "zustand";
import { persist } from "zustand/middleware";

import { candidates as initialCandidates } from "@/lib/data/candidates";
import { useActivityStore } from "@/lib/stores/activityStore";
import type { Candidate } from "@/lib/types/candidate";

type CandidateApiRecord = {
  id: number;
  candidateNo?: string;
  firstName?: string | null;
  middleName?: string | null;
  lastName?: string | null;
  state?: string | null;
  createdAt?: string | Date;
  registrations?: Array<{
    examination?: { name?: string | null } | null;
    centre?: { name?: string | null; state?: string | null } | null;
  }>;
  results?: Array<{
    score?: number | string | null;
    status?: string | null;
  }>;
};

const mapResultStatus = (status?: string | null) => {
  switch (status?.toLowerCase()) {
    case "verified":
    case "passed":
      return "Passed";
    case "rejected":
    case "failed":
      return "Failed";
    default:
      return "Pending";
  }
};

const mapCandidateRecord = (record: CandidateApiRecord): Candidate => {
  const fullName = [record.firstName, record.middleName, record.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  const registration = record.registrations?.[0];
  const result = record.results?.[0];
  const scoreValue = Number(result?.score ?? 0);

  return {
    id: record.id,
    name: fullName || record.candidateNo || `Candidate ${record.id}`,
    exam: registration?.examination?.name || "JAMB",
    state: record.state || registration?.centre?.state || "Unknown",
    center: registration?.centre?.name || "Unassigned",
    status: mapResultStatus(result?.status),
    score: Number.isFinite(scoreValue) ? scoreValue : 0,
    registeredAt: record.createdAt
      ? new Date(record.createdAt).toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10),
  };
};

type CandidateStore = {
  candidates: Candidate[];

  loadCandidates: () => Promise<void>;
  addCandidate: (candidate: Candidate) => Promise<void>;
  updateCandidate: (candidate: Candidate) => Promise<void>;
  deleteCandidate: (id: number) => Promise<void>;
};

export const useCandidateStore = create<CandidateStore>()(
  persist(
    (set, get) => ({
      candidates: initialCandidates,

      loadCandidates: async () => {
        try {
          const response = await fetch("/api/candidates");

          if (!response.ok) {
            throw new Error("Failed to load candidates");
          }

          const data = (await response.json()) as CandidateApiRecord[];

          set({
            candidates: data.map(mapCandidateRecord),
          });
        } catch (error) {
          console.error("Failed to refresh candidates:", error);
        }
      },

      addCandidate: async (candidate) => {
        try {
          const [firstName, ...rest] = candidate.name.trim().split(/\s+/);
          const lastName = rest.length > 0 ? rest[rest.length - 1] : "";

          const response = await fetch("/api/candidates", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              firstName,
              middleName: rest.length > 1 ? rest.slice(0, -1).join(" ") : null,
              lastName,
              state: candidate.state,
              phone: null,
              email: null,
              gender: null,
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to create candidate");
          }

          const created = (await response.json()) as CandidateApiRecord;

          set((state) => ({
            candidates: [mapCandidateRecord(created), ...state.candidates],
          }));

          useActivityStore.getState().addActivity({
            title: `Candidate Added: ${candidate.name}`,
            icon: "users",
          });
        } catch (error) {
          console.error("Error creating candidate:", error);
        }
      },

      updateCandidate: async (updatedCandidate) => {
        const exists = get().candidates.some(
          (candidate) => candidate.id === updatedCandidate.id,
        );

        if (!exists) return;

        try {
          const [firstName, ...rest] = updatedCandidate.name
            .trim()
            .split(/\s+/);
          const lastName = rest.length > 0 ? rest[rest.length - 1] : "";

          const response = await fetch(
            `/api/candidates/${updatedCandidate.id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                firstName,
                middleName:
                  rest.length > 1 ? rest.slice(0, -1).join(" ") : null,
                lastName,
                state: updatedCandidate.state,
              }),
            },
          );

          if (!response.ok) {
            throw new Error("Failed to update candidate");
          }

          const updated = (await response.json()) as CandidateApiRecord;

          set((state) => ({
            candidates: state.candidates.map((candidate) =>
              candidate.id === updatedCandidate.id
                ? mapCandidateRecord(updated)
                : candidate,
            ),
          }));

          useActivityStore.getState().addActivity({
            title: `Candidate Updated: ${updatedCandidate.name}`,
            icon: "users",
          });
        } catch (error) {
          console.error("Error updating candidate:", error);
        }
      },

      deleteCandidate: async (id) => {
        try {
          const response = await fetch(`/api/candidates/${id}`, {
            method: "DELETE",
          });

          if (!response.ok) {
            throw new Error("Failed to delete candidate");
          }

          const candidate = get().candidates.find((item) => item.id === id);

          if (candidate) {
            useActivityStore.getState().addActivity({
              title: `Candidate Deleted: ${candidate.name}`,
              icon: "userX",
            });
          }

          set((state) => ({
            candidates: state.candidates.filter((item) => item.id !== id),
          }));
        } catch (error) {
          console.error("Error deleting candidate:", error);
        }
      },
    }),
    {
      name: "exam-admin-candidates",
    },
  ),
);
