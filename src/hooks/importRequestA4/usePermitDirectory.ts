"use client";

import { useQuery } from "@tanstack/react-query";
import { getPermitDirectory } from "@/services/importRequestA4.service";

export const PERMIT_DIRECTORY_QUERY_KEY = ["permitDirectory"] as const;

/** Candidates for the หนังสืออนุญาตเปิดดำเนินการผลิตอาวุธ ค้นหา modal. */
export const usePermitDirectory = (enabled = true) => {
  const { data, isLoading } = useQuery({
    queryKey: PERMIT_DIRECTORY_QUERY_KEY,
    queryFn: getPermitDirectory,
    enabled,
  });

  return { permits: data ?? [], isLoading };
};
