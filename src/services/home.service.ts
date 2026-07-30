import type { HomeSummary } from "@/types/app/home";
import type { UserRole } from "@/types/app/auth";
import { HOME_SUMMARY_BY_ROLE } from "@/mocks/home";

/**
 * Home screen counters for the signed-in role.
 *
 * No backend yet — resolves the fixture. When the API lands, replace the body:
 *
 *   const res = await getHomeSummaryApi();
 *   return toHomeSummary(res.data?.data);
 */
export const getHomeSummary = async (role: UserRole): Promise<HomeSummary> =>
  HOME_SUMMARY_BY_ROLE[role];
