"use client";

import React from "react";
import RequestHeader from "./RequestHeader";
import RequestSteps from "./RequestSteps";
import ReferenceCard from "./ReferenceCard";
import RequestFormTab from "./RequestFormTab";
import WeaponsTable from "./WeaponsTable";
import PermitTable from "./PermitTable";
import DocumentsTable from "./DocumentsTable";
import ActionHistoryTable from "./ActionHistoryTable";
import FooterActions from "./FooterActions";

export default function ImportRequestA4Content() {
  return (
    <div className="flex w-full flex-col gap-6">
      <RequestHeader />
      <RequestSteps />
      <ReferenceCard />
      <RequestFormTab />
      <WeaponsTable />
      <PermitTable />
      <DocumentsTable />
      <ActionHistoryTable />
      <FooterActions />
    </div>
  );
}
