"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ListHeader from "./ListHeader";
import ListSearchCard from "./ListSearchCard";
import ListResultCard from "./ListResultCard";

export default function ImportRequestA4ListContent() {
  const router = useRouter();
  return (
    <div className="flex w-full flex-col gap-6">
      <ListHeader
        onCreate={() => router.push("/request/import-weapon-a4/create")}
      />
      <ListSearchCard />
      <ListResultCard />
    </div>
  );
}
