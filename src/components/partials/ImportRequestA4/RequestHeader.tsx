"use client";

import React from "react";
import { Breadcrumb } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { StatusTag } from "@/components/ui/StatusTag";
import {
  BREADCRUMB_ITEMS,
  PAGE_TITLE,
  REQUEST_META,
} from "./ImportRequestA4.config";

export default function RequestHeader() {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
      <div className="min-w-0">
        <Breadcrumb items={BREADCRUMB_ITEMS} />
        <div className="mt-1 flex items-center gap-2">
          <LeftOutlined className="text-lg" />
          <h1 className="m-0 text-base font-bold leading-6 text-black">
            {PAGE_TITLE}
          </h1>
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-start gap-3 lg:items-end">
        <div className="w-[250px] rounded-lg border border-[#D9D9D9] bg-white p-4 text-sm leading-[22px]">
          <div className="flex gap-2">
            <span>สร้างข้อมูล:</span>
            <span>{REQUEST_META.createdAt}</span>
          </div>
          <div className="mt-2 flex gap-2">
            <span>ปรับปรุงล่าสุด:</span>
            <span>{REQUEST_META.updatedAt}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span>สถานะ:</span>
          <StatusTag status="CREATED" />
        </div>
      </div>
    </div>
  );
}
