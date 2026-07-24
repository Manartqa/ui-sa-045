"use client";

import React from "react";
import { Layout, Badge, Space, Typography } from "antd";
import { BellOutlined, DownOutlined } from "@ant-design/icons";
import { brand } from "@/theme";

const { Text } = Typography;

/**
 * Crest logo exported from Figma. The remote asset URL expires ~7 days after
 * export — download it to /public/logo.png and switch the src when possible.
 */
const LOGO_SRC =
  "https://www.figma.com/api/mcp/asset/4aade1ca-2f92-4137-9faa-a6ff30f43b05";

export default function NavBar() {
  return (
    <Layout.Header className="flex items-center gap-4 !leading-none">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={LOGO_SRC} alt="ตราสัญลักษณ์" className="h-12 w-auto shrink-0" />
      <div className="ml-2 min-w-0 flex-1">
        <Text
          strong
          ellipsis
          className="block"
          style={{ color: "#fff", fontSize: 16, lineHeight: "24px" }}
        >
          ระบบสารสนเทศโรงงานผลิตอาวุธของเอกชน สำหรับผู้ประกอบการ
        </Text>
        <Text
          ellipsis
          className="block"
          style={{ color: brand.headerAccent, fontSize: 12, lineHeight: "18px" }}
        >
          Private Arms Manufacturing Factory system สำหรับผู้ประกอบการ
        </Text>
      </div>
      <Space size={8} className="shrink-0">
        <div className="text-right">
          <Text
            className="block"
            style={{ color: "#fff", fontSize: 16, lineHeight: "24px" }}
          >
            บริษัท อาวุธ สมาร์ท โซลูชั่น จำกัด
          </Text>
          <Text
            className="block"
            style={{ color: brand.headerMuted, lineHeight: "20px" }}
          >
            Version : 1.0.0
          </Text>
        </div>
        <DownOutlined className="!text-white" />
        <Badge count={4} className="ml-3">
          <BellOutlined className="!text-white" style={{ fontSize: 24 }} />
        </Badge>
      </Space>
    </Layout.Header>
  );
}
