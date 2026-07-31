import dayjs from "dayjs";
import { getSession } from "@/lib/auth";
import { sectionStatusOf } from "@/constant/requestWorkflow";
import { toThaiDate, toThaiDateTime } from "@/lib/date";
import type {
  ActionHistoryItem,
  ImportRequestCreatePayload,
  ImportRequestListItem,
  ImportRequestListParams,
  ImportRequestListResult,
  ImportRequestRecord,
  PermitItem,
  PersonItem,
  RequestStatus,
  WeaponCatalogItem,
} from "@/types/app/importRequestA4";
import {
  addRecord,
  getRecord,
  getRecords,
  PERMIT_DIRECTORY,
  WEAPON_CATALOG,
  WEAPON_COUNTRIES,
  WEAPON_IMPORT_METHODS,
  WEAPON_UNITS,
  IMPORT_REQUEST_OPERATOR,
  IMPORT_REQUEST_SEED_COUNT,
  IMPORT_REQUEST_TOTAL,
  nextRecordKeys,
  PERSON_DIRECTORY,
  removeRecord,
  resetRecords,
  saveRecord,
  SEED_APPLICANT,
  SEED_FACTORY,
  SEED_FORM,
  SEED_OFFICE,
  SEED_REGISTRATION,
  SEED_UPLOADS,
} from "@/mocks/importRequestA4";

/**
 * The อ.4 request store. There is no backend yet, so every function here works
 * against the mock records in `src/mocks/importRequestA4.ts`; each one carries
 * the real call it will become. Hooks and components never see the difference.
 */

/** Who the log says did this — the signed-in mock user. */
function currentActor() {
  const session = getSession();
  return {
    createdBy: session?.displayName ?? "ผู้ใช้งาน",
    userType: session?.roleLabel ?? "ผู้ประกอบการ",
  };
}

/**
 * Appends one line to a request's log and stamps `updatedAt`. Every mutation
 * goes through here — that is what keeps ประวัติการดำเนินการ honest.
 */
export function withHistory(
  record: ImportRequestRecord,
  entry: { status: RequestStatus; detail?: string },
): ImportRequestRecord {
  const now = dayjs();
  const item: ActionHistoryItem = {
    key: `h-${record.history.length + 1}-${now.valueOf()}`,
    order: record.history.length + 1,
    dateTime: toThaiDateTime(now.toISOString()),
    ...currentActor(),
    status: entry.status,
    detail: entry.detail ?? "",
  };
  return {
    ...record,
    updatedAt: now.toISOString(),
    history: [...record.history, item],
  };
}

const toListItem = (r: ImportRequestRecord): ImportRequestListItem => ({
  key: r.id,
  order: r.order,
  referenceNo: r.referenceNo,
  receiveNo: r.receiveNo,
  receiveDate: r.receiveDate,
  requestNo: r.requestNo,
  requestDate: r.requestDate,
  operator: r.operator,
  status: r.status,
  permitNo: r.permitNo,
  approvedDate: r.approvedDate,
  expireDate: r.expireDate,
  hasPermitFile: r.hasPermitFile,
});

/**
 * Returns the อ.4 request list.
 *
 *   const res = await getImportRequestA4ListApi(params);
 *   const page = res.data?.data;
 *   return {
 *     items: (page?.content ?? []).map(toImportRequestListItem),
 *     total: page?.totalElements ?? 0,
 *   };
 */
export const getImportRequestA4List = async (
  params?: ImportRequestListParams,
): Promise<ImportRequestListResult> => {
  const keyword = params?.keyword?.trim().toLowerCase();
  const field = params?.searchBy;
  const status = params?.status;

  const rows = getRecords().map(toListItem);
  const hasKeyword = Boolean(keyword && field && field !== "all");
  const hasStatus = Boolean(status && status !== "all");

  // Unfiltered: report the pretend server-side total, grown by whatever the
  // demo has added on top of the seeds.
  if (!hasKeyword && !hasStatus) {
    const added = Math.max(0, rows.length - IMPORT_REQUEST_SEED_COUNT);
    return { items: rows, total: IMPORT_REQUEST_TOTAL + added };
  }

  const items = rows.filter((row) => {
    if (hasStatus && row.status !== status) return false;
    if (!hasKeyword) return true;
    return String(row[field as keyof typeof row] ?? "")
      .toLowerCase()
      .includes(keyword as string);
  });

  return { items, total: items.length };
};

/**
 * One request, with everything the detail screen renders.
 *
 *   const res = await getImportRequestA4Api(id);
 *   return toImportRequestRecord(res.data?.data);
 */
export const getImportRequestA4 = async (
  id: string,
): Promise<ImportRequestRecord | null> => getRecord(id) ?? null;

/**
 * Creates a draft request and logs the first entry.
 *
 *   const res = await createImportRequestA4Api(payload);
 *   return toImportRequestRecord(res.data?.data);
 */
export const createImportRequestA4 = async (
  payload: ImportRequestCreatePayload,
): Promise<ImportRequestRecord> => {
  const now = dayjs();
  const keys = nextRecordKeys();

  const draft: ImportRequestRecord = {
    ...keys,
    // A draft has not been filed yet, so the office-side columns stay blank —
    // they fill in as the request moves through รับเรื่อง / อนุมัติ.
    receiveNo: "",
    receiveDate: "",
    requestNo: "",
    requestDate: toThaiDate(now.format("YYYY-MM-DD")),
    operator: payload.writtenAt?.trim() || IMPORT_REQUEST_OPERATOR,
    status: "CREATED",
    permitNo: "",
    approvedDate: "",
    expireDate: "",
    hasPermitFile: false,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    form: {
      ...SEED_FORM,
      writtenAt: payload.writtenAt?.trim() || IMPORT_REQUEST_OPERATOR,
      referencePermitNo: payload.referencePermitNo,
      permitDate: toThaiDate(payload.permitDate),
      permitExpireDate: toThaiDate(payload.expireDate),
      requestFor: payload.requestFor.join(", "),
      useFor: payload.useFor.join(", "),
      requestPurpose: payload.purpose,
    },
    office: SEED_OFFICE,
    registration: SEED_REGISTRATION,
    factory: SEED_FACTORY,
    factorySynced: false,
    applicant: SEED_APPLICANT,
    persons: [],
    uploads: SEED_UPLOADS,
    weapons: [],
    permits: [],
    documents: [],
    history: [],
  };

  return addRecord(withHistory(draft, { status: "CREATED", detail: "สร้างคำขอ" }));
};

/**
 * The people the picker modals choose from.
 *
 *   const res = await getPersonDirectoryApi(role);
 *   return (res.data?.data ?? []).map(toPersonItem);
 */
export const getPersonDirectory = async (
  role: PersonItem["role"],
): Promise<PersonItem[]> =>
  PERSON_DIRECTORY.filter((p) => p.role === role).map((p, index) => ({
    ...p,
    order: index + 1,
  }));

/** What the เพิ่มข้อมูลอาวุธ/วัตถุดิบ modal needs to render its selects. */
export interface WeaponFormOptions {
  catalog: WeaponCatalogItem[];
  units: string[];
  importMethods: string[];
  countries: string[];
}

/**
 * The อาวุธ/วัตถุดิบ catalogue plus the modal's option lists.
 *
 *   const res = await getWeaponCatalogApi();
 *   return toWeaponFormOptions(res.data?.data);
 */
export const getWeaponFormOptions = async (): Promise<WeaponFormOptions> => ({
  catalog: WEAPON_CATALOG,
  units: WEAPON_UNITS,
  importMethods: WEAPON_IMPORT_METHODS,
  countries: WEAPON_COUNTRIES,
});

/**
 * Issued อ.6 books the permit ค้นหา modal picks from.
 *
 *   const res = await getPermitDirectoryApi();
 *   return (res.data?.data ?? []).map(toPermitItem);
 */
export const getPermitDirectory = async (): Promise<PermitItem[]> =>
  PERMIT_DIRECTORY.map((p, index) => ({ ...p, order: index + 1 }));

/** Persists an edited record and logs what changed. */
export const updateImportRequestA4 = async (
  record: ImportRequestRecord,
  entry: { status: RequestStatus; detail?: string },
): Promise<ImportRequestRecord> => saveRecord(withHistory(record, entry));

/**
 * Every row inside the request carries the section status its parent implies,
 * so ตรวจสอบ/ตีกลับ recolour the whole screen from one place (requirement 6).
 */
function withRowStatuses(record: ImportRequestRecord): ImportRequestRecord {
  const rowStatus = sectionStatusOf(record.status);
  return {
    ...record,
    weapons: record.weapons.map((w) => ({ ...w, status: rowStatus })),
    permits: record.permits.map((p) => ({ ...p, status: rowStatus })),
    documents: record.documents.map((d) => ({ ...d, status: rowStatus })),
    uploads: record.uploads.map((u) => ({ ...u, status: rowStatus })),
    persons: record.persons.map((p) => ({ ...p, status: rowStatus })),
  };
}

/**
 * The permit book itself. อนุมัติ mints the number and its dates; the file
 * only becomes downloadable once the fee is paid, which is why the seeded
 * APPROVED request has a `permitNo` but no file and the PAID one has both.
 */
function withPermitIssue(record: ImportRequestRecord): ImportRequestRecord {
  const now = dayjs();

  if (record.status === "APPROVED" && !record.permitNo) {
    return {
      ...record,
      permitNo: `${record.order}/${now.year() + 543}`,
      approvedDate: toThaiDate(now.format("YYYY-MM-DD")),
      expireDate: toThaiDate(now.add(1, "year").format("YYYY-MM-DD")),
    };
  }

  if (record.status === "PAID") {
    return { ...record, hasPermitFile: true };
  }

  // รับเรื่อง is where the office-side numbers get stamped on.
  if (record.status === "RECEIVED" && !record.requestNo) {
    return {
      ...record,
      requestNo: `${record.order}/${now.year() + 543}`,
      receiveDate: toThaiDate(now.format("YYYY-MM-DD")),
    };
  }

  return record;
}

/**
 * Moves a request to its next status: stamps whatever that status implies,
 * recolours every section, and logs the step.
 *
 *   const res = await transitionImportRequestA4Api(record.id, status);
 *   return toImportRequestRecord(res.data?.data);
 */
export const transitionImportRequestA4 = async (
  record: ImportRequestRecord,
  entry: { status: RequestStatus; detail: string },
): Promise<ImportRequestRecord> => {
  const moved = withRowStatuses(
    withPermitIssue({ ...record, status: entry.status }),
  );
  return saveRecord(withHistory(moved, entry));
};

/** Drafts are the only requests that can be deleted. */
export const deleteImportRequestA4 = async (id: string): Promise<void> => {
  removeRecord(id);
};

/** Demo-only: put the Figma fixtures back. */
export const resetImportRequestA4Demo = async (): Promise<void> => {
  resetRecords();
};
