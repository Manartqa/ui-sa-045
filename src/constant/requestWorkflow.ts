import type { UserRole } from "@/types/app/auth";
import type { RequestStatus } from "@/types/app/importRequestA4";

/**
 * Who may move a request where, and what the log should say when they do.
 *
 * This is the companion to `requestStatus.ts`: that file says what a status
 * *means*, this one says how a request gets from one to the next. The footer
 * reads it, so an action can never appear for the wrong role or the wrong
 * status — and adding a step is an entry here, not a new button.
 */
export interface RequestTransition {
  key: string;
  /** Button label. */
  label: string;
  /** Statuses the action is offered from. */
  from: RequestStatus[];
  to: RequestStatus;
  /** เจ้าหน้าที่ (`admin`) or ผู้ประกอบการ (`user`). */
  role: UserRole;
  confirmTitle: string;
  confirmDescription: string;
  /** Line written to ประวัติการดำเนินการ. */
  logDetail: string;
  /** Renders as the footer's primary button. */
  primary?: boolean;
  danger?: boolean;
}

export const REQUEST_TRANSITIONS: RequestTransition[] = [
  {
    key: "submit",
    label: "ยื่นคำขอ",
    from: ["CREATED", "RETURNED"],
    to: "SUBMITTED",
    role: "user",
    confirmTitle: "คุณต้องการยื่นคำขอหรือไม่?",
    confirmDescription: "ยืนยันการยื่นคำขอ",
    logDetail: "ยื่นคำขอ",
    primary: true,
  },
  {
    key: "receive",
    label: "รับเรื่อง",
    from: ["SUBMITTED"],
    to: "RECEIVED",
    role: "admin",
    confirmTitle: "คุณต้องการรับเรื่องหรือไม่?",
    confirmDescription: "ยืนยันการรับเรื่อง",
    logDetail: "รับเรื่อง",
    primary: true,
  },
  {
    key: "review",
    label: "นำเรียนพิจารณา",
    from: ["RECEIVED"],
    to: "UNDER_REVIEW",
    role: "admin",
    confirmTitle: "คุณต้องการนำเรียนพิจารณาหรือไม่?",
    confirmDescription: "ยืนยันการนำเรียนพิจารณา",
    logDetail: "นำเรียนพิจารณา",
    primary: true,
  },
  {
    key: "approve",
    label: "อนุมัติ",
    from: ["UNDER_REVIEW"],
    to: "APPROVED",
    role: "admin",
    confirmTitle: "คุณต้องการอนุมัติคำขอหรือไม่?",
    confirmDescription: "ยืนยันการอนุมัติคำขอ",
    logDetail: "อนุมัติคำขอ",
    primary: true,
  },
  {
    key: "reject",
    label: "ไม่อนุมัติ",
    from: ["UNDER_REVIEW"],
    to: "REJECTED",
    role: "admin",
    confirmTitle: "คุณต้องการไม่อนุมัติคำขอหรือไม่?",
    confirmDescription: "ยืนยันการไม่อนุมัติคำขอ",
    logDetail: "ไม่อนุมัติคำขอ",
    danger: true,
  },
  {
    key: "return",
    label: "ตีกลับ/แก้ไข",
    from: ["RECEIVED", "UNDER_REVIEW"],
    to: "RETURNED",
    role: "admin",
    confirmTitle: "คุณต้องการตีกลับคำขอหรือไม่?",
    confirmDescription: "ยืนยันการตีกลับคำขอให้แก้ไข",
    logDetail: "ตีกลับคำขอให้แก้ไข",
    danger: true,
  },
  {
    key: "requestFee",
    label: "แจ้งชำระค่าหนังสืออนุญาต",
    from: ["APPROVED"],
    to: "AWAITING_PERMIT_FEE",
    role: "admin",
    confirmTitle: "คุณต้องการแจ้งชำระค่าหนังสืออนุญาตหรือไม่?",
    confirmDescription: "ยืนยันการแจ้งชำระค่าหนังสืออนุญาต",
    logDetail: "แจ้งชำระค่าหนังสืออนุญาต",
    primary: true,
  },
  {
    key: "payFee",
    label: "ชำระค่าหนังสืออนุญาต",
    from: ["AWAITING_PERMIT_FEE"],
    to: "PAID",
    role: "user",
    confirmTitle: "คุณต้องการชำระค่าหนังสืออนุญาตหรือไม่?",
    confirmDescription: "ยืนยันการชำระค่าหนังสืออนุญาต",
    logDetail: "ชำระค่าหนังสืออนุญาต",
    primary: true,
  },
];

/** The actions this role may take on a request in this status, in order. */
export function transitionsFor(
  status: RequestStatus,
  role: UserRole,
): RequestTransition[] {
  return REQUEST_TRANSITIONS.filter(
    (t) => t.role === role && t.from.includes(status),
  );
}

/**
 * Row-level status every section shows for a request in this status
 * (requirement 6). Before an officer takes the request in nothing has been
 * checked; once รับเรื่อง has happened the sections read ถูกต้อง, and a
 * ตีกลับ puts them back to รอตรวจสอบ.
 */
export function sectionStatusOf(status: RequestStatus): RequestStatus {
  switch (status) {
    case "CREATED":
    case "RETURNED":
    case "SUBMITTED":
      return "PENDING_REVIEW";
    default:
      return "VERIFIED";
  }
}

/** ค่าธรรมเนียมหนังสืออนุญาต แบบ อ.4 — 400 บาท/ฉบับ per the fee schedule. */
export const PERMIT_FEE_BAHT = 400;
