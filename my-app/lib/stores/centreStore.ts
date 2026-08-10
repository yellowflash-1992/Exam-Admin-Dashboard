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
          title: `Centre Added: ${centre.name}`,
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
          title: `Centre Updated: ${updatedCentre.name}`,
          icon: "building",
        });
      },

      deleteCentre: (id) => {
        set((state) => {
          const centre = state.centres.find((item) => item.id === id);

          if (centre) {
            useActivityStore.getState().addActivity({
              title: `Centre Deleted: ${centre.name}`,
              icon: "building",
            });
          }

          return {
            centres: state.centres.filter((item) => item.id !== id),
          };
        });
      },
    }),
    {
      name: "exam-admin-centres",
    },
  ),
);
