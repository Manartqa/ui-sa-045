"use client";

import React from "react";
import { Card, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { StatusTag } from "@/components/ui/StatusTag";
import { TablePagination } from "@/components/common";
import type { ActionHistoryItem } from "@/types/app/importRequestA4";
import { ACTION_HISTORY } from "./ImportRequestA4.config";

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

export default function ActionHistoryTable() {
  return (
    <Card styles={{ body: { padding: 32 } }}>
      <h2 className="m-0 mb-4 text-lg font-bold leading-7 text-black">
        ประวัติการดำเนินการ
      </h2>
      <Table<ActionHistoryItem>
        className="app-table"
        columns={columns}
        dataSource={ACTION_HISTORY}
        pagination={false}
        size="middle"
      />
      <TablePagination total={ACTION_HISTORY.length} />
    </Card>
  );
}
