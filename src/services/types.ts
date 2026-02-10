import { User } from "firebase/auth";
import { FirebaseAdapter } from "./adapters/firebaseAdapter";

export type LocalError = {
  status: string;
  title: string;
  description: string;
};

export type AuthStore = {
  user: User | null;
  login: (rememberMe: boolean) => void;
  logout: () => void;
  initialized: boolean;
  init: () => void;
};

export type DataStore = {
  data: string;
};

export type SignInWithGoogle = (
  firebaseAdapter: FirebaseAdapter,
) => (rememberMe: boolean) => Promise<User>;

export type SignOut = (firebaseAdapter: FirebaseAdapter) => () => void;
