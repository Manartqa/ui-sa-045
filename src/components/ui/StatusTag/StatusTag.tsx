"use client";

import React from "react";
import { Tag } from "antd";
import { brand } from "@/theme";
import type { RequestStatus } from "@/types/app/importRequestA4";

const STATUS_CONFIG: Record<RequestStatus, { label: string; color: string }> = {
  CREATED: { label: "สร้างคำขอ", color: brand.neutral },
  PENDING_REVIEW: { label: "รอตรวจสอบ", color: brand.warning },
};

interface StatusTagProps {
  status: RequestStatus;
}

export default function StatusTag({ status }: StatusTagProps) {
  const { label, color } = STATUS_CONFIG[status];
  return (
    <Tag color={color} className="!me-0 !rounded !text-white">
      {label}
    </Tag>
  );
}
