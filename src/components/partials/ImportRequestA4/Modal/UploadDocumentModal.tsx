"use client";

import React from "react";
import { Button, DatePicker, Form, Input, Modal, Typography, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd";
import { toThaiDate, toIsoDate } from "@/lib/date";
import type { UploadDocumentItem } from "@/types/app/importRequestA4";

const { Text } = Typography;

interface UploadDocumentModalProps {
  open: boolean;
  document: UploadDocumentItem | null;
  onCancel: () => void;
  onSubmit: (value: {
    fileName: string;
    documentDate: string;
    expireDate: string;
  }) => void;
}

/**
 * "เอกสารหลักฐานที่ต้องแนบเพิ่มเติม" (Figma node 4025:201134). Nothing is
 * uploaded anywhere — the file is held in the form only so the row can show a
 * name — and ยืนยัน stays disabled until a file and both dates are filled, per
 * the designer's note.
 */
export default function UploadDocumentModal({
  open,
  document,
  onCancel,
  onSubmit,
}: UploadDocumentModalProps) {
  const [form] = Form.useForm();
  const [file, setFile] = React.useState<UploadFile | null>(null);
  const [canSubmit, setCanSubmit] = React.useState(false);

  React.useEffect(() => {
    if (!open) {
      form.resetFields();
      setFile(null);
      setCanSubmit(false);
    }
  }, [open, form]);

  const updateCanSubmit = () => {
    const v = form.getFieldsValue();
    setCanSubmit(Boolean(file && v.documentDate && v.expireDate));
  };

  const handleSubmit = () => {
    const v = form.getFieldsValue();
    onSubmit({
      fileName: file?.name ?? "",
      documentDate: toThaiDate(toIsoDate(v.documentDate)),
      expireDate: toThaiDate(toIsoDate(v.expireDate)),
    });
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      centered
      width={400}
      title={
        <Text strong style={{ fontSize: 16 }}>
          เอกสารหลักฐานที่ต้องแนบเพิ่มเติม
        </Text>
      }
      footer={[
        <Button key="cancel" size="large" onClick={onCancel}>
          ยกเลิก
        </Button>,
        <Button
          key="ok"
          type="primary"
          size="large"
          disabled={!canSubmit}
          onClick={handleSubmit}
        >
          ยืนยัน
        </Button>,
      ]}
    >
      <Text className="!mb-4 block">{document?.name}</Text>
      <Form
        form={form}
        layout="vertical"
        size="large"
        onValuesChange={updateCanSubmit}
      >
        <Form.Item label="ไฟล์แนบ" required>
          <Upload
            maxCount={1}
            beforeUpload={(f) => {
              setFile(f);
              // Defer so the state above is applied before the check reads it.
              setTimeout(() => setCanSubmit(Boolean(form.getFieldValue("documentDate") && form.getFieldValue("expireDate"))), 0);
              return false;
            }}
            onRemove={() => {
              setFile(null);
              setCanSubmit(false);
            }}
            fileList={file ? [file] : []}
          >
            <Button icon={<UploadOutlined />}>เลือกไฟล์</Button>
          </Upload>
          {!file && <Text type="secondary">ไม่มีไฟล์แนบ</Text>}
        </Form.Item>
        <Form.Item label="วันที่เอกสาร" name="documentDate" required>
          <DatePicker className="w-full" placeholder="วันที่เอกสาร" />
        </Form.Item>
        <Form.Item
          label="วันหมดอายุ"
          name="expireDate"
          required
          className="!mb-0"
        >
          <DatePicker className="w-full" placeholder="วันหมดอายุ" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
