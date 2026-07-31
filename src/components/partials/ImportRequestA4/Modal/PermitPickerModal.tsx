"use client";

import React from "react";
import { Button, Modal, Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { usePermitDirectory } from "@/hooks/importRequestA4";
import { StatusTag } from "@/components/ui/StatusTag";
import type { PermitItem } from "@/types/app/importRequestA4";

const { Text } = Typography;

const columns: ColumnsType<PermitItem> = [
  { title: "#", dataIndex: "order", width: 60 },
  { title: "เลขที่หนังสือ", dataIndex: "documentNo" },
  { title: "วันที่อนุญาต", dataIndex: "approvedDate", width: 160 },
  {
    title: "สถานะ",
    dataIndex: "status",
    width: 140,
    render: (status: PermitItem["status"]) => <StatusTag status={status} />,
  },
];

interface PermitPickerModalProps {
  open: boolean;
  /** Already attached — cannot be picked twice. */
  excludeNos: string[];
  onClose: () => void;
  onSelect: (permit: PermitItem) => void;
}

/**
 * The ค้นหา side of ข้อมูลหนังสืออนุญาตเปิดดำเนินการผลิตอาวุธ: pick an already
 * issued book instead of keying one in. Same radio + เลือกข้อมูล interaction as
 * the person pickers.
 */
export default function PermitPickerModal({
  open,
  excludeNos,
  onClose,
  onSelect,
}: PermitPickerModalProps) {
  const { permits, isLoading } = usePermitDirectory(open);
  const [selectedKey, setSelectedKey] = React.useState<string>();

  const handleConfirm = () => {
    const permit = permits.find((p) => p.key === selectedKey);
    if (permit) onSelect(permit);
    setSelectedKey(undefined);
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      width={800}
      title={
        <Text strong style={{ fontSize: 16 }}>
          ค้นหาหนังสืออนุญาตเปิดดำเนินการผลิตอาวุธ
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
      <Table<PermitItem>
        className="app-table"
        rowKey="key"
        columns={columns}
        dataSource={permits}
        loading={isLoading}
        pagination={false}
        size="middle"
        rowSelection={{
          type: "radio",
          selectedRowKeys: selectedKey ? [selectedKey] : [],
          onChange: (keys) => setSelectedKey(keys[0] as string),
          getCheckboxProps: (row) => ({
            disabled: excludeNos.includes(row.documentNo),
          }),
        }}
      />
      <div className="mt-3">
        <Text type="secondary">
          {`1-${permits.length} จาก ${permits.length} รายการ`}
        </Text>
      </div>
    </Modal>
  );
}
