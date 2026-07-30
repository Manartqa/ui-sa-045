import type { ReactNode } from "react";

export type RequestStatus =
  | "CREATED"
  | "PENDING_REVIEW"
  | "SUBMITTED"
  | "RECEIVED"
  | "PRESENTED"
  | "APPROVED"
  | "PAID"
  | "REJECTED"
  | "RETURNED";

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

/** A row on the อ.4 request list screen. */
export interface ImportRequestListItem {
  key: string;
  order: number;
  referenceNo: string;
  receiveNo: string;
  receiveDate: string;
  requestNo: string;
  requestDate: string;
  operator: string;
  status: RequestStatus;
  permitNo: string;
  approvedDate: string;
  expireDate: string;
  /** Whether the issued permit PDF is available for download. */
  hasPermitFile: boolean;
}

export interface ImportRequestListParams {
  searchBy?: string;
  keyword?: string;
  status?: string;
  page?: number;
  pageSize?: number;
}

export interface ImportRequestListResult {
  items: ImportRequestListItem[];
  total: number;
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
