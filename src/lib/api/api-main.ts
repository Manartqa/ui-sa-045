import type { ApiResponse, PageObject } from "@/types/api/main/common";
import type { ImportRequestA4Response } from "@/types/api/main/importRequestA4";
import { mainClient } from "./interceptor";

export const getImportRequestA4ListApi = (params?: Record<string, unknown>) =>
  mainClient.get<ApiResponse<PageObject<ImportRequestA4Response>>>(
    "/api/v1/import-request-a4",
    { params },
  );
