"use client";

import React from "react";
import { Modal, Button, Space, Typography, theme } from "antd";
import { CheckOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface ConfirmCreateModalProps {
  open: boolean;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmCreateModal({
  open,
  loading,
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
      // 400 outer = 352 content + antd's default 24px side padding, per the
      // design's box model (radius 8, no border).
      width={400}
    >
      <div className="flex flex-col items-center gap-2 py-2 text-center">
        {/* Figma node 4025:191000 — a 72px icon frame whose disc is 63px (the
            4.5px inset is transparent, so the flex gap stands in for it). */}
        <div
          className="flex h-[63px] w-[63px] items-center justify-center rounded-full"
          style={{ background: token.colorPrimary }}
        >
          <CheckOutlined className="!text-white" style={{ fontSize: 28 }} />
        </div>
        <Text strong className="mt-2" style={{ fontSize: 16 }}>
          คุณต้องการสร้างคำขอใช่หรือไม่
        </Text>
        <Text>ยืนยันการสร้างคำขอ</Text>
        {/* `large` is the design's button box exactly: 40px tall, 15px inline
            padding, 1px border — "ยืนยัน" lands on 69×40 like the Figma node. */}
        <Space className="mt-3">
          <Button size="large" onClick={onCancel} disabled={loading}>
            ยกเลิก
          </Button>
          <Button
            size="large"
            type="primary"
            loading={loading}
            onClick={onConfirm}
          >
            ยืนยัน
          </Button>
        </Space>
      </div>
    </Modal>
  );
}
