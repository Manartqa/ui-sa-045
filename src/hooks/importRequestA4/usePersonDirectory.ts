"use client";

import { useQuery } from "@tanstack/react-query";
import { getPersonDirectory } from "@/services/importRequestA4.service";
import type { PersonItem } from "@/types/app/importRequestA4";

export const PERSON_DIRECTORY_QUERY_KEY = ["personDirectory"] as const;

/** Candidates for the รายชื่อผู้มีอำนาจลงนาม / ผู้รับมอบอำนาจ pickers. */
export const usePersonDirectory = (role: PersonItem["role"], enabled = true) => {
  const { data, isLoading } = useQuery({
    queryKey: [...PERSON_DIRECTORY_QUERY_KEY, role],
    queryFn: () => getPersonDirectory(role),
    enabled,
  });

  return { people: data ?? [], isLoading };
};
