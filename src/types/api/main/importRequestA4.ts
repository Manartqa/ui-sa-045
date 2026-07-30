import type { RequestStatus } from "@/types/app/importRequestA4";

/** Backend shape of one อ.4 request row. */
export interface ImportRequestA4Response {
  id: string;
  referenceNo: string;
  receiveNo: string | null;
  receiveDate: string | null;
  requestNo: string | null;
  requestDate: string | null;
  operatorName: string;
  status: RequestStatus;
  permitNo: string | null;
  approvedDate: string | null;
  expireDate: string | null;
  permitFileUrl: string | null;
}
