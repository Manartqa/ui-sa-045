"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createImportRequestA4 } from "@/services/importRequestA4.service";
import type { ImportRequestCreatePayload } from "@/types/app/importRequestA4";
import { IMPORT_REQUEST_A4_LIST_QUERY_KEY } from "./useImportRequestA4List";

export const IMPORT_REQUEST_A4_CREATE_QUERY_KEY = [
  "importRequestA4Create",
] as const;

export const useCreateImportRequestA4 = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: IMPORT_REQUEST_A4_CREATE_QUERY_KEY,
    mutationFn: (payload: ImportRequestCreatePayload) =>
      createImportRequestA4(payload),
    // Prefix match — invalidates the list for every filter combination.
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: IMPORT_REQUEST_A4_LIST_QUERY_KEY,
      }),
  });

  return { createRequest: mutateAsync, isCreating: isPending };
};
