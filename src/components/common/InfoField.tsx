"use client";

import React from "react";
import { Typography } from "antd";

const { Text } = Typography;

interface InfoFieldProps {
  label: React.ReactNode;
  value: React.ReactNode;
}

/** Bold label above a plain value — the read-only field pattern of the design. */
export default function InfoField({ label, value }: InfoFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Text strong style={{ fontSize: 16, lineHeight: "24px" }}>
        {label}
      </Text>
      <Text>{value ?? "-"}</Text>
    </div>
  );
}
