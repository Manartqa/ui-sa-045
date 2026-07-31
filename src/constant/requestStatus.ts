import { brand } from "@/theme";
import type { RequestStatus } from "@/types/app/importRequestA4";

/**
 * The one place that knows what a status *means*. The tag colour, the filter
 * list and the stepper position all read from here, so a status can never be
 * labelled one way on the list screen and another on the detail screen.
 *
 * `step` is the 0-based index into `STEPS` (ยื่นคำขอ → ออกหนังสืออนุญาต).
 * `null` marks a status that is not a position in the request lifecycle:
 * `PENDING_REVIEW` labels a row inside a request, never the request itself.
 */
export interface RequestStatusMeta {
  label: string;
  color: string;
  step: number | null;
  /** Hidden from the list screen's สถานะ filter. */
  rowOnly?: boolean;
}

export const REQUEST_STATUS_META: Record<RequestStatus, RequestStatusMeta> = {
  CREATED: { label: "สร้างคำขอ", color: brand.neutral, step: 0 },
  RETURNED: { label: "ตีกลับ/แก้ไข", color: brand.error, step: 0 },
  SUBMITTED: { label: "ยื่นคำขอ", color: brand.warning, step: 0 },
  RECEIVED: { label: "รับเรื่อง", color: "#1677FF", step: 1 },
  // The three fee steps have no tag in the Figma set yet — awaiting-payment
  // reuses Colors/Orange, paid steps sit in the blue family with รับเรื่อง.
  AWAITING_REQUEST_FEE: { label: "รอชำระค่าคำขอ", color: "#FF9500", step: 1 },
  REQUEST_FEE_PAID: { label: "ชำระค่าคำขอแล้ว", color: "#40A9FF", step: 1 },
  UNDER_REVIEW: { label: "อยู่ระหว่างพิจารณา", color: "#69B1FF", step: 2 },
  APPROVED: { label: "อนุมัติ", color: "#00C259", step: 3 },
  REJECTED: { label: "ไม่อนุมัติ", color: brand.error, step: 3 },
  AWAITING_PERMIT_FEE: {
    label: "รอชำระค่าหนังสืออนุญาต",
    color: "#FF9500",
    step: 4,
  },
  PAID: { label: "ชำระเงิน/จ่ายหนังสืออนุญาต", color: "#00C259", step: 5 },
  PENDING_REVIEW: {
    label: "รอตรวจสอบ",
    color: brand.warning,
    step: null,
    rowOnly: true,
  },
  // The green counterpart the design puts on every section once an officer
  // has taken the request in (Figma node 4025:201616).
  VERIFIED: {
    label: "ถูกต้อง",
    color: "#00C259",
    step: null,
    rowOnly: true,
  },
};

/** Lifecycle order — also the order the filter dropdown lists them in. */
export const REQUEST_STATUS_ORDER: RequestStatus[] = [
  "CREATED",
  "RETURNED",
  "SUBMITTED",
  "RECEIVED",
  "AWAITING_REQUEST_FEE",
  "REQUEST_FEE_PAID",
  "UNDER_REVIEW",
  "REJECTED",
  "APPROVED",
  "AWAITING_PERMIT_FEE",
  "PAID",
];

/** Which stepper circle to mark current. Falls back to the first step. */
export function stepIndexOf(status: RequestStatus): number {
  return REQUEST_STATUS_META[status].step ?? 0;
}

export function statusLabel(status: RequestStatus): string {
  return REQUEST_STATUS_META[status].label;
}

/** A request in one of these is finished — no further action moves it on. */
export const TERMINAL_STATUSES: RequestStatus[] = ["PAID", "REJECTED"];
