"use client";

import React from "react";
import { Tag } from "antd";
import { REQUEST_STATUS_META } from "@/constant/requestStatus";
import type { RequestStatus } from "@/types/app/importRequestA4";

interface StatusTagProps {
  status: RequestStatus;
}

/** Label and colour both come from `constant/requestStatus.ts` — never local. */
export default function StatusTag({ status }: StatusTagProps) {
  const meta = REQUEST_STATUS_META[status];
  if (!meta) return null;

  return (
    <Tag color={meta.color} className="!me-0 !rounded !text-white">
      {meta.label}
    </Tag>
  );
}
