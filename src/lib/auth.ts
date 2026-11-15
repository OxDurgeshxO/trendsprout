// Supabase Authentication with Resilient Local Fallback
// Provides user authentication, session persistence, and seamless demo mode.

import { getSupabaseClient } from "./database";

export interface Session {
  user: {
    id: string;
    email: string;
    name: string;
  };
}

const SESSION_KEY = "trendsprout_session";

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Session;
  } catch (e) {
    console.warn("Failed to access session from localStorage:", e);
    return null;
  }
}

export function setSession(session: Session): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch (e) {
    console.warn("Failed to save session to localStorage:", e);
  }
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (e) {
    console.warn("Failed to clear session from localStorage:", e);
  }
}

export function createDemoSession(
  name = "Creator Studio",
  email = "creator@trendsprout.ai",
): Session {
  const session: Session = {
    user: {
      id: "usr_" + Math.random().toString(36).substring(2, 9),
      name,
      email,
    },
  };
  setSession(session);
  return session;
}

export function requireAuth(): Session {
  const session = getSession();
  if (!session) {
    throw new Error("Not authenticated");
  }
  return session;
}

export async function signInWithEmail(email: string, password: string): Promise<Session> {
  const client = getSupabaseClient();
  if (!client) {
    // Offline / Demo fallback
    const session = createDemoSession(email.split("@")[0], email);
    return session;
  }

  const { data, error } = await client.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    throw new Error(error?.message || "Authentication failed");
  }

  const session: Session = {
    user: {
      id: data.user.id,
      email: data.user.email || email,
      name: data.user.user_metadata?.name || email.split("@")[0],
    },
  };
  setSession(session);
  return session;
}

export async function signUpWithEmail(
  email: string,
  password: string,
  name: string
): Promise<Session> {
  const client = getSupabaseClient();
  if (!client) {
    const session = createDemoSession(name, email);
    return session;
  }

  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: {
      data: { name },
    },
  });

  if (error || !data.user) {
    throw new Error(error?.message || "Sign up failed");
  }

  const session: Session = {
    user: {
      id: data.user.id,
      email: data.user.email || email,
      name,
    },
  };
  setSession(session);
  return session;
}

export async function signOut(): Promise<void> {
  const client = getSupabaseClient();
  if (client) {
    try {
      await client.auth.signOut();
    } catch (e) {
      console.warn("Supabase signOut warning:", e);
    }
  }
  clearSession();
}
