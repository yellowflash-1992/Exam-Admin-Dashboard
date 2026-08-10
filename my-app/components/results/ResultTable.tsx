"use client";

import type { Result } from "@/lib/types/result";
import { Eye } from "lucide-react";

type Props = {
  results: Result[];
  onView: (result: Result) => void;
};

export default function ResultTable({
  results,
  onView,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] text-left">
              <th className="px-4 py-3 font-medium opacity-60">
                Candidate
              </th>

              <th className="px-4 py-3 font-medium opacity-60">
                Exam
              </th>

              <th className="px-4 py-3 font-medium opacity-60">
                Subject
              </th>

              <th className="px-4 py-3 font-medium opacity-60">
                Score
              </th>

              <th className="px-4 py-3 font-medium opacity-60">
                Grade
              </th>

              <th className="px-4 py-3 font-medium opacity-60">
                Status
              </th>

              <th className="px-4 py-3 text-right font-medium opacity-60">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {results.length > 0 ? (
              results.map((result) => (
                <tr
                  key={result.id}
                  className="
                    border-t
                    border-[var(--border)]
                    hover:bg-[var(--muted)]
                  "
                >
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium">
                        {result.candidate}
                      </p>

                      <p className="text-xs opacity-50">
                        {result.centre}
                      </p>
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    {result.exam}
                  </td>

                  <td className="px-4 py-3">
                    {result.subject}
                  </td>

                  <td className="px-4 py-3 font-medium">
                    {result.score}
                  </td>

                  <td className="px-4 py-3 font-semibold">
                    {result.grade}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={
                        result.status === "Verified"
                          ? "text-green-400"
                          : result.status === "Pending"
                            ? "text-amber-400"
                            : "text-red-400"
                      }
                    >
                      {result.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => onView(result)}
                        className="rounded-lg p-2 hover:bg-[var(--muted)]"
                        title="View result"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center opacity-50"
                >
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}