import { firebaseAdapter } from "@/services/adapters/firebaseAdapter";
import { SignInWithGoogle } from "@/services/types";

export const signInWithGoogle: SignInWithGoogle =
  (firebaseAdapter) => (rememberMe) => {
    return firebaseAdapter.auth().signInWithGoogle(rememberMe);
  };

export default signInWithGoogle(firebaseAdapter);
