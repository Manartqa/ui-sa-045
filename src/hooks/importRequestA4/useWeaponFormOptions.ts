"use client";

import { useQuery } from "@tanstack/react-query";
import { getWeaponFormOptions } from "@/services/importRequestA4.service";

export const WEAPON_FORM_OPTIONS_QUERY_KEY = ["weaponFormOptions"] as const;

/** Catalogue + select options behind the เพิ่มข้อมูลอาวุธ/วัตถุดิบ modal. */
export const useWeaponFormOptions = (enabled = true) => {
  const { data, isLoading } = useQuery({
    queryKey: WEAPON_FORM_OPTIONS_QUERY_KEY,
    queryFn: getWeaponFormOptions,
    enabled,
  });

  return {
    catalog: data?.catalog ?? [],
    units: data?.units ?? [],
    importMethods: data?.importMethods ?? [],
    countries: data?.countries ?? [],
    isLoading,
  };
};
