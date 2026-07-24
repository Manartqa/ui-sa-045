"use client";

import React from "react";
import { Layout, Badge, Space } from "antd";
import { BellOutlined, DownOutlined } from "@ant-design/icons";

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
        <div className="truncate text-base font-bold leading-6 text-white">
          ระบบสารสนเทศโรงงานผลิตอาวุธของเอกชน สำหรับผู้ประกอบการ
        </div>
        <div className="truncate text-xs leading-[18px] text-[#F9E12F]">
          Private Arms Manufacturing Factory system สำหรับผู้ประกอบการ
        </div>
      </div>
      <Space size={8} className="shrink-0">
        <div className="text-right">
          <div className="text-base leading-6 text-white">
            บริษัท อาวุธ สมาร์ท โซลูชั่น จำกัด
          </div>
          <div className="text-sm leading-5 text-[#BEBEBE]">
            Version : 1.0.0
          </div>
        </div>
        <DownOutlined className="!text-white" />
        <Badge count={4} className="ml-3">
          <BellOutlined className="!text-white" style={{ fontSize: 24 }} />
        </Badge>
      </Space>
    </Layout.Header>
  );
}
