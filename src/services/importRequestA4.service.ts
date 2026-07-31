import dayjs from "dayjs";
import type {
  ImportRequestCreatePayload,
  ImportRequestListItem,
  ImportRequestListParams,
  ImportRequestListResult,
} from "@/types/app/importRequestA4";
import {
  addImportRequestRow,
  getImportRequestRows,
  getImportRequestTotal,
  IMPORT_REQUEST_OPERATOR,
} from "@/mocks/importRequestA4";

/** ISO (ค.ศ.) → "DD/MM/พ.ศ." as the table renders it. */
function toThaiDate(iso: string) {
  const d = dayjs(iso);
  if (!d.isValid()) return "";
  return `${d.format("DD/MM")}/${d.year() + 543}`;
}

/** Next running อ้างอิง number after the highest one already in the list. */
function nextReferenceNo(rows: ImportRequestListItem[]) {
  const max = rows.reduce((acc, row) => {
    const n = Number(row.referenceNo.replace(/\D/g, ""));
    return Number.isFinite(n) ? Math.max(acc, n) : acc;
  }, 0);
  return `PE${String(max + 1).padStart(6, "0")}`;
}

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

  const rows = getImportRequestRows();
  const hasKeyword = Boolean(keyword && field && field !== "all");
  const hasStatus = Boolean(status && status !== "all");

  // Unfiltered: report the full server-side total, not just this page's rows.
  if (!hasKeyword && !hasStatus) {
    return { items: rows, total: getImportRequestTotal() };
  }

  const items = rows.filter((row) => {
    if (hasStatus && row.status !== status) return false;
    if (!hasKeyword) return true;
    return String(row[field as keyof typeof row] ?? "")
      .toLowerCase()
      .includes(keyword as string);
  });

  return { items, total: items.length };
};

/**
 * Creates an อ.4 request. With no backend, this appends a draft row to the mock
 * store so it shows up on the list screen. Real call when the API lands:
 *
 *   const res = await createImportRequestA4Api(payload);
 *   return toImportRequestListItem(res.data?.data);
 */
export const createImportRequestA4 = async (
  payload: ImportRequestCreatePayload,
): Promise<ImportRequestListItem> => {
  const rows = getImportRequestRows();

  return addImportRequestRow({
    referenceNo: nextReferenceNo(rows),
    // A draft has not been filed yet, so the office-side columns stay blank —
    // they fill in as the request moves through รับเรื่อง / อนุมัติ.
    receiveNo: "",
    receiveDate: "",
    requestNo: "",
    requestDate: toThaiDate(dayjs().format("YYYY-MM-DD")),
    operator: payload.writtenAt?.trim() || IMPORT_REQUEST_OPERATOR,
    status: "CREATED",
    permitNo: "",
    approvedDate: "",
    expireDate: "",
    hasPermitFile: false,
  });
};
