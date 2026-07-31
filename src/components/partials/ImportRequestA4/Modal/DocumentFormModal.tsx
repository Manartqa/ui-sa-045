"use client";

import React from "react";
import { Button, DatePicker, Form, Input, Modal, Typography, Upload } from "antd";
import { EyeOutlined, UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd";
import type { Dayjs } from "dayjs";
import { thaiDateToDayjs, toIsoDate, toThaiDate } from "@/lib/date";
import { openMockDocument } from "@/lib/mockDocument";

const { Text } = Typography;

export interface DocumentFormValue {
  documentNo: string;
  approvedDate: string;
  expireDate: string;
  fileName: string;
}

interface DocumentFormModalProps {
  open: boolean;
  title: string;
  /** จัดการเอกสาร carries a วันที่หมดอายุ; the อ.6 permit form does not. */
  withExpireDate?: boolean;
  initial?: DocumentFormValue | null;
  loading?: boolean;
  onCancel: () => void;
  onSubmit: (value: DocumentFormValue) => void;
}

interface FormShape {
  documentNo: string;
  approvedDate: Dayjs;
  expireDate?: Dayjs;
}

/**
 * "จัดการเอกสาร" (Figma node 4025:193395) and "เพิ่มหนังสืออนุญาตเปิดดำเนินการ
 * ผลิตอาวุธ" (4025:193370) are the same box with one field's difference, so
 * they share a component rather than being copied.
 *
 * ดูหลักฐาน stays disabled until a file is attached, and opens the demo's
 * document route in a new tab — nothing is uploaded anywhere.
 */
export default function DocumentFormModal({
  open,
  title,
  withExpireDate,
  initial,
  loading,
  onCancel,
  onSubmit,
}: DocumentFormModalProps) {
  const [form] = Form.useForm<FormShape>();
  const [file, setFile] = React.useState<UploadFile | null>(null);
  /** A row reopened for editing already has a file name but no File object. */
  const [existingName, setExistingName] = React.useState("");
  const values = Form.useWatch([], form);

  React.useEffect(() => {
    if (!open) return;
    form.resetFields();
    setFile(null);
    setExistingName(initial?.fileName ?? "");
    if (initial) {
      form.setFieldsValue({
        documentNo: initial.documentNo,
        approvedDate: initial.approvedDate
          ? thaiDateToDayjs(initial.approvedDate)
          : undefined,
        expireDate: initial.expireDate
          ? thaiDateToDayjs(initial.expireDate)
          : undefined,
      });
    }
  }, [open, initial, form]);

  const fileName = file?.name ?? existingName;

  const canSubmit = Boolean(
    fileName &&
      values?.documentNo?.trim() &&
      values?.approvedDate &&
      (!withExpireDate || values?.expireDate),
  );

  const handleSubmit = () => {
    const v = form.getFieldsValue();
    onSubmit({
      documentNo: v.documentNo.trim(),
      approvedDate: toThaiDate(toIsoDate(v.approvedDate)),
      expireDate: v.expireDate ? toThaiDate(toIsoDate(v.expireDate)) : "",
      fileName,
    });
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      centered
      width={600}
      title={
        <Text strong style={{ fontSize: 16 }}>
          {title}
        </Text>
      }
      footer={[
        <Button key="cancel" size="large" onClick={onCancel} disabled={loading}>
          ยกเลิก
        </Button>,
        <Button
          key="ok"
          type="primary"
          size="large"
          disabled={!canSubmit}
          loading={loading}
          onClick={handleSubmit}
        >
          ยืนยัน
        </Button>,
      ]}
    >
      <div
        className="mb-4 flex min-h-[64px] items-center justify-center rounded border border-dashed p-4 text-center"
        style={{ borderColor: "#d9d9d9" }}
      >
        {fileName ? <Text strong>{fileName}</Text> : <Text>ไม่มีไฟล์แนบ</Text>}
      </div>

      <div className="mb-4 grid grid-cols-2 gap-4">
        <Upload
          maxCount={1}
          fileList={file ? [file] : []}
          showUploadList={false}
          beforeUpload={(f) => {
            setFile(f);
            setExistingName("");
            return false;
          }}
        >
          <Button type="primary" size="large" block icon={<UploadOutlined />}>
            อัปโหลดไฟล์
          </Button>
        </Upload>
        <Button
          size="large"
          block
          icon={<EyeOutlined />}
          disabled={!fileName}
          onClick={() => openMockDocument(fileName, title)}
        >
          ดูหลักฐาน
        </Button>
      </div>

      <Form form={form} layout="vertical" size="large">
        <Form.Item label="เลขที่หนังสือ" name="documentNo" required>
          <Input placeholder="เลขที่หนังสือ" />
        </Form.Item>
        <Form.Item
          label="วันที่อนุญาต"
          name="approvedDate"
          required
          className={withExpireDate ? undefined : "!mb-0"}
        >
          <DatePicker className="w-full" placeholder="วันที่อนุญาต" />
        </Form.Item>
        {withExpireDate && (
          <Form.Item
            label="วันที่หมดอายุ"
            name="expireDate"
            required
            className="!mb-0"
          >
            <DatePicker className="w-full" placeholder="วันที่หมดอายุ" />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
}
