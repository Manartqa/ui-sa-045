"use client";

import React, { useState } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import {
  Card,
  Form,
  Row,
  Col,
  Input,
  DatePicker,
  Button,
  Checkbox,
  Select,
  Divider,
  Typography,
  App,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { SectionTitle } from "@/components/common";
import { useCreateImportRequestA4 } from "@/hooks/importRequestA4";
import {
  APPLICANT_PLACEHOLDERS,
  REQUEST_FOR_OPTIONS,
  USE_FOR_OPTIONS,
  WRITTEN_AT_DEFAULT,
} from "./ImportRequestA4Create.config";
import {
  PermitSearchModal,
  ConfirmCreateModal,
  type PermitA2Item,
} from "./Modal";

/** "04/01/2572" (พ.ศ.) → dayjs ค.ศ. */
function thaiDateToDayjs(d: string) {
  const [dd, mm, yy] = d.split("/").map(Number);
  const year = yy > 2400 ? yy - 543 : yy;
  return dayjs(new Date(year, mm - 1, dd));
}

function RequiredNote() {
  return (
    <div className="mt-1">
      <Typography.Text type="danger">หมายเหตุ</Typography.Text>{" "}
      <Typography.Text>ต้องเลือกอย่างน้อยหนึ่งรายการ</Typography.Text>
    </div>
  );
}

/** dayjs → ISO ค.ศ. for the service layer; undefined stays empty. */
function toIso(d?: dayjs.Dayjs) {
  return d?.isValid() ? d.format("YYYY-MM-DD") : "";
}

export default function CreateFormCard() {
  const router = useRouter();
  const { message } = App.useApp();
  const { createRequest, isCreating } = useCreateImportRequestA4();
  const [form] = Form.useForm();
  const [searchOpen, setSearchOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);

  const updateCanSubmit = () => {
    const v = form.getFieldsValue();
    setCanSubmit(
      Boolean(
        v.referencePermitNo &&
          v.permitDate &&
          v.expireDate &&
          v.requestFor?.length &&
          v.useFor?.length &&
          v.purpose?.trim(),
      ),
    );
  };

  const handleSelectPermit = (item: PermitA2Item) => {
    form.setFieldsValue({
      referencePermitNo: item.permitNo,
      permitDate: thaiDateToDayjs(item.permitDate),
      expireDate: thaiDateToDayjs(item.expireDate),
    });
    updateCanSubmit();
  };

  const handleCreate = () => {
    setConfirmOpen(true);
  };

  const handleConfirmCreate = async () => {
    const v = form.getFieldsValue();
    try {
      const created = await createRequest({
        referencePermitNo: v.referencePermitNo,
        permitDate: toIso(v.permitDate),
        expireDate: toIso(v.expireDate),
        writtenAt: v.writtenAt,
        requestFor: v.requestFor ?? [],
        useFor: v.useFor ?? [],
        purpose: v.purpose?.trim() ?? "",
      });
      setConfirmOpen(false);
      message.success(`สร้างคำขอสำเร็จ เลขที่อ้างอิง ${created.referenceNo}`);
      // Land on the list so the new draft row is visible.
      router.push("/request/import-weapon-a4/list");
    } catch {
      setConfirmOpen(false);
      message.error("สร้างคำขอไม่สำเร็จ");
    }
  };

  return (
    <Card styles={{ body: { padding: 32 } }}>
      <Form
        form={form}
        layout="vertical"
        requiredMark
        size="large"
        onValuesChange={updateCanSubmit}
      >
        <div className="flex flex-col gap-x-4 md:flex-row md:items-start">
          <Form.Item
            label="อ้างอิงใบอนุญาต อ.2 เลขที่"
            name="referencePermitNo"
            rules={[{ required: true }]}
            required
            className="w-full md:flex-1"
          >
            <Input placeholder="อ้างอิงใบอนุญาต อ.2 เลขที่" />
          </Form.Item>
          <Form.Item
            label="วันที่ใบอนุญาต"
            name="permitDate"
            rules={[{ required: true }]}
            required
            className="w-full md:flex-1"
          >
            <DatePicker className="w-full" placeholder="วันที่ใบอนุญาต" />
          </Form.Item>
          <Form.Item
            label="วันที่หมดอายุ"
            name="expireDate"
            rules={[{ required: true }]}
            required
            className="w-full md:flex-1"
          >
            <DatePicker className="w-full" placeholder="วันที่หมดอายุ" />
          </Form.Item>
          <Form.Item label=" " colon={false} className="shrink-0">
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={() => setSearchOpen(true)}
            />
          </Form.Item>
        </div>

        <Form.Item
          label="เอกสารเขียนที่"
          name="writtenAt"
          initialValue={WRITTEN_AT_DEFAULT}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="มีความประสงค์จะขออนุญาตสั่งหรือนำเข้า"
          name="requestFor"
          required
          className="compact-control !mb-0"
        >
          <Checkbox.Group options={REQUEST_FOR_OPTIONS} />
        </Form.Item>
        <RequiredNote />

        <Form.Item
          label="เพื่อใช้"
          name="useFor"
          required
          className="compact-control !mb-0 mt-4"
        >
          <Checkbox.Group options={USE_FOR_OPTIONS} />
        </Form.Item>
        <RequiredNote />

        <Form.Item
          label="วัตถุประสงค์การขออนุญาต"
          name="purpose"
          rules={[{ required: true }]}
          required
          className="mt-4"
        >
          <Input.TextArea rows={6} placeholder="วัตถุประสงค์การขออนุญาต" />
        </Form.Item>

        <Divider className="!my-4" />

        <SectionTitle className="!mb-2">ผู้ยื่นคำขอ</SectionTitle>
        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item label="คำนำหน้า" name="prefix" required>
              <Select placeholder={APPLICANT_PLACEHOLDERS.prefix} disabled />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="ชื่อ" name="firstName" required>
              <Input placeholder={APPLICANT_PLACEHOLDERS.firstName} disabled />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="สกุล" name="lastName" required>
              <Input placeholder={APPLICANT_PLACEHOLDERS.lastName} disabled />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="ตำแหน่ง" name="position" required>
              <Input placeholder={APPLICANT_PLACEHOLDERS.position} disabled />
            </Form.Item>
          </Col>
        </Row>

        <div className="flex justify-end">
          <Button
            type="primary"
            size="large"
            disabled={!canSubmit}
            onClick={handleCreate}
          >
            สร้างคำขอ
          </Button>
        </div>
      </Form>
      <PermitSearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelect={handleSelectPermit}
      />
      <ConfirmCreateModal
        open={confirmOpen}
        loading={isCreating}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleConfirmCreate}
      />
    </Card>
  );
}
