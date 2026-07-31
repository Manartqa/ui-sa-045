"use client";

import React from "react";
import { Card, Result, Typography } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";
import { SectionTitle } from "@/components/common";

const { Text } = Typography;

interface MockDocumentViewerProps {
  fileName: string;
  title: string;
}

/**
 * The page behind ดูหลักฐาน. It deliberately does not pretend to be a PDF —
 * a fake document would be indistinguishable from a broken one, so the tab
 * says plainly that the file exists only as a record in the demo store.
 */
export default function MockDocumentViewer({
  fileName,
  title,
}: MockDocumentViewerProps) {
  return (
    <div className="mx-auto max-w-[720px] p-6">
      <Card styles={{ body: { padding: 32 } }}>
        <SectionTitle className="!mb-4">เอกสารหลักฐาน</SectionTitle>
        <Result
          icon={<FilePdfOutlined style={{ color: "#FA5E5E" }} />}
          title={title || "เอกสารแนบ"}
          subTitle={
            <div className="flex flex-col gap-2">
              <Text strong>{fileName || "ไม่ระบุชื่อไฟล์"}</Text>
              <Text type="secondary">
                ระบบสาธิตยังไม่มีการจัดเก็บไฟล์จริง
                หน้านี้แสดงแทนไฟล์ที่แนบไว้ในคำขอ
              </Text>
            </div>
          }
        />
      </Card>
    </div>
  );
}
