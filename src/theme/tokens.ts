/**
 * Single source of truth for brand colors.
 *
 * Values that map onto an antd semantic token are fed into `ConfigProvider`
 * (see `UIProvider`) so components can read them with `theme.useToken()`
 * instead of hardcoding hex. The rest — chrome colors antd has no token for —
 * are imported directly.
 */
export const brand = {
  /** antd colorPrimary / colorInfo */
  primary: "#6574FF",
  /** antd colorSuccess — completed steps */
  success: "#00C853",
  /** antd colorWarning — "รอตรวจสอบ" highlights */
  warning: "#FAAD14",
  /** antd colorError — required notes, PDF actions */
  error: "#FA5E5E",

  /** Neutral status tag (สร้างคำขอ) — no antd equivalent */
  neutral: "#8B8E95",

  /** App chrome */
  headerBg: "#343D55",
  siderBg: "#272E40",
  /** Yellow English subtitle in the header */
  headerAccent: "#F9E12F",
  /** Muted version text in the header */
  headerMuted: "#BEBEBE",
  /** Page background behind the content area */
  contentBg: "#F5F5F5",
} as const;

export const FONT_FAMILY =
  "var(--font-noto-sans-thai), 'Noto Sans Thai', 'Noto Sans', sans-serif";
