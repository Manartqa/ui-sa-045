"use client";

import React from "react";
import { Card, Empty, Modal, Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import type {
  WeaponItem,
  WeaponPreviousPermit,
} from "@/types/app/importRequestA4";

const { Text, Title } = Typography;

const columns: ColumnsType<WeaponPreviousPermit> = [
  { title: "เลขที่หนังสือ อ.8 เดิม", dataIndex: "documentNo", width: 180 },
  { title: "วันที่อนุญาต", dataIndex: "approvedDate", width: 130 },
  { title: "วันหมดอายุ", dataIndex: "expireDate", width: 130 },
  { title: "จำนวนที่ได้รับอนุญาต", dataIndex: "approvedAmount", width: 160 },
  { title: "จำนวนที่นำเข้าจริง", dataIndex: "importedAmount", width: 150 },
  { title: "หน่วยนับ", dataIndex: "unit", width: 120 },
];

/** Sums the strings the mock stores, keeping the design's 4-decimal display. */
function total(rows: WeaponPreviousPermit[], field: keyof WeaponPreviousPermit) {
  return rows.reduce((sum, r) => sum + Number(r[field] || 0), 0);
}

function QuotaTile({ label, value }: { label: string; value: string }) {
  return (
    <Card size="small" className="flex-1" styles={{ body: { padding: 16 } }}>
      <Text type="secondary">{label}</Text>
      <Title level={4} style={{ margin: "4px 0 0" }}>
        {value}
      </Title>
    </Card>
  );
}

interface WeaponPermitDetailModalProps {
  open: boolean;
  weapon: WeaponItem | null;
  onCancel: () => void;
}

/**
 * "รายละเอียดอาวุธหรือวัตถุที่ต้องการสั่งหรือนำเข้ามา" (Figma node
 * 4025:191039) — the quota behind a weapon row, grouped by หน่วยนับ because
 * the design shows one summary block per unit.
 */
export default function WeaponPermitDetailModal({
  open,
  weapon,
  onCancel,
}: WeaponPermitDetailModalProps) {
  const rows = weapon?.previousPermits ?? [];
  const units = Array.from(new Set(rows.map((r) => r.unit)));

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      centered
      width={1000}
      footer={null}
      title={
        <div>
          <Text strong style={{ fontSize: 16 }}>
            รายละเอียดอาวุธหรือวัตถุที่ต้องการสั่งหรือนำเข้ามา
          </Text>
          <div>
            <Text strong style={{ fontSize: 16 }}>
              {`อาวุธ/วัตถุดิบ : ${weapon?.name ?? ""}`}
            </Text>
          </div>
        </div>
      }
    >
      {units.length === 0 ? (
        <Empty description="ยังไม่มีหนังสืออนุญาต อ.8 ฉบับเดิม" />
      ) : (
        units.map((unit, index) => {
          const unitRows = rows.filter((r) => r.unit === unit);
          const approved = total(unitRows, "approvedAmount");
          const imported = total(unitRows, "importedAmount");

          return (
            <div key={unit} className={index > 0 ? "mt-8" : undefined}>
              <div className="mb-4 flex flex-wrap gap-4">
                <QuotaTile
                  label="จำนวนที่ได้รับอนุญาต"
                  value={`${approved.toFixed(4)} ${unit}`}
                />
                <QuotaTile
                  label="จำนวนที่นำเข้าจริง"
                  value={`${imported.toFixed(4)} ${unit}`}
                />
                <QuotaTile
                  label="คงเหลือ"
                  value={`${(approved - imported).toFixed(4)} ${unit}`}
                />
              </div>
              <Table<WeaponPreviousPermit>
                className="app-table"
                rowKey="key"
                columns={columns}
                dataSource={unitRows}
                pagination={false}
                scroll={{ x: "max-content" }}
                size="middle"
              />
            </div>
          );
        })
      )}
    </Modal>
  );
}
