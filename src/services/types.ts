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
) => (rememberMe: boolean) => Promise<User | LocalError>;

export type SignOut = (firebaseAdapter: FirebaseAdapter) => () => void;

// Type guards
// LocalError
export function isLocalError(value: unknown): value is LocalError {
  return (
    typeof value === "object" &&
    value !== null &&
    "status" in value &&
    "title" in value &&
    "description" in value
  );
}
