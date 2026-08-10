import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ActivityIcon =
  | "users"
  | "userCog"
  | "userX"
  | "building"
  | "fileCheck";

export type Activity = {
  id: number;
  title: string;
  timestamp: number;
  icon: ActivityIcon;
};

type ActivityStore = {
  activities: Activity[];
  addActivity: (activity: Omit<Activity, "id" | "timestamp">) => void;
};

const initialActivities: Activity[] = [];

export const useActivityStore = create<ActivityStore>()(
  persist(
    (set) => ({
      activities: initialActivities,

      addActivity: (activity) =>
        set((state) => ({
          activities: [
            {
              ...activity,
              id: Date.now(),
              timestamp: Date.now(),
            },
            ...state.activities,
          ].slice(0, 10),
        })),
    }),
    {
      name: "exam-admin-activities",
    },
  ),
);
