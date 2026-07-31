"use client";

import React from "react";
import { Button, Descriptions, Modal, Typography } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import { PERMIT_FEE_BAHT } from "@/constant/requestWorkflow";
import { APPLICATION_FORM_TITLE } from "../ImportRequestA4.config";
import type { ImportRequestRecord } from "@/types/app/importRequestA4";

const { Text } = Typography;

interface PaymentNoticeModalProps {
  open: boolean;
  record: ImportRequestRecord;
  onCancel: () => void;
}

/**
 * "พิมพ์ใบแจ้งชำระเงิน" (Figma node 4025:203662). The demo has no print
 * service, so ยืนยันการพิมพ์ hands the page to the browser's own print dialog
 * rather than pretending a PDF was generated.
 */
export default function PaymentNoticeModal({
  open,
  record,
  onCancel,
}: PaymentNoticeModalProps) {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      centered
      width={600}
      title={
        <Text strong style={{ fontSize: 16 }}>
          ใบแจ้งชำระเงิน
        </Text>
      }
      footer={[
        <Button key="cancel" size="large" onClick={onCancel}>
          ปิด
        </Button>,
        <Button
          key="print"
          type="primary"
          size="large"
          icon={<PrinterOutlined />}
          onClick={() => window.print()}
        >
          พิมพ์ใบแจ้งชำระเงิน
        </Button>,
      ]}
    >
      <Descriptions column={1} bordered size="small">
        <Descriptions.Item label="เลขที่อ้างอิง">
          {record.referenceNo}
        </Descriptions.Item>
        <Descriptions.Item label="เลขที่รับเรื่อง">
          {record.receiveNo || "-"}
        </Descriptions.Item>
        <Descriptions.Item label="ผู้ประกอบการ">
          {record.operator}
        </Descriptions.Item>
        <Descriptions.Item label="รายการ">
          {APPLICATION_FORM_TITLE}
        </Descriptions.Item>
        <Descriptions.Item label="จำนวนเงิน">
          <Text strong>{`${PERMIT_FEE_BAHT.toLocaleString()} บาท`}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="สถานะการชำระเงิน">
          {record.status === "PAID" ? "ชำระเงินแล้ว" : "รอการชำระ"}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
}
