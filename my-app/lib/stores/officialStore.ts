import { create } from "zustand";
import { persist } from "zustand/middleware";

import { officials as initialOfficials } from "@/lib/data/officials";
import { useActivityStore } from "@/lib/stores/activityStore";
import type { Official } from "@/lib/types/official";

type OfficialStore = {
  officials: Official[];

  addOfficial: (official: Official) => void;
  updateOfficial: (official: Official) => void;
  deleteOfficial: (id: number) => void;
};

export const useOfficialStore = create<OfficialStore>()(
  persist(
    (set) => ({
      officials: initialOfficials,

      addOfficial: (official) => {
        set((state) => ({
          officials: [...state.officials, official],
        }));

        useActivityStore.getState().addActivity({
          title: `Official Added: ${official.name}`,
          icon: "userCog",
        });
      },

      updateOfficial: (updatedOfficial) => {
        set((state) => ({
          officials: state.officials.map((official) =>
            official.id === updatedOfficial.id ? updatedOfficial : official,
          ),
        }));

        useActivityStore.getState().addActivity({
          title: `Official Updated: ${updatedOfficial.name}`,
          icon: "userCog",
        });
      },

      deleteOfficial: (id) => {
        set((state) => {
          const official = state.officials.find((item) => item.id === id);

          if (official) {
            useActivityStore.getState().addActivity({
              title: `Official Deleted: ${official.name}`,
              icon: "userX",
            });
          }

          return {
            officials: state.officials.filter((item) => item.id !== id),
          };
        });
      },
    }),
    {
      name: "exam-admin-officials",
    },
  ),
);
