import type { ImportRequestListItem } from "@/types/app/importRequestA4";

export const IMPORT_REQUEST_OPERATOR = "บริษัท อาวุธ สมาร์ท โซลูชั่น จำกัด";

const OPERATOR = IMPORT_REQUEST_OPERATOR;

/**
 * Mock rows copied from the Figma list example (node 4410:156324). The `order`
 * values are the record numbers shown there, not the row index — hence the
 * repeated 5 and the jump to 9.
 */
export const IMPORT_REQUEST_ROWS: ImportRequestListItem[] = [
  {
    key: "1",
    order: 1,
    referenceNo: "PE000171",
    receiveNo: "อ00100/2568",
    receiveDate: "",
    requestNo: "",
    requestDate: "12/02/2568",
    operator: OPERATOR,
    status: "SUBMITTED",
    permitNo: "",
    approvedDate: "",
    expireDate: "",
    hasPermitFile: false,
  },
  {
    key: "2",
    order: 2,
    referenceNo: "PE000172",
    receiveNo: "อ00101/2568",
    receiveDate: "02/02/2568",
    requestNo: "21/2568",
    requestDate: "12/02/2568",
    operator: OPERATOR,
    status: "RECEIVED",
    permitNo: "",
    approvedDate: "",
    expireDate: "",
    hasPermitFile: false,
  },
  {
    key: "3",
    order: 3,
    referenceNo: "PE000173",
    receiveNo: "อ00102/2568",
    receiveDate: "02/02/2568",
    requestNo: "22/2568",
    requestDate: "12/02/2568",
    operator: OPERATOR,
    status: "UNDER_REVIEW",
    permitNo: "",
    approvedDate: "",
    expireDate: "",
    hasPermitFile: false,
  },
  {
    key: "4",
    order: 4,
    referenceNo: "PE000174",
    receiveNo: "อ00103/2568",
    receiveDate: "02/02/2568",
    requestNo: "23/2568",
    requestDate: "12/02/2568",
    operator: OPERATOR,
    status: "APPROVED",
    permitNo: "1/2569",
    approvedDate: "12/02/2568",
    expireDate: "12/02/2569",
    hasPermitFile: false,
  },
  {
    key: "5",
    order: 5,
    referenceNo: "PE000175",
    receiveNo: "อ00104/2568",
    receiveDate: "02/02/2568",
    requestNo: "24/2568",
    requestDate: "12/02/2568",
    operator: OPERATOR,
    status: "PAID",
    permitNo: "2/2569",
    approvedDate: "12/02/2568",
    expireDate: "12/02/2569",
    hasPermitFile: true,
  },
  {
    key: "6",
    order: 5,
    referenceNo: "PE000175",
    receiveNo: "อ00104/2568",
    receiveDate: "02/02/2568",
    requestNo: "25/2568",
    requestDate: "12/02/2568",
    operator: OPERATOR,
    status: "REJECTED",
    permitNo: "",
    approvedDate: "",
    expireDate: "",
    hasPermitFile: false,
  },
  {
    key: "7",
    order: 9,
    referenceNo: "PE000179",
    receiveNo: "อ00108/2568",
    receiveDate: "",
    requestNo: "",
    requestDate: "12/02/2568",
    operator: OPERATOR,
    status: "RETURNED",
    permitNo: "",
    approvedDate: "",
    expireDate: "",
    hasPermitFile: false,
  },
  {
    key: "8",
    order: 10,
    referenceNo: "PE000180",
    receiveNo: "อ00109/2568",
    receiveDate: "",
    requestNo: "",
    requestDate: "12/02/2568",
    operator: "บริษัท อาวุธ สมาร์ท 2 จำกัด",
    status: "CREATED",
    permitNo: "",
    approvedDate: "",
    expireDate: "",
    hasPermitFile: false,
  },
];

/** Total across all pages, as shown in the design's pagination. */
export const IMPORT_REQUEST_TOTAL = 200;

/**
 * Rows added by the create form. There is no backend, so they live in
 * `sessionStorage` — the fixture above stays untouched and the mock survives a
 * reload but resets when the tab closes, same as the mock auth session.
 */
const CREATED_ROWS_KEY = "sa045.importRequestA4.created";

function readCreatedRows(): ImportRequestListItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(CREATED_ROWS_KEY);
    return raw ? (JSON.parse(raw) as ImportRequestListItem[]) : [];
  } catch {
    return [];
  }
}

function writeCreatedRows(rows: ImportRequestListItem[]) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(CREATED_ROWS_KEY, JSON.stringify(rows));
}

/** The fixture plus everything created in this session, in list order. */
export function getImportRequestRows(): ImportRequestListItem[] {
  return [...IMPORT_REQUEST_ROWS, ...readCreatedRows()];
}

export function getImportRequestTotal(): number {
  return IMPORT_REQUEST_TOTAL + readCreatedRows().length;
}

/** Appends a created row, filling in its `key` and record number. */
export function addImportRequestRow(
  row: Omit<ImportRequestListItem, "key" | "order">,
): ImportRequestListItem {
  const created = readCreatedRows();
  const lastOrder = [...IMPORT_REQUEST_ROWS, ...created].reduce(
    (max, item) => Math.max(max, item.order),
    0,
  );
  const item: ImportRequestListItem = {
    ...row,
    key: `created-${lastOrder + 1}`,
    order: lastOrder + 1,
  };
  writeCreatedRows([...created, item]);
  return item;
}
