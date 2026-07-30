"use client";

import React from "react";
import { Layout } from "antd";
import NavBar from "./Header/NavBar";
import Sidebar from "./Sidebar/Sidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    // antd's runtime `.ant-layout { min-height: 0 }` beats Tailwind's
    // `min-h-screen`, which left the sidebar rail short of the viewport.
    <Layout style={{ minHeight: "100vh" }}>
      <NavBar />
      <Layout>
        <Sidebar />
        <Layout.Content className="min-w-0 p-4 md:p-8">
          {children}
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
