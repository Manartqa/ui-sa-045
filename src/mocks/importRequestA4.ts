import { sectionStatusOf } from "@/constant/requestWorkflow";
import type {
  ActionHistoryItem,
  ApplicantInfo,
  ApplicationFormInfo,
  EvidenceDocumentItem,
  FactoryInfo,
  ImportRequestRecord,
  OfficeInfo,
  PermitItem,
  PersonAddress,
  PersonItem,
  RegistrationInfo,
  RequestStatus,
  UploadDocumentItem,
  WeaponCatalogItem,
  WeaponItem,
} from "@/types/app/importRequestA4";

export const IMPORT_REQUEST_OPERATOR = "บริษัท อาวุธ สมาร์ท โซลูชั่น จำกัด";

/** Total across all pages, as shown in the design's pagination. */
export const IMPORT_REQUEST_TOTAL = 200;

/* ------------------------------------------------------------------ seeds */

/**
 * Header rows copied from the Figma list example (node 4410:156324). The
 * `order` values are the record numbers shown there, not the row index — hence
 * the repeated 5 and the jump to 9.
 */
type SeedHeader = Pick<
  ImportRequestRecord,
  | "id"
  | "order"
  | "referenceNo"
  | "receiveNo"
  | "receiveDate"
  | "requestNo"
  | "requestDate"
  | "operator"
  | "status"
  | "permitNo"
  | "approvedDate"
  | "expireDate"
  | "hasPermitFile"
>;

const SEED_HEADERS: SeedHeader[] = [
  {
    id: "1",
    order: 1,
    referenceNo: "PE000171",
    receiveNo: "อ00100/2568",
    receiveDate: "",
    requestNo: "",
    requestDate: "12/02/2568",
    operator: IMPORT_REQUEST_OPERATOR,
    status: "SUBMITTED",
    permitNo: "",
    approvedDate: "",
    expireDate: "",
    hasPermitFile: false,
  },
  {
    id: "2",
    order: 2,
    referenceNo: "PE000172",
    receiveNo: "อ00101/2568",
    receiveDate: "02/02/2568",
    requestNo: "21/2568",
    requestDate: "12/02/2568",
    operator: IMPORT_REQUEST_OPERATOR,
    status: "RECEIVED",
    permitNo: "",
    approvedDate: "",
    expireDate: "",
    hasPermitFile: false,
  },
  {
    id: "3",
    order: 3,
    referenceNo: "PE000173",
    receiveNo: "อ00102/2568",
    receiveDate: "02/02/2568",
    requestNo: "22/2568",
    requestDate: "12/02/2568",
    operator: IMPORT_REQUEST_OPERATOR,
    status: "UNDER_REVIEW",
    permitNo: "",
    approvedDate: "",
    expireDate: "",
    hasPermitFile: false,
  },
  {
    id: "4",
    order: 4,
    referenceNo: "PE000174",
    receiveNo: "อ00103/2568",
    receiveDate: "02/02/2568",
    requestNo: "23/2568",
    requestDate: "12/02/2568",
    operator: IMPORT_REQUEST_OPERATOR,
    status: "APPROVED",
    permitNo: "1/2569",
    approvedDate: "12/02/2568",
    expireDate: "12/02/2569",
    hasPermitFile: false,
  },
  {
    id: "5",
    order: 5,
    referenceNo: "PE000175",
    receiveNo: "อ00104/2568",
    receiveDate: "02/02/2568",
    requestNo: "24/2568",
    requestDate: "12/02/2568",
    operator: IMPORT_REQUEST_OPERATOR,
    status: "PAID",
    permitNo: "2/2569",
    approvedDate: "12/02/2568",
    expireDate: "12/02/2569",
    hasPermitFile: true,
  },
  {
    id: "6",
    order: 5,
    referenceNo: "PE000175",
    receiveNo: "อ00104/2568",
    receiveDate: "02/02/2568",
    requestNo: "25/2568",
    requestDate: "12/02/2568",
    operator: IMPORT_REQUEST_OPERATOR,
    status: "REJECTED",
    permitNo: "",
    approvedDate: "",
    expireDate: "",
    hasPermitFile: false,
  },
  {
    id: "7",
    order: 9,
    referenceNo: "PE000179",
    receiveNo: "อ00108/2568",
    receiveDate: "",
    requestNo: "",
    requestDate: "12/02/2568",
    operator: IMPORT_REQUEST_OPERATOR,
    status: "RETURNED",
    permitNo: "",
    approvedDate: "",
    expireDate: "",
    hasPermitFile: false,
  },
  {
    id: "8",
    order: 10,
    referenceNo: "PE000180",
    receiveNo: "อ00109/2568",
    receiveDate: "",
    requestNo: "",
    requestDate: "12/02/2568",
    operator: "บริษัท อาวุธ สมาร์ท 2 จำกัด",
    status: "CREATED",
    permitNo: "",
    approvedDate: "",
    expireDate: "",
    hasPermitFile: false,
  },
];

/** How many requests ship with the demo — anything beyond this was added. */
export const IMPORT_REQUEST_SEED_COUNT = SEED_HEADERS.length;

/** Detail fixtures, shared by every seeded request (Figma node 4025:190442). */
export const SEED_FORM: ApplicationFormInfo = {
  writtenAt: IMPORT_REQUEST_OPERATOR,
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

export const SEED_OFFICE: OfficeInfo = {
  taxId: "011554900750810",
  companyName: IMPORT_REQUEST_OPERATOR,
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

export const SEED_REGISTRATION: RegistrationInfo = {
  juristicNo: "01155490075081",
  registeredCapital: "1,000,000",
  registeredDate: "18/07/2569",
  registeredPlace: "สำนักงานทะเบียนหุ้นส่วนบริษัทจังหวัดราชบุรี",
  registeredProvince: "ราชบุรี",
};

export const SEED_FACTORY: FactoryInfo = {
  name: IMPORT_REQUEST_OPERATOR,
  areaRai: "14/01/2569",
  areaNgan: "1/2569",
  areaSqWa: "14/01/2569",
  latitude: "13.2017461",
  longitude: "101.2523792",
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
  fax: "032-206461",
  email: "Manart.pa@smartalliance.co.th",
  registrationNo: "-",
  machinePower: "0.000",
  operatingPermitNo: "ป.018/2549",
  operatingPermitDate: "16/02/2549",
  placeDetail: "-",
};

export const SEED_APPLICANT: ApplicantInfo = {
  prefix: "จ.ส.อ.",
  firstName: "ปวิน",
  lastName: "ภูภาค",
  position: "กรรมการและรองผู้ช่วยผู้จัดการ",
};

const ADDRESS: PersonAddress = {
  addressNo: "119",
  moo: "13",
  building: "-",
  soi: "-",
  road: "-",
  province: "ราชบุรี",
  district: "จอมบึง",
  subDistrict: "จอมบึง",
  postcode: "70110",
};

function person(
  key: string,
  order: number,
  role: PersonItem["role"],
  prefix: string,
  firstName: string,
  lastName: string,
  idCardNo: string,
): PersonItem {
  return {
    key,
    order,
    role,
    prefix,
    firstName,
    middleName: "-",
    lastName,
    position: "กรรมการและรองผู้ช่วยผู้จัดการ",
    signerStatus: "ผู้มีอำนาจลงนาม, กรรมการผู้จัดการ",
    idCardType: "บัตรประจำตัวประชาชน",
    idCardNo,
    idIssueDate: "31/05/2558",
    idExpireDate: "04/08/2566",
    birthDate: "-",
    nationality: "ไทย",
    idProvince: "ราชบุรี",
    idIssuePlace: "บ้านโป่ง",
    phone: "0830979118",
    email: "test@email.com",
    addressByCard: ADDRESS,
    addressByHousehold: ADDRESS,
    status: "PENDING_REVIEW",
  };
}

/** Attached to the request out of the box — one of each role, as in Figma. */
const SEED_PERSONS: PersonItem[] = [
  person("p1", 1, "SIGNER", "นาง", "เพลกฤต", "รัตนเศรษฐา", "1888922048123"),
  person("p2", 1, "ATTORNEY", "นาย", "ธนกร", "ศรีอุตสาหกรรม", "1888922048124"),
];

/**
 * The pool the picker modals list — "รายชื่อผู้มีอำนาจลงนาม / ผู้รับมอบอำนาจ",
 * five rows each in the design.
 */
export const PERSON_DIRECTORY: PersonItem[] = [
  ...SEED_PERSONS,
  person("p3", 2, "SIGNER", "นาย", "สมชาย", "ใจดี", "1888922048125"),
  person("p4", 3, "SIGNER", "นางสาว", "ปรียา", "วงศ์ทอง", "1888922048126"),
  person("p5", 4, "SIGNER", "นาย", "อนันต์", "พูลสวัสดิ์", "1888922048127"),
  person("p6", 5, "SIGNER", "นาง", "วิภา", "มั่นคง", "1888922048128"),
  person("p7", 2, "ATTORNEY", "นาย", "กิตติ", "แสงเดือน", "1888922048129"),
  person("p8", 3, "ATTORNEY", "นางสาว", "ศิริพร", "ทองดี", "1888922048130"),
  person("p9", 4, "ATTORNEY", "นาย", "ประเสริฐ", "ชัยมงคล", "1888922048131"),
  person("p10", 5, "ATTORNEY", "นาง", "อารีย์", "สุขใจ", "1888922048132"),
];

/** แท็บอัพโหลดเอกสาร — 3 office rows, 3 factory rows, 1 person row. */
export const SEED_UPLOADS: UploadDocumentItem[] = [
  {
    key: "u1",
    order: 1,
    group: "OFFICE",
    name: "*สำเนาหนังสือรับรองการจดทะเบียนเป็นนิติบุคคลของบริษัทผู้ยืนขออนุญาต (วัน เดือน ปี ที่ออกไม่เกิน 6 เดือน)",
    fileName: "",
    documentDate: "01/01/2569",
    expireDate: "04/01/2572",
    status: "PENDING_REVIEW",
  },
  {
    key: "u2",
    order: 2,
    group: "OFFICE",
    name: "*สำเนาบัตรประจำตัวผู้เสียภาษีของนิติบุคคล",
    fileName: "",
    documentDate: "01/01/2569",
    expireDate: "04/01/2572",
    status: "PENDING_REVIEW",
  },
  {
    key: "u3",
    order: 3,
    group: "OFFICE",
    name: "*ทะเบียนภาษีมูลค่าเพิ่ม (ภ.พ. 20)",
    fileName: "",
    documentDate: "01/01/2569",
    expireDate: "04/01/2572",
    status: "PENDING_REVIEW",
  },
  {
    key: "u4",
    order: 1,
    group: "FACTORY",
    name: "*สำเนาใบอนุญาตประกอบกิจการโรงงาน (ร.ง.4)",
    fileName: "",
    documentDate: "16/02/2549",
    expireDate: "-",
    status: "PENDING_REVIEW",
  },
  {
    key: "u5",
    order: 2,
    group: "FACTORY",
    name: "*แผนที่ตั้งโรงงานและสถานที่จัดเก็บวัตถุหรืออาวุธ",
    fileName: "",
    documentDate: "-",
    expireDate: "-",
    status: "PENDING_REVIEW",
  },
  {
    key: "u6",
    order: 3,
    group: "FACTORY",
    name: "ใบแสดงรายการสินค้า และใบสั่งซื้อ",
    fileName: "",
    documentDate: "-",
    expireDate: "-",
    status: "PENDING_REVIEW",
  },
  {
    key: "u7",
    order: 1,
    group: "PERSON",
    name: "*สำเนาบัตรประจำตัวประชาชนของผู้มีอำนาจลงนาม",
    fileName: "",
    documentDate: "31/05/2558",
    expireDate: "04/08/2566",
    status: "PENDING_REVIEW",
  },
];

/**
 * The อาวุธ/วัตถุดิบ catalogue the form modal's "ข้อมูลอาวุธ/วัตถุดิบ" select
 * lists. Picking one fills รหัส / ประเภท / ประเภทการใช้งาน / รายละเอียด
 * read-only, and seeds กลุ่ม and ชื่อ — which the operator may then override.
 */
export const WEAPON_CATALOG: WeaponCatalogItem[] = [
  {
    key: "c1",
    code: "P-0007",
    weaponType: "เชื้อปะทุ",
    usageType: "ใช้ในการผลิต",
    group: "เชื้อปะทุ",
    name: "แบบ DAVEY QUICK",
    detail: "เชื้อปะทุ แบบ DAVEY QUICK",
  },
  {
    key: "c2",
    code: "P-0012",
    weaponType: "ดินส่งกระสุน",
    usageType: "ใช้ในการผลิต",
    group: "ดินส่งกระสุน",
    name: "แบบ SINGLE BASE",
    detail: "ดินส่งกระสุน แบบ SINGLE BASE ชนิดแท่ง",
  },
  {
    key: "c3",
    code: "P-0021",
    weaponType: "ปลอกกระสุน",
    usageType: "ใช้ในการผลิต",
    group: "ปลอกกระสุน",
    name: "ขนาด 9 มม.",
    detail: "ปลอกกระสุนทองเหลือง ขนาด 9 มม.",
  },
  {
    key: "c4",
    code: "P-0034",
    weaponType: "หัวกระสุน",
    usageType: "ใช้เพื่อจำหน่าย",
    group: "หัวกระสุน",
    name: "ขนาด .223 REM",
    detail: "หัวกระสุนหุ้มทองแดง ขนาด .223 REM",
  },
  {
    key: "c5",
    code: "P-0045",
    weaponType: "เชื้อปะทุ",
    usageType: "ใช้ในการผลิต",
    group: "เชื้อปะทุ",
    name: "แบบ NONEL",
    detail: "เชื้อปะทุไฟฟ้า แบบ NONEL",
  },
];

/** Option lists the weapon form modal renders — served with the catalogue. */
export const WEAPON_UNITS = ["อัน", "กล่อง", "กิโลกรัม", "กรัม", "นัด"];

export const WEAPON_IMPORT_METHODS = [
  "นำเข้าโดยตรง",
  "นำเข้าผ่านตัวแทนจำหน่าย",
  "นำเข้าเพื่อทดสอบ",
];

export const WEAPON_COUNTRIES = [
  "สหรัฐอเมริกา",
  "เยอรมนี",
  "ญี่ปุ่น",
  "สาธารณรัฐเกาหลี",
  "อิตาลี",
];

const SEED_WEAPONS: WeaponItem[] = [
  {
    key: "w1",
    order: 1,
    code: "P-0007",
    group: "เชื้อปะทุ",
    name: "แบบ DAVEY QUICK",
    detail: "เชื้อปะทุ แบบ DAVEY QUICK",
    amount: "1.00 อัน หรือ 1.00 อัน",
    previousPermitNo: "4/2569, 07/05/2569",
    status: "PENDING_REVIEW",
    weaponType: "เชื้อปะทุ",
    usageType: "ใช้ในการผลิต",
    catalogGroup: "เชื้อปะทุ",
    catalogName: "แบบ DAVEY QUICK",
    quantity: "1.00",
    unit: "อัน",
    quantity2: "1.00",
    unit2: "อัน",
    importMethod: "นำเข้าโดยตรง",
    importChannels: ["นำเข้าทางเรือ"],
    manufacturers: [
      { key: "m1", order: 1, name: "DAVEY BICKFORD", country: "สหรัฐอเมริกา" },
    ],
    packingMethod: "ตามมาตรฐานของบริษัทผู้ผลิต",
    storagePlace: "คลังเก็บวัตถุระเบิด อาคาร 2",
    previousPermits: [
      {
        key: "pp1",
        documentNo: "01/2569",
        approvedDate: "01/07/2569",
        expireDate: "31/12/2569",
        approvedAmount: "500.0001",
        importedAmount: "400.0001",
        unit: "กิโลกรัม",
      },
      {
        key: "pp2",
        documentNo: "02/2569",
        approvedDate: "05/07/2569",
        expireDate: "31/12/2569",
        approvedAmount: "500.0002",
        importedAmount: "250.0005",
        unit: "กิโลกรัม",
      },
    ],
    documentNo: "",
    documentApprovedDate: "",
    documentExpireDate: "",
    documentFileName: "",
  },
];

const SEED_PERMITS: PermitItem[] = [];

/** The pool the permit ค้นหา modal lists — issued อ.6 books on file. */
export const PERMIT_DIRECTORY: PermitItem[] = [
  {
    key: "pd1",
    order: 1,
    documentNo: "อ.6 12/2568",
    approvedDate: "14/01/2569",
    status: "APPROVED",
    fileName: "permit-12-2568.pdf",
  },
  {
    key: "pd2",
    order: 2,
    documentNo: "อ.6 27/2568",
    approvedDate: "02/03/2569",
    status: "APPROVED",
    fileName: "permit-27-2568.pdf",
  },
  {
    key: "pd3",
    order: 3,
    documentNo: "อ.6 41/2568",
    approvedDate: "19/05/2569",
    status: "APPROVED",
    fileName: "permit-41-2568.pdf",
  },
];

const SEED_DOCUMENTS: EvidenceDocumentItem[] = [
  {
    key: "d1",
    order: 1,
    name: "*สำเนาหนังสือรับรองการจดทะเบียนเป็นนิติบุคคลของบริษัทผู้ยืนขออนุญาต (วัน เดือน ปี ที่ออกไม่เกิน 6 เดือน)",
    documentDate: "01/01/2569",
    expireDate: "04/01/2572",
    issuePlace: "",
    status: "PENDING_REVIEW",
    fileName: "",
  },
  {
    key: "d2",
    order: 2,
    name: "*สำเนาบัตรประจำตัวผู้เสียภาษีของนิติบุคคล",
    documentDate: "01/01/2569",
    expireDate: "04/01/2572",
    issuePlace: "",
    status: "PENDING_REVIEW",
    fileName: "",
  },
  {
    key: "d3",
    order: 3,
    name: "*ทะเบียนภาษีมูลค่าเพิ่ม (ภ.พ. 20)",
    documentDate: "01/01/2569",
    expireDate: "04/01/2572",
    issuePlace: "",
    status: "PENDING_REVIEW",
    fileName: "",
  },
];

/**
 * The route a request took to reach a seeded status. A seeded record has to
 * read like one that was walked through the app — a RECEIVED request whose log
 * jumps straight from สร้างคำขอ to รับเรื่อง would contradict the stepper.
 */
const OPERATOR_ACTOR = { createdBy: "ปวิน ภูภาค", userType: "ผู้ประกอบการ" };
const OFFICER_ACTOR = {
  createdBy: "เจ้าหน้าที่แผนกหนังสืออนุญาต",
  userType: "เจ้าหน้าที่",
};

type SeedStep = { status: RequestStatus; detail: string; officer?: boolean };

const SEED_PATH: SeedStep[] = [
  { status: "CREATED", detail: "สร้างคำขอ" },
  { status: "SUBMITTED", detail: "ยื่นคำขอ" },
  { status: "RECEIVED", detail: "รับเรื่อง", officer: true },
  { status: "UNDER_REVIEW", detail: "นำเรียนพิจารณา", officer: true },
  { status: "APPROVED", detail: "อนุมัติคำขอ", officer: true },
  { status: "AWAITING_PERMIT_FEE", detail: "แจ้งชำระค่าหนังสืออนุญาต", officer: true },
  { status: "PAID", detail: "ชำระค่าหนังสืออนุญาต" },
];

function seedHistory(status: RequestStatus): ActionHistoryItem[] {
  // Off-path endings branch from the step before them rather than continuing.
  const endings: Partial<Record<RequestStatus, SeedStep>> = {
    RETURNED: { status: "RETURNED", detail: "ตีกลับคำขอให้แก้ไข", officer: true },
    REJECTED: { status: "REJECTED", detail: "ไม่อนุมัติคำขอ", officer: true },
  };

  const ending = endings[status];
  const upto = ending
    ? SEED_PATH.slice(0, status === "REJECTED" ? 4 : 2)
    : SEED_PATH.slice(0, SEED_PATH.findIndex((s) => s.status === status) + 1);

  return [...upto, ...(ending ? [ending] : [])].map((step, index) => ({
    key: `h${index + 1}`,
    order: index + 1,
    // 16/02 22:16 for the first entry, then a step a day.
    dateTime: `${String(16 + index).padStart(2, "0")}/02/2569 ${index === 0 ? "22:16" : "09:30"}`,
    ...(step.officer ? OFFICER_ACTOR : OPERATOR_ACTOR),
    status: step.status,
    detail: step.detail,
  }));
}

function buildSeedRecords(): ImportRequestRecord[] {
  return SEED_HEADERS.map((header) => {
    // A seeded request's rows must already read the way its status implies —
    // an already-received request cannot show รอตรวจสอบ on every section.
    const rowStatus = sectionStatusOf(header.status);

    return {
      ...header,
      createdAt: "2026-02-16T22:16:00",
      updatedAt: "2026-02-16T22:54:00",
      form: SEED_FORM,
      office: SEED_OFFICE,
      registration: SEED_REGISTRATION,
      factory: SEED_FACTORY,
      factorySynced: false,
      applicant: SEED_APPLICANT,
      persons: SEED_PERSONS.map((p) => ({ ...p, status: rowStatus })),
      uploads: SEED_UPLOADS.map((u) => ({ ...u, status: rowStatus })),
      weapons: SEED_WEAPONS.map((w) => ({ ...w, status: rowStatus })),
      permits: SEED_PERMITS.map((p) => ({ ...p, status: rowStatus })),
      documents: SEED_DOCUMENTS.map((d) => ({ ...d, status: rowStatus })),
      history: seedHistory(header.status),
    };
  });
}

/* ------------------------------------------------------------------ store */

/**
 * The demo's stand-in for a database. There is no backend, so records live in
 * `localStorage`: edits survive a reload and a browser restart, which is what
 * a demo needs, and `resetRecords()` puts the seeds back.
 *
 * Bump the key when the record shape changes — an old payload would otherwise
 * be read back into the new type.
 */
const RECORDS_KEY = "sa045.importRequestA4.records.v3";

function readStore(): ImportRequestRecord[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(RECORDS_KEY);
    return raw ? (JSON.parse(raw) as ImportRequestRecord[]) : null;
  } catch {
    return null;
  }
}

function writeStore(records: ImportRequestRecord[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(RECORDS_KEY, JSON.stringify(records));
}

/** Every request, seeded on first read. Server renders always see the seeds. */
export function getRecords(): ImportRequestRecord[] {
  const stored = readStore();
  if (stored) return stored;
  const seeds = buildSeedRecords();
  writeStore(seeds);
  return seeds;
}

export function getRecord(id: string): ImportRequestRecord | undefined {
  return getRecords().find((r) => r.id === id);
}

export function addRecord(record: ImportRequestRecord): ImportRequestRecord {
  writeStore([...getRecords(), record]);
  return record;
}

/** Replaces one record in place; unknown ids are a no-op. */
export function saveRecord(record: ImportRequestRecord): ImportRequestRecord {
  writeStore(getRecords().map((r) => (r.id === record.id ? record : r)));
  return record;
}

export function removeRecord(id: string) {
  writeStore(getRecords().filter((r) => r.id !== id));
}

/** Back to the Figma fixtures — everything the demo added is discarded. */
export function resetRecords(): ImportRequestRecord[] {
  const seeds = buildSeedRecords();
  writeStore(seeds);
  return seeds;
}

/** Next id / running reference number, continuing after the seeded ones. */
export function nextRecordKeys() {
  const records = getRecords();
  const maxRef = records.reduce((acc, r) => {
    const n = Number(r.referenceNo.replace(/\D/g, ""));
    return Number.isFinite(n) ? Math.max(acc, n) : acc;
  }, 0);
  const maxOrder = records.reduce((acc, r) => Math.max(acc, r.order), 0);
  return {
    id: `req-${maxOrder + 1}`,
    order: maxOrder + 1,
    referenceNo: `PE${String(maxRef + 1).padStart(6, "0")}`,
  };
}
