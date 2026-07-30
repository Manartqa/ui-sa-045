"use client";

import React from "react";
import { Pagination } from "antd";

interface TablePaginationProps {
  total: number;
  pageSize?: number;
  current?: number;
  /** Omit while a screen has no paging wired up — the pager then owns its
      own page state instead of being a read-only controlled component. */
  onChange?: (page: number, pageSize: number) => void;
}

/** "1-N จาก M รายการ" on the left, pager + page-size dropdown on the right. */
export default function TablePagination({
  total,
  pageSize = 10,
  current = 1,
  onChange,
}: TablePaginationProps) {
  // Without a parent handler the pager keeps its own page so the range text
  // stays in step — and so antd doesn't warn about a read-only component.
  const [innerPage, setInnerPage] = React.useState(current);
  const [innerSize, setInnerSize] = React.useState(pageSize);

  const page = onChange ? current : innerPage;
  const size = onChange ? pageSize : innerSize;

  const handleChange = (nextPage: number, nextSize: number) => {
    if (onChange) {
      onChange(nextPage, nextSize);
      return;
    }
    setInnerPage(nextPage);
    setInnerSize(nextSize);
  };

  const from = total > 0 ? (page - 1) * size + 1 : 0;
  const to = Math.min(page * size, total);

  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
      <span className="text-sm text-black">
        {from}-{to} จาก {total} รายการ
      </span>
      <Pagination
        size="small"
        total={total || 1}
        current={page}
        pageSize={size}
        showSizeChanger
        onChange={handleChange}
      />
    </div>
  );
}
