"use client";

import React from "react";
import { Button, Space } from "antd";
import { LeftOutlined } from "@ant-design/icons";

export default function FooterActions() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <Button size="large" icon={<LeftOutlined />}>
        ย้อนกลับ
      </Button>
      <Space wrap>
        <Button size="large">พิมพ์ใบคำขอ</Button>
        <Button type="primary" size="large">
          ยื่นคำขอ
        </Button>
        <Button size="large">ถัดไป</Button>
      </Space>
    </div>
  );
}
