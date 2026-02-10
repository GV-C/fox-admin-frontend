"use client";

import { useAuthStore } from "@/services/stores/authStore";
import { useEffect } from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { init, initialized } = useAuthStore();

  useEffect(() => {
    init();
  }, [init]);

  if (!initialized) return <div>Loader Placeholder...</div>;

  return <>{children}</>;
}
