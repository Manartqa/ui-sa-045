"use client";

import React from "react";
import { Breadcrumb, Typography, theme } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { StatusTag } from "@/components/ui/StatusTag";
import { toThaiDateTime } from "@/lib/date";
import type { ImportRequestRecord } from "@/types/app/importRequestA4";
import { BREADCRUMB_ITEMS, PAGE_TITLE } from "./ImportRequestA4.config";

const { Text, Title } = Typography;

interface RequestHeaderProps {
  record: ImportRequestRecord;
}

export default function RequestHeader({ record }: RequestHeaderProps) {
  const { token } = theme.useToken();
  const router = useRouter();

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
      <div className="min-w-0">
        <Breadcrumb items={BREADCRUMB_ITEMS} />
        <div className="mt-1 flex items-center gap-2">
          <LeftOutlined
            className="cursor-pointer text-lg"
            onClick={() => router.push("/request/import-weapon-a4/list")}
          />
          <Title level={5} style={{ margin: 0 }}>
            {PAGE_TITLE}
          </Title>
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-start gap-3 lg:items-end">
        <div
          className="w-[250px] p-4"
          style={{
            border: `1px solid ${token.colorBorder}`,
            background: token.colorBgContainer,
            borderRadius: token.borderRadius,
          }}
        >
          <div className="flex gap-2">
            <Text>สร้างข้อมูล:</Text>
            <Text>{toThaiDateTime(record.createdAt)}</Text>
          </div>
          <div className="mt-2 flex gap-2">
            <Text>ปรับปรุงล่าสุด:</Text>
            <Text>{toThaiDateTime(record.updatedAt)}</Text>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Text>สถานะ:</Text>
          <StatusTag status={record.status} />
        </div>
      </div>
    </div>
  );
}
