"use client";

import React from "react";
import { Button, Layout, Menu } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import { getSession } from "@/lib/auth";
import type { UserRole } from "@/types/app/auth";
import {
  MENU_ROUTES,
  SIDEBAR_COLLAPSED_WIDTH,
  SIDEBAR_MENU_BY_ROLE,
  SIDEBAR_WIDTH,
} from "../AdminLayout.config";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = React.useState(false);
  const [role, setRole] = React.useState<UserRole>("admin");

  // sessionStorage is client-only — read after mount so SSR and the first
  // client render agree.
  React.useEffect(() => {
    const session = getSession();
    if (session) setRole(session.role);
  }, []);

  const handleMenuClick = ({ key }: { key: string }) => {
    const target = MENU_ROUTES[key];
    if (target) router.push(target);
  };

  // Highlight the entry whose route best matches the current URL.
  const selectedKeys = React.useMemo(() => {
    const match = Object.entries(MENU_ROUTES)
      .filter(([, route]) => pathname.startsWith(route))
      .sort((a, b) => b[1].length - a[1].length)[0];
    return match ? [match[0]] : [];
  }, [pathname]);

  return (
    <Layout.Sider
      width={SIDEBAR_WIDTH}
      breakpoint="lg"
      // Icon-only rail rather than 0 — the toggle lives inside the Sider, so
      // collapsing it to nothing would strand the user with no way back.
      collapsedWidth={SIDEBAR_COLLAPSED_WIDTH}
      collapsed={collapsed}
      trigger={null}
      className={`app-sidebar${role === "user" ? " app-sidebar--operator" : ""}`}
    >
      {/* Collapsed the toggle joins the flow, so `justify-between` would push
          the icon list to the bottom of the rail. */}
      <div
        className={`relative flex h-full flex-col pb-6 ${
          collapsed ? "justify-start" : "justify-between"
        }`}
      >
        {/* Expanded: sits at the right of the "หน้าหลัก" row, over empty space.
            Collapsed: gets its own row — centering it over the rail would
            cover the first menu icon. */}
        <Button
          type="text"
          size="small"
          icon={<MenuOutlined />}
          aria-label="ย่อ/ขยายเมนู"
          className={
            collapsed
              ? "app-sidebar-toggle !mx-auto !mb-2 !mt-2 block"
              : "app-sidebar-toggle !absolute right-2 top-2 z-10"
          }
          onClick={() => setCollapsed((prev) => !prev)}
        />
        <Menu
          theme="dark"
          mode="inline"
          items={SIDEBAR_MENU_BY_ROLE[role]}
          selectedKeys={selectedKeys}
          defaultOpenKeys={["request"]}
          onClick={handleMenuClick}
        />
        {!collapsed && (
          <div className="pt-4 text-center text-sm text-white/45">
            เวอร์ชัน: x.x.x
          </div>
        )}
      </div>
    </Layout.Sider>
  );
}
