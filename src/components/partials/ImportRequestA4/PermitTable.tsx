"use client";

import React from "react";
import { Card, Table, Button, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { FileTextOutlined } from "@ant-design/icons";
import { StatusTag } from "@/components/ui/StatusTag";
import type { PermitItem } from "@/types/app/importRequestA4";
import { PERMIT_ITEMS } from "./ImportRequestA4.config";

const columns: ColumnsType<PermitItem> = [
  { title: "#", dataIndex: "order", width: 60 },
  { title: "เลขที่หนังสือ", dataIndex: "documentNo", sorter: true },
  { title: "วันที่อนุญาต", dataIndex: "approvedDate", sorter: true },
  {
    title: "หนังสืออนุญาต",
    key: "permitDoc",
    render: () => <Button icon={<FileTextOutlined />} />,
  },
  {
    title: "สถานะ",
    dataIndex: "status",
    width: 120,
    render: (status: PermitItem["status"]) => <StatusTag status={status} />,
  },
];

export default function PermitTable() {
  return (
    <Card styles={{ body: { padding: 32 } }}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="m-0 text-lg font-bold leading-7 text-black">
          ข้อมูลหนังสืออนุญาตเปิดดำเนินการผลิตอาวุธ
        </h2>
        <Space wrap>
          <Button size="large">ค้นหา</Button>
          <Button type="primary" size="large">
            เพิ่มข้อมูล
          </Button>
        </Space>
      </div>
      <Table<PermitItem>
        className="app-table"
        columns={columns}
        dataSource={PERMIT_ITEMS}
        pagination={false}
        locale={{ emptyText: "ไม่มีข้อมูล" }}
        size="middle"
      />
    </Card>
  );
}
