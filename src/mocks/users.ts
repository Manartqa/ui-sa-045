import type { MockUser } from "@/types/app/auth";

/**
 * Demo accounts. There is no backend yet — the login screen matches against
 * this list, so the credentials are intentionally in plain text and must be
 * replaced by a real auth call before this ships anywhere public.
 */
export const MOCK_USERS: MockUser[] = [
  {
    username: "admin",
    password: "P@ssw0rd",
    role: "admin",
    displayName: "เจ้าหน้าที่แผนกหนังสืออนุญาต",
    roleLabel: "เจ้าหน้าที่",
  },
  {
    username: "user",
    password: "P@ssw0rd",
    role: "user",
    displayName: "มานัส ประทุมชุ - บริษัท ศรีอุตสาหกรรมอาวุธ จำกัด",
    roleLabel: "ผู้ประกอบการ",
  },
];
