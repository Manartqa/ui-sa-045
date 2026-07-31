import type { ReactNode } from "react";

/**
 * Every status the request lifecycle can be in, plus `PENDING_REVIEW` and
 * `VERIFIED`, which only ever label a *row* inside the request (a weapon line,
 * a document) — never the request itself. They are the two states the design
 * shows on every section: รอตรวจสอบ before an officer takes the request in,
 * ถูกต้อง after. `constant/requestStatus.ts` is the single place that maps
 * these to a label, a colour and a step.
 */
export type RequestStatus =
  | "CREATED"
  | "PENDING_REVIEW"
  | "VERIFIED"
  | "SUBMITTED"
  | "RECEIVED"
  | "AWAITING_REQUEST_FEE"
  | "REQUEST_FEE_PAID"
  | "UNDER_REVIEW"
  | "APPROVED"
  | "REJECTED"
  | "AWAITING_PERMIT_FEE"
  | "PAID"
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

/** One row of the ผู้ผลิต/ประเทศ sub-table inside the weapon form modal. */
export interface WeaponManufacturerItem {
  key: string;
  order: number;
  name: string;
  country: string;
}

/** A previously issued อ.8 line, shown in the per-weapon quota modal. */
export interface WeaponPreviousPermit {
  key: string;
  documentNo: string;
  approvedDate: string;
  expireDate: string;
  approvedAmount: string;
  importedAmount: string;
  unit: string;
}

/** An entry in the อาวุธ/วัตถุดิบ catalogue the form modal picks from. */
export interface WeaponCatalogItem {
  key: string;
  code: string;
  weaponType: string;
  usageType: string;
  group: string;
  name: string;
  detail: string;
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
  weaponType: string;
  usageType: string;
  /**
   * What the catalogue said when this row was picked. กลุ่ม and ชื่อ stay
   * editable afterwards, so a diff against these two is the row's "edited"
   * marker — it drives both the red cell in the table and the "ชื่อเดิม :"
   * hint in the form. Keeping the original instead of a boolean means the
   * form can name the value that was replaced.
   */
  catalogGroup: string;
  catalogName: string;
  quantity: string;
  unit: string;
  quantity2: string;
  unit2: string;
  importMethod: string;
  /** นำเข้าทางเรือ / รถยนต์ / เครื่องบิน — more than one is allowed. */
  importChannels: string[];
  manufacturers: WeaponManufacturerItem[];
  packingMethod: string;
  storagePlace: string;
  previousPermits: WeaponPreviousPermit[];
  /** จัดการเอกสาร — the อ.8 evidence attached to this line. */
  documentNo: string;
  documentApprovedDate: string;
  documentExpireDate: string;
  documentFileName: string;
}

/** True when the row's กลุ่ม/ชื่อ no longer matches the catalogue entry. */
export function isWeaponGroupEdited(item: WeaponItem): boolean {
  return Boolean(item.catalogGroup) && item.group !== item.catalogGroup;
}

export function isWeaponNameEdited(item: WeaponItem): boolean {
  return Boolean(item.catalogName) && item.name !== item.catalogName;
}

export interface PermitItem {
  key: string;
  order: number;
  documentNo: string;
  approvedDate: string;
  status: RequestStatus;
  /** Empty until a file is attached — gates the ดูหลักฐาน button. */
  fileName: string;
}

export interface EvidenceDocumentItem {
  key: string;
  order: number;
  name: string;
  documentDate: string;
  expireDate: string;
  issuePlace: string;
  status: RequestStatus;
  fileName: string;
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

/** What the อ.4 create form submits. Dates are ISO (`YYYY-MM-DD`, ค.ศ.). */
export interface ImportRequestCreatePayload {
  referencePermitNo: string;
  permitDate: string;
  expireDate: string;
  writtenAt?: string;
  requestFor: string[];
  useFor: string[];
  purpose: string;
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

export interface ApplicationFormInfo {
  writtenAt: string;
  referencePermitNo: string;
  permitDate: string;
  permitExpireDate: string;
  purposeA2: string;
  weaponTypeA2: string;
  renewalStatusA2: string;
  requestFor: string;
  useFor: string;
  requestPurpose: string;
}

export interface OfficeInfo {
  taxId: string;
  companyName: string;
  branch: string;
  addressNo: string;
  moo: string;
  building: string;
  soi: string;
  road: string;
  province: string;
  district: string;
  subDistrict: string;
  postcode: string;
  phone: string;
  email: string;
  fax: string;
}

export interface RegistrationInfo {
  juristicNo: string;
  registeredCapital: string;
  registeredDate: string;
  registeredPlace: string;
  registeredProvince: string;
}

/** แท็บข้อมูลโรงงาน — mirrored from Commercial, editable after a sync. */
export interface FactoryInfo {
  name: string;
  areaRai: string;
  areaNgan: string;
  areaSqWa: string;
  latitude: string;
  longitude: string;
  addressNo: string;
  moo: string;
  building: string;
  soi: string;
  road: string;
  province: string;
  district: string;
  subDistrict: string;
  postcode: string;
  phone: string;
  fax: string;
  email: string;
  registrationNo: string;
  machinePower: string;
  operatingPermitNo: string;
  operatingPermitDate: string;
  placeDetail: string;
}

export interface PersonAddress {
  addressNo: string;
  moo: string;
  building: string;
  soi: string;
  road: string;
  province: string;
  district: string;
  subDistrict: string;
  postcode: string;
}

/** A person attached to the request, or a candidate in the picker modals. */
export interface PersonItem {
  key: string;
  order: number;
  role: "SIGNER" | "ATTORNEY";
  prefix: string;
  firstName: string;
  middleName: string;
  lastName: string;
  position: string;
  signerStatus: string;
  idCardType: string;
  idCardNo: string;
  idIssueDate: string;
  idExpireDate: string;
  birthDate: string;
  nationality: string;
  idProvince: string;
  idIssuePlace: string;
  phone: string;
  email: string;
  addressByCard: PersonAddress;
  addressByHousehold: PersonAddress;
  status: RequestStatus;
}

/** ผู้ยื่นคำขอ — the four fields shown under the person tables. */
export interface ApplicantInfo {
  prefix: string;
  firstName: string;
  lastName: string;
  position: string;
}

/** แท็บอัพโหลดเอกสาร groups its rows under three headings. */
export type UploadDocumentGroup = "OFFICE" | "FACTORY" | "PERSON";

export interface UploadDocumentItem {
  key: string;
  order: number;
  group: UploadDocumentGroup;
  name: string;
  fileName: string;
  documentDate: string;
  expireDate: string;
  status: RequestStatus;
}

/**
 * One whole request. The list screen shows a projection of the header fields;
 * the detail screen reads the rest. Dates are display strings (พ.ศ.) because
 * that is what both screens render — `createdAt`/`updatedAt` are ISO so they
 * can be sorted and formatted.
 */
export interface ImportRequestRecord {
  id: string;
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
  hasPermitFile: boolean;
  createdAt: string;
  updatedAt: string;
  form: ApplicationFormInfo;
  office: OfficeInfo;
  registration: RegistrationInfo;
  factory: FactoryInfo;
  /** True once ข้อมูลโรงงาน has been pulled from Commercial in this session. */
  factorySynced: boolean;
  applicant: ApplicantInfo;
  persons: PersonItem[];
  uploads: UploadDocumentItem[];
  weapons: WeaponItem[];
  permits: PermitItem[];
  documents: EvidenceDocumentItem[];
  history: ActionHistoryItem[];
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
