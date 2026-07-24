"use client";

import React from "react";
import { Card, Table, Button, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  FileTextOutlined,
  FolderOpenOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { StatusTag } from "@/components/ui/StatusTag";
import { TablePagination } from "@/components/common";
import type { WeaponItem } from "@/types/app/importRequestA4";
import { WEAPON_ITEMS } from "./ImportRequestA4.config";

const columns: ColumnsType<WeaponItem> = [
  { title: "#", dataIndex: "order", width: 60 },
  { title: "รหัส", dataIndex: "code", width: 162, sorter: true },
  { title: "กลุ่ม", dataIndex: "group", width: 250, sorter: true },
  { title: "ชื่ออาวุธ/วัตถุดิบ", dataIndex: "name", width: 250, sorter: true },
  { title: "รายละเอียด", dataIndex: "detail", width: 250, sorter: true },
  { title: "จำนวน", dataIndex: "amount", width: 162, sorter: true },
  {
    title: "เลขหนังสืออนุญาต อ.8 ฉบับเดิม",
    dataIndex: "previousPermitNo",
    width: 250,
    sorter: true,
  },
  {
    title: "หนังสืออนุญาต อ.8",
    key: "permitDoc",
    width: 250,
    render: () => <Button icon={<FileTextOutlined />} />,
  },
  {
    title: "จัดการเอกสาร",
    key: "manageDoc",
    width: 190,
    render: () => <Button icon={<FolderOpenOutlined />} />,
  },
  {
    title: "สถานะ",
    dataIndex: "status",
    width: 162,
    render: (status: WeaponItem["status"]) => <StatusTag status={status} />,
  },
  {
    title: "",
    key: "actions",
    width: 104,
    render: () => (
      <Space>
        <Button icon={<EditOutlined />} />
        <Button danger icon={<DeleteOutlined />} />
      </Space>
    ),
  },
];

export default function WeaponsTable() {
  return (
    <Card styles={{ body: { padding: 32 } }}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="m-0 text-lg font-bold leading-7 text-black">
          อาวุธหรือวัตถุที่ต้องการสั่งหรือนำเข้ามา
        </h2>
        <Space wrap>
          <Button size="large">ปรับรายการ</Button>
          <Button size="large">พิมพ์รายงานอาวุธหรือวัตถุ</Button>
          <Button type="primary" size="large">
            เพิ่มข้อมูล
          </Button>
        </Space>
      </div>
      <Table<WeaponItem>
        className="app-table"
        columns={columns}
        dataSource={WEAPON_ITEMS}
        pagination={false}
        scroll={{ x: 2080 }}
        size="middle"
      />
      <TablePagination total={WEAPON_ITEMS.length} />
    </Card>
  );
}
