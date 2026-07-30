import { clearSession, getSession, LOGIN_PATH_BY_ROLE } from "@/lib/auth";
import { mainClient } from "./client";

/**
 * Attaches the auth token and bounces to the sign-in screen on 401.
 *
 * The demo has no token yet — `getSession()` returns the mock session, so the
 * Authorization header is skipped until a real backend issues one.
 */
mainClient.interceptors.request.use((config) => {
  const session = getSession();
  if (session?.token) {
    config.headers.Authorization = `Bearer ${session.token}`;
  }
  return config;
});

mainClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401 && typeof window !== "undefined") {
      const role = getSession()?.role ?? "admin";
      clearSession();
      window.location.href = LOGIN_PATH_BY_ROLE[role];
    }
    return Promise.reject(error);
  },
);

export { mainClient };
