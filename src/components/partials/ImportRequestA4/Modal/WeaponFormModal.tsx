"use client";

import React from "react";
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Table,
  Typography,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";
import { useWeaponFormOptions } from "@/hooks/importRequestA4";
import type {
  WeaponCatalogItem,
  WeaponItem,
  WeaponManufacturerItem,
} from "@/types/app/importRequestA4";

const { Text } = Typography;
const { TextArea } = Input;

/** Figma lists these three; more than one may be ticked. */
const IMPORT_CHANNELS = [
  "นำเข้าทางเรือ",
  "นำเข้าทางรถยนต์",
  "นำเข้าทางเครื่องบิน",
];

interface WeaponFormValues {
  order: number;
  /** The catalogue is keyed by `code` here so the reset effect below need not
      depend on the fetched list — depending on it re-ran the effect on every
      render and looped setFieldsValue against its own re-render. */
  catalogCode: string;
  group: string;
  name: string;
  quantity: string;
  unit: string;
  quantity2: string;
  unit2: string;
  importMethod: string;
  importChannels: string[];
  packingMethod: string;
  storagePlace: string;
}

interface WeaponFormModalProps {
  open: boolean;
  /** null = เพิ่มข้อมูล, a row = แก้ไข. */
  editing: WeaponItem | null;
  /** Order values the ลำดับที่ select may take. */
  orderOptions: number[];
  loading?: boolean;
  onCancel: () => void;
  onSubmit: (value: WeaponItem) => void;
}

/**
 * "เพิ่มข้อมูลอาวุธ/วัตถุดิบ" (Figma nodes 4025:195882 / 4259:50836).
 *
 * Picking a catalogue entry fills รหัส / ประเภท / ประเภทการใช้งาน /
 * รายละเอียด read-only and seeds กลุ่ม and ชื่อ. Those last two stay editable:
 * once one differs from the catalogue the design shows "ชื่อเดิม : <value>" in
 * red under the field, and the row's cell turns red in the table.
 */
export default function WeaponFormModal({
  open,
  editing,
  orderOptions,
  loading,
  onCancel,
  onSubmit,
}: WeaponFormModalProps) {
  const [form] = Form.useForm<WeaponFormValues>();
  const { catalog, units, importMethods, countries } =
    useWeaponFormOptions(open);
  const [manufacturers, setManufacturers] = React.useState<
    WeaponManufacturerItem[]
  >([]);
  const [maker, setMaker] = React.useState({ name: "", country: "" });

  // Read through a ref so the reset effect can default ลำดับที่ to the next
  // free slot without listing a freshly-built array in its deps.
  const nextOrderRef = React.useRef(1);
  nextOrderRef.current = orderOptions[orderOptions.length - 1] ?? 1;

  /** Catalogue code กลุ่ม/ชื่อ were last seeded from, so a re-open does not
      overwrite an override the operator already made. */
  const seededCodeRef = React.useRef("");

  const catalogCode = Form.useWatch("catalogCode", form);
  const group = Form.useWatch("group", form);
  const name = Form.useWatch("name", form);
  const values = Form.useWatch([], form);

  /**
   * React Query runs with `gcTime: 0` here, so `catalog` can go back to `[]`
   * between renders. Keeping the last non-empty list means the lookup below
   * never blanks the read-only fields underneath the user.
   */
  const catalogRef = React.useRef<WeaponCatalogItem[]>([]);
  if (catalog.length) catalogRef.current = catalog;

  /**
   * Derived from the watched field rather than from the Select's `onChange`:
   * the field value is the one thing guaranteed to be in step with what the
   * user sees in the box.
   */
  const selected: WeaponCatalogItem | null = React.useMemo(() => {
    if (!catalogCode) return null;
    const hit = catalogRef.current.find((c) => c.code === catalogCode);
    if (hit) return hit;
    // An edited row carries everything the catalogue would have supplied, so
    // it stands in for its own entry until the list loads.
    if (editing && editing.code === catalogCode) {
      return {
        key: editing.key,
        code: editing.code,
        weaponType: editing.weaponType,
        usageType: editing.usageType,
        group: editing.catalogGroup,
        name: editing.catalogName,
        detail: editing.detail,
      };
    }
    return null;
  }, [catalogCode, editing, catalog]);

  const catalogGroup = selected?.group ?? editing?.catalogGroup ?? "";
  const catalogName = selected?.name ?? editing?.catalogName ?? "";

  // Only `open`/`editing` may retrigger this — anything else here (the fetched
  // catalogue, a freshly built orderOptions array) makes it fire every render.
  React.useEffect(() => {
    if (!open) return;
    if (editing) {
      form.setFieldsValue({
        order: editing.order,
        catalogCode: editing.code || undefined,
        group: editing.group,
        name: editing.name,
        quantity: editing.quantity,
        unit: editing.unit,
        quantity2: editing.quantity2,
        unit2: editing.unit2,
        importMethod: editing.importMethod,
        importChannels: editing.importChannels,
        packingMethod: editing.packingMethod,
        storagePlace: editing.storagePlace,
      });
      setManufacturers(editing.manufacturers);
      seededCodeRef.current = editing.code;
      return;
    }
    form.resetFields();
    seededCodeRef.current = "";
    form.setFieldsValue({
      order: nextOrderRef.current,
      importChannels: [],
      packingMethod: "ตามมาตรฐานของบริษัทผู้ผลิต",
    });
    setManufacturers([]);
    setMaker({ name: "", country: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, editing, form]);

  /**
   * Picking a *different* catalogue entry re-seeds กลุ่ม and ชื่อ from it.
   * The guard matters on แก้ไข: opening a row whose กลุ่ม was overridden must
   * not silently put the catalogue value back.
   */
  React.useEffect(() => {
    if (!open || !selected) return;
    if (seededCodeRef.current === selected.code) return;
    seededCodeRef.current = selected.code;
    form.setFieldsValue({ group: selected.group, name: selected.name });
  }, [open, selected, form]);

  const handleAddMaker = () => {
    if (!maker.name.trim()) return;
    setManufacturers((rows) => [
      ...rows,
      {
        key: `mk-${Date.now()}`,
        order: rows.length + 1,
        name: maker.name.trim(),
        country: maker.country,
      },
    ]);
    setMaker({ name: "", country: "" });
  };

  const handleRemoveMaker = (key: string) =>
    setManufacturers((rows) =>
      rows
        .filter((r) => r.key !== key)
        .map((r, index) => ({ ...r, order: index + 1 })),
    );

  const canSubmit = Boolean(
    values?.catalogCode &&
      values?.group?.trim() &&
      values?.name?.trim() &&
      values?.quantity?.trim() &&
      values?.unit &&
      values?.importMethod &&
      values?.packingMethod?.trim() &&
      manufacturers.length > 0,
  );

  const handleSubmit = () => {
    const v = form.getFieldsValue();
    const detail = selected?.detail ?? editing?.detail ?? "";
    onSubmit({
      key: editing?.key ?? `w-${Date.now()}`,
      order: v.order,
      code: selected?.code ?? editing?.code ?? "",
      group: v.group.trim(),
      name: v.name.trim(),
      detail,
      amount: `${v.quantity} ${v.unit}${
        v.quantity2 ? ` หรือ ${v.quantity2} ${v.unit2 || v.unit}` : ""
      }`,
      previousPermitNo: editing?.previousPermitNo ?? "",
      // A row that changed goes back to รอตรวจสอบ — an officer has to look at
      // it again, which is what requirement 6 shows on the card.
      status: "PENDING_REVIEW",
      weaponType: selected?.weaponType ?? editing?.weaponType ?? "",
      usageType: selected?.usageType ?? editing?.usageType ?? "",
      catalogGroup,
      catalogName,
      quantity: v.quantity,
      unit: v.unit,
      quantity2: v.quantity2 ?? "",
      unit2: v.unit2 ?? "",
      importMethod: v.importMethod,
      importChannels: v.importChannels ?? [],
      manufacturers,
      packingMethod: v.packingMethod,
      storagePlace: v.storagePlace ?? "",
      previousPermits: editing?.previousPermits ?? [],
      documentNo: editing?.documentNo ?? "",
      documentApprovedDate: editing?.documentApprovedDate ?? "",
      documentExpireDate: editing?.documentExpireDate ?? "",
      documentFileName: editing?.documentFileName ?? "",
    });
  };

  const makerColumns: ColumnsType<WeaponManufacturerItem> = [
    { title: "#", dataIndex: "order", width: 53 },
    { title: "ลำดับที่", dataIndex: "order", key: "seq", width: 110 },
    { title: "ผู้ผลิต", dataIndex: "name" },
    { title: "ประเทศ", dataIndex: "country", render: (v: string) => v || "-" },
    {
      title: "",
      key: "actions",
      width: 100,
      render: (_, row) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          aria-label="ลบผู้ผลิต"
          onClick={() => handleRemoveMaker(row.key)}
        />
      ),
    },
  ];

  /** "ชื่อเดิม : X" — only once the field differs from the catalogue. */
  const originalHint = (current: string | undefined, original: string) =>
    original && current?.trim() && current.trim() !== original ? (
      <Text className="!mt-1 block">
        ชื่อเดิม : <Text type="danger">{original}</Text>
      </Text>
    ) : null;

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      centered
      width={800}
      title={
        <Text strong style={{ fontSize: 16 }}>
          {editing ? "แก้ไขข้อมูลอาวุธ/วัตถุดิบ" : "เพิ่มข้อมูลอาวุธ/วัตถุดิบ"}
        </Text>
      }
      footer={[
        <Button key="cancel" size="large" onClick={onCancel} disabled={loading}>
          ยกเลิก
        </Button>,
        <Button
          key="ok"
          type="primary"
          size="large"
          disabled={!canSubmit}
          loading={loading}
          onClick={handleSubmit}
        >
          บันทึกข้อมูล
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" size="large" requiredMark>
        <Row gutter={16}>
          <Col xs={24} md={6}>
            <Form.Item label="ลำดับที่" name="order" required>
              <Select
                options={orderOptions.map((o) => ({ value: o, label: o }))}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={18}>
            <Form.Item label="ข้อมูลอาวุธ/วัตถุดิบ" name="catalogCode" required>
              <Select
                placeholder="เลือกข้อมูลอาวุธ/วัตถุดิบ"
                options={catalogRef.current.map((c) => ({
                  value: c.code,
                  label: `${c.code} | ${c.weaponType} | ${c.group} | ${c.name}`,
                }))}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item label="รหัสอาวุธ/วัตถุดิบ" required>
              <Input
                disabled
                value={selected?.code ?? editing?.code ?? ""}
                placeholder="รหัสอาวุธ/วัตถุดิบ"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="ประเภทอาวุธ/วัตถุดิบ" required>
              <Input
                disabled
                value={selected?.weaponType ?? editing?.weaponType ?? ""}
                placeholder="ประเภทอาวุธ/วัตถุดิบ"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="ประเภทการใช้งาน">
              <Input
                disabled
                value={selected?.usageType ?? editing?.usageType ?? ""}
                placeholder="ประเภทการใช้งาน"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="กลุ่มอาวุธ/วัตถุดิบ"
              name="group"
              required
              className="!mb-2"
            >
              <Input placeholder="กลุ่มอาวุธ/วัตถุดิบ" disabled={!catalogCode} />
            </Form.Item>
            {originalHint(group, catalogGroup)}
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="ชื่ออาวุธ/วัตถุดิบ"
              name="name"
              required
              className="!mb-2"
            >
              <Input placeholder="ชื่ออาวุธ/วัตถุดิบ" disabled={!catalogCode} />
            </Form.Item>
            {originalHint(name, catalogName)}
          </Col>
        </Row>

        <Form.Item label="รายละเอียด" required className="!mt-4">
          <TextArea
            disabled
            rows={5}
            value={selected?.detail ?? editing?.detail ?? ""}
            placeholder="รายละเอียด"
          />
        </Form.Item>

        <Divider />

        <Row gutter={16}>
          <Col xs={12} md={6}>
            <Form.Item label="จำนวน" name="quantity" required>
              <Input placeholder="0.00" />
            </Form.Item>
          </Col>
          <Col xs={12} md={6}>
            <Form.Item label="หน่วย" name="unit" required>
              <Select
                placeholder="หน่วย"
                options={units.map((u) => ({ value: u, label: u }))}
              />
            </Form.Item>
          </Col>
          <Col xs={12} md={6}>
            <Form.Item label="จำนวน 2" name="quantity2">
              <Input placeholder="0.00" />
            </Form.Item>
          </Col>
          <Col xs={12} md={6}>
            <Form.Item label="หน่วย" name="unit2">
              <Select
                placeholder="หน่วย"
                options={units.map((u) => ({ value: u, label: u }))}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="รูปแบบการนำเข้า"
          name="importMethod"
          required
          className="!mb-2 md:!w-[368px]"
        >
          <Select
            placeholder="รูปแบบการนำเข้า"
            options={importMethods.map((m) => ({ value: m, label: m }))}
          />
        </Form.Item>

        <Form.Item name="importChannels" className="!mb-1">
          <Checkbox.Group options={IMPORT_CHANNELS} />
        </Form.Item>
        <Text type="danger">
          หมายเหตุ <Text>สามารถเลือกได้มากกว่า 1 ตัวเลือก</Text>
        </Text>

        <Divider />

        <Row gutter={16} align="bottom">
          <Col xs={24} md={10}>
            <Form.Item label="ชื่อผู้ผลิต" required className="!mb-4">
              <Input
                placeholder="ชื่อผู้ผลิต"
                value={maker.name}
                onChange={(e) =>
                  setMaker((m) => ({ ...m, name: e.target.value }))
                }
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={10}>
            <Form.Item label="ประเทศ" className="!mb-4">
              <Select
                placeholder="ประเทศ"
                value={maker.country || undefined}
                onChange={(v) => setMaker((m) => ({ ...m, country: v }))}
                options={countries.map((c) => ({ value: c, label: c }))}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={4}>
            <Form.Item className="!mb-4">
              <Button
                type="primary"
                size="large"
                block
                disabled={!maker.name.trim()}
                onClick={handleAddMaker}
              >
                เพิ่มข้อมูลลงตาราง
              </Button>
            </Form.Item>
          </Col>
        </Row>

        <Table<WeaponManufacturerItem>
          className="app-table"
          rowKey="key"
          columns={makerColumns}
          dataSource={manufacturers}
          pagination={false}
          size="middle"
          locale={{ emptyText: "ไม่มีข้อมูล" }}
        />

        <Divider />

        <Form.Item label="วิธีการบรรจุหีบห่อหรือผูกมัด" name="packingMethod" required>
          <TextArea rows={5} placeholder="วิธีการบรรจุหีบห่อหรือผูกมัด" />
        </Form.Item>
        <Form.Item
          label="สถานที่จัดเก็บวัตถุหรืออาวุธ"
          name="storagePlace"
          className="!mb-0"
        >
          <Input placeholder="สถานที่จัดเก็บวัตถุหรืออาวุธ" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export type { WeaponFormModalProps };
export { IMPORT_CHANNELS };
