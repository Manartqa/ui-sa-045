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
import { BUTTON_TEXT } from "@/constant/text/common";
import {
  DEFAULT_FILTERS,
  SEARCH_BY_ALL,
  SEARCH_BY_OPTIONS,
  STATUS_ALL,
  STATUS_OPTIONS,
} from "./ImportRequestA4List.config";

const { RangePicker } = DatePicker;

interface ListSearchCardProps {
  filters: Record<string, string>;
  onSearch: (filters: Record<string, string>) => void;
}

export default function ListSearchCard({
  filters,
  onSearch,
}: ListSearchCardProps) {
  const [form] = Form.useForm();
  const [searchBy, setSearchBy] = React.useState<string>(
    filters.searchBy ?? SEARCH_BY_ALL,
  );
  const keywordDisabled = searchBy === SEARCH_BY_ALL;

  // Filters arrive from the cookie after mount, so sync the form once they land.
  React.useEffect(() => {
    form.setFieldsValue(filters);
    setSearchBy(filters.searchBy ?? SEARCH_BY_ALL);
  }, [filters, form]);

  const handleSearchByChange = (value: string) => {
    setSearchBy(value);
    // Going back to "ทั้งหมด" turns the keyword box off, so drop what was typed.
    if (value === SEARCH_BY_ALL) form.setFieldValue("keyword", undefined);
  };

  /**
   * `allowClear` hands the field `undefined`; `normalize` turns that back into
   * the default as the form stores it, so the control keeps showing "ทั้งหมด"
   * without writing the value back from outside.
   */
  const normalizeToDefault = (fallback: string) => (value?: string) =>
    value ?? fallback;

  const handleReset = () => {
    form.resetFields();
    setSearchBy(SEARCH_BY_ALL);
    onSearch({ ...DEFAULT_FILTERS });
  };

  const handleFinish = (values: Record<string, string>) => {
    onSearch({
      searchBy: values.searchBy ?? SEARCH_BY_ALL,
      keyword: values.keyword ?? "",
      status: values.status ?? "all",
    });
  };

  return (
    <Card styles={{ body: { padding: 32 } }}>
      <SectionTitle variant="page" className="!mb-4">
        ค้นหาข้อมูล
      </SectionTitle>
      <Form
        form={form}
        layout="vertical"
        size="large"
        initialValues={{ ...DEFAULT_FILTERS }}
        onFinish={handleFinish}
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
            <Form.Item
              name="searchBy"
              className="!mb-0"
              normalize={normalizeToDefault(SEARCH_BY_ALL)}
            >
              <Select
                className="w-full"
                options={SEARCH_BY_OPTIONS}
                showSearch
                allowClear
                // Match against the Thai label — the values are English codes.
                optionFilterProp="label"
                onChange={(value) => handleSearchByChange(value ?? SEARCH_BY_ALL)}
                // The prefix belongs to the closed control only — the dropdown
                // lists the plain labels.
                labelRender={({ label }) => `ค้นหาโดย: ${label}`}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} xl={8}>
            <Form.Item name="keyword" className="!mb-0">
              <Input placeholder="พิมพ์เพื่อค้นหา..." disabled={keywordDisabled} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} xl={8}>
            <Form.Item
              name="status"
              className="!mb-0"
              normalize={normalizeToDefault(STATUS_ALL)}
            >
              <Select
                className="w-full"
                options={STATUS_OPTIONS}
                showSearch
                allowClear
                // Match against the Thai label, not the status code.
                optionFilterProp="label"
                labelRender={({ label }) => `สถานะ: ${label}`}
              />
            </Form.Item>
          </Col>
        </Row>
        <Space className="mt-4">
          {/* Design: white fill, primary border and label, with antd's
              control-outline shadow underneath. */}
          <Button
            color="primary"
            variant="outlined"
            onClick={handleReset}
            // antd's large button rounds to 10; the design uses 8.
            style={{
              borderRadius: 8,
              boxShadow: "0 2px 0 rgba(5, 145, 255, 0.1)",
            }}
          >
            {BUTTON_TEXT.reset}
          </Button>
          <Button type="primary" htmlType="submit" icon={<SearchOutlined />} />
        </Space>
      </Form>
    </Card>
  );
}
