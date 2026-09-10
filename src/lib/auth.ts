// Temporary auth until Supabase is connected by the Lead Engineer.
// This uses localStorage so users survive page refreshes but NOT server-side auth.

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
