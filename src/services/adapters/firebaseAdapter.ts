import {
  browserLocalPersistence,
  browserSessionPersistence,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "../../../lib/firebaseClient";

export const firebaseAdapter = {
  auth: () => {
    return {
      signInWithGoogle: async (rememberMe: boolean): Promise<User> => {
        const provider = new GoogleAuthProvider();
        await setPersistence(
          auth,
          rememberMe ? browserLocalPersistence : browserSessionPersistence,
        );
        const login = await signInWithPopup(auth, provider);
        const user = login.user;
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
