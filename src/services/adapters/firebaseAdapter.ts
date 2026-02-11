import {
  browserLocalPersistence,
  browserSessionPersistence,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "../../lib/firebaseClient";
import { LocalError } from "../types";

export const firebaseAdapter = {
  auth: () => {
    return {
      signInWithGoogle: async (
        rememberMe: boolean,
      ): Promise<User | LocalError> => {
        const provider = new GoogleAuthProvider();
        await setPersistence(
          auth,
          rememberMe ? browserLocalPersistence : browserSessionPersistence,
        );
        const login = await signInWithPopup(auth, provider);
        const user = login.user;

        const syncUser = await fetch("/api/users/firebase_user_sync", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid: user.uid,
            email: user.email,
            first_name: user.displayName?.split(" ")[0],
            last_name: user.displayName?.split(" ")[1],
          }),
        });

        const syncUserResponse = await syncUser.json();

        if (!syncUserResponse.success) {
          const apiError: LocalError = {
            status: syncUserResponse.status,
            title: syncUserResponse.title,
            description: syncUserResponse.description,
          };
          return apiError;
        }

        return user;
      },
      signOut: async () => {
        await signOut(auth);
      },
    };
  },
  database: () => {
    // TODO: add connection to firestore
  },
};

export type FirebaseAdapter = typeof firebaseAdapter;
