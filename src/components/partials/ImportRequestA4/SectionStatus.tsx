"use client";

import React from "react";
import { Typography } from "antd";
import { REQUEST_STATUS_META } from "@/constant/requestStatus";
import type { RequestStatus } from "@/types/app/importRequestA4";

const { Text } = Typography;

interface SectionStatusProps {
  status: RequestStatus;
}

/**
 * The small รอตรวจสอบ / ถูกต้อง line in a card's top-right corner. The design
 * draws it as coloured text rather than a tag, but the label and the colour
 * still come from `constant/requestStatus.ts` — never a literal.
 */
export default function SectionStatus({ status }: SectionStatusProps) {
  const meta = REQUEST_STATUS_META[status];
  if (!meta) return null;

  return (
    <Text className="shrink-0" style={{ color: meta.color }}>
      {meta.label}
    </Text>
  );
}
