import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { DataStore } from "../types";

export const useDataStore = create<DataStore>()(
  persist(
    (set, get) => ({
      data: "hello data",
    }),
    {
      name: "data-store",
      storage: createJSONStorage(() => localStorage),
      version: 1,
      migrate: (persistedState, version) => {
        if (version === 0) {
        }
        return persistedState;
      },
    },
  ),
);
