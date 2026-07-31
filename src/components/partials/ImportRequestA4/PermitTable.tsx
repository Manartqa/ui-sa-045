"use client";

import React from "react";
import { App, Card, Table, Button, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined, FileTextOutlined } from "@ant-design/icons";
import { StatusTag } from "@/components/ui/StatusTag";
import { SectionTitle } from "@/components/common";
import { useImportRequestA4Actions } from "@/hooks/importRequestA4";
import { openMockDocument } from "@/lib/mockDocument";
import type {
  ImportRequestRecord,
  PermitItem,
} from "@/types/app/importRequestA4";
import DocumentFormModal from "./Modal/DocumentFormModal";
import type { DocumentFormValue } from "./Modal/DocumentFormModal";
import PermitPickerModal from "./Modal/PermitPickerModal";
import ConfirmActionModal from "./Modal/ConfirmActionModal";

const PERMIT_TITLE = "เพิ่มหนังสืออนุญาตเปิดดำเนินการผลิตอาวุธ";

interface PermitTableProps {
  record: ImportRequestRecord;
}

export default function PermitTable({ record }: PermitTableProps) {
  const { message } = App.useApp();
  const { saveRequest, isSaving } = useImportRequestA4Actions();
  const [adding, setAdding] = React.useState(false);
  const [searching, setSearching] = React.useState(false);
  const [removing, setRemoving] = React.useState<PermitItem | null>(null);

  const items = record.permits;

  const persist = (permits: PermitItem[], detail: string) =>
    saveRequest({ record: { ...record, permits }, status: record.status, detail });

  const append = async (permit: PermitItem, detail: string) => {
    await persist([...items, { ...permit, order: items.length + 1 }], detail);
    message.success(detail);
  };

  const handleAdd = async (value: DocumentFormValue) => {
    await append(
      {
        key: `pm-${Date.now()}`,
        order: 0,
        documentNo: value.documentNo,
        approvedDate: value.approvedDate,
        status: "PENDING_REVIEW",
        fileName: value.fileName,
      },
      `เพิ่มหนังสืออนุญาตเปิดดำเนินการผลิตอาวุธ ${value.documentNo}`,
    );
    setAdding(false);
  };

  const handlePick = (permit: PermitItem) =>
    append(
      { ...permit, key: `pm-${Date.now()}` },
      `เลือกหนังสืออนุญาตเปิดดำเนินการผลิตอาวุธ ${permit.documentNo}`,
    );

  const handleRemove = async () => {
    if (!removing) return;
    await persist(
      items
        .filter((p) => p.key !== removing.key)
        .map((p, index) => ({ ...p, order: index + 1 })),
      `ลบหนังสืออนุญาตเปิดดำเนินการผลิตอาวุธ ${removing.documentNo}`,
    );
    setRemoving(null);
    message.success("ลบรายการแล้ว");
  };

  const columns: ColumnsType<PermitItem> = [
    { title: "#", dataIndex: "order", width: 60 },
    { title: "เลขที่หนังสือ", dataIndex: "documentNo", sorter: true },
    { title: "วันที่อนุญาต", dataIndex: "approvedDate", sorter: true },
    {
      title: "หนังสืออนุญาต",
      key: "permitDoc",
      width: 140,
      render: (_, row) => (
        <Button
          icon={<FileTextOutlined />}
          aria-label="ดูหลักฐาน"
          // Nothing to open until a file is attached.
          disabled={!row.fileName}
          onClick={() => openMockDocument(row.fileName, row.documentNo)}
        />
      ),
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      width: 120,
      render: (status: PermitItem["status"]) => <StatusTag status={status} />,
    },
    {
      title: "",
      key: "actions",
      width: 64,
      render: (_, row) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          aria-label="ลบรายการ"
          onClick={() => setRemoving(row)}
        />
      ),
    },
  ];

  return (
    <Card styles={{ body: { padding: 32 } }}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <SectionTitle>ข้อมูลหนังสืออนุญาตเปิดดำเนินการผลิตอาวุธ</SectionTitle>
        <Space wrap>
          <Button size="large" onClick={() => setSearching(true)}>
            ค้นหา
          </Button>
          <Button type="primary" size="large" onClick={() => setAdding(true)}>
            เพิ่มข้อมูล
          </Button>
        </Space>
      </div>
      <Table<PermitItem>
        className="app-table"
        rowKey="key"
        columns={columns}
        dataSource={items}
        pagination={false}
        locale={{ emptyText: "ไม่มีข้อมูล" }}
        size="middle"
      />

      <DocumentFormModal
        open={adding}
        title={PERMIT_TITLE}
        loading={isSaving}
        onCancel={() => setAdding(false)}
        onSubmit={handleAdd}
      />

      <PermitPickerModal
        open={searching}
        excludeNos={items.map((p) => p.documentNo)}
        onClose={() => setSearching(false)}
        onSelect={handlePick}
      />

      <ConfirmActionModal
        open={removing !== null}
        title="คุณต้องการลบรายการหรือไม่ ?"
        description={removing?.documentNo}
        danger
        confirmText="ลบ"
        loading={isSaving}
        onCancel={() => setRemoving(null)}
        onConfirm={handleRemove}
      />
    </Card>
  );
}
