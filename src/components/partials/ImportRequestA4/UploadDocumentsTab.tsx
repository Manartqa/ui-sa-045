"use client";

import React from "react";
import { App, Button, Card, Space, Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { FilePdfOutlined, UploadOutlined } from "@ant-design/icons";
import { SectionTitle, TablePagination } from "@/components/common";
import { StatusTag } from "@/components/ui/StatusTag";
import { useImportRequestA4Actions } from "@/hooks/importRequestA4";
import { openMockDocument } from "@/lib/mockDocument";
import type {
  ImportRequestRecord,
  UploadDocumentGroup,
  UploadDocumentItem,
} from "@/types/app/importRequestA4";
import UploadDocumentModal from "./Modal/UploadDocumentModal";

const { Text } = Typography;

const GROUPS: { key: UploadDocumentGroup; title: string }[] = [
  { key: "OFFICE", title: "ข้อมูลสำนักงาน" },
  { key: "FACTORY", title: "ข้อมูลโรงงาน" },
  { key: "PERSON", title: "ข้อมูลบุคคล" },
];

interface UploadDocumentsTabProps {
  record: ImportRequestRecord;
}

/**
 * แท็บอัพโหลดเอกสาร (Figma node 4025:200256). One table per group, and
 * "ดูหลักฐาน" only lights up once a file is attached — the designer's note.
 */
export default function UploadDocumentsTab({
  record,
}: UploadDocumentsTabProps) {
  const { message } = App.useApp();
  const { saveRequest } = useImportRequestA4Actions();
  const [editing, setEditing] = React.useState<UploadDocumentItem | null>(null);

  const handleAttach = async (value: {
    fileName: string;
    documentDate: string;
    expireDate: string;
  }) => {
    if (!editing) return;
    const uploads = record.uploads.map((doc) =>
      doc.key === editing.key ? { ...doc, ...value } : doc,
    );
    await saveRequest({
      record: { ...record, uploads },
      status: record.status,
      detail: `แนบเอกสาร ${editing.name.replace(/^\*/, "").slice(0, 40)}`,
    });
    setEditing(null);
    message.success("แนบเอกสารแล้ว");
  };

  const columns: ColumnsType<UploadDocumentItem> = [
    { title: "#", dataIndex: "order", width: 60 },
    { title: "ชื่อเอกสาร", dataIndex: "name", width: 420 },
    {
      title: "ไฟล์แนบ",
      dataIndex: "fileName",
      width: 220,
      render: (value: string) =>
        value || <Text type="secondary">ไม่มีไฟล์แนบ</Text>,
    },
    { title: "วันที่เอกสาร", dataIndex: "documentDate", width: 140 },
    { title: "วันหมดอายุ", dataIndex: "expireDate", width: 140 },
    {
      title: "สถานะ",
      dataIndex: "status",
      width: 140,
      render: (status: UploadDocumentItem["status"]) => (
        <StatusTag status={status} />
      ),
    },
    {
      title: "",
      key: "actions",
      width: 140,
      fixed: "right",
      render: (_, row) => (
        <Space size={8}>
          <Button
            icon={<UploadOutlined />}
            aria-label="แนบเอกสาร"
            onClick={() => setEditing(row)}
          />
          <Button
            danger
            icon={<FilePdfOutlined />}
            aria-label="ดูหลักฐาน"
            // Nothing to open until a file is attached.
            disabled={!row.fileName}
            onClick={() => openMockDocument(row.fileName, row.name)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Card className="!rounded-tl-none" styles={{ body: { padding: 32 } }}>
      <div className="mb-2 flex flex-wrap items-baseline justify-between gap-3">
        <SectionTitle className="!mb-0">
          เอกสารหลักฐานที่ต้องแนบเพิ่มเติม
        </SectionTitle>
        <Text type="secondary">
          {`${record.uploads.filter((d) => d.fileName).length}/${record.uploads.length} รายการที่แนบแล้ว`}
        </Text>
      </div>
      <Text type="danger" className="!mb-6 block">
        หมายเหตุ เอกสารภาษาต่างประเทศให้แนบฉบับแปล พร้อมรับรองคำแปล
      </Text>

      {GROUPS.map((group, index) => {
        const items = record.uploads
          .filter((doc) => doc.group === group.key)
          .map((doc, i) => ({ ...doc, order: i + 1 }));

        return (
          <div key={group.key} className={index > 0 ? "mt-8" : undefined}>
            <SectionTitle className="!mb-4">{group.title}</SectionTitle>
            <Table<UploadDocumentItem>
              className="app-table"
              rowKey="key"
              columns={columns}
              dataSource={items}
              pagination={false}
              scroll={{ x: "max-content" }}
              locale={{ emptyText: "ไม่มีเอกสารในกลุ่มนี้" }}
              size="middle"
            />
            <TablePagination total={items.length} />
          </div>
        );
      })}

      <UploadDocumentModal
        open={editing !== null}
        document={editing}
        onCancel={() => setEditing(null)}
        onSubmit={handleAttach}
      />
    </Card>
  );
}
