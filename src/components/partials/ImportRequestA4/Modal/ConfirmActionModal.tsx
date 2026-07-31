"use client";

import React from "react";
import { Modal, Button, Space, Typography, theme } from "antd";
import { CheckOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface ConfirmActionModalProps {
  open: boolean;
  /** Bold question — "คุณต้องการปรับรายการหรือไม่ ?" */
  title: string;
  /** Plain line under it — "ยืนยันการปรับรายการ" */
  description?: string;
  /** Swaps the disc's fill and the ยืนยัน button for a destructive action. */
  danger?: boolean;
  confirmText?: string;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

/**
 * Every yes/no step in the อ.4 flow shares one box — the same one
 * `ImportRequestA4Create/Modal/ConfirmCreateModal` draws. Only the copy
 * changes, which is why this takes strings rather than being copied per action.
 */
export default function ConfirmActionModal({
  open,
  title,
  description,
  danger,
  confirmText = "ยืนยัน",
  loading,
  onCancel,
  onConfirm,
}: ConfirmActionModalProps) {
  const { token } = theme.useToken();

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      closable={false}
      centered
      width={400}
    >
      <div className="flex flex-col items-center gap-2 py-2 text-center">
        <div
          className="flex h-[63px] w-[63px] items-center justify-center rounded-full"
          style={{ background: danger ? token.colorError : token.colorPrimary }}
        >
          <CheckOutlined className="!text-white" style={{ fontSize: 28 }} />
        </div>
        <Text strong className="mt-2" style={{ fontSize: 16 }}>
          {title}
        </Text>
        {description && <Text>{description}</Text>}
        <Space className="mt-3">
          <Button size="large" onClick={onCancel} disabled={loading}>
            ยกเลิก
          </Button>
          <Button
            size="large"
            type="primary"
            danger={danger}
            loading={loading}
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </Space>
      </div>
    </Modal>
  );
}
