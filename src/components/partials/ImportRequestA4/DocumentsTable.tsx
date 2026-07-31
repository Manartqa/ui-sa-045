"use client";

import React from "react";
import { App, Card, Table, Button, Space, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { FileTextOutlined, UploadOutlined } from "@ant-design/icons";
import { StatusTag } from "@/components/ui/StatusTag";
import { SectionTitle, TablePagination } from "@/components/common";
import { useImportRequestA4Actions } from "@/hooks/importRequestA4";
import { openMockDocument } from "@/lib/mockDocument";
import type {
  EvidenceDocumentItem,
  ImportRequestRecord,
} from "@/types/app/importRequestA4";
import UploadDocumentModal from "./Modal/UploadDocumentModal";

const { Text } = Typography;

interface DocumentsTableProps {
  record: ImportRequestRecord;
}

export default function DocumentsTable({ record }: DocumentsTableProps) {
  const { message } = App.useApp();
  const { saveRequest, isSaving } = useImportRequestA4Actions();
  const [editing, setEditing] = React.useState<EvidenceDocumentItem | null>(
    null,
  );

  const items = record.documents;

  const handleAttach = async (value: {
    fileName: string;
    documentDate: string;
    expireDate: string;
  }) => {
    if (!editing) return;
    const documents = items.map((doc) =>
      doc.key === editing.key ? { ...doc, ...value } : doc,
    );
    await saveRequest({
      record: { ...record, documents },
      status: record.status,
      detail: `แนบเอกสารหลักฐาน ${editing.name.replace(/^\*/, "").slice(0, 40)}`,
    });
    setEditing(null);
    message.success("แนบเอกสารแล้ว");
  };

  const columns: ColumnsType<EvidenceDocumentItem> = [
    { title: "#", dataIndex: "order", width: 60 },
    { title: "ชื่อเอกสาร", dataIndex: "name", width: 315, sorter: true },
    {
      title: "วันที่เอกสาร",
      dataIndex: "documentDate",
      width: 162,
      sorter: true,
    },
    { title: "วันหมดอายุ", dataIndex: "expireDate", width: 162, sorter: true },
    {
      title: "สถานที่ออกเอกสาร",
      dataIndex: "issuePlace",
      width: 260,
      sorter: true,
      render: (v: string) => v || "-",
    },
    {
      title: "ไฟล์แนบ",
      dataIndex: "fileName",
      width: 200,
      render: (v: string) => v || <Text type="secondary">ไม่มีไฟล์แนบ</Text>,
    },
    {
      title: "เอกสาร",
      key: "document",
      width: 110,
      render: (_, row) => (
        <Button
          icon={<FileTextOutlined />}
          aria-label="ดูหลักฐาน"
          // Nothing to open until a file is attached.
          disabled={!row.fileName}
          onClick={() => openMockDocument(row.fileName, row.name)}
        />
      ),
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
      render: (_, row) => (
        <Space>
          <Button
            icon={<UploadOutlined />}
            aria-label="แนบเอกสาร"
            loading={isSaving}
            onClick={() => setEditing(row)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Card styles={{ body: { padding: 32 } }}>
      <SectionTitle className="!mb-4">ข้อมูลเอกสารหลักฐาน</SectionTitle>
      <Table<EvidenceDocumentItem>
        className="app-table"
        rowKey="key"
        columns={columns}
        dataSource={items}
        pagination={false}
        scroll={{ x: 1486 }}
        locale={{ emptyText: "ยังไม่มีเอกสารหลักฐาน" }}
        size="middle"
      />
      <TablePagination total={items.length} />

      <UploadDocumentModal
        open={editing !== null}
        document={
          editing && {
            key: editing.key,
            order: editing.order,
            group: "OFFICE",
            name: editing.name,
            fileName: editing.fileName,
            documentDate: editing.documentDate,
            expireDate: editing.expireDate,
            status: editing.status,
          }
        }
        onCancel={() => setEditing(null)}
        onSubmit={handleAttach}
      />
    </Card>
  );
}
