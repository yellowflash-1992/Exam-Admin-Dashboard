"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  if (totalPages <= 1) return null;

  const pages: (number | "...")[] = [];

  if (totalPages <= 7) {
    for (let page = 1; page <= totalPages; page++) {
      pages.push(page);
    }
  } else {
    pages.push(1);

    if (currentPage > 4) {
      pages.push("...");
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let page = startPage; page <= endPage; page++) {
      pages.push(page);
    }

    if (currentPage < totalPages - 3) {
      pages.push("...");
    }

    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-between border-t border-[var(--border)] px-4 py-3">
      <p className="text-xs opacity-50">
        Page {currentPage} of {totalPages}
      </p>

      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="
            rounded-lg
            border
            border-[var(--border)]
            p-2
            transition
            hover:bg-[var(--muted)]
            disabled:cursor-not-allowed
            disabled:opacity-30
          "
          title="Previous page"
        >
          <ChevronLeft size={16} />
        </button>

        {pages.map((page, index) =>
          page === "..." ? (
            <span key={`ellipsis-${index}`} className="px-2 text-sm opacity-50">
              ...
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`
                min-w-9
                rounded-lg
                px-3
                py-2
                text-sm
                transition
                ${
                  currentPage === page
                    ? "bg-cyan-500 font-semibold text-black"
                    : "hover:bg-[var(--muted)]"
                }
              `}
            >
              {page}
            </button>
          ),
        )}

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="
            rounded-lg
            border
            border-[var(--border)]
            p-2
            transition
            hover:bg-[var(--muted)]
            disabled:cursor-not-allowed
            disabled:opacity-30
          "
          title="Next page"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
