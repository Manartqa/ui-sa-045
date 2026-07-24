"use client";

import React from "react";
import { Breadcrumb, Button } from "antd";
import {
  LIST_BREADCRUMB_ITEMS,
  LIST_PAGE_TITLE,
} from "./ImportRequestA4List.config";

interface ListHeaderProps {
  onCreate?: () => void;
}

export default function ListHeader({ onCreate }: ListHeaderProps) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
      <div className="min-w-0">
        <Breadcrumb items={LIST_BREADCRUMB_ITEMS} />
        <h1 className="m-0 mt-1 text-base font-bold leading-6 text-black">
          {LIST_PAGE_TITLE}
        </h1>
      </div>
      <Button type="primary" size="large" className="shrink-0" onClick={onCreate}>
        เพิ่มคำขอ
      </Button>
    </div>
  );
}
