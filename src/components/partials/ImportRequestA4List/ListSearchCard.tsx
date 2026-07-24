"use client";

import React from "react";
import { Card, Row, Col, DatePicker, Select, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  SEARCH_BY_OPTIONS,
  STATUS_OPTIONS,
} from "./ImportRequestA4List.config";

const { RangePicker } = DatePicker;

export default function ListSearchCard() {
  return (
    <Card styles={{ body: { padding: 32 } }}>
      <h2 className="m-0 mb-4 text-base font-bold leading-6 text-black">
        ค้นหาข้อมูล
      </h2>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} xl={8}>
          <RangePicker
            className="w-full"
            size="large"
            placeholder={["วันที่รับเรื่องเริ่มต้น", "วันสิ้นสุด"]}
          />
        </Col>
        <Col xs={24} md={12} xl={8}>
          <RangePicker
            className="w-full"
            size="large"
            placeholder={["วันที่คำขอเริ่มต้น", "วันสิ้นสุด"]}
          />
        </Col>
        <Col xs={24} md={12} xl={8}>
          <RangePicker
            className="w-full"
            size="large"
            placeholder={["วันอนุมัติเริ่มต้น", "วันสิ้นสุด"]}
          />
        </Col>
        <Col xs={24} md={12} xl={8}>
          <Select
            className="w-full"
            size="large"
            defaultValue="all"
            options={SEARCH_BY_OPTIONS}
          />
        </Col>
        <Col xs={24} md={12} xl={8}>
          <Input size="large" placeholder="พิมพ์เพื่อค้นหา..." disabled />
        </Col>
        <Col xs={24} md={12} xl={8}>
          <Select
            className="w-full"
            size="large"
            defaultValue="all"
            options={STATUS_OPTIONS}
          />
        </Col>
      </Row>
      <div className="mt-4 flex gap-2">
        <Button size="large">รีเซ็ต</Button>
        <Button type="primary" size="large" icon={<SearchOutlined />} />
      </div>
    </Card>
  );
}
