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
  /** Dark navy rail — also the header account dropdown panel */
  siderBg: "#272E40",
  /** Open submenu panel — a step darker so it reads apart from the rail */
  siderSubMenuBg: "#232936",
  /** Selected menu row */
  siderItemSelectedBg: "#3A4257",
  /** Sidebar group headings ("ระบบคำขอ", "ระบบ", …) */
  siderGroupTitle: "rgba(255,255,255,0.45)",
  /** Yellow English subtitle in the header */
  headerAccent: "#F9E12F",
  /** Muted version text in the header */
  headerMuted: "#BEBEBE",
  /** Page background behind the content area */
  contentBg: "#F5F5F5",

  /** Login panel — cyan organisation line under the title */
  loginAccent: "#8EFFFF",
  /** Login panel — "ลืมรหัสผ่าน" link */
  loginLink: "#00B2FF",
  /** Login panel — input border (Black/Black - 100) */
  loginInputBorder: "#D1D2D4",
  /** Login panel — focused input border (Other/Input - 500) */
  loginInputFocus: "#3993FF",
} as const;

export const FONT_FAMILY =
  "var(--font-noto-sans-thai), 'Noto Sans Thai', 'Noto Sans', sans-serif";
