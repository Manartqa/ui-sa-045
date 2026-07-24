"use client";

import React from "react";
import { Modal, Button } from "antd";
import { CheckOutlined } from "@ant-design/icons";

interface ConfirmCreateModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmCreateModal({
  open,
  onCancel,
  onConfirm,
}: ConfirmCreateModalProps) {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      closable={false}
      centered
      width={280}
    >
      <div className="flex flex-col items-center gap-2 py-2 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#6574FF]">
          <CheckOutlined className="text-xl !text-white" />
        </div>
        <div className="mt-2 text-base font-bold leading-6 text-black">
          คุณต้องการสร้างคำขอใช่หรือไม่
        </div>
        <div className="text-sm leading-[22px] text-black">
          ยืนยันการสร้างคำขอ
        </div>
        <div className="mt-3 flex gap-2">
          <Button onClick={onCancel}>ยกเลิก</Button>
          <Button type="primary" onClick={onConfirm}>
            ยืนยัน
          </Button>
        </div>
      </div>
    </Modal>
  );
}
