import React from "react";
import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { UIProvider } from "@/components/providers/UIProvider";
import "./globals.css";

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-thai",
});

export const metadata: Metadata = {
  title: "ระบบสารสนเทศโรงงานผลิตอาวุธของเอกชน สำหรับผู้ประกอบการ",
  description: "Private Arms Manufacturing Factory system สำหรับผู้ประกอบการ",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="th" className={notoSansThai.variable}>
      <body className={notoSansThai.className}>
        <AntdRegistry>
          <UIProvider>{children}</UIProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
