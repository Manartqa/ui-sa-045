"use client";

import React from "react";
import { Breadcrumb } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
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
        <h1 className="m-0 text-base font-bold leading-6 text-black">
          {CREATE_PAGE_TITLE}
        </h1>
      </div>
    </div>
  );
}
