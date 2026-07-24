"use client";

import React from "react";

interface InfoFieldProps {
  label: React.ReactNode;
  value: React.ReactNode;
}

/** Bold label above a plain value — the read-only field pattern of the design. */
export default function InfoField({ label, value }: InfoFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-base font-bold leading-6 text-black">{label}</div>
      <div className="text-sm leading-[22px] text-black">{value ?? "-"}</div>
    </div>
  );
}
