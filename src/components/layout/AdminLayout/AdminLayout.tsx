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
    <Layout className="min-h-screen">
      <NavBar />
      <Layout>
        <Sidebar />
        <Layout.Content className="min-w-0 bg-[#F5F5F5] p-4 md:p-8">
          {children}
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
