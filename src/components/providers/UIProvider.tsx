"use client";

import React from "react";
import { ConfigProvider, App, theme } from "antd";
import thTH from "antd/locale/th_TH";

export function UIProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      locale={thTH}
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: "#6574FF",
          colorInfo: "#6574FF",
          borderRadius: 8,
          fontFamily:
            "var(--font-noto-sans-thai), 'Noto Sans Thai', 'Noto Sans', sans-serif",
        },
        components: {
          Form: {
            verticalLabelPadding: "0 0 2px",
            itemMarginBottom: 16,
          },
          Layout: {
            headerBg: "#343D55",
            siderBg: "#272E40",
            headerHeight: 64,
            headerPadding: "0 24px 0 40px",
          },
          Menu: {
            darkItemBg: "#272E40",
            darkSubMenuItemBg: "#272E40",
            darkPopupBg: "#272E40",
            darkItemSelectedBg: "#1677FF",
            itemBorderRadius: 8,
          },
          Table: {
            headerBg: "#FAFAFA",
            headerColor: "rgba(0,0,0,0.88)",
          },
        },
      }}
    >
      <App>{children}</App>
    </ConfigProvider>
  );
}
