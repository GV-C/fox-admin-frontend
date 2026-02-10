import { firebaseAdapter } from "@/services/adapters/firebaseAdapter";
import { SignOut } from "@/services/types";

export const signOut: SignOut = (firebaseAdapter) => () => {
  return firebaseAdapter.auth().signOut();
};

export default signOut(firebaseAdapter);
