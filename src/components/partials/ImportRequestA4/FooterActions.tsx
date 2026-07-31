"use client";

import React from "react";
import { App, Button, Space } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { transitionsFor } from "@/constant/requestWorkflow";
import type { RequestTransition } from "@/constant/requestWorkflow";
import { useImportRequestA4Actions } from "@/hooks/importRequestA4";
import { useSession } from "@/hooks/useSession";
import { openMockDocument } from "@/lib/mockDocument";
import type { ImportRequestRecord } from "@/types/app/importRequestA4";
import ConfirmActionModal from "./Modal/ConfirmActionModal";
import PaymentNoticeModal from "./Modal/PaymentNoticeModal";

interface FooterActionsProps {
  record: ImportRequestRecord;
}

/**
 * What a request can do next, from `constant/requestWorkflow.ts`.
 *
 * Nothing here decides policy: the buttons are whatever `transitionsFor`
 * returns for this request's status and the signed-in role, so an officer
 * action can never surface for an operator and vice versa. Each one confirms
 * in the shared box, then writes a log line and moves the stepper.
 */
export default function FooterActions({ record }: FooterActionsProps) {
  const router = useRouter();
  const { message } = App.useApp();
  const session = useSession();
  const { transitionRequest, isTransitioning } = useImportRequestA4Actions();
  const [pending, setPending] = React.useState<RequestTransition | null>(null);
  const [notice, setNotice] = React.useState(false);

  // Until the session resolves the role is unknown, so no action is offered —
  // better a moment with no buttons than a moment with the wrong ones.
  const actions = session ? transitionsFor(record.status, session.role) : [];

  const handleConfirm = async () => {
    if (!pending) return;
    await transitionRequest({
      record,
      status: pending.to,
      detail: pending.logDetail,
    });
    setPending(null);
    message.success(pending.logDetail);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <Button
        size="large"
        icon={<LeftOutlined />}
        onClick={() => router.push("/request/import-weapon-a4/list")}
      >
        ย้อนกลับ
      </Button>
      <Space wrap>
        <Button
          size="large"
          onClick={() =>
            openMockDocument(
              `${record.referenceNo}-request.pdf`,
              "ใบคำขอ แบบ อ.4",
            )
          }
        >
          พิมพ์ใบคำขอ
        </Button>

        {/* The payment notice belongs to the fee steps only. */}
        {(record.status === "AWAITING_PERMIT_FEE" ||
          record.status === "PAID") && (
          <Button size="large" onClick={() => setNotice(true)}>
            พิมพ์ใบแจ้งชำระเงิน
          </Button>
        )}

        {/* Once the book is issued and paid for, it can be handed over. */}
        {record.hasPermitFile && (
          <Button
            size="large"
            onClick={() =>
              openMockDocument(
                `${record.permitNo.replace("/", "-")}-permit.pdf`,
                `หนังสืออนุญาต ${record.permitNo}`,
              )
            }
          >
            จ่ายหนังสืออนุญาต
          </Button>
        )}

        {actions.map((action) => (
          <Button
            key={action.key}
            size="large"
            type={action.primary ? "primary" : "default"}
            danger={action.danger}
            onClick={() => setPending(action)}
          >
            {action.label}
          </Button>
        ))}
      </Space>

      <ConfirmActionModal
        open={pending !== null}
        title={pending?.confirmTitle ?? ""}
        description={pending?.confirmDescription}
        danger={pending?.danger}
        loading={isTransitioning}
        onCancel={() => setPending(null)}
        onConfirm={handleConfirm}
      />

      <PaymentNoticeModal
        open={notice}
        record={record}
        onCancel={() => setNotice(false)}
      />
    </div>
  );
}
