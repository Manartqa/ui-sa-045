"use client";

import React from "react";
import { Empty, Skeleton } from "antd";
import { useImportRequestA4Detail } from "@/hooks/importRequestA4";
import RequestHeader from "./RequestHeader";
import RequestSteps from "./RequestSteps";
import ReferenceCard from "./ReferenceCard";
import RequestFormTab from "./RequestFormTab";
import ActionHistoryTable from "./ActionHistoryTable";
import FooterActions from "./FooterActions";

interface ImportRequestA4ContentProps {
  /** Request id from the route. */
  id: string;
}

export default function ImportRequestA4Content({
  id,
}: ImportRequestA4ContentProps) {
  const { record, notFound, isLoading } = useImportRequestA4Detail(id);

  if (isLoading) {
    return <Skeleton active paragraph={{ rows: 8 }} />;
  }

  if (notFound || !record) {
    return <Empty description={`ไม่พบคำขอ (id: ${id})`} className="py-16" />;
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <RequestHeader record={record} />
      <RequestSteps status={record.status} />
      <ReferenceCard record={record} />
      <RequestFormTab record={record} />
      <ActionHistoryTable items={record.history} />
      <FooterActions record={record} />
    </div>
  );
}
