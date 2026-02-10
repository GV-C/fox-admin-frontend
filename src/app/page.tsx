"use client";

import { useAuthStore } from "@/services/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { user, initialized, logout } = useAuthStore();

  const handleGoogleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (initialized && !user) {
      router.replace("/login");
    }
  }, [initialized, user, router]);

  if (!initialized || !user) return null;

  return (
    <div>
      <div>Home page</div>
      <div onClick={handleGoogleLogout}>Sign Out</div>
    </div>
  );
}
