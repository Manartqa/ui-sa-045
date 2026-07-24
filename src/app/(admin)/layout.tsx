import React from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";

export default function AdminGroupLayout({ children }: React.PropsWithChildren) {
  return <AdminLayout>{children}</AdminLayout>;
}
