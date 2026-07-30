import { brand } from "@/theme";
import type { UserRole } from "@/types/app/auth";
import { HOME_PATH } from "@/components/partials/Home/Home.config";

export const LOGIN_TITLE_TH = "ระบบสารสนเทศโรงงานผลิตอาวุธของเอกชน";
export const LOGIN_TITLE_EN = "Private Arms Manufacturing Factory system";

export const LOGIN_HEADING = "เข้าสู่ระบบ";
export const LOGIN_SUBMIT_LABEL = "เข้าสู่ระบบ";
export const LOGIN_FORGOT_PASSWORD = "ลืมรหัสผ่าน";

export const USERNAME_LABEL = "ชื่อผู้ใช้งาน";
export const PASSWORD_LABEL = "รหัสผ่าน";

export const USERNAME_REQUIRED = "กรุณากรอกชื่อผู้ใช้งาน";
export const PASSWORD_REQUIRED = "กรุณากรอกรหัสผ่าน";
export const INVALID_CREDENTIALS = "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง";

/** Both roles land on the home screen after signing in. */
export const LANDING_PATH_BY_ROLE = {
  admin: HOME_PATH,
  user: HOME_PATH,
} as const;

/** Panel is 575 of the 1920 frame. */
export const LOGIN_PANEL_BASIS = "29.95%";
/** Content column (495) plus the 40px gutters on each side. */
export const LOGIN_PANEL_MIN_WIDTH = 575;
export const LOGIN_PANEL_PADDING_X = 40;
export const LOGIN_CONTENT_WIDTH = 495;

/** Figma's Logo component at its "Large" size (the frame scales it to 140). */
export const LOGIN_LOGO_SIZE = 120;

export const LOGIN_LOGO_SRC = "/images/logo.png";

export type LoginSide = "officer" | "operator";

export interface LoginVariant {
  /** The only role this screen will sign in. */
  role: UserRole;
  /** Third line of the title block. */
  audience: string;
  /** Color of the English + audience lines. */
  accent: string;
  bgSrc: string;
  /** Shown when the credentials are valid but belong to the other screen. */
  wrongRoleMessage: string;
  loginPath: string;
  forgotPasswordPath: string;
  /** Title block on the forgot-password screen — worded differently there. */
  forgotTitleLines: string[];
}

export const LOGIN_VARIANTS: Record<LoginSide, LoginVariant> = {
  officer: {
    role: "admin",
    audience: "สำหรับเจ้าหน้าที่ฯ",
    accent: brand.loginAccent,
    bgSrc: "/images/login-bg-officer.jpg",
    wrongRoleMessage: "บัญชีนี้ไม่ใช่บัญชีเจ้าหน้าที่ กรุณาเข้าสู่ระบบสำหรับผู้ประกอบการ",
    loginPath: "/login/officer",
    forgotPasswordPath: "/forgot-password/officer",
    forgotTitleLines: [
      "ระบบจัดการฐานข้อมูล",
      "โรงงานผลิตอาวุธของเอกชน",
      "สำหรับเจ้าหน้าที่ฯ",
    ],
  },
  operator: {
    role: "user",
    audience: "สำหรับผู้ประกอบการ",
    accent: brand.headerAccent,
    bgSrc: "/images/login-bg-operator.png",
    wrongRoleMessage: "บัญชีนี้ไม่ใช่บัญชีผู้ประกอบการ กรุณาเข้าสู่ระบบสำหรับเจ้าหน้าที่",
    loginPath: "/login/operator",
    forgotPasswordPath: "/forgot-password/operator",
    forgotTitleLines: ["ระบบเชื่อมโยงข้อมูลโรงงานผลิตอาวุธสำหรับผู้ประกอบการ"],
  },
};
