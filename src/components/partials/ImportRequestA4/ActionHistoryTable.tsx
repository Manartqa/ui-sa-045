"use client";

import React from "react";
import { Card, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { StatusTag } from "@/components/ui/StatusTag";
import { SectionTitle, TablePagination } from "@/components/common";
import type { ActionHistoryItem } from "@/types/app/importRequestA4";

const columns: ColumnsType<ActionHistoryItem> = [
  { title: "#", dataIndex: "order", width: 60 },
  { title: "วันที่/เวลา", dataIndex: "dateTime", width: 162, sorter: true },
  { title: "สร้างโดย", dataIndex: "createdBy", width: 162, sorter: true },
  { title: "ประเภทผู้ใช้งาน", dataIndex: "userType", width: 162, sorter: true },
  {
    title: "สถานะ",
    dataIndex: "status",
    width: 160,
    render: (status: ActionHistoryItem["status"]) => (
      <StatusTag status={status} />
    ),
  },
  {
    title: "รายละเอียด",
    dataIndex: "detail",
    render: (v: string) => v || "",
  },
];

interface ActionHistoryTableProps {
  items: ActionHistoryItem[];
}

export default function ActionHistoryTable({
  items,
}: ActionHistoryTableProps) {
  return (
    <Card styles={{ body: { padding: 32 } }}>
      <SectionTitle className="!mb-4">ประวัติการดำเนินการ</SectionTitle>
      <Table<ActionHistoryItem>
        className="app-table"
        columns={columns}
        dataSource={items}
        pagination={false}
        size="middle"
      />
      <TablePagination total={items.length} />
    </Card>
  );
}
