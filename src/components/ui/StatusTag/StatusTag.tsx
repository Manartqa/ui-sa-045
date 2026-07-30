"use client";

import React from "react";
import { Tag } from "antd";
import { brand } from "@/theme";
import type { RequestStatus } from "@/types/app/importRequestA4";

const STATUS_CONFIG: Record<RequestStatus, { label: string; color: string }> = {
  CREATED: { label: "สร้างคำขอ", color: brand.neutral },
  PENDING_REVIEW: { label: "รอตรวจสอบ", color: brand.warning },
  SUBMITTED: { label: "ยื่นคำขอ", color: brand.warning },
  RECEIVED: { label: "รับเรื่อง", color: "#1677FF" },
  UNDER_REVIEW: { label: "อยู่ระหว่างพิจารณา", color: "#69B1FF" },
  APPROVED: { label: "อนุมัติ", color: "#00C259" },
  PAID: { label: "ชำระเงิน/จ่ายหนังสืออนุญาต", color: "#00C259" },
  REJECTED: { label: "ไม่อนุมัติ", color: brand.error },
  RETURNED: { label: "ตีกลับ/แก้ไข", color: brand.error },
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
