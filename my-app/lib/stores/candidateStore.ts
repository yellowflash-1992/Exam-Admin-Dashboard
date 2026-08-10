import { create } from "zustand";
import { persist } from "zustand/middleware";

import { candidates as initialCandidates } from "@/lib/data/candidates";
import { useActivityStore } from "@/lib/stores/activityStore";
import type { Candidate } from "@/lib/types/candidate";

type CandidateStore = {
  candidates: Candidate[];

  addCandidate: (candidate: Candidate) => void;
  updateCandidate: (candidate: Candidate) => void;
  deleteCandidate: (id: number) => void;
};

export const useCandidateStore = create<CandidateStore>()(
  persist(
    (set, get) => ({
      candidates: initialCandidates,

      addCandidate: (candidate) => {
        set((state) => ({
          candidates: [...state.candidates, candidate],
        }));

        useActivityStore.getState().addActivity({
          title: `Candidate Added: ${candidate.name}`,
          icon: "users",
        });
      },

      updateCandidate: (updatedCandidate) => {
        const exists = get().candidates.some(
          (candidate) => candidate.id === updatedCandidate.id,
        );

        if (!exists) return;

        set((state) => ({
          candidates: state.candidates.map((candidate) =>
            candidate.id === updatedCandidate.id ? updatedCandidate : candidate,
          ),
        }));

        useActivityStore.getState().addActivity({
          title: `Candidate Updated: ${updatedCandidate.name}`,
          icon: "users",
        });
      },

      deleteCandidate: (id) => {
        set((state) => {
          const candidate = state.candidates.find((item) => item.id === id);

          if (candidate) {
            useActivityStore.getState().addActivity({
              title: `Candidate Deleted: ${candidate.name}`,
              icon: "userX",
            });
          }

          return {
            candidates: state.candidates.filter((item) => item.id !== id),
          };
        });
      },
    }),
    {
      name: "exam-admin-candidates",
    },
  ),
);
