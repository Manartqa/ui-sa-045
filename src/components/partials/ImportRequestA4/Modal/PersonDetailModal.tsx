"use client";

import React from "react";
import { Col, Divider, Modal, Row, Typography } from "antd";
import { InfoField, SectionTitle } from "@/components/common";
import type {
  PersonAddress,
  PersonItem,
} from "@/types/app/importRequestA4";

const { Text } = Typography;

function AddressBlock({ address }: { address: PersonAddress }) {
  const fields: { label: string; value: string }[] = [
    { label: "เลขที่อยู่", value: address.addressNo },
    { label: "หมู่ที่", value: address.moo },
    { label: "ชื่ออาคาร", value: address.building },
    { label: "ตรอก/ซอย", value: address.soi },
    { label: "ถนน", value: address.road },
    { label: "จังหวัด", value: address.province },
    { label: "อำเภอ/เขต", value: address.district },
    { label: "ตำบล/แขวง", value: address.subDistrict },
    { label: "รหัสไปรษณีย์", value: address.postcode },
  ];
  return (
    <Row gutter={[16, 24]}>
      {fields.map((f) => (
        <Col xs={24} md={8} key={f.label}>
          <InfoField label={f.label} value={f.value || "-"} />
        </Col>
      ))}
    </Row>
  );
}

interface PersonDetailModalProps {
  open: boolean;
  person: PersonItem | null;
  onClose: () => void;
}

/**
 * The person profile from Figma node 4025:198141. The design draws it as a
 * full screen; it is a read-only modal here so the tab keeps its context —
 * flagged for review rather than assumed.
 */
export default function PersonDetailModal({
  open,
  person,
  onClose,
}: PersonDetailModalProps) {
  if (!person) return null;

  const identity: { label: string; value: string }[] = [
    { label: "ลำดับที่", value: String(person.order) },
    { label: "คำนำหน้า", value: person.prefix },
    { label: "ชื่อจริง", value: person.firstName },
    { label: "ชื่อกลาง", value: person.middleName },
    { label: "นามสกุล", value: person.lastName },
    { label: "ตำแหน่ง", value: person.position },
    { label: "สถานะผู้ลงนามคู่สัญญาหลัก", value: person.signerStatus },
    { label: "ประเภทบัตรแสดงตัวตน", value: person.idCardType },
    { label: "เลขที่บัตรประจำตัวประชาชน", value: person.idCardNo },
    { label: "วันที่ออกบัตร", value: person.idIssueDate },
    { label: "วันที่บัตรหมดอายุ", value: person.idExpireDate },
    { label: "วัน/เดือน/ปีเกิด", value: person.birthDate },
    { label: "สัญชาติ", value: person.nationality },
    { label: "จังหวัด", value: person.idProvince },
    { label: "ออกโดย ณ อำเภอ เขต", value: person.idIssuePlace },
    { label: "โทรศัพท์", value: person.phone },
    { label: "อีเมล", value: person.email },
  ];

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={1000}
      title={
        <Text strong style={{ fontSize: 16 }}>
          {person.role === "SIGNER" ? "ข้อมูลผู้มีอำนาจลงนาม" : "ข้อมูลผู้รับมอบอำนาจ"}
        </Text>
      }
    >
      <SectionTitle className="!mb-4">ข้อมูลบุคคล</SectionTitle>
      <Row gutter={[16, 24]}>
        {identity.map((f) => (
          <Col xs={24} md={8} key={f.label}>
            <InfoField label={f.label} value={f.value || "-"} />
          </Col>
        ))}
      </Row>

      <Divider />
      <SectionTitle className="!mb-4">ข้อมูลที่อยู่ตามบัตรแสดงตัวตน</SectionTitle>
      <AddressBlock address={person.addressByCard} />

      <Divider />
      <SectionTitle className="!mb-4">ข้อมูลที่อยู่ตามทะเบียนบ้าน</SectionTitle>
      <AddressBlock address={person.addressByHousehold} />
    </Modal>
  );
}
