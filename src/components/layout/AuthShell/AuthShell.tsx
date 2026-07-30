"use client";

import React from "react";
import Image from "next/image";
import { brand } from "@/theme";
import type { LoginVariant } from "@/components/partials/Login/Login.config";
import {
  LOGIN_CONTENT_WIDTH,
  LOGIN_LOGO_SIZE,
  LOGIN_LOGO_SRC,
  LOGIN_PANEL_BASIS,
  LOGIN_PANEL_MIN_WIDTH,
  LOGIN_PANEL_PADDING_X,
} from "@/components/partials/Login/Login.config";

interface AuthShellProps {
  variant: LoginVariant;
  /** White bold lines at the top of the panel. */
  titleLines: string[];
  /** Accent-colored lines under the title. */
  subtitleLines: string[];
  /** Bold white line above the form. */
  heading: string;
  /** The form. */
  children: React.ReactNode;
}

/**
 * Split screen used by every unauthenticated page: background photo on the
 * left, dark panel on the right holding the crest, wording and a form.
 */
export default function AuthShell({
  variant,
  titleLines,
  subtitleLines,
  heading,
  children,
}: AuthShellProps) {
  return (
    <div className="flex min-h-screen">
      <div className="relative hidden min-w-0 flex-1 bg-white md:block">
        <Image
          src={variant.bgSrc}
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 0px, 70vw"
          className="object-cover"
        />
      </div>

      <div
        className="flex items-center justify-center py-8"
        style={{
          backgroundColor: brand.headerBg,
          // Tailwind's preflight box-sizing loses to antd's runtime-injected
          // reset, so pin it here or the gutters widen the panel.
          boxSizing: "border-box",
          paddingLeft: LOGIN_PANEL_PADDING_X,
          paddingRight: LOGIN_PANEL_PADDING_X,
          // 575 of the 1920 frame, never below the content column plus its
          // gutters, and never wider than the screen once the image is hidden.
          flex: "0 0 auto",
          width: `min(100%, max(${LOGIN_PANEL_BASIS}, ${LOGIN_PANEL_MIN_WIDTH}px))`,
        }}
      >
        <div
          className="flex w-full flex-col gap-5"
          style={{ maxWidth: LOGIN_CONTENT_WIDTH }}
        >
          <div className="flex flex-col items-center">
            <Image
              src={LOGIN_LOGO_SRC}
              alt="ตราสัญลักษณ์"
              width={LOGIN_LOGO_SIZE}
              height={LOGIN_LOGO_SIZE}
              priority
            />

            <div className="mt-5 flex w-full flex-col gap-3 text-center">
              <div
                className="font-bold text-white"
                style={{ fontSize: 24, lineHeight: 1.5 }}
              >
                {titleLines.map((line) => (
                  <p key={line} className="m-0">
                    {line}
                  </p>
                ))}
              </div>
              <div
                style={{ color: variant.accent, fontSize: 18, lineHeight: 1.5 }}
              >
                {subtitleLines.map((line) => (
                  <p key={line} className="m-0">
                    {line}
                  </p>
                ))}
              </div>
            </div>

            <p
              className="m-0 mt-3 w-full text-center font-bold text-white"
              style={{ fontSize: 18, lineHeight: 1.5 }}
            >
              {heading}
            </p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
