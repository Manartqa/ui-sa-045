"use client";

import React from "react";

const EXPIRE_NUM = Number(process.env.NEXT_PUBLIC_SEARCH_PERSIST_EXPIRE_NUM ?? 1);
const EXPIRE_UNIT = process.env.NEXT_PUBLIC_SEARCH_PERSIST_UNIT ?? "hour";

const UNIT_MS: Record<string, number> = {
  minute: 60_000,
  hour: 3_600_000,
  day: 86_400_000,
};

function maxAgeSeconds() {
  const ms = (UNIT_MS[EXPIRE_UNIT] ?? UNIT_MS.hour) * EXPIRE_NUM;
  return Math.floor(ms / 1000);
}

function readCookie(key: string) {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${encodeURIComponent(key)}=`));
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match.split("=").slice(1).join("=")));
  } catch {
    return null;
  }
}

function writeCookie(key: string, value: unknown) {
  if (typeof document === "undefined") return;
  const encoded = encodeURIComponent(JSON.stringify(value));
  document.cookie = `${encodeURIComponent(key)}=${encoded}; path=/; max-age=${maxAgeSeconds()}; SameSite=Lax`;
}

/**
 * Keeps a page's filters in a cookie so they survive navigation and reload.
 * Reads happen after mount to keep the server and first client render identical.
 */
export function useSearchPersist<T extends Record<string, unknown>>(
  storageKey: string,
  defaults: T,
) {
  const [filterValues, setFilterValues] = React.useState<T>(defaults);

  React.useEffect(() => {
    const saved = readCookie(storageKey);
    if (saved) setFilterValues({ ...defaults, ...saved });
    // Only re-read when the key changes; `defaults` is a literal per render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  const persist = React.useCallback(
    (_scope: string, next: T) => {
      setFilterValues(next);
      writeCookie(storageKey, next);
    },
    [storageKey],
  );

  const clear = React.useCallback(() => {
    setFilterValues(defaults);
    writeCookie(storageKey, defaults);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  return { filterValues, persist, clear };
}
