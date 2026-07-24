"use client";

import React from "react";
import { Modal, Button, Space, Typography, theme } from "antd";
import { CheckOutlined } from "@ant-design/icons";

const { Text } = Typography;

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
  const { token } = theme.useToken();

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
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full"
          style={{ background: token.colorPrimary }}
        >
          <CheckOutlined className="text-xl !text-white" />
        </div>
        <Text strong className="mt-2" style={{ fontSize: 16 }}>
          คุณต้องการสร้างคำขอใช่หรือไม่
        </Text>
        <Text>ยืนยันการสร้างคำขอ</Text>
        <Space className="mt-3">
          <Button onClick={onCancel}>ยกเลิก</Button>
          <Button type="primary" onClick={onConfirm}>
            ยืนยัน
          </Button>
        </Space>
      </div>
    </Modal>
  );
}
