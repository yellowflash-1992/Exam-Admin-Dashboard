"use client";

import { useMemo, useState } from "react";

import PageHeader from "@/components/layout/PageHeader";
import ResultsStats from "@/components/results/ResultsStats";
import ResultTable from "@/components/results/ResultTable";
import ResultModal from "@/components/results/ResultModal";

import { results } from "@/lib/data/results";
import type { Result } from "@/lib/types/result";

const ITEMS_PER_PAGE = 5;

export default function ResultsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [selectedResult, setSelectedResult] =
    useState<Result | null>(null);

  const filteredResults = useMemo(() => {
    const query = search.trim().toLowerCase();

    return results.filter((result) => {
      const matchesSearch =
        !query ||
        result.candidate
          .toLowerCase()
          .includes(query) ||
        result.exam
          .toLowerCase()
          .includes(query) ||
        result.subject
          .toLowerCase()
          .includes(query) ||
        result.centre
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        result.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredResults.length / ITEMS_PER_PAGE,
    ),
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages,
  );

  const paginatedResults = filteredResults.slice(
    (safeCurrentPage - 1) * ITEMS_PER_PAGE,
    safeCurrentPage * ITEMS_PER_PAGE,
  );

  const goToPage = (page: number) => {
    setCurrentPage(
      Math.max(1, Math.min(page, totalPages)),
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Results"
        description="Manage examination results and verification"
      />

      <ResultsStats results={results} />

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
        <div className="flex flex-col gap-3 md:flex-row">
          <input
            type="text"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search candidate, exam, subject or centre..."
            className="
              min-w-0
              flex-1
              rounded-xl
              border
              border-[var(--border)]
              bg-transparent
              px-4
              py-2.5
              text-sm
              outline-none
              focus:border-cyan-400
            "
          />

          <select
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value);
              setCurrentPage(1);
            }}
            className="
              rounded-xl
              border
              border-[var(--border)]
              bg-[var(--card)]
              px-4
              py-2.5
              text-sm
              outline-none
            "
          >
            <option value="All">
              All statuses
            </option>

            <option value="Verified">
              Verified
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Rejected">
              Rejected
            </option>
          </select>
        </div>
      </div>

      <ResultTable
        results={paginatedResults}
        onView={setSelectedResult}
      />

      {filteredResults.length > 0 && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm opacity-50">
            Showing{" "}
            {(safeCurrentPage - 1) *
              ITEMS_PER_PAGE +
              1}{" "}
            to{" "}
            {Math.min(
              safeCurrentPage * ITEMS_PER_PAGE,
              filteredResults.length,
            )}{" "}
            of {filteredResults.length} results
          </p>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() =>
                goToPage(safeCurrentPage - 1)
              }
              disabled={safeCurrentPage === 1}
              className="rounded-lg border border-[var(--border)] px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-30"
            >
              Previous
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1,
            ).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => goToPage(page)}
                className={`
                  min-w-9
                  rounded-lg
                  border
                  px-3
                  py-2
                  text-sm
                  ${
                    page === safeCurrentPage
                      ? "border-cyan-400 bg-cyan-500/10 text-cyan-400"
                      : "border-[var(--border)] hover:bg-[var(--muted)]"
                  }
                `}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              onClick={() =>
                goToPage(safeCurrentPage + 1)
              }
              disabled={
                safeCurrentPage === totalPages
              }
              className="rounded-lg border border-[var(--border)] px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-30"
            >
              Next
            </button>
          </div>
        </div>
      )}

      <ResultModal
        result={selectedResult}
        onClose={() => setSelectedResult(null)}
      />
    </div>
  );
}