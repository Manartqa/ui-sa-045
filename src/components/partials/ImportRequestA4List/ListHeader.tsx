"use client";

import React from "react";
import { Breadcrumb, Button } from "antd";
import { SectionTitle } from "@/components/common";
import {
  LIST_BREADCRUMB_ITEMS,
  LIST_PAGE_TITLE,
} from "./ImportRequestA4List.config";

interface ListHeaderProps {
  onCreate?: () => void;
  onResetDemo?: () => void;
  resetting?: boolean;
}

export default function ListHeader({
  onCreate,
  onResetDemo,
  resetting,
}: ListHeaderProps) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
      <div className="min-w-0">
        <Breadcrumb items={LIST_BREADCRUMB_ITEMS} />
        <SectionTitle variant="page" className="!mt-1">
          {LIST_PAGE_TITLE}
        </SectionTitle>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {/* Demo-only escape hatch: the mock store is persistent now. */}
        <Button size="large" loading={resetting} onClick={onResetDemo}>
          รีเซ็ตข้อมูลเดโม
        </Button>
        <Button type="primary" size="large" onClick={onCreate}>
          เพิ่มคำขอ
        </Button>
      </div>
    </div>
  );
}
