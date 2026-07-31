"use client";

import React from "react";
import { App, Button, Card, Col, Form, Input, Row, Space } from "antd";
import { EnvironmentOutlined, SyncOutlined } from "@ant-design/icons";
import { InfoField, SectionTitle } from "@/components/common";
import { useImportRequestA4Actions } from "@/hooks/importRequestA4";
import type {
  FactoryInfo,
  ImportRequestRecord,
} from "@/types/app/importRequestA4";
import FactorySyncModal from "./Modal/FactorySyncModal";
import GeoLocationModal from "./Modal/GeoLocationModal";

/** Label → key, in the order the design lays the two-column grid out. */
const FIELDS: { label: string; key: keyof FactoryInfo }[] = [
  { label: "ชื่อโรงงาน", key: "name" },
  { label: "เนื้อที่โรงงาน (ไร่)", key: "areaRai" },
  { label: "เนื้อที่โรงงาน (งาน)", key: "areaNgan" },
  { label: "เนื้อที่โรงงาน (ตารางวา)", key: "areaSqWa" },
  { label: "เลขที่อยู่", key: "addressNo" },
  { label: "หมู่ที่", key: "moo" },
  { label: "ชื่ออาคาร", key: "building" },
  { label: "ตรอก/ซอย", key: "soi" },
  { label: "ถนน", key: "road" },
  { label: "จังหวัด", key: "province" },
  { label: "อำเภอ/เขต", key: "district" },
  { label: "ตำบล/แขวง", key: "subDistrict" },
  { label: "รหัสไปรษณีย์", key: "postcode" },
  { label: "โทรศัพท์", key: "phone" },
  { label: "โทรสาร", key: "fax" },
  { label: "อีเมล", key: "email" },
  { label: "เลขทะเบียนโรงงาน", key: "registrationNo" },
  { label: "กำลังเครื่องจักรที่ได้รับอนุญาต (แรงม้า)", key: "machinePower" },
  { label: "เลขที่ใบอนุญาตประกอบกิจการโรงงาน", key: "operatingPermitNo" },
  {
    label: "ใบอนุญาตประกอบกิจการโรงงาน(ลงวันที่)",
    key: "operatingPermitDate",
  },
];

interface FactoryTabProps {
  record: ImportRequestRecord;
}

/**
 * แท็บข้อมูลโรงงาน (Figma node 4025:196196). The tab mirrors Commercial, so the
 * designer's note governs the buttons: บันทึกข้อมูล stays disabled until
 * ดึงข้อมูลล่าสุด has run — saving stale factory data is the thing to prevent.
 */
export default function FactoryTab({ record }: FactoryTabProps) {
  const { message } = App.useApp();
  const { saveRequest, isSaving } = useImportRequestA4Actions();
  const [form] = Form.useForm<FactoryInfo>();
  const [editing, setEditing] = React.useState(false);
  const [synced, setSynced] = React.useState(record.factorySynced);
  const [syncing, setSyncing] = React.useState(false);
  const [geoOpen, setGeoOpen] = React.useState(false);

  const factory = record.factory;

  const handleSync = async () => {
    setSyncing(true);
    // Stands in for the Commercial call; the modal is the whole point of it.
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setSyncing(false);
    setSynced(true);
    message.success("ดึงข้อมูลโรงงานล่าสุดแล้ว");
  };

  const handleSave = async () => {
    const values = form.getFieldsValue();
    await saveRequest({
      record: {
        ...record,
        factory: { ...factory, ...values },
        factorySynced: true,
      },
      status: record.status,
      detail: "แก้ไขข้อมูลโรงงาน",
    });
    setEditing(false);
    setSynced(false);
    message.success("บันทึกข้อมูลโรงงานแล้ว");
  };

  return (
    <Card className="!rounded-tl-none" styles={{ body: { padding: 32 } }}>
      <div className="mb-6 flex items-center justify-between gap-4">
        <SectionTitle className="!mb-0">ข้อมูลโรงงาน</SectionTitle>
        {editing && (
          <Button
            icon={<SyncOutlined />}
            size="large"
            loading={syncing}
            onClick={handleSync}
          >
            ดึงข้อมูลล่าสุด
          </Button>
        )}
      </div>

      {editing ? (
        <Form form={form} layout="vertical" size="large" initialValues={factory}>
          <Row gutter={[16, 0]}>
            {FIELDS.map((field) => (
              <Col xs={24} md={12} key={field.key}>
                <Form.Item label={field.label} name={field.key}>
                  <Input />
                </Form.Item>
              </Col>
            ))}
            <Col span={24}>
              <Form.Item
                label="รายละเอียดเพิ่มเติมของสถานที่"
                name="placeDetail"
              >
                <Input.TextArea rows={3} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ) : (
        <Row gutter={[16, 24]}>
          {FIELDS.map((field) => (
            <Col xs={24} md={12} key={field.key}>
              <InfoField label={field.label} value={factory[field.key] || "-"} />
            </Col>
          ))}
          <Col xs={24} md={12}>
            <InfoField label="ข้อมูลละติจูด" value={factory.latitude || "-"} />
          </Col>
          <Col xs={24} md={12}>
            <InfoField
              label="ข้อมูลลองจิจูด"
              value={
                <span className="flex items-center gap-2">
                  {factory.longitude || "-"}
                  <Button
                    size="small"
                    icon={<EnvironmentOutlined />}
                    onClick={() => setGeoOpen(true)}
                  >
                    ดูแผนที่
                  </Button>
                </span>
              }
            />
          </Col>
          <Col span={24}>
            <InfoField
              label="รายละเอียดเพิ่มเติมของสถานที่"
              value={factory.placeDetail || "-"}
            />
          </Col>
        </Row>
      )}

      <div className="mt-6 flex justify-end">
        {editing ? (
          <Space>
            <Button size="large" onClick={() => setEditing(false)}>
              ยกเลิก
            </Button>
            {/* The designer's note: no save until the data has been refreshed. */}
            <Button
              type="primary"
              size="large"
              disabled={!synced}
              loading={isSaving}
              onClick={handleSave}
            >
              บันทึกข้อมูล
            </Button>
          </Space>
        ) : (
          <Button type="primary" size="large" onClick={() => setEditing(true)}>
            แก้ไขข้อมูล
          </Button>
        )}
      </div>

      <FactorySyncModal open={syncing} />
      <GeoLocationModal
        open={geoOpen}
        factory={factory}
        onCancel={() => setGeoOpen(false)}
        onSubmit={() => setGeoOpen(false)}
      />
    </Card>
  );
}
