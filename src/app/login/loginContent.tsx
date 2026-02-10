"use client";

import { useAuthStore } from "@/services/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginContent() {
  const router = useRouter();
  const { user, initialized, login } = useAuthStore();
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const handleGoogleLogin = (rememberMe: boolean) => {
    login(rememberMe);
  };

  useEffect(() => {
    if (initialized && user) {
      router.replace("/");
    }
  }, [initialized, user, router]);

  if (!initialized || user) return null;

  return (
    <div>
      <div onClick={() => setRememberMe((prev) => !prev)}>
        {rememberMe ? "remember" : "do not remember"}
      </div>
      <div onClick={() => handleGoogleLogin(rememberMe)}>Login with Google</div>
    </div>
  );
}
