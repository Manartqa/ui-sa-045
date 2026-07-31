"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteImportRequestA4,
  resetImportRequestA4Demo,
  transitionImportRequestA4,
  updateImportRequestA4,
} from "@/services/importRequestA4.service";
import type {
  ImportRequestRecord,
  RequestStatus,
} from "@/types/app/importRequestA4";
import { IMPORT_REQUEST_A4_LIST_QUERY_KEY } from "./useImportRequestA4List";
import { IMPORT_REQUEST_A4_DETAIL_QUERY_KEY } from "./useImportRequestA4Detail";

/**
 * Mutations that change a request. Each one refreshes both the list and the
 * detail query, because every change also writes a log entry the detail screen
 * shows.
 */
export const useImportRequestA4Actions = () => {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: IMPORT_REQUEST_A4_LIST_QUERY_KEY });
    queryClient.invalidateQueries({
      queryKey: IMPORT_REQUEST_A4_DETAIL_QUERY_KEY,
    });
  };

  const save = useMutation({
    mutationFn: (vars: {
      record: ImportRequestRecord;
      status: RequestStatus;
      detail?: string;
    }) =>
      updateImportRequestA4(vars.record, {
        status: vars.status,
        detail: vars.detail,
      }),
    onSuccess: invalidate,
  });

  /** A workflow step, as opposed to `save` which edits a request in place. */
  const transition = useMutation({
    mutationFn: (vars: {
      record: ImportRequestRecord;
      status: RequestStatus;
      detail: string;
    }) =>
      transitionImportRequestA4(vars.record, {
        status: vars.status,
        detail: vars.detail,
      }),
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteImportRequestA4(id),
    onSuccess: invalidate,
  });

  const resetDemo = useMutation({
    mutationFn: () => resetImportRequestA4Demo(),
    onSuccess: invalidate,
  });

  return {
    saveRequest: save.mutateAsync,
    isSaving: save.isPending,
    transitionRequest: transition.mutateAsync,
    isTransitioning: transition.isPending,
    deleteRequest: remove.mutateAsync,
    isDeleting: remove.isPending,
    resetDemoData: resetDemo.mutateAsync,
    isResetting: resetDemo.isPending,
  };
};
