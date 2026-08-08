"use client";

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

  return (
    <div className="flex items-center justify-between border-t border-[var(--border)] px-4 py-3">
      <p className="text-sm opacity-60">
        Page {currentPage} of {totalPages}
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="rounded-lg border border-[var(--border)] px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40 hover:bg-[var(--muted)]"
        >
          Previous
        </button>

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="rounded-lg border border-[var(--border)] px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40 hover:bg-[var(--muted)]"
        >
          Next
        </button>
      </div>
    </div>
  );
}
