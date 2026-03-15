"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

// Demo admin credentials
const DEMO_EMAIL = "admin";
const DEMO_PASSWORD = "admin123";
const DEMO_USER_KEY = "wehome_demo_user";

function createDemoUser(): User {
  return {
    id: "demo-admin-001",
    email: "admin@wehome.com",
    app_metadata: {},
    user_metadata: { full_name: "Admin" },
    aud: "authenticated",
    created_at: new Date().toISOString(),
  } as User;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: string | null }>;
  signInWithProvider: (provider: "google" | "github") => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for demo user in localStorage
    const demoStored = localStorage.getItem(DEMO_USER_KEY);
    if (demoStored) {
      setUser(createDemoUser());
      setLoading(false);
      return;
    }

    const supabase = getSupabase();
    if (!supabase) {
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string): Promise<{ error: string | null }> => {
    // Demo login: admin / admin123
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      localStorage.setItem(DEMO_USER_KEY, "true");
      setUser(createDemoUser());
      return { error: null };
    }

    const supabase = getSupabase();
    if (!supabase) {
      return { error: "Supabase is not configured. Use admin / admin123 for demo access." };
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return { error: error.message };
    }
    return { error: null };
  }, []);

  const signUp = useCallback(async (email: string, password: string, name: string): Promise<{ error: string | null }> => {
    const supabase = getSupabase();
    if (!supabase) {
      return { error: "Supabase is not configured." };
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });
    if (error) {
      return { error: error.message };
    }
    return { error: null };
  }, []);

  const signInWithProvider = useCallback(async (provider: "google" | "github"): Promise<{ error: string | null }> => {
    const supabase = getSupabase();
    if (!supabase) {
      return { error: "Supabase is not configured." };
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: typeof window !== "undefined" ? `${window.location.origin}/` : undefined,
      },
    });
    if (error) {
      return { error: error.message };
    }
    return { error: null };
  }, []);

  const signOut = useCallback(async () => {
    // Clear demo user
    localStorage.removeItem(DEMO_USER_KEY);

    const supabase = getSupabase();
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    router.push("/login");
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signInWithProvider, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
