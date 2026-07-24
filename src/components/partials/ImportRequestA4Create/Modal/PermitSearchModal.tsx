"use client";

import React, { useState } from "react";
import { Modal, Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { FilePdfOutlined, FileOutlined } from "@ant-design/icons";
import { TablePagination } from "@/components/common";

export interface PermitA2Item {
  key: string;
  order: number;
  weaponType: string;
  purpose: string;
  permitNo: string;
  permitDate: string;
  expireDate: string;
  renewalStatus: string;
}

export const PERMIT_A2_ITEMS: PermitA2Item[] = [
  {
    key: "1",
    order: 1,
    weaponType: "กระสุน",
    purpose: "ทำอาวุธ",
    permitNo: "1/2569",
    permitDate: "04/01/2572",
    expireDate: "04/01/2572",
    renewalStatus: "อยู่ระหว่างต่ออายุ",
  },
  {
    key: "2",
    order: 2,
    weaponType: "วัตถุระเบิด",
    purpose: "ประกอบอาวุธ",
    permitNo: "2/2569",
    permitDate: "27/04/2024",
    expireDate: "27/04/2024",
    renewalStatus: "",
  },
  {
    key: "3",
    order: 3,
    weaponType: "ดินปืน",
    purpose: "ทำอาวุธ",
    permitNo: "3/2569",
    permitDate: "15/02/2569",
    expireDate: "15/02/2572",
    renewalStatus: "",
  },
  {
    key: "4",
    order: 4,
    weaponType: "เชื้อปะทุ",
    purpose: "ประกอบอาวุธ",
    permitNo: "4/2569",
    permitDate: "07/05/2569",
    expireDate: "07/05/2572",
    renewalStatus: "อยู่ระหว่างต่ออายุ",
  },
  {
    key: "5",
    order: 5,
    weaponType: "กระสุน",
    purpose: "ซ่อมแซมอาวุธ",
    permitNo: "5/2569",
    permitDate: "20/06/2569",
    expireDate: "20/06/2572",
    renewalStatus: "",
  },
  {
    key: "6",
    order: 6,
    weaponType: "ชนวนถ่วงเวลา",
    purpose: "ทำอาวุธ",
    permitNo: "6/2569",
    permitDate: "01/07/2569",
    expireDate: "01/07/2572",
    renewalStatus: "อยู่ระหว่างต่ออายุ",
  },
  {
    key: "7",
    order: 7,
    weaponType: "วัตถุระเบิด",
    purpose: "ประกอบอาวุธ",
    permitNo: "7/2569",
    permitDate: "10/07/2569",
    expireDate: "10/07/2572",
    renewalStatus: "",
  },
];

const columns: ColumnsType<PermitA2Item> = [
  { title: "#", dataIndex: "order", width: 60 },
  {
    title: "ประเภทที่ขอรับอนุญาต",
    dataIndex: "weaponType",
    ellipsis: true,
    sorter: true,
  },
  { title: "วัตถุประสงค์", dataIndex: "purpose", sorter: true },
  { title: "เลขที่ใบอนุญาต", dataIndex: "permitNo", sorter: true },
  { title: "วันที่ใบอนุญาต", dataIndex: "permitDate", sorter: true },
  { title: "วันที่หมดอายุ", dataIndex: "expireDate", sorter: true },
  { title: "สถานะการต่ออายุ", dataIndex: "renewalStatus", sorter: true },
  {
    title: "ใบอนุญาต",
    key: "permitDoc",
    width: 100,
    render: () => (
      <Button
        icon={<FilePdfOutlined className="!text-[#FA5E5E]" />}
        className="!border-0 !bg-[#FA5E5E]/10"
      />
    ),
  },
  {
    title: "สลักหลัง",
    key: "endorsement",
    width: 100,
    render: () => (
      <Button icon={<FileOutlined />} className="!border-0 !bg-black/5" />
    ),
  },
];

interface PermitSearchModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (item: PermitA2Item) => void;
}

export default function PermitSearchModal({
  open,
  onClose,
  onSelect,
}: PermitSearchModalProps) {
  const [selectedKey, setSelectedKey] = useState<string>();

  const handleConfirm = () => {
    const item = PERMIT_A2_ITEMS.find((i) => i.key === selectedKey);
    if (item) onSelect(item);
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      width={1200}
      title={
        <span className="text-base font-bold">ค้นหาใบอนุญาต อ.2</span>
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
      <Table<PermitA2Item>
        className="app-table"
        columns={columns}
        dataSource={PERMIT_A2_ITEMS}
        pagination={false}
        scroll={{ x: 1000 }}
        size="middle"
        onRow={(record) => ({
          onClick: () => setSelectedKey(record.key),
        })}
        rowClassName={(record) =>
          record.key === selectedKey ? "!bg-[#6574FF]/10 cursor-pointer" : "cursor-pointer"
        }
      />
      <TablePagination total={PERMIT_A2_ITEMS.length} />
    </Modal>
  );
}
