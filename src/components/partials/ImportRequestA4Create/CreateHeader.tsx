"use client";

import React from "react";
import { Breadcrumb } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { SectionTitle } from "@/components/common";
import {
  CREATE_BREADCRUMB_ITEMS,
  CREATE_PAGE_TITLE,
} from "./ImportRequestA4Create.config";

export default function CreateHeader() {
  const router = useRouter();
  return (
    <div className="min-w-0">
      <Breadcrumb items={CREATE_BREADCRUMB_ITEMS} />
      <div className="mt-1 flex items-center gap-2">
        <LeftOutlined
          className="cursor-pointer text-lg"
          onClick={() => router.back()}
        />
        <SectionTitle variant="page">{CREATE_PAGE_TITLE}</SectionTitle>
      </div>
    </div>
  );
}
