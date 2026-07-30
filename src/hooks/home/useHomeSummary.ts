"use client";

import { useQuery } from "@tanstack/react-query";
import { getHomeSummary } from "@/services/home.service";
import type { UserRole } from "@/types/app/auth";

export const HOME_SUMMARY_QUERY_KEY = ["homeSummary"] as const;

export const useHomeSummary = (role?: UserRole) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [...HOME_SUMMARY_QUERY_KEY, role],
    // Role is read from sessionStorage after mount, so wait for it.
    enabled: Boolean(role),
    queryFn: () => getHomeSummary(role as UserRole),
  });

  return {
    title: data?.title ?? "",
    tiles: data?.tiles ?? [],
    total: data?.total ?? 0,
    isLoading,
    isError,
    error,
  };
};
