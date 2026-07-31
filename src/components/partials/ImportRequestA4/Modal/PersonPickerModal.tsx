"use client";

import React from "react";
import { Button, Modal, Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { usePersonDirectory } from "@/hooks/importRequestA4";
import type { PersonItem } from "@/types/app/importRequestA4";

const { Text } = Typography;

const columns: ColumnsType<PersonItem> = [
  { title: "#", dataIndex: "order", width: 60 },
  {
    title: "ชื่อ - นามสกุล",
    key: "name",
    render: (_, row) => `${row.prefix} ${row.firstName} ${row.lastName}`,
  },
  { title: "ตำแหน่ง", dataIndex: "position" },
  { title: "เลขที่บัตรประจำตัวประชาชน", dataIndex: "idCardNo", width: 220 },
];

interface PersonPickerModalProps {
  open: boolean;
  role: PersonItem["role"];
  /** Already attached — cannot be picked twice. */
  excludeKeys: string[];
  onClose: () => void;
  onSelect: (person: PersonItem) => void;
}

/**
 * "รายชื่อผู้มีอำนาจลงนาม" / "รายชื่อผู้รับมอบอำนาจ" (Figma nodes 4025:200026
 * and 4025:199820). One row is picked with a radio, then เลือกข้อมูล confirms —
 * the same interaction as the อ.2 permit search.
 */
export default function PersonPickerModal({
  open,
  role,
  excludeKeys,
  onClose,
  onSelect,
}: PersonPickerModalProps) {
  const { people, isLoading } = usePersonDirectory(role, open);
  const [selectedKey, setSelectedKey] = React.useState<string>();

  const title =
    role === "SIGNER" ? "รายชื่อผู้มีอำนาจลงนาม" : "รายชื่อผู้รับมอบอำนาจ";

  const handleConfirm = () => {
    const person = people.find((p) => p.key === selectedKey);
    if (person) onSelect(person);
    setSelectedKey(undefined);
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      width={1000}
      title={
        <Text strong style={{ fontSize: 16 }}>
          {title}
        </Text>
      }
      footer={
        <Button
          type="primary"
          size="large"
          disabled={!selectedKey}
          onClick={handleConfirm}
        >
          เลือกข้อมูล
        </Button>
      }
    >
      <Table<PersonItem>
        className="app-table"
        rowKey="key"
        columns={columns}
        dataSource={people}
        loading={isLoading}
        pagination={false}
        size="middle"
        rowSelection={{
          type: "radio",
          selectedRowKeys: selectedKey ? [selectedKey] : [],
          onChange: (keys) => setSelectedKey(keys[0] as string),
          getCheckboxProps: (row) => ({
            disabled: excludeKeys.includes(row.key),
          }),
        }}
      />
      <div className="mt-3">
        <Text type="secondary">
          {`1-${people.length} จาก ${people.length} รายการ`}
        </Text>
      </div>
    </Modal>
  );
}
