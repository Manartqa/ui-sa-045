"use client";

import React from "react";
import { App, Button, Card, Col, Row, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";
import { InfoField, SectionTitle, TablePagination } from "@/components/common";
import { StatusTag } from "@/components/ui/StatusTag";
import { FileSearchIcon } from "@/components/ui/icons";
import { useImportRequestA4Actions } from "@/hooks/importRequestA4";
import type {
  ImportRequestRecord,
  PersonItem,
} from "@/types/app/importRequestA4";
import PersonPickerModal from "./Modal/PersonPickerModal";
import PersonDetailModal from "./Modal/PersonDetailModal";

interface PersonsTabProps {
  record: ImportRequestRecord;
}

/**
 * แท็บข้อมูลบุคคล (Figma node 4025:197879): ผู้มีอำนาจลงนาม and ผู้รับมอบอำนาจ
 * are each a table fed by a picker, with ผู้ยื่นคำขอ read-only underneath.
 */
export default function PersonsTab({ record }: PersonsTabProps) {
  const { message, modal } = App.useApp();
  const { saveRequest, isSaving } = useImportRequestA4Actions();
  const [picking, setPicking] = React.useState<PersonItem["role"] | null>(null);
  const [viewing, setViewing] = React.useState<PersonItem | null>(null);

  const byRole = (role: PersonItem["role"]) =>
    record.persons
      .filter((p) => p.role === role)
      .map((p, index) => ({ ...p, order: index + 1 }));

  const persist = async (persons: PersonItem[], detail: string) => {
    await saveRequest({
      record: { ...record, persons },
      status: record.status,
      detail,
    });
    message.success(detail);
  };

  const handleAdd = (person: PersonItem) =>
    persist(
      [...record.persons, person],
      `เพิ่ม${person.role === "SIGNER" ? "ผู้มีอำนาจลงนาม" : "ผู้รับมอบอำนาจ"} ${person.firstName} ${person.lastName}`,
    );

  const handleRemove = (person: PersonItem) => {
    modal.confirm({
      title: "ต้องการลบรายชื่อนี้หรือไม่",
      content: `${person.prefix} ${person.firstName} ${person.lastName}`,
      okText: "ลบ",
      okButtonProps: { danger: true },
      cancelText: "ยกเลิก",
      onOk: () =>
        persist(
          record.persons.filter((p) => p.key !== person.key),
          `ลบรายชื่อ ${person.firstName} ${person.lastName}`,
        ),
    });
  };

  const columns: ColumnsType<PersonItem> = [
    { title: "#", dataIndex: "order", width: 60 },
    {
      title: "ชื่อ - นามสกุล",
      key: "name",
      width: 260,
      render: (_, row) => `${row.prefix} ${row.firstName} ${row.lastName}`,
    },
    { title: "ตำแหน่ง", dataIndex: "position", width: 260 },
    {
      title: "เลขที่บัตรประจำตัวประชาชน",
      dataIndex: "idCardNo",
      width: 220,
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      width: 140,
      render: (status: PersonItem["status"]) => <StatusTag status={status} />,
    },
    {
      title: "",
      key: "actions",
      width: 104,
      fixed: "right",
      render: (_, row) => (
        <Space size={8}>
          <Button
            type="primary"
            icon={<FileSearchIcon />}
            aria-label="ดูรายละเอียด"
            onClick={() => setViewing(row)}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            aria-label="ลบรายชื่อ"
            loading={isSaving}
            onClick={() => handleRemove(row)}
          />
        </Space>
      ),
    },
  ];

  const renderTable = (role: PersonItem["role"], title: string) => {
    const items = byRole(role);
    return (
      <>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <SectionTitle className="!mb-0">{title}</SectionTitle>
          <Button type="primary" size="large" onClick={() => setPicking(role)}>
            เพิ่มข้อมูล
          </Button>
        </div>
        <Table<PersonItem>
          className="app-table"
          rowKey="key"
          columns={columns}
          dataSource={items}
          pagination={false}
          scroll={{ x: "max-content" }}
          locale={{ emptyText: "ยังไม่มีรายชื่อ" }}
          size="middle"
        />
        <TablePagination total={items.length} />
      </>
    );
  };

  return (
    <Card className="!rounded-tl-none" styles={{ body: { padding: 32 } }}>
      {renderTable("SIGNER", "ข้อมูลผู้มีอำนาจลงนาม")}

      <div className="mt-8">
        {renderTable("ATTORNEY", "ข้อมูลผู้รับมอบอำนาจ")}
      </div>

      <div className="mt-8">
        <SectionTitle className="!mb-4">ผู้ยื่นคำขอ</SectionTitle>
        <Row gutter={[16, 24]}>
          <Col xs={24} md={6}>
            <InfoField label="คำนำหน้า" value={record.applicant.prefix} />
          </Col>
          <Col xs={24} md={6}>
            <InfoField label="ชื่อ" value={record.applicant.firstName} />
          </Col>
          <Col xs={24} md={6}>
            <InfoField label="นามสกุล" value={record.applicant.lastName} />
          </Col>
          <Col xs={24} md={6}>
            <InfoField label="ตำแหน่ง" value={record.applicant.position} />
          </Col>
        </Row>
      </div>

      <PersonPickerModal
        open={picking !== null}
        role={picking ?? "SIGNER"}
        excludeKeys={record.persons.map((p) => p.key)}
        onClose={() => setPicking(null)}
        onSelect={handleAdd}
      />
      <PersonDetailModal
        open={viewing !== null}
        person={viewing}
        onClose={() => setViewing(null)}
      />
    </Card>
  );
}
