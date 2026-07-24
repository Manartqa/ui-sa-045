"use client";

import React from "react";
import { Card, Row, Col } from "antd";
import { InfoField } from "@/components/common";
import { REFERENCE_INFO } from "./ImportRequestA4.config";

export default function ReferenceCard() {
  return (
    <Card styles={{ body: { padding: 32 } }}>
      <Row gutter={[16, 24]}>
        <Col xs={24} md={8}>
          <InfoField label="เลขที่อ้างอิง" value={REFERENCE_INFO.referenceNo} />
        </Col>
        <Col xs={24} md={8}>
          <InfoField label="เลขที่รับเรื่อง" value={REFERENCE_INFO.receiveNo} />
        </Col>
        <Col xs={24} md={8}>
          <InfoField
            label="วันที่รับเรื่อง(วันที่เอกสาร)"
            value={REFERENCE_INFO.receiveDate}
          />
        </Col>
        <Col xs={24} md={8}>
          <InfoField label="เลขที่คำขอ" value={REFERENCE_INFO.requestNo} />
        </Col>
        <Col xs={24} md={8}>
          <InfoField label="วันที่คำขอ" value={REFERENCE_INFO.requestDate} />
        </Col>
      </Row>
    </Card>
  );
}
