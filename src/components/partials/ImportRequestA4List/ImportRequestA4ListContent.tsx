"use client";

import React from "react";
import { App } from "antd";
import { useRouter } from "next/navigation";
import { useSearchPersist } from "@/hooks/common";
import {
  useImportRequestA4Actions,
  useImportRequestA4List,
} from "@/hooks/importRequestA4";
import type { ImportRequestListItem } from "@/types/app/importRequestA4";
import ListHeader from "./ListHeader";
import ListSearchCard from "./ListSearchCard";
import ListResultCard from "./ListResultCard";
import { DEFAULT_FILTERS, LIST_STORAGE_KEY } from "./ImportRequestA4List.config";

type Filters = Record<string, string>;

export default function ImportRequestA4ListContent() {
  const router = useRouter();
  const { message, modal } = App.useApp();
  const { filterValues, persist } = useSearchPersist<Filters>(
    LIST_STORAGE_KEY,
    { ...DEFAULT_FILTERS },
  );
  const { items, total, isLoading } = useImportRequestA4List(filterValues);
  const { deleteRequest, resetDemoData, isResetting } =
    useImportRequestA4Actions();
  const [deletingKey, setDeletingKey] = React.useState<string>();

  const handleDelete = (row: ImportRequestListItem) => {
    modal.confirm({
      title: "ต้องการลบคำขอนี้หรือไม่",
      content: `เลขที่อ้างอิง ${row.referenceNo}`,
      okText: "ลบคำขอ",
      okButtonProps: { danger: true },
      cancelText: "ยกเลิก",
      onOk: async () => {
        setDeletingKey(row.key);
        try {
          await deleteRequest(row.key);
          message.success("ลบคำขอแล้ว");
        } finally {
          setDeletingKey(undefined);
        }
      },
    });
  };

  // The demo writes to localStorage, so it needs a way back to the fixtures.
  const handleReset = () => {
    modal.confirm({
      title: "รีเซ็ตข้อมูลเดโมทั้งหมด",
      content: "คำขอที่สร้างหรือแก้ไขไว้จะหายทั้งหมด และกลับไปเป็นชุดตั้งต้น",
      okText: "รีเซ็ต",
      okButtonProps: { danger: true },
      cancelText: "ยกเลิก",
      onOk: async () => {
        await resetDemoData();
        message.success("รีเซ็ตข้อมูลเดโมแล้ว");
      },
    });
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <ListHeader
        onCreate={() => router.push("/request/import-weapon-a4/create")}
        onResetDemo={handleReset}
        resetting={isResetting}
      />
      <ListSearchCard
        filters={filterValues}
        onSearch={(next) => persist("", next)}
      />
      <ListResultCard
        items={items}
        total={total}
        loading={isLoading}
        onDelete={handleDelete}
        deletingKey={deletingKey}
      />
    </div>
  );
}
