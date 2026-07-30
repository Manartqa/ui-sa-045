"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { App, Button, Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { authenticate, saveSession } from "@/lib/auth";
import { brand } from "@/theme";
import { AuthShell } from "@/components/layout/AuthShell";
import type { LoginVariant } from "./Login.config";
import {
  INVALID_CREDENTIALS,
  LANDING_PATH_BY_ROLE,
  LOGIN_FORGOT_PASSWORD,
  LOGIN_HEADING,
  LOGIN_SUBMIT_LABEL,
  LOGIN_TITLE_EN,
  LOGIN_TITLE_TH,
  PASSWORD_LABEL,
  PASSWORD_REQUIRED,
  USERNAME_LABEL,
  USERNAME_REQUIRED,
} from "./Login.config";

interface LoginFormValues {
  username: string;
  password: string;
}

/** Bold white field label from the design — antd's default label is grey. */
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

export default function LoginContent({ variant }: { variant: LoginVariant }) {
  const router = useRouter();
  const { message } = App.useApp();
  const [submitting, setSubmitting] = React.useState(false);

  const handleFinish = ({ username, password }: LoginFormValues) => {
    setSubmitting(true);
    const result = authenticate(username, password, variant.role);

    if (result.status !== "ok") {
      message.error(
        result.status === "wrong-role"
          ? variant.wrongRoleMessage
          : INVALID_CREDENTIALS,
      );
      setSubmitting(false);
      return;
    }

    saveSession(result.session);
    router.push(LANDING_PATH_BY_ROLE[result.session.role]);
  };

  return (
    <AuthShell
      variant={variant}
      titleLines={[LOGIN_TITLE_TH]}
      subtitleLines={[LOGIN_TITLE_EN, variant.audience]}
      heading={LOGIN_HEADING}
    >
      {/* Field sizing/colors for the dark panel live in globals.css under
          `.login-form`. */}
      <Form<LoginFormValues>
              layout="vertical"
              requiredMark={false}
              onFinish={handleFinish}
              size="large"
              className="login-form"
            >
              <Form.Item
                label={<FieldLabel>{USERNAME_LABEL}</FieldLabel>}
                name="username"
                rules={[{ required: true, message: USERNAME_REQUIRED }]}
                style={{ marginBottom: 32 }}
              >
                <Input autoComplete="username" />
              </Form.Item>

              <Form.Item
                label={<FieldLabel>{PASSWORD_LABEL}</FieldLabel>}
                name="password"
                rules={[{ required: true, message: PASSWORD_REQUIRED }]}
                style={{ marginBottom: 20 }}
              >
                <Input.Password
                  autoComplete="current-password"
                  iconRender={(visible) =>
                    visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>

              <div className="mb-8 text-right">
                <Link
                  href={variant.forgotPasswordPath}
                  style={{
                    color: brand.loginLink,
                    fontSize: 16,
                    lineHeight: 1.5,
                    textDecoration: "underline",
                    // Pin it to the text color — antd's reset colors link
                    // underlines independently.
                    textDecorationColor: "currentColor",
                  }}
                >
                  {LOGIN_FORGOT_PASSWORD}
                </Link>
              </div>

              <Button
                type="primary"
                htmlType="submit"
                block
                loading={submitting}
                style={{ height: 48, fontSize: 16, fontWeight: 700 }}
              >
                {LOGIN_SUBMIT_LABEL}
              </Button>
            </Form>
    </AuthShell>
  );
}
