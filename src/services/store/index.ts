import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Store } from "../types";

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      test: "hello",
    }),
    { name: "store", storage: createJSONStorage(() => localStorage),
        version: 1,
      migrate: (persistedState, version) => {
        if (version === 0) {
        }
        return persistedState;
      },
     },
  ),
);
