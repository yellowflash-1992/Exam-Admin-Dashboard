import { create } from "zustand";
import { persist } from "zustand/middleware";

import { centres as initialCentres } from "@/lib/data/centres";
import { useActivityStore } from "@/lib/stores/activityStore";
import type { Centre } from "@/lib/types/centre";

type CentreApiRecord = {
  id: number;
  name: string;
  state: string;
  city?: string | null;
  address?: string | null;
  capacity?: number | null;
};

const mapCentreRecord = (record: CentreApiRecord): Centre => ({
  id: record.id,
  name: record.name,
  state: record.state,
  address: record.address || `${record.city || record.state}, ${record.state}`,
  capacity: Number(record.capacity ?? 0),
  status: Number(record.capacity ?? 0) > 0 ? "Active" : "Inactive",
});

type CentreStore = {
  centres: Centre[];

  loadCentres: () => Promise<void>;
  addCentre: (centre: Centre) => Promise<void>;
  updateCentre: (centre: Centre) => Promise<void>;
  deleteCentre: (id: number) => Promise<void>;
};

export const useCentreStore = create<CentreStore>()(
  persist(
    (set, get) => ({
      centres: initialCentres,

      loadCentres: async () => {
        try {
          const response = await fetch("/api/centres");

          if (!response.ok) {
            throw new Error("Failed to load centres");
          }

          const data = (await response.json()) as CentreApiRecord[];

          set({
            centres: data.map(mapCentreRecord),
          });
        } catch (error) {
          console.error("Failed to refresh centres:", error);
        }
      },

      addCentre: async (centre) => {
        try {
          const response = await fetch("/api/centres", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: centre.name,
              state: centre.state,
              city: centre.address?.split(",")[0]?.trim() || centre.state,
              address: centre.address,
              capacity: Number(centre.capacity),
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to create centre");
          }

          const created = (await response.json()) as CentreApiRecord;

          set((state) => ({
            centres: [mapCentreRecord(created), ...state.centres],
          }));

          useActivityStore.getState().addActivity({
            title: `Centre Added: ${centre.name}`,
            icon: "building",
          });
        } catch (error) {
          console.error("Error creating centre:", error);
        }
      },

      updateCentre: async (updatedCentre) => {
        try {
          const response = await fetch(`/api/centres/${updatedCentre.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: updatedCentre.name,
              state: updatedCentre.state,
              city:
                updatedCentre.address?.split(",")[0]?.trim() ||
                updatedCentre.state,
              address: updatedCentre.address,
              capacity: Number(updatedCentre.capacity),
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to update centre");
          }

          const updated = (await response.json()) as CentreApiRecord;

          set((state) => ({
            centres: state.centres.map((centre) =>
              centre.id === updatedCentre.id
                ? mapCentreRecord(updated)
                : centre,
            ),
          }));

          useActivityStore.getState().addActivity({
            title: `Centre Updated: ${updatedCentre.name}`,
            icon: "building",
          });
        } catch (error) {
          console.error("Error updating centre:", error);
        }
      },

      deleteCentre: async (id) => {
        try {
          const response = await fetch(`/api/centres/${id}`, {
            method: "DELETE",
          });

          if (!response.ok) {
            throw new Error("Failed to delete centre");
          }

          const centre = get().centres.find((item) => item.id === id);

          if (centre) {
            useActivityStore.getState().addActivity({
              title: `Centre Deleted: ${centre.name}`,
              icon: "building",
            });
          }

          set((state) => ({
            centres: state.centres.filter((item) => item.id !== id),
          }));
        } catch (error) {
          console.error("Error deleting centre:", error);
        }
      },
    }),
    {
      name: "exam-admin-centres",
    },
  ),
);
