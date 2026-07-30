"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Layout, Badge, ConfigProvider, Dropdown, Space, Typography } from "antd";
import type { MenuProps } from "antd";
import { BellOutlined, DownOutlined } from "@ant-design/icons";
import { clearSession, getSession, LOGIN_PATH_BY_ROLE } from "@/lib/auth";
import type { AuthSession } from "@/types/app/auth";
import { brand } from "@/theme";
import {
  APP_CHROME_BY_ROLE,
  APP_VERSION,
  DEFAULT_APP_CHROME,
  FALLBACK_USER_NAME,
  NOTIFICATION_COUNT,
  USER_MENU_ITEMS,
  USER_MENU_KEYS,
} from "../AdminLayout.config";

const { Text } = Typography;

/** Crest logo exported from Figma and committed under /public. */
const LOGO_SRC = "/images/logo.png";

export default function NavBar() {
  const router = useRouter();
  const [session, setSession] = React.useState<AuthSession | null>(null);

  // sessionStorage is client-only, so read it after mount to keep the server
  // and first client render identical.
  React.useEffect(() => {
    setSession(getSession());
  }, []);

  const chrome = session
    ? APP_CHROME_BY_ROLE[session.role]
    : DEFAULT_APP_CHROME;

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (key === USER_MENU_KEYS.logout) {
      // Send them back to the screen they signed in on.
      const target = session
        ? LOGIN_PATH_BY_ROLE[session.role]
        : LOGIN_PATH_BY_ROLE.admin;
      clearSession();
      router.replace(target);
    }
  };

  return (
    <Layout.Header className="flex items-center gap-4 !leading-none">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={LOGO_SRC} alt="ตราสัญลักษณ์" className="h-12 w-auto shrink-0" />
      <div className="ml-2 min-w-0 flex-1">
        <Text
          strong
          ellipsis
          style={{
            display: "block",
            color: "#fff",
            fontSize: 16,
            lineHeight: "24px",
          }}
        >
          {chrome.title}
        </Text>
        <Text
          ellipsis
          style={{
            display: "block",
            color: chrome.accent,
            fontSize: 12,
            lineHeight: "18px",
          }}
        >
          {chrome.subtitle}
        </Text>
      </div>
      <Space size={8} className="shrink-0">
        {/* The dropdown is a dark panel, so it needs its own token scope —
            the app-wide theme is light. */}
        <ConfigProvider
          theme={{
            components: {
              Dropdown: {
                colorBgElevated: brand.siderBg,
                colorText: "#ffffff",
                controlItemBgHover: "rgba(255,255,255,0.12)",
              },
            },
          }}
        >
          <Dropdown
            trigger={["click"]}
            placement="bottomRight"
            overlayClassName="app-user-menu"
            menu={{ items: USER_MENU_ITEMS, onClick: handleMenuClick }}
          >
            <button
              type="button"
              className="flex cursor-pointer items-center gap-2 border-0 bg-transparent p-0 text-right"
            >
              <span>
                <Text
                  style={{
                    display: "block",
                    color: "#fff",
                    fontSize: 16,
                    lineHeight: "24px",
                  }}
                >
                  {session?.displayName ?? FALLBACK_USER_NAME}
                </Text>
                <Text
                  style={{
                    display: "block",
                    color: brand.headerMuted,
                    lineHeight: "20px",
                  }}
                >
                  {APP_VERSION}
                </Text>
              </span>
              <DownOutlined className="!text-white" />
            </button>
          </Dropdown>
        </ConfigProvider>
        <Badge count={NOTIFICATION_COUNT} className="ml-3">
          <BellOutlined className="!text-white" style={{ fontSize: 24 }} />
        </Badge>
      </Space>
    </Layout.Header>
  );
}
