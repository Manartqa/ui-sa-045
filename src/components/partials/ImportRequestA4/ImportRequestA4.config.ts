import type { StepItem } from "@/types/app/importRequestA4";

/**
 * Presentation-only settings for the detail screen. Every value the screen
 * *displays* now comes from the request record via `useImportRequestA4Detail`
 * — nothing in here is data.
 */

export const PAGE_TITLE =
  "เพิ่มคําขออนุญาตสั่งหรือนําเข้ามาในราชอาณาจักรซึ่งวัตถุหรืออาวุธฯ แบบ อ.4";

export const BREADCRUMB_ITEMS = [
  { title: "ระบบคำขอ" },
  { title: "คําขออนุญาต" },
  {
    title: "คําขออนุญาตสั่งหรือนําเข้ามาในราชอาณาจักรซึ่งวัตถุหรืออาวุธฯ แบบ อ.4",
  },
];

export const APPLICATION_FORM_TITLE =
  "คําขออนุญาตสั่งหรือนําเข้ามาในราชอาณาจักรซึ่งวัตถุหรืออาวุธฯ";

/**
 * Line breaks are the ones drawn in Figma. They are explicit because Thai has
 * no spaces: left to wrap on its own, "หนังสืออนุญาต" splits mid-word at the
 * column width. The stepper renders these with `white-space: pre`.
 */
export const STEPS: StepItem[] = [
  { no: "01", label: "ยื่นคำขอ" },
  { no: "02", label: "รับเรื่อง" },
  { no: "03", label: "อยู่ระหว่าง\nพิจารณา" },
  { no: "04", label: "อนุมัติ/\nไม่อนุมัติ" },
  { no: "05", label: "ชำระค่า\nหนังสืออนุญาต" },
  { no: "06", label: "ออกหนังสือ\nอนุญาต" },
];

/**
 * Stepper greys, named after the Figma variables on node 4025:190464. They are
 * antd's neutral palette, not brand colours, so they stay here rather than in
 * `theme/tokens.ts`.
 */
export const STEP_COLORS = {
  /** colorBorder — idle circle and every connector */
  border: "#d9d9d9",
  /** gray/7 — current circle, same grey as the caret above it */
  activeBorder: "#8c8c8c",
  /** colorTextPlaceholder — idle step number */
  number: "rgba(0,0,0,0.25)",
  /** gray/7 */
  activeNumber: "#8c8c8c",
  /** colorTextDescription — idle label */
  label: "rgba(0,0,0,0.45)",
  /** colorTextLabel — current label sits a shade darker */
  activeLabel: "rgba(0,0,0,0.65)",
} as const;
