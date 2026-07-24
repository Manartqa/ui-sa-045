"use client";

import React from "react";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import CreateHeader from "./CreateHeader";
import CreateFormCard from "./CreateFormCard";

export default function ImportRequestA4CreateContent() {
  const router = useRouter();
  return (
    <div className="flex w-full flex-col gap-6">
      <CreateHeader />
      <CreateFormCard />
      <div>
        <Button size="large" onClick={() => router.back()}>
          ย้อนกลับ
        </Button>
      </div>
    </div>
  );
}
