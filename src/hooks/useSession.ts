"use client";

import React from "react";
import { getSession } from "@/lib/auth";
import type { AuthSession } from "@/types/app/auth";

/**
 * The signed-in mock user, read after mount. `getSession()` touches
 * `sessionStorage`, so reading it during render would disagree with the
 * server-rendered HTML — hence the effect rather than a lazy initialiser.
 */
export const useSession = () => {
  const [session, setSession] = React.useState<AuthSession | null>(null);

  React.useEffect(() => {
    setSession(getSession());
  }, []);

  return session;
};
