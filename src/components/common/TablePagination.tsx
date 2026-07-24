"use client";

import React from "react";
import { Pagination } from "antd";

interface TablePaginationProps {
  total: number;
}

/** "1-N จาก N รายการ" on the left, pager + page-size dropdown on the right. */
export default function TablePagination({ total }: TablePaginationProps) {
  const from = total > 0 ? 1 : 0;
  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
      <span className="text-sm text-black">
        {from}-{total} จาก {total} รายการ
      </span>
      <Pagination
        size="small"
        total={total || 1}
        pageSize={10}
        showSizeChanger
        current={1}
      />
    </div>
  );
}
