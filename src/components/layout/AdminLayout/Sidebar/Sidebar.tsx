"use client";

import React from "react";
import { Layout, Menu } from "antd";
import { useRouter } from "next/navigation";
import {
  SIDEBAR_MENU_ITEMS,
  SIDEBAR_WIDTH,
  SELECTED_MENU_KEY,
} from "../AdminLayout.config";

export default function Sidebar() {
  const router = useRouter();

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === SELECTED_MENU_KEY) {
      router.push("/request/import-weapon-a4/list");
    }
  };

  return (
    <Layout.Sider
      width={SIDEBAR_WIDTH}
      breakpoint="lg"
      collapsedWidth={0}
      className="app-sidebar"
    >
      <div className="flex h-full flex-col justify-between pb-6">
        <Menu
          theme="dark"
          mode="inline"
          items={SIDEBAR_MENU_ITEMS}
          defaultSelectedKeys={[SELECTED_MENU_KEY]}
          defaultOpenKeys={["request"]}
          onClick={handleMenuClick}
        />
        <div className="pt-4 text-center text-sm text-white/65">
          เวอร์ชัน: x.x.x
        </div>
      </div>
    </Layout.Sider>
  );
}
