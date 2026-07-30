"use client";

import React from "react";
import { ConfigProvider, App, theme } from "antd";
import thTH from "antd/locale/th_TH";
import { brand, FONT_FAMILY } from "@/theme";

export function UIProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      locale={thTH}
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: brand.primary,
          colorInfo: brand.primary,
          colorSuccess: brand.success,
          colorWarning: brand.warning,
          colorError: brand.error,
          colorBgLayout: brand.contentBg,
          borderRadius: 8,
          fontFamily: FONT_FAMILY,
        },
        components: {
          Form: {
            verticalLabelPadding: "0 0 2px",
            itemMarginBottom: 16,
          },
          Layout: {
            headerBg: brand.headerBg,
            siderBg: brand.siderBg,
            headerHeight: 64,
            headerPadding: "0 24px 0 40px",
          },
          Menu: {
            darkItemBg: brand.siderBg,
            // Open submenu sits on a slightly lighter panel than the rail
            darkSubMenuItemBg: brand.siderSubMenuBg,
            darkPopupBg: brand.siderBg,
            darkItemSelectedBg: brand.siderItemSelectedBg,
            darkGroupTitleColor: brand.siderGroupTitle,
            itemBorderRadius: 8,
            groupTitleFontSize: 12,
          },
          Table: {
            headerBg: "#FAFAFA",
            headerColor: "rgba(0,0,0,0.88)",
          },
          // The request lifecycle stepper is green, not the app purple.
          Steps: {
            colorPrimary: brand.success,
          },
        },
      }}
    >
      <App>{children}</App>
    </ConfigProvider>
  );
}
