"use client";

import { useQuery } from "@tanstack/react-query";
import { getImportRequestA4List } from "@/services/importRequestA4.service";
import type { ImportRequestListParams } from "@/types/app/importRequestA4";

export const IMPORT_REQUEST_A4_LIST_QUERY_KEY = ["importRequestA4List"] as const;

export const useImportRequestA4List = (params?: ImportRequestListParams) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [...IMPORT_REQUEST_A4_LIST_QUERY_KEY, params],
    queryFn: () => getImportRequestA4List(params),
  });

  return {
    items: data?.items ?? [],
    total: data?.total ?? 0,
    isLoading,
    isError,
    error,
  };
};
