import { create } from "zustand";
import { persist } from "zustand/middleware";

import { candidates as initialCandidates } from "@/lib/data/candidates";
import type { Candidate } from "@/lib/types/candidate";
import { useActivityStore } from "@/lib/stores/activityStore";

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
          title: "Candidate Added",
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
            candidate.id === updatedCandidate.id
              ? updatedCandidate
              : candidate,
          ),
        }));

        useActivityStore.getState().addActivity({
          title: "Candidate Updated",
          icon: "userCog",
        });
      },

      deleteCandidate: (id) => {
        const exists = get().candidates.some(
          (candidate) => candidate.id === id,
        );

        if (!exists) return;

        set((state) => ({
          candidates: state.candidates.filter(
            (candidate) => candidate.id !== id,
          ),
        }));

        useActivityStore.getState().addActivity({
          title: "Candidate Deleted",
          icon: "userX",
        });
      },
    }),
    {
      name: "exam-admin-candidates",
    },
  ),
);