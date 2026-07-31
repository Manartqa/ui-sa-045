import {
  REQUEST_STATUS_META,
  REQUEST_STATUS_ORDER,
} from "@/constant/requestStatus";

export const LIST_STORAGE_KEY = "import-request-a4-list-filters";

export const DEFAULT_FILTERS = {
  searchBy: "all",
  keyword: "",
  status: "all",
} as const;

export const LIST_PAGE_TITLE =
  "คําขออนุญาตสั่งหรือนําเข้ามาในราชอาณาจักรซึ่งวัตถุหรืออาวุธฯ แบบ อ.4";

export const LIST_BREADCRUMB_ITEMS = [
  { title: "ระบบคำขอ" },
  { title: "คําขออนุญาต" },
];

/** Value that means "no keyword field picked" — the keyword box stays off. */
export const SEARCH_BY_ALL = "all";

export const SEARCH_BY_OPTIONS = [
  { value: SEARCH_BY_ALL, label: "ทั้งหมด" },
  { value: "referenceNo", label: "เลขที่อ้างอิง" },
  { value: "receiveNo", label: "เลขที่รับเรื่อง" },
  { value: "requestNo", label: "เลขที่คำขอ" },
  { value: "permitNo", label: "เลขหนังสืออนุญาต" },
];

export const STATUS_ALL = "all";

/**
 * Built from the status model so the filter can never drift from the tags —
 * every option here is a status the list is actually able to render.
 */
export const STATUS_OPTIONS = [
  { value: STATUS_ALL, label: "ทั้งหมด" },
  ...REQUEST_STATUS_ORDER.map((status) => ({
    value: status,
    label: REQUEST_STATUS_META[status].label,
  })),
];

