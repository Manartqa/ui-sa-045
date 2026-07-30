"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card, Skeleton, Typography } from "antd";
import { SectionTitle } from "@/components/common";
import { brand } from "@/theme";
import type { HomeSummaryTile, HomeTileIcon } from "@/types/app/home";
import { totalLinkText } from "./Home.config";

const ICON_SIZE = 44;
/** Wide enough for "ชำระค่าธรรมเนียม" to stay on one line; the longer labels
    still wrap to two, as in the design. */
const TILE_WIDTH = 184;
const TILE_BORDER_WIDTH = 2;
/** Card and tile corners in the design are rounder than antd's default 8. */
const CARD_RADIUS = 12;

/** Icon exported from the design system, already filled with brand.primary. */
function AssetIcon({ name }: { name: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={`/icons/${name}.svg`}
      alt=""
      width={ICON_SIZE}
      height={ICON_SIZE}
    />
  );
}

/** All five come from the design system's SVG set (public/icons). */
const TILE_ICONS: Record<HomeTileIcon, React.ReactNode> = {
  draft: <AssetIcon name="document" />,
  reviewing: <AssetIcon name="waiting-file" />,
  payment: <AssetIcon name="credit-card" />,
  rejected: <AssetIcon name="delete-file" />,
  issued: <AssetIcon name="approve-file" />,
};

interface HomeSummaryCardProps {
  title: string;
  tiles: HomeSummaryTile[];
  total: number;
  loading?: boolean;
}

export default function HomeSummaryCard({
  title,
  tiles,
  total,
  loading,
}: HomeSummaryCardProps) {
  const router = useRouter();

  return (
    <Card
      style={{ borderRadius: CARD_RADIUS }}
      styles={{ body: { padding: 24 } }}
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <SectionTitle>{title}</SectionTitle>
        <span
          className="flex items-center gap-2"
          style={{ color: brand.primary }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/file-tray-full.svg" alt="" width={16} height={16} />
          <Typography.Text style={{ color: brand.primary }}>
            {totalLinkText(total)}
          </Typography.Text>
        </span>
      </div>

      {loading ? (
        <Skeleton active paragraph={{ rows: 2 }} />
      ) : (
        <div className="flex flex-wrap gap-4">
          {tiles.map((tile) => (
            <button
              key={tile.key}
              type="button"
              onClick={() => tile.href && router.push(tile.href)}
              className="flex cursor-pointer items-center gap-3 bg-white px-3 py-3"
              style={{
                width: TILE_WIDTH,
                border: `${TILE_BORDER_WIDTH}px solid ${brand.primary}`,
                borderRadius: CARD_RADIUS,
              }}
            >
              <span className="shrink-0" style={{ lineHeight: 0 }}>
                {TILE_ICONS[tile.icon]}
              </span>
              {/* Count and label hug the right edge, per the design */}
              <span className="min-w-0 flex-1 text-right">
                <span
                  className="block font-bold"
                  style={{
                    color: brand.primary,
                    fontSize: 30,
                    lineHeight: "36px",
                  }}
                >
                  {tile.count}
                </span>
                <span
                  className="block"
                  style={{
                    color: brand.primary,
                    fontSize: 12,
                    lineHeight: "16px",
                  }}
                >
                  {tile.label}
                </span>
              </span>
            </button>
          ))}
        </div>
      )}
    </Card>
  );
}
