import type {
  ImportRequestListParams,
  ImportRequestListResult,
} from "@/types/app/importRequestA4";
import {
  IMPORT_REQUEST_ROWS,
  IMPORT_REQUEST_TOTAL,
} from "@/mocks/importRequestA4";

/**
 * Returns the อ.4 request list.
 *
 * The backend does not exist yet, so this resolves the Figma mock. When the API
 * lands, swap the body for the commented call below — nothing above this layer
 * (hooks, components) has to change.
 *
 *   const res = await getImportRequestA4ListApi(params);
 *   const page = res.data?.data;
 *   return {
 *     items: (page?.content ?? []).map(toImportRequestListItem),
 *     total: page?.totalElements ?? 0,
 *   };
 */
export const getImportRequestA4List = async (
  params?: ImportRequestListParams,
): Promise<ImportRequestListResult> => {
  const keyword = params?.keyword?.trim().toLowerCase();
  const field = params?.searchBy;
  const status = params?.status;

  const hasKeyword = Boolean(keyword && field && field !== "all");
  const hasStatus = Boolean(status && status !== "all");

  // Unfiltered: report the full server-side total, not just this page's rows.
  if (!hasKeyword && !hasStatus) {
    return { items: IMPORT_REQUEST_ROWS, total: IMPORT_REQUEST_TOTAL };
  }

  const items = IMPORT_REQUEST_ROWS.filter((row) => {
    if (hasStatus && row.status !== status) return false;
    if (!hasKeyword) return true;
    return String(row[field as keyof typeof row] ?? "")
      .toLowerCase()
      .includes(keyword as string);
  });

  return { items, total: items.length };
};
