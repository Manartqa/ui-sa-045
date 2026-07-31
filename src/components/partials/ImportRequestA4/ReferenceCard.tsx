"use client";

import React from "react";
import { Card, Row, Col } from "antd";
import { InfoField } from "@/components/common";
import type { ImportRequestRecord } from "@/types/app/importRequestA4";

/** Blank office-side fields read as "-" here, unlike the list's empty cells. */
const dash = (value: string) => value || "-";

interface ReferenceCardProps {
  record: ImportRequestRecord;
}

export default function ReferenceCard({ record }: ReferenceCardProps) {
  return (
    <Card styles={{ body: { padding: 32 } }}>
      <Row gutter={[16, 24]}>
        <Col xs={24} md={8}>
          <InfoField label="เลขที่อ้างอิง" value={dash(record.referenceNo)} />
        </Col>
        <Col xs={24} md={8}>
          <InfoField label="เลขที่รับเรื่อง" value={dash(record.receiveNo)} />
        </Col>
        <Col xs={24} md={8}>
          <InfoField
            label="วันที่รับเรื่อง(วันที่เอกสาร)"
            value={dash(record.receiveDate)}
          />
        </Col>
        <Col xs={24} md={8}>
          <InfoField label="เลขที่คำขอ" value={dash(record.requestNo)} />
        </Col>
        <Col xs={24} md={8}>
          <InfoField label="วันที่คำขอ" value={dash(record.requestDate)} />
        </Col>
      </Row>
    </Card>
  );
}
