"use client";

import React from "react";
import { App, Card, Table, Button, Space, Tooltip, theme } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  FileTextOutlined,
  FolderOpenOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { StatusTag } from "@/components/ui/StatusTag";
import { SectionTitle, TablePagination } from "@/components/common";
import { useImportRequestA4Actions } from "@/hooks/importRequestA4";
import {
  isWeaponGroupEdited,
  isWeaponNameEdited,
} from "@/types/app/importRequestA4";
import type {
  ImportRequestRecord,
  WeaponItem,
} from "@/types/app/importRequestA4";
import WeaponFormModal from "./Modal/WeaponFormModal";
import DocumentFormModal from "./Modal/DocumentFormModal";
import type { DocumentFormValue } from "./Modal/DocumentFormModal";
import WeaponPermitDetailModal from "./Modal/WeaponPermitDetailModal";
import ConfirmActionModal from "./Modal/ConfirmActionModal";

/**
 * The designer's note on nodes 4253:91791 / 4253:91801 / 4300:173339, verbatim:
 * hovering either cell must say which colour means what.
 */
const GROUP_TOOLTIP =
  "กรณีไม่มีการแก้ไขข้อมูลช่อง กลุ่มอาวุธ/วัตถุดิบ จะแสดงข้อมูลเป็นตัวสีดำ\nกรณีมีการแก้ไขข้อมูลช่อง กลุ่มอาวุธ/วัตถุดิบ จะแสดงข้อมูลเป็นตัวสีแดง";

const NAME_TOOLTIP =
  "กรณีไม่มีการแก้ไขข้อมูลช่อง ชื่ออาวุธ/วัตถุดิบ จะแสดงข้อมูลเป็นตัวสีดำ\nกรณีมีการแก้ไขข้อมูลช่อง ชื่ออาวุธ/วัตถุดิบ จะแสดงข้อมูลเป็นตัวสีแดง";

interface WeaponsTableProps {
  record: ImportRequestRecord;
}

export default function WeaponsTable({ record }: WeaponsTableProps) {
  const { token } = theme.useToken();
  const { message } = App.useApp();
  const { saveRequest, isSaving } = useImportRequestA4Actions();

  const [formOpen, setFormOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<WeaponItem | null>(null);
  const [attaching, setAttaching] = React.useState<WeaponItem | null>(null);
  const [viewing, setViewing] = React.useState<WeaponItem | null>(null);
  const [removing, setRemoving] = React.useState<WeaponItem | null>(null);
  const [renumbering, setRenumbering] = React.useState(false);

  const items = record.weapons;

  // Editing keeps the row's own ลำดับ selectable; adding offers the next slot.
  const orderOptions = React.useMemo(
    () =>
      Array.from(
        { length: items.length + (editing ? 0 : 1) },
        (_, i) => i + 1,
      ),
    [items.length, editing],
  );

  const persist = (weapons: WeaponItem[], detail: string) =>
    saveRequest({ record: { ...record, weapons }, status: record.status, detail });

  const handleSubmit = async (value: WeaponItem) => {
    const exists = items.some((w) => w.key === value.key);
    const weapons = exists
      ? items.map((w) => (w.key === value.key ? value : w))
      : [...items, value];
    await persist(
      weapons,
      `${exists ? "แก้ไข" : "เพิ่ม"}รายการอาวุธ/วัตถุดิบ ${value.name}`,
    );
    setFormOpen(false);
    setEditing(null);
    message.success(exists ? "แก้ไขรายการแล้ว" : "เพิ่มรายการแล้ว");
  };

  const handleRemove = async () => {
    if (!removing) return;
    await persist(
      items.filter((w) => w.key !== removing.key),
      `ลบรายการอาวุธ/วัตถุดิบ ${removing.name}`,
    );
    setRemoving(null);
    message.success("ลบรายการแล้ว");
  };

  /**
   * ปรับรายการ closes the gaps deletions leave behind (1,2,4,5 → 1,2,3,4).
   * The list order is already correct; only the printed ลำดับ is rewritten.
   */
  const handleRenumber = async () => {
    await persist(
      items.map((w, index) => ({ ...w, order: index + 1 })),
      "ปรับลำดับรายการอาวุธ/วัตถุดิบ",
    );
    setRenumbering(false);
    message.success("ปรับรายการแล้ว");
  };

  const handleAttach = async (value: DocumentFormValue) => {
    if (!attaching) return;
    await persist(
      items.map((w) =>
        w.key === attaching.key
          ? {
              ...w,
              documentNo: value.documentNo,
              documentApprovedDate: value.approvedDate,
              documentExpireDate: value.expireDate,
              documentFileName: value.fileName,
            }
          : w,
      ),
      `แนบหนังสืออนุญาต อ.8 ให้รายการ ${attaching.name}`,
    );
    setAttaching(null);
    message.success("บันทึกเอกสารแล้ว");
  };

  /** Red once the operator has overridden the catalogue value, black if not. */
  const editableCell = (
    value: string,
    edited: boolean,
    tooltip: string,
  ) => (
    <Tooltip title={<span className="whitespace-pre-line">{tooltip}</span>}>
      <span style={{ color: edited ? token.colorError : token.colorTextBase }}>
        {value}
      </span>
    </Tooltip>
  );

  const columns: ColumnsType<WeaponItem> = [
    { title: "#", dataIndex: "order", width: 60 },
    { title: "รหัส", dataIndex: "code", width: 162, sorter: true },
    {
      title: "กลุ่ม",
      dataIndex: "group",
      width: 250,
      sorter: true,
      render: (value: string, row) =>
        editableCell(value, isWeaponGroupEdited(row), GROUP_TOOLTIP),
    },
    {
      title: "ชื่ออาวุธ/วัตถุดิบ",
      dataIndex: "name",
      width: 250,
      sorter: true,
      render: (value: string, row) =>
        editableCell(value, isWeaponNameEdited(row), NAME_TOOLTIP),
    },
    { title: "รายละเอียด", dataIndex: "detail", width: 250, sorter: true },
    { title: "จำนวน", dataIndex: "amount", width: 162, sorter: true },
    {
      title: "เลขหนังสืออนุญาต อ.8 ฉบับเดิม",
      dataIndex: "previousPermitNo",
      width: 250,
      sorter: true,
      render: (v: string) => v || "-",
    },
    {
      title: "หนังสืออนุญาต อ.8",
      key: "permitDoc",
      width: 250,
      render: (_, row) => (
        <Button
          icon={<FileTextOutlined />}
          aria-label="ดูรายละเอียดหนังสืออนุญาต อ.8"
          onClick={() => setViewing(row)}
        />
      ),
    },
    {
      title: "จัดการเอกสาร",
      key: "manageDoc",
      width: 190,
      render: (_, row) => (
        <Button
          icon={<FolderOpenOutlined />}
          aria-label="จัดการเอกสาร"
          onClick={() => setAttaching(row)}
        />
      ),
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
      render: (_, row) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            aria-label="แก้ไขรายการ"
            onClick={() => {
              setEditing(row);
              setFormOpen(true);
            }}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            aria-label="ลบรายการ"
            onClick={() => setRemoving(row)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Card styles={{ body: { padding: 32 } }}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <SectionTitle>อาวุธหรือวัตถุที่ต้องการสั่งหรือนำเข้ามา</SectionTitle>
        <Space wrap>
          <Button
            size="large"
            disabled={items.length === 0}
            onClick={() => setRenumbering(true)}
          >
            ปรับรายการ
          </Button>
          <Button size="large">พิมพ์รายงานอาวุธหรือวัตถุ</Button>
          <Button
            type="primary"
            size="large"
            onClick={() => {
              setEditing(null);
              setFormOpen(true);
            }}
          >
            เพิ่มข้อมูล
          </Button>
        </Space>
      </div>
      <Table<WeaponItem>
        className="app-table"
        rowKey="key"
        columns={columns}
        dataSource={items}
        pagination={false}
        scroll={{ x: 2080 }}
        locale={{ emptyText: "ยังไม่มีรายการอาวุธ/วัตถุดิบ" }}
        size="middle"
      />
      <TablePagination total={items.length} />

      <WeaponFormModal
        open={formOpen}
        editing={editing}
        orderOptions={orderOptions}
        loading={isSaving}
        onCancel={() => {
          setFormOpen(false);
          setEditing(null);
        }}
        onSubmit={handleSubmit}
      />

      <DocumentFormModal
        open={attaching !== null}
        title="จัดการเอกสาร"
        withExpireDate
        initial={
          attaching && {
            documentNo: attaching.documentNo,
            approvedDate: attaching.documentApprovedDate,
            expireDate: attaching.documentExpireDate,
            fileName: attaching.documentFileName,
          }
        }
        loading={isSaving}
        onCancel={() => setAttaching(null)}
        onSubmit={handleAttach}
      />

      <WeaponPermitDetailModal
        open={viewing !== null}
        weapon={viewing}
        onCancel={() => setViewing(null)}
      />

      <ConfirmActionModal
        open={renumbering}
        title="คุณต้องการปรับรายการหรือไม่ ?"
        description="ยืนยันการปรับรายการ"
        loading={isSaving}
        onCancel={() => setRenumbering(false)}
        onConfirm={handleRenumber}
      />

      <ConfirmActionModal
        open={removing !== null}
        title="คุณต้องการลบรายการหรือไม่ ?"
        description={removing?.name}
        danger
        confirmText="ลบ"
        loading={isSaving}
        onCancel={() => setRemoving(null)}
        onConfirm={handleRemove}
      />
    </Card>
  );
}
