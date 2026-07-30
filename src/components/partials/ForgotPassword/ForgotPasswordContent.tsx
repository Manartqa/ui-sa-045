"use client";

import React from "react";
import Link from "next/link";
import { App, Button, Form, Input } from "antd";
import { brand } from "@/theme";
import { AuthShell } from "@/components/layout/AuthShell";
import type { LoginVariant } from "@/components/partials/Login/Login.config";
import {
  EMAIL_INVALID,
  EMAIL_LABEL,
  EMAIL_PLACEHOLDER,
  EMAIL_REQUIRED,
  FORGOT_BACK_TO_LOGIN,
  FORGOT_HEADING,
  FORGOT_ORGANISATION_LINES,
  FORGOT_SUBMIT_LABEL,
  RESET_SENT_MESSAGE,
} from "./ForgotPassword.config";

interface ForgotPasswordFormValues {
  email: string;
}

/** Bold white field label, matching the sign-in screens. */
function FieldLabel({ children }: React.PropsWithChildren) {
  return (
    <span
      className="font-bold text-white"
      style={{ fontSize: 16, lineHeight: "24px" }}
    >
      {children}
    </span>
  );
}

export default function ForgotPasswordContent({
  variant,
}: {
  variant: LoginVariant;
}) {
  const { message } = App.useApp();
  const [submitting, setSubmitting] = React.useState(false);

  const handleFinish = ({ email }: ForgotPasswordFormValues) => {
    setSubmitting(true);
    // No backend yet — acknowledge and stop.
    void email;
    message.success(RESET_SENT_MESSAGE);
    setSubmitting(false);
  };

  return (
    <AuthShell
      variant={variant}
      titleLines={variant.forgotTitleLines}
      subtitleLines={FORGOT_ORGANISATION_LINES}
      heading={FORGOT_HEADING}
    >
      {/* Field sizing/colors for the dark panel live in globals.css under
          `.login-form`. */}
      <Form<ForgotPasswordFormValues>
        layout="vertical"
        requiredMark={false}
        onFinish={handleFinish}
        size="large"
        className="login-form"
      >
        <Form.Item
          label={<FieldLabel>{EMAIL_LABEL}</FieldLabel>}
          name="email"
          rules={[
            { required: true, message: EMAIL_REQUIRED },
            { type: "email", message: EMAIL_INVALID },
          ]}
          style={{ marginBottom: 20 }}
        >
          <Input placeholder={EMAIL_PLACEHOLDER} autoComplete="email" />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          block
          loading={submitting}
          style={{ height: 48, fontSize: 16, fontWeight: 700 }}
        >
          {FORGOT_SUBMIT_LABEL}
        </Button>

        <div className="mt-4 text-center">
          <Link
            href={variant.loginPath}
            style={{
              color: brand.loginLink,
              fontSize: 16,
              lineHeight: 1.5,
              textDecoration: "none",
            }}
          >
            {FORGOT_BACK_TO_LOGIN}
          </Link>
        </div>
      </Form>
    </AuthShell>
  );
}
