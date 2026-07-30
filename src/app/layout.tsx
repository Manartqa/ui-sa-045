import React from "react";
import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { QueryProvider } from "@/context/query";
import { UIProvider } from "@/components/providers/UIProvider";
import "./globals.css";

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-thai",
});

export const metadata: Metadata = {
  title: "ระบบสารสนเทศโรงงานผลิตอาวุธของเอกชน",
  description: "Private Arms Manufacturing Factory system สำหรับผู้ประกอบการ",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    // Browser extensions stamp attributes onto <html> before React hydrates
    // (e.g. data-scribe-recorder-ready), which React reports as a mismatch.
    // This suppresses that comparison for this element's attributes only —
    // real mismatches inside the app are still reported.
    <html lang="th" className={notoSansThai.variable} suppressHydrationWarning>
      <body className={notoSansThai.className}>
        {/* Provider order: data layer outermost, UI theme innermost.
            NextAuthProvider slots in above QueryProvider once a real auth
            backend exists — the demo still uses the mock in @/lib/auth. */}
        <AntdRegistry>
          <QueryProvider>
            <UIProvider>{children}</UIProvider>
          </QueryProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
