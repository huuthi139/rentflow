"use client";

import { useAuth } from "@/lib/auth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isAuthPage = pathname === "/login" || pathname === "/register";

  useEffect(() => {
    if (!loading && !user && !isAuthPage) {
      router.push("/login");
    }
  }, [user, loading, isAuthPage, router]);

  // Auth pages bypass the guard
  if (isAuthPage) {
    return <>{children}</>;
  }

  // Show spinner while loading
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-background-light dark:bg-slate-900">
        <div className="flex flex-col items-center gap-3">
          <span className="material-symbols-outlined text-4xl text-primary animate-spin">
            progress_activity
          </span>
          <p className="text-sm text-slate-500 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Not logged in — don't render children (redirect will happen via useEffect)
  if (!user) {
    return null;
  }

  return <>{children}</>;
}
