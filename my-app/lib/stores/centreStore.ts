import { create } from "zustand";
import { persist } from "zustand/middleware";

import { centres as initialCentres } from "@/lib/data/centres";
import { useActivityStore } from "@/lib/stores/activityStore";
import type { Centre } from "@/lib/types/centre";

type CentreStore = {
  centres: Centre[];

  addCentre: (centre: Centre) => void;
  updateCentre: (centre: Centre) => void;
  deleteCentre: (id: number) => void;
};

export const useCentreStore = create<CentreStore>()(
  persist(
    (set) => ({
      centres: initialCentres,

      addCentre: (centre) => {
        set((state) => ({
          centres: [...state.centres, centre],
        }));

        useActivityStore.getState().addActivity({
          title: "Centre Added",
          icon: "building",
        });
      },

      updateCentre: (updatedCentre) => {
        set((state) => ({
          centres: state.centres.map((centre) =>
            centre.id === updatedCentre.id ? updatedCentre : centre,
          ),
        }));

        useActivityStore.getState().addActivity({
          title: "Centre Updated",
          icon: "building",
        });
      },

      deleteCentre: (id) => {
        set((state) => ({
          centres: state.centres.filter((centre) => centre.id !== id),
        }));

        useActivityStore.getState().addActivity({
          title: "Centre Deleted",
          icon: "building",
        });
      },
    }),
    {
      name: "exam-admin-centres",
    },
  ),
);
