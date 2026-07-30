import { MOCK_USERS } from "@/mocks/users";
import type { AuthSession, UserRole } from "@/types/app/auth";

const SESSION_KEY = "sa045.session";

/** Sign-in screen each role belongs to — also where logout returns them. */
export const LOGIN_PATH_BY_ROLE: Record<UserRole, string> = {
  admin: "/login/officer",
  user: "/login/operator",
};

export type AuthResult =
  | { status: "ok"; session: AuthSession }
  | { status: "invalid" }
  /** Credentials are valid but belong to the other sign-in screen. */
  | { status: "wrong-role"; role: UserRole };

/** Matches credentials against the mock user list for one role's screen. */
export function authenticate(
  username: string,
  password: string,
  expectedRole: UserRole,
): AuthResult {
  const match = MOCK_USERS.find(
    (u) => u.username === username.trim() && u.password === password,
  );
  if (!match) return { status: "invalid" };
  if (match.role !== expectedRole) {
    return { status: "wrong-role", role: match.role };
  }

  const { password: _password, ...session } = match;
  return { status: "ok", session };
}

export function saveSession(session: AuthSession) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function getSession(): AuthSession | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}
