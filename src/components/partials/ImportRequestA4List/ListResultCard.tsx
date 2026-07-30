"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined, FilePdfOutlined } from "@ant-design/icons";
import { StatusTag } from "@/components/ui/StatusTag";
import { FileSearchIcon } from "@/components/ui/icons";
import { TablePagination } from "@/components/common";
import { COMMON_TEXT } from "@/constant/text/common";
import type { ImportRequestListItem } from "@/types/app/importRequestA4";

/** Empty cells render blank in the design rather than a dash. */
const text = (value: string) => value || "";

interface ListResultCardProps {
  items: ImportRequestListItem[];
  total: number;
  loading?: boolean;
}

export default function ListResultCard({
  items,
  total,
  loading,
}: ListResultCardProps) {
  const router = useRouter();

  const columns: ColumnsType<ImportRequestListItem> = [
    { title: "#", dataIndex: "order", width: 60, sorter: true },
    {
      title: "เลขที่อ้างอิง",
      dataIndex: "referenceNo",
      width: 162,
      sorter: true,
    },
    { title: "เลขที่รับเรื่อง", dataIndex: "receiveNo", width: 162, sorter: true },
    {
      title: "วันที่รับเรื่อง",
      dataIndex: "receiveDate",
      width: 162,
      sorter: true,
      render: text,
    },
    { title: "เลขที่คำขอ", dataIndex: "requestNo", width: 162, sorter: true, render: text },
    { title: "วันที่คำขอ", dataIndex: "requestDate", width: 162, sorter: true },
    {
      title: "สถานะ",
      dataIndex: "status",
      width: 180,
      sorter: true,
      render: (status: ImportRequestListItem["status"]) => (
        <StatusTag status={status} />
      ),
    },
    {
      title: "เลขหนังสืออนุญาต",
      dataIndex: "permitNo",
      width: 162,
      sorter: true,
      render: text,
    },
    {
      title: "วันที่อนุมัติ",
      dataIndex: "approvedDate",
      width: 162,
      sorter: true,
      render: text,
    },
    {
      title: "วันที่หมดอายุ",
      dataIndex: "expireDate",
      width: 162,
      sorter: true,
      render: text,
    },
    {
      title: "หนังสืออนุญาต",
      key: "permitFile",
      width: 162,
      render: (_, row) =>
        row.hasPermitFile ? (
          <Button
            type="text"
            icon={<FilePdfOutlined />}
            danger
            aria-label="ดาวน์โหลดหนังสืออนุญาต"
          />
        ) : null,
    },
    {
      title: "",
      key: "actions",
      width: 104,
      fixed: "right",
      render: (_, row) => (
        <Space size={8}>
          <Button
            type="primary"
            icon={<FileSearchIcon />}
            aria-label="ดูรายละเอียด"
            onClick={() => router.push("/request/import-weapon-a4")}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            aria-label="ลบคำขอ"
            // Only a draft can be deleted — matches the design, where the bin
            // is greyed out on every row except "สร้างคำขอ".
            disabled={row.status !== "CREATED"}
          />
        </Space>
      ),
    },
  ];

  return (
    <Card styles={{ body: { padding: 32 } }}>
      <Table<ImportRequestListItem>
        className="app-table"
        columns={columns}
        dataSource={items}
        loading={loading}
        pagination={false}
        scroll={{ x: "max-content" }}
        locale={{ emptyText: COMMON_TEXT.emptyData }}
        size="middle"
      />
      <TablePagination total={total} />
    </Card>
  );
}
