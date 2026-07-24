import type {
  ActionHistoryItem,
  EvidenceDocumentItem,
  StepItem,
  WeaponItem,
  PermitItem,
} from "@/types/app/importRequestA4";

export const PAGE_TITLE =
  "เพิ่มคําขออนุญาตสั่งหรือนําเข้ามาในราชอาณาจักรซึ่งวัตถุหรืออาวุธฯ แบบ อ.4";

export const BREADCRUMB_ITEMS = [
  { title: "ระบบคำขอ" },
  { title: "คําขออนุญาต" },
  {
    title: "คําขออนุญาตสั่งหรือนําเข้ามาในราชอาณาจักรซึ่งวัตถุหรืออาวุธฯ แบบ อ.4",
  },
];

export const REQUEST_META = {
  createdAt: "08/02/2569 20:25",
  updatedAt: "08/02/2569 20:54",
};

export const STEPS: StepItem[] = [
  { no: "01", label: "ยื่นคำขอ" },
  { no: "02", label: "รับเรื่อง" },
  { no: "03", label: "อยู่ระหว่างพิจารณา" },
  { no: "04", label: "อนุมัติ/ไม่อนุมัติ" },
  { no: "05", label: "ชำระค่าหนังสืออนุญาต" },
  { no: "06", label: "ออกหนังสืออนุญาต" },
];

export const ACTIVE_STEP_INDEX = 0;

export const REFERENCE_INFO = {
  referenceNo: "IM000000",
  receiveNo: "-",
  receiveDate: "-",
  requestNo: "-",
  requestDate: "-",
};

export const APPLICATION_FORM = {
  title: "คําขออนุญาตสั่งหรือนําเข้ามาในราชอาณาจักรซึ่งวัตถุหรืออาวุธฯ",
  writtenAt: "บริษัท อาวุธ สมาร์ท โซลูชั่น จำกัด",
  referencePermitNo: "1/2569",
  permitDate: "14/01/2569",
  permitExpireDate: "15/01/2569",
  purposeA2: "ทำอาวุธ",
  weaponTypeA2: "กระสุน",
  renewalStatusA2: "-",
  requestFor: "วัตถุ",
  useFor: "เพื่อใช้ในการผลิตอาวุธ",
  requestPurpose:
    "เพื่อนำเข้ามาจำหน่ายให้แก่หน่วยงานภาครัฐ หรือบุคคลที่ได้รับอนุญาตตามกฎหมาย โดยบริษัทฯ เป็นตัวแทนจำหน่ายอย่างเป็นทางการของ บริษัท อาวุธ สมาร์ท โซลูชั่น จำกัด เพื่อตอบสนองความต้องการในตลาดในประเทศและเสริมสร้างความมั่นคงภายในราชอาณาจักร",
};

export const OFFICE_INFO = {
  taxId: "011554900750810",
  companyName: "บริษัท อาวุธ สมาร์ท โซลูชั่น จำกัด",
  branch: "1",
  addressNo: "-",
  moo: "13",
  building: "-",
  soi: "-",
  road: "-",
  province: "ราชบุรี",
  district: "จอมบึง",
  subDistrict: "จอมบึง",
  postcode: "70110",
  phone: "032-206459",
  email: "Manart.pa@smartalliance.co.th",
  fax: "032-206461",
};

export const REGISTRATION_INFO = {
  juristicNo: "01155490075081",
  registeredCapital: "1,000,000",
  registeredDate: "18/07/2569",
  registeredPlace: "สำนักงานทะเบียนหุ้นส่วนบริษัทจังหวัดราชบุรี",
  registeredProvince: "ราชบุรี",
};

export const WEAPON_ITEMS: WeaponItem[] = [
  {
    key: "1",
    order: 1,
    code: "P-0007",
    group: "เชื้อปะทุ",
    name: "แบบ DAVEY QUICK",
    detail: "เชื้อปะทุ แบบ DAVEY QUICK",
    amount: "1.00 อัน หรือ 1.00 อัน",
    previousPermitNo: "4/2569, 07/05/2569",
    status: "PENDING_REVIEW",
  },
];

export const PERMIT_ITEMS: PermitItem[] = [];

export const EVIDENCE_DOCUMENTS: EvidenceDocumentItem[] = [
  {
    key: "1",
    order: 1,
    name: "*สำเนาหนังสือรับรองการจดทะเบียนเป็นนิติบุคคลของบริษัทผู้ยืนขออนุญาต (วัน เดือน ปี ที่ออกไม่เกิน 6 เดือน)",
    documentDate: "01/01/2569",
    expireDate: "04/01/2572",
    issuePlace: "",
    status: "PENDING_REVIEW",
  },
  {
    key: "2",
    order: 2,
    name: "*สำเนาบัตรประจำตัวผู้เสียภาษีของนิติบุคคล",
    documentDate: "01/01/2569",
    expireDate: "04/01/2572",
    issuePlace: "",
    status: "PENDING_REVIEW",
  },
  {
    key: "3",
    order: 3,
    name: "*ทะเบียนภาษีมูลค่าเพิ่ม (ภ.พ. 20)",
    documentDate: "01/01/2569",
    expireDate: "04/01/2572",
    issuePlace: "",
    status: "PENDING_REVIEW",
  },
];

export const ACTION_HISTORY: ActionHistoryItem[] = [
  {
    key: "1",
    order: 1,
    dateTime: "16/02/2569 22:16",
    createdBy: "ปวิน ภูภาค",
    userType: "ผู้ประกอบการ",
    status: "CREATED",
    detail: "",
  },
];
