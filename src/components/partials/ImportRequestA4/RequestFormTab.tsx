"use client";

import React from "react";
import { Tabs, Card, Row, Col, Divider, Button, Typography, theme } from "antd";
import { InfoField, SectionTitle } from "@/components/common";
import {
  APPLICATION_FORM,
  OFFICE_INFO,
  REGISTRATION_INFO,
} from "./ImportRequestA4.config";

const { Text } = Typography;

function FormContent() {
  const { token } = theme.useToken();

  return (
    <Card className="!rounded-tl-none" styles={{ body: { padding: 32 } }}>
      <div className="flex items-center justify-between gap-4">
        <SectionTitle>{APPLICATION_FORM.title}</SectionTitle>
        <Text className="shrink-0" style={{ color: token.colorWarning }}>
          รอตรวจสอบ
        </Text>
      </div>

      <Row gutter={[16, 24]} className="mt-6">
        <Col span={24}>
          <InfoField label="เอกสารเขียนที่" value={APPLICATION_FORM.writtenAt} />
        </Col>
        <Col xs={24} md={8}>
          <InfoField
            label="อ้างอิงถึงใบอนุญาต"
            value={APPLICATION_FORM.referencePermitNo}
          />
        </Col>
        <Col xs={24} md={8}>
          <InfoField label="วันที่ใบอนุญาต" value={APPLICATION_FORM.permitDate} />
        </Col>
        <Col xs={24} md={8}>
          <InfoField
            label="วันหมดอายุ"
            value={APPLICATION_FORM.permitExpireDate}
          />
        </Col>
        <Col xs={24} md={8}>
          <InfoField label="วัตถุประสงค์ อ.2" value={APPLICATION_FORM.purposeA2} />
        </Col>
        <Col xs={24} md={8}>
          <InfoField
            label="ประเภทวัตถุหรืออาวุธที่ขอรับอนุญาต อ.2"
            value={APPLICATION_FORM.weaponTypeA2}
          />
        </Col>
        <Col xs={24} md={8}>
          <InfoField
            label="สถานะการต่ออายุ อ.2"
            value={APPLICATION_FORM.renewalStatusA2}
          />
        </Col>
      </Row>

      <Divider />

      <Row gutter={[16, 24]}>
        <Col xs={24} md={8}>
          <InfoField
            label="มีความประสงค์จะขออนุญาตสั่งหรือนำเข้า"
            value={APPLICATION_FORM.requestFor}
          />
        </Col>
        <Col xs={24} md={16}>
          <InfoField label="เพื่อใช้" value={APPLICATION_FORM.useFor} />
        </Col>
        <Col span={24}>
          <InfoField
            label="วัตถุประสงค์การขออนุญาต"
            value={APPLICATION_FORM.requestPurpose}
          />
        </Col>
      </Row>

      <Divider />

      <SectionTitle>ข้อมูลสำนักงาน</SectionTitle>
      <Row gutter={[16, 24]} className="mt-6">
        <Col xs={24} md={12}>
          <InfoField
            label="เลขที่บัตรประจำตัวผู้เสียภาษี"
            value={OFFICE_INFO.taxId}
          />
        </Col>
        <Col xs={24} md={12}>
          <InfoField label="ชื่อบริษัท" value={OFFICE_INFO.companyName} />
        </Col>
        <Col xs={24} md={12}>
          <InfoField label="สาขาประกอบการ" value={OFFICE_INFO.branch} />
        </Col>
        <Col xs={24} md={12}>
          <InfoField label="เลขที่อยู่" value={OFFICE_INFO.addressNo} />
        </Col>
        <Col xs={24} md={12}>
          <InfoField label="หมู่ที่" value={OFFICE_INFO.moo} />
        </Col>
        <Col xs={24} md={12}>
          <InfoField label="ชื่ออาคาร" value={OFFICE_INFO.building} />
        </Col>
        <Col xs={24} md={12}>
          <InfoField label="ตรอก/ซอย" value={OFFICE_INFO.soi} />
        </Col>
        <Col xs={24} md={12}>
          <InfoField label="ถนน" value={OFFICE_INFO.road} />
        </Col>
        <Col xs={24} md={12}>
          <InfoField label="จังหวัด" value={OFFICE_INFO.province} />
        </Col>
        <Col xs={24} md={12}>
          <InfoField label="อำเภอ/เขต" value={OFFICE_INFO.district} />
        </Col>
        <Col xs={24} md={12}>
          <InfoField label="ตำบล/แขวง" value={OFFICE_INFO.subDistrict} />
        </Col>
        <Col xs={24} md={12}>
          <InfoField label="รหัสไปรษณีย์" value={OFFICE_INFO.postcode} />
        </Col>
        <Col xs={24} md={12}>
          <InfoField label="โทรศัพท์" value={OFFICE_INFO.phone} />
        </Col>
        <Col xs={24} md={12}>
          <InfoField label="อีเมล" value={OFFICE_INFO.email} />
        </Col>
        <Col xs={24} md={12}>
          <InfoField label="โทรสาร" value={OFFICE_INFO.fax} />
        </Col>
      </Row>

      <Divider />

      <SectionTitle>ข้อมูลการจดทะเบียน</SectionTitle>
      <Row gutter={[16, 24]} className="mt-6">
        <Col span={24}>
          <InfoField
            label="เลขที่ทะเบียนนิติบุคคล"
            value={REGISTRATION_INFO.juristicNo}
          />
        </Col>
        <Col xs={24} md={12}>
          <InfoField
            label="ทุนจดทะเบียน"
            value={REGISTRATION_INFO.registeredCapital}
          />
        </Col>
        <Col xs={24} md={12}>
          <InfoField
            label="วันที่จดทะเบียนนิติบุคคล"
            value={REGISTRATION_INFO.registeredDate}
          />
        </Col>
        <Col xs={24} md={12}>
          <InfoField
            label="สถานที่จดทะเบียนนิติบุคคล"
            value={REGISTRATION_INFO.registeredPlace}
          />
        </Col>
        <Col xs={24} md={12}>
          <InfoField
            label="จังหวัดที่จดทะเบียนนิติบุคคล"
            value={REGISTRATION_INFO.registeredProvince}
          />
        </Col>
      </Row>

      <div className="mt-6 flex justify-end">
        <Button type="primary" size="large">
          แก้ไขข้อมูล
        </Button>
      </div>
    </Card>
  );
}

export default function RequestFormTab() {
  const { token } = theme.useToken();

  return (
    <Tabs
      type="card"
      className="request-tabs"
      defaultActiveKey="form"
      items={[
        { key: "form", label: "แบบคำขอ", children: <FormContent /> },
        {
          key: "factory",
          label: (
            <Text strong style={{ color: token.colorWarning }}>
              ข้อมูลโรงงาน
            </Text>
          ),
          children: null,
        },
        { key: "person", label: "ข้อมูลบุคคล", children: null },
        { key: "documents", label: "อัพโหลดเอกสาร", children: null },
      ]}
    />
  );
}
