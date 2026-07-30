/** Which glyph the tile shows — mapped to an icon in HomeSummaryCard. */
export type HomeTileIcon =
  | "draft"
  | "reviewing"
  | "payment"
  | "rejected"
  | "issued";

/** One stat tile on the home screen. */
export interface HomeSummaryTile {
  key: string;
  label: string;
  count: number;
  icon: HomeTileIcon;
  /** Route the tile links to, if any. */
  href?: string;
}

export interface HomeSummary {
  /** Card heading — differs per side. */
  title: string;
  tiles: HomeSummaryTile[];
  /** Total shown in the "ทั้งหมด: N รายการ" link on the card header. */
  total: number;
}
