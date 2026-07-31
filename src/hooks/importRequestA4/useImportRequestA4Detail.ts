"use client";

import { useQuery } from "@tanstack/react-query";
import { getImportRequestA4 } from "@/services/importRequestA4.service";

export const IMPORT_REQUEST_A4_DETAIL_QUERY_KEY = [
  "importRequestA4Detail",
] as const;

export const useImportRequestA4Detail = (id: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [...IMPORT_REQUEST_A4_DETAIL_QUERY_KEY, id],
    queryFn: () => getImportRequestA4(id),
    enabled: Boolean(id),
  });

  return {
    record: data ?? null,
    /** The id resolved to nothing — the caller should show a not-found state. */
    notFound: !isLoading && !isError && data === null,
    isLoading,
    isError,
    error,
  };
};
