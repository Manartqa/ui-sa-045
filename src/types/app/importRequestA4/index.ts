import type { ReactNode } from "react";

export type RequestStatus = "CREATED" | "PENDING_REVIEW";

export interface StepItem {
  no: string;
  label: string;
}

export interface InfoFieldItem {
  label: string;
  value: ReactNode;
  /** antd Col span on md+ screens (24-grid). Defaults handled by the renderer. */
  span?: number;
}

export interface WeaponItem {
  key: string;
  order: number;
  code: string;
  group: string;
  name: string;
  detail: string;
  amount: string;
  previousPermitNo: string;
  status: RequestStatus;
}

export interface PermitItem {
  key: string;
  order: number;
  documentNo: string;
  approvedDate: string;
  status: RequestStatus;
}

export interface EvidenceDocumentItem {
  key: string;
  order: number;
  name: string;
  documentDate: string;
  expireDate: string;
  issuePlace: string;
  status: RequestStatus;
}

export interface ActionHistoryItem {
  key: string;
  order: number;
  dateTime: string;
  createdBy: string;
  userType: string;
  status: RequestStatus;
  detail: string;
}
