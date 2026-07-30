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
 * Request lifecycle statuses for the filter. Codes reuse `RequestStatus` where
 * one exists; the four fee-related steps have no tag colour yet, so they carry
 * their own codes until the status model covers them.
 */
export const STATUS_OPTIONS = [
  { value: STATUS_ALL, label: "ทั้งหมด" },
  { value: "CREATED", label: "สร้างคำขอ" },
  { value: "RETURNED", label: "ตีกลับ/แก้ไข" },
  { value: "SUBMITTED", label: "ยื่นคำขอ" },
  { value: "RECEIVED", label: "รับเรื่อง" },
  { value: "AWAITING_REQUEST_FEE", label: "รอชำระค่าคำขอ" },
  { value: "REQUEST_FEE_PAID", label: "ชำระค่าคำขอแล้ว" },
  { value: "UNDER_REVIEW", label: "อยู่ระหว่างพิจารณา" },
  { value: "REJECTED", label: "ไม่อนุมัติ" },
  { value: "APPROVED", label: "อนุมัติ" },
  { value: "AWAITING_PERMIT_FEE", label: "รอชำระค่าใบอนุญาต" },
  { value: "PAID", label: "ชำระเงิน/จ่ายหนังสืออนุญาต" },
];

