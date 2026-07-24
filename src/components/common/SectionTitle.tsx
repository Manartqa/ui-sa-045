"use client";

import React from "react";
import { Typography } from "antd";

interface SectionTitleProps {
  children: React.ReactNode;
  /** `page` = 16px page heading, `section` = 18px card/section heading. */
  variant?: "page" | "section";
  className?: string;
}

/**
 * Heading used across cards and page headers. Wraps antd `Typography.Title`
 * so the whole app shares one type ramp instead of ad-hoc `<h1>`/`<h2>` tags.
 */
export default function SectionTitle({
  children,
  variant = "section",
  className,
}: SectionTitleProps) {
  return (
    <Typography.Title
      level={5}
      className={className}
      style={{
        margin: 0,
        fontSize: variant === "section" ? 18 : 16,
        lineHeight: variant === "section" ? "28px" : "24px",
      }}
    >
      {children}
    </Typography.Title>
  );
}
