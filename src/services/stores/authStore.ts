import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AuthStore } from "../types";
import signOut from "../functions/firebase/signOut";
import signInWithGoogle from "../functions/firebase/signInWithGoogle";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../lib/firebaseClient";

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      login: async (rememberMe) => {
        const result = await signInWithGoogle(rememberMe);
        set({ user: result });
      },
      logout: () => {
        signOut();
        set({ user: null });
      },
      initialized: false,
      init: () => {
        onAuthStateChanged(auth, (user) => {
          set({
            user,
            initialized: true,
          });
        });
      },
    }),
    {
      name: "auth-store",
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
