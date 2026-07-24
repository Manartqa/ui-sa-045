"use client";

import React from "react";
import { Card, Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { FileTextOutlined, UploadOutlined } from "@ant-design/icons";
import { StatusTag } from "@/components/ui/StatusTag";
import { SectionTitle, TablePagination } from "@/components/common";
import type { EvidenceDocumentItem } from "@/types/app/importRequestA4";
import { EVIDENCE_DOCUMENTS } from "./ImportRequestA4.config";

const columns: ColumnsType<EvidenceDocumentItem> = [
  { title: "#", dataIndex: "order", width: 60 },
  { title: "ชื่อเอกสาร", dataIndex: "name", width: 315, sorter: true },
  { title: "วันที่เอกสาร", dataIndex: "documentDate", width: 162, sorter: true },
  { title: "วันหมดอายุ", dataIndex: "expireDate", width: 162, sorter: true },
  {
    title: "สถานที่ออกเอกสาร",
    dataIndex: "issuePlace",
    width: 260,
    sorter: true,
    render: (v: string) => v || "",
  },
  {
    title: "เอกสาร",
    key: "document",
    width: 110,
    render: () => <Button icon={<FileTextOutlined />} />,
  },
  {
    title: "สถานะ",
    dataIndex: "status",
    width: 160,
    render: (status: EvidenceDocumentItem["status"]) => (
      <StatusTag status={status} />
    ),
  },
  {
    title: "",
    key: "actions",
    width: 64,
    render: () => <Button icon={<UploadOutlined />} />,
  },
];

export default function DocumentsTable() {
  return (
    <Card styles={{ body: { padding: 32 } }}>
      <SectionTitle className="!mb-4">ข้อมูลเอกสารหลักฐาน</SectionTitle>
      <Table<EvidenceDocumentItem>
        className="app-table"
        columns={columns}
        dataSource={EVIDENCE_DOCUMENTS}
        pagination={false}
        scroll={{ x: 1286 }}
        size="middle"
      />
      <TablePagination total={EVIDENCE_DOCUMENTS.length} />
    </Card>
  );
}
