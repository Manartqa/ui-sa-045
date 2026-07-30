import React from "react";
import type { MenuProps } from "antd";
import {
  HomeOutlined,
  FileTextOutlined,
  UserAddOutlined,
  UserOutlined,
  KeyOutlined,
  LogoutOutlined,
  DashboardOutlined,
  ReadOutlined,
  ApiOutlined,
  ToolOutlined,
  HomeFilled,
  WalletOutlined,
  BuildOutlined,
  TableOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { brand } from "@/theme";
import type { UserRole } from "@/types/app/auth";

export const SIDEBAR_WIDTH = 256;
export const SIDEBAR_COLLAPSED_WIDTH = 80;

export const APP_VERSION = "Version : 1.0.0";

/** Shown in the header before the session is read (or when signed out). */
export const FALLBACK_USER_NAME = "ผู้ใช้งาน";

export const NOTIFICATION_COUNT = 2;

/** Header wording differs per side, like the sign-in screens. */
export const APP_CHROME_BY_ROLE: Record<
  UserRole,
  { title: string; subtitle: string; accent: string }
> = {
  admin: {
    title: "ระบบจัดการฐานข้อมูลโรงงานผลิตอาวุธของเอกชน สำหรับเจ้าหน้าที่",
    subtitle: "Private Arms Manufacturing Factory system สำหรับเจ้าหน้าที่ฯ",
    accent: brand.loginAccent,
  },
  user: {
    title: "ระบบสารสนเทศโรงงานผลิตอาวุธของเอกชน สำหรับผู้ประกอบการ",
    subtitle: "Private Arms Manufacturing Factory system สำหรับผู้ประกอบการ",
    accent: brand.headerAccent,
  },
};

/** Used before the session is known — the officer chrome is the default. */
export const DEFAULT_APP_CHROME = APP_CHROME_BY_ROLE.admin;

export const USER_MENU_KEYS = {
  profile: "profile",
  changePassword: "change-password",
  logout: "logout",
} as const;

export const USER_MENU_ITEMS: MenuProps["items"] = [
  {
    key: USER_MENU_KEYS.profile,
    icon: <UserOutlined />,
    label: "โปรไฟล์",
  },
  {
    key: USER_MENU_KEYS.changePassword,
    icon: <KeyOutlined />,
    label: "เปลี่ยนรหัสผ่าน",
  },
  {
    key: USER_MENU_KEYS.logout,
    icon: <LogoutOutlined />,
    label: "ออกจากระบบ",
  },
];

/** Menu key → route. Keys without an entry are not navigable yet. */
export const MENU_ROUTES: Record<string, string> = {
  home: "/home",
  "request-a4": "/request/import-weapon-a4/list",
};

/** The five permit forms — shared by both sides. */
const REQUEST_FORM_ITEMS: MenuProps["items"] = [
  {
    key: "request-a4",
    label: "คำขออนุญาตสั่งหรือนำเข้ามาในราชอาณาจักรซึ่งวัตถุหรืออาวุธฯ แบบ อ.4",
  },
  {
    key: "request-a6",
    label: "คำขออนุญาตผลิตเฉพาะส่วนประกอบของอาวุธเป็นการเฉพาะคราว แบบ อ.6",
  },
  {
    key: "request-a9",
    label:
      "คำขออนุญาตขนย้ายวัตถุหรืออาวุธที่ใช้ในการผลิตอาวุธหรืออาวุธที่ผลิตขึ้นฯ แบบ อ.9",
  },
  {
    key: "request-a14",
    label: "คำขออนุญาตขายหรือจำหน่ายฯ โดยการส่งออก อ.14",
  },
  {
    key: "request-a15",
    label: "คำขออนุญาตขายหรือจำหน่ายฯ ในราชอาณาจักร อ.15",
  },
];

/** Operator (ผู้ประกอบการ) rail. */
const OPERATOR_MENU_ITEMS: MenuProps["items"] = [
  // Icons picked to match the operator design: solid home, wallet for the
  // payment list, a building block for warehouses, a table for the steps guide
  // and a closed book for the manual.
  { key: "home", icon: <HomeFilled />, label: "หน้าหลัก" },
  {
    key: "grp-request",
    type: "group",
    label: "ระบบคำขอ",
    children: [
      {
        key: "request",
        icon: <FileTextOutlined />,
        label: "คำขออนุญาต",
        children: REQUEST_FORM_ITEMS,
      },
    ],
  },
  {
    key: "grp-system",
    type: "group",
    label: "ระบบ",
    children: [
      {
        key: "operator-info",
        icon: <UserAddOutlined />,
        label: "ข้อมูลผู้ประกอบการ",
      },
      {
        key: "payment-notices",
        icon: <WalletOutlined />,
        label: "รายการแจ้งชำระเงิน",
      },
    ],
  },
  {
    key: "grp-factory",
    type: "group",
    label: "ข้อมูลโรงงาน",
    children: [
      {
        key: "warehouse-info",
        icon: <BuildOutlined />,
        label: "ข้อมูลคลัง/อาคาร",
      },
      {
        key: "machines",
        icon: <ToolOutlined />,
        label: "รายการเครื่องจักร",
      },
    ],
  },
  {
    key: "grp-manual",
    type: "group",
    label: "คู่มือการใช้งาน",
    children: [
      {
        key: "manual-steps",
        icon: <TableOutlined />,
        label: "6 ขั้นตอนการยื่นคำขออนุญาต",
      },
      {
        key: "manual-operator",
        icon: <BookOutlined />,
        label: "คู่มือการใช้งานสำหรับผู้ประกอบการ",
      },
    ],
  },
];

/** Officer (เจ้าหน้าที่) rail. */
const OFFICER_MENU_ITEMS: MenuProps["items"] = [
  {
    key: "home",
    icon: <HomeOutlined />,
    label: "หน้าหลัก",
  },
  {
    key: "grp-request",
    type: "group",
    label: "ระบบคำขอ",
    children: [
      {
        key: "request",
        icon: <FileTextOutlined />,
        label: "คำขออนุญาต",
        children: REQUEST_FORM_ITEMS,
      },
    ],
  },
  {
    key: "grp-system",
    type: "group",
    label: "ระบบ",
    children: [
      {
        key: "operator-info",
        icon: <UserAddOutlined />,
        label: "ข้อมูลผู้ประกอบการ",
      },
      {
        key: "operator-info-r4",
        icon: <UserAddOutlined />,
        label: "ข้อมูลผู้ประกอบการ (รง.4)",
      },
    ],
  },
  {
    key: "grp-dashboard",
    type: "group",
    label: "ระบบ DASHBOARD",
    children: [
      {
        key: "dashboard",
        icon: <DashboardOutlined />,
        label: "Dashboard",
      },
    ],
  },
  {
    key: "grp-manual",
    type: "group",
    label: "คู่มือการใช้งาน",
    children: [
      {
        key: "manual-officer",
        icon: <ReadOutlined />,
        label: "คู่มือการใช้งานสำหรับเจ้าหน้าที่",
      },
      {
        key: "linkage",
        icon: <ApiOutlined />,
        label: "เข้าสู่ระบบเพื่อใช้งาน linkage",
      },
    ],
  },
];

export const SIDEBAR_MENU_BY_ROLE: Record<UserRole, MenuProps["items"]> = {
  admin: OFFICER_MENU_ITEMS,
  user: OPERATOR_MENU_ITEMS,
};
