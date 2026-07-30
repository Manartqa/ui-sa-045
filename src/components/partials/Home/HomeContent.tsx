"use client";

import React from "react";
import { getSession } from "@/lib/auth";
import { useHomeSummary } from "@/hooks/home";
import type { AuthSession } from "@/types/app/auth";
import HomeHeader from "./HomeHeader";
import HomeSummaryCard from "./HomeSummaryCard";

export default function HomeContent() {
  const [session, setSession] = React.useState<AuthSession | null>(null);

  // sessionStorage is client-only — read after mount so SSR and the first
  // client render match.
  React.useEffect(() => {
    setSession(getSession());
  }, []);

  const { title, tiles, total, isLoading } = useHomeSummary(session?.role);

  return (
    // The home screen sits tight under the navbar in the design, so it pulls
    // back most of AdminLayout's 32px content padding on md+.
    <div className="flex w-full flex-col gap-3 md:-mt-6">
      <HomeHeader />
      <HomeSummaryCard
        title={title}
        tiles={tiles}
        total={total}
        loading={isLoading || !session}
      />
    </div>
  );
}
