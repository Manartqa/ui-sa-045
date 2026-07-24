"use client";

import React from "react";
import {
  Card,
  Form,
  Row,
  Col,
  DatePicker,
  Select,
  Input,
  Button,
  Space,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { SectionTitle } from "@/components/common";
import {
  SEARCH_BY_OPTIONS,
  STATUS_OPTIONS,
} from "./ImportRequestA4List.config";

const { RangePicker } = DatePicker;

export default function ListSearchCard() {
  const [form] = Form.useForm();

  return (
    <Card styles={{ body: { padding: 32 } }}>
      <SectionTitle variant="page" className="!mb-4">
        ค้นหาข้อมูล
      </SectionTitle>
      <Form
        form={form}
        layout="vertical"
        size="large"
        initialValues={{ searchBy: "all", status: "all" }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12} xl={8}>
            <Form.Item name="receivedDate" className="!mb-0">
              <RangePicker
                className="w-full"
                placeholder={["วันที่รับเรื่องเริ่มต้น", "วันสิ้นสุด"]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} xl={8}>
            <Form.Item name="requestDate" className="!mb-0">
              <RangePicker
                className="w-full"
                placeholder={["วันที่คำขอเริ่มต้น", "วันสิ้นสุด"]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} xl={8}>
            <Form.Item name="approvedDate" className="!mb-0">
              <RangePicker
                className="w-full"
                placeholder={["วันอนุมัติเริ่มต้น", "วันสิ้นสุด"]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} xl={8}>
            <Form.Item name="searchBy" className="!mb-0">
              <Select className="w-full" options={SEARCH_BY_OPTIONS} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} xl={8}>
            <Form.Item name="keyword" className="!mb-0">
              <Input placeholder="พิมพ์เพื่อค้นหา..." disabled />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} xl={8}>
            <Form.Item name="status" className="!mb-0">
              <Select className="w-full" options={STATUS_OPTIONS} />
            </Form.Item>
          </Col>
        </Row>
        <Space className="mt-4">
          <Button onClick={() => form.resetFields()}>รีเซ็ต</Button>
          <Button type="primary" htmlType="submit" icon={<SearchOutlined />} />
        </Space>
      </Form>
    </Card>
  );
}
