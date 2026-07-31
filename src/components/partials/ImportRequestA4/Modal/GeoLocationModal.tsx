"use client";

import React from "react";
import { Button, Form, Input, Modal, Typography } from "antd";
import type { FactoryInfo } from "@/types/app/importRequestA4";

const { Text } = Typography;

interface GeoLocationModalProps {
  open: boolean;
  factory: FactoryInfo;
  /** Read-only while the tab is not in edit mode. */
  editable?: boolean;
  onCancel: () => void;
  onSubmit: (value: { latitude: string; longitude: string }) => void;
}

/**
 * "ตำแหน่งพิกัดภูมิศาสตร์" (Figma node 4025:197845). The design shows a map
 * preview above the fields; there is no map provider wired up yet, so the
 * placeholder says so rather than faking one.
 */
export default function GeoLocationModal({
  open,
  factory,
  editable = false,
  onCancel,
  onSubmit,
}: GeoLocationModalProps) {
  const [form] = Form.useForm();

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      centered
      width={400}
      title={
        <Text strong style={{ fontSize: 16 }}>
          ตำแหน่งพิกัดภูมิศาสตร์
        </Text>
      }
      footer={
        editable
          ? [
              <Button key="cancel" size="large" onClick={onCancel}>
                ยกเลิก
              </Button>,
              <Button
                key="ok"
                type="primary"
                size="large"
                onClick={() => onSubmit(form.getFieldsValue())}
              >
                ยืนยัน
              </Button>,
            ]
          : null
      }
    >
      <div
        className="mb-4 flex h-[160px] items-center justify-center rounded"
        style={{ background: "rgba(0,0,0,0.04)" }}
      >
        <Text type="secondary">แผนที่ (ยังไม่ได้เชื่อมต่อผู้ให้บริการแผนที่)</Text>
      </div>
      <Form
        form={form}
        layout="vertical"
        size="large"
        initialValues={{
          place: factory.name,
          latitude: factory.latitude,
          longitude: factory.longitude,
        }}
      >
        <Form.Item label="* สถานที่" name="place">
          <Input disabled />
        </Form.Item>
        <Form.Item label="*ละติจูด" name="latitude">
          <Input disabled={!editable} />
        </Form.Item>
        <Form.Item label="*ลองจิจูด" name="longitude" className="!mb-0">
          <Input disabled={!editable} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
