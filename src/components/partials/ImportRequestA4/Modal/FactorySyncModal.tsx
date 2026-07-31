"use client";

import React from "react";
import { Modal, Spin, Typography } from "antd";

const { Text } = Typography;

interface FactorySyncModalProps {
  open: boolean;
}

/**
 * "กำลังดึงข้อมูลโรงงานล่าสุด..." — the wait while Commercial is queried.
 * It has no buttons on purpose: the caller closes it when the sync resolves.
 */
export default function FactorySyncModal({ open }: FactorySyncModalProps) {
  return (
    <Modal open={open} footer={null} closable={false} centered width={400}>
      <div className="flex flex-col items-center gap-4 py-4 text-center">
        <Spin size="large" />
        <Text strong style={{ fontSize: 16 }}>
          กำลังดึงข้อมูลโรงงานล่าสุด...
        </Text>
      </div>
    </Modal>
  );
}
