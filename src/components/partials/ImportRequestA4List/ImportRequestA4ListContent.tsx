"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSearchPersist } from "@/hooks/common";
import { useImportRequestA4List } from "@/hooks/importRequestA4";
import ListHeader from "./ListHeader";
import ListSearchCard from "./ListSearchCard";
import ListResultCard from "./ListResultCard";
import { DEFAULT_FILTERS, LIST_STORAGE_KEY } from "./ImportRequestA4List.config";

type Filters = Record<string, string>;

export default function ImportRequestA4ListContent() {
  const router = useRouter();
  const { filterValues, persist } = useSearchPersist<Filters>(
    LIST_STORAGE_KEY,
    { ...DEFAULT_FILTERS },
  );
  const { items, total, isLoading } = useImportRequestA4List(filterValues);

  return (
    <div className="flex w-full flex-col gap-6">
      <ListHeader
        onCreate={() => router.push("/request/import-weapon-a4/create")}
      />
      <ListSearchCard
        filters={filterValues}
        onSearch={(next) => persist("", next)}
      />
      <ListResultCard items={items} total={total} loading={isLoading} />
    </div>
  );
}
