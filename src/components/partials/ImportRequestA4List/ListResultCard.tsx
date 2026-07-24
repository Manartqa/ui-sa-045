"use client";

import React from "react";
import { Card, Empty, Divider } from "antd";

export default function ListResultCard() {
  return (
    <Card styles={{ body: { padding: 32 } }}>
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="ไม่มีข้อมูล"
        className="my-8"
      />
      <Divider className="!my-0" />
    </Card>
  );
}
