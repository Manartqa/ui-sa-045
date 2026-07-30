import type { HomeSummary } from "@/types/app/home";
import type { UserRole } from "@/types/app/auth";

const REQUEST_LIST_PATH = "/request/import-weapon-a4/list";

/**
 * Home tiles per role. The operator figures come from the design; the officer
 * side has no tile design yet, so it reuses the operator breakdown until one
 * arrives.
 */
export const HOME_SUMMARY_BY_ROLE: Record<UserRole, HomeSummary> = {
  admin: {
    title: "งานทั้งหมดของฉัน",
    total: 8,
    tiles: [
      {
        key: "operators",
        label: "ข้อมูลผู้ประกอบการ",
        count: 8,
        icon: "issued",
        href: REQUEST_LIST_PATH,
      },
    ],
  },
  user: {
    title: "คำขออนุญาต/ตรวจสอบ",
    total: 221,
    tiles: [
      {
        key: "draft",
        label: "สร้าง/แก้ไข",
        count: 83,
        icon: "draft",
        href: REQUEST_LIST_PATH,
      },
      {
        key: "reviewing",
        label: "อยู่ระหว่างตรวจสอบและพิจารณา",
        count: 91,
        icon: "reviewing",
        href: REQUEST_LIST_PATH,
      },
      {
        key: "payment",
        label: "ชำระค่าธรรมเนียม",
        count: 10,
        icon: "payment",
        href: REQUEST_LIST_PATH,
      },
      {
        key: "rejected",
        label: "ไม่อนุมัติ",
        count: 3,
        icon: "rejected",
        href: REQUEST_LIST_PATH,
      },
      {
        key: "issued",
        label: "ออกใบอนุญาต/หนังสือ",
        count: 34,
        icon: "issued",
        href: REQUEST_LIST_PATH,
      },
    ],
  },
};
