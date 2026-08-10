"use client";

import { useMemo, useState } from "react";
import {
  BarChart3,
  Building2,
  Download,
  FileCheck,
  FileText,
  Search,
  Users,
} from "lucide-react";

import PageHeader from "@/components/layout/PageHeader";
import Card from "@/components/ui/Card";

import { candidates } from "@/lib/data/candidates";
import { results } from "@/lib/data/results";
import { useCentreStore } from "@/lib/stores/centreStore";

type ReportType =
  | "Candidates"
  | "Results"
  | "Centres"
  | "Examinations";

type Report = {
  id: number;
  name: string;
  description: string;
  type: ReportType;
  icon: typeof Users;
};

const reports: Report[] = [
  {
    id: 1,
    name: "Candidate Report",
    description:
      "Candidate registration, examination and performance records",
    type: "Candidates",
    icon: Users,
  },
  {
    id: 2,
    name: "Results Report",
    description:
      "Examination results, grades and verification status",
    type: "Results",
    icon: FileCheck,
  },
  {
    id: 3,
    name: "Centre Report",
    description:
      "Examination centre locations, capacity and status",
    type: "Centres",
    icon: Building2,
  },
  {
    id: 4,
    name: "Examination Report",
    description:
      "Candidate and result activity across examinations",
    type: "Examinations",
    icon: BarChart3,
  },
];

export default function ReportsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] =
    useState<"All" | ReportType>("All");

  const centres = useCentreStore(
    (state) => state.centres,
  );

  const filteredReports = useMemo(() => {
    const query = search.trim().toLowerCase();

    return reports.filter((report) => {
      const matchesSearch =
        !query ||
        report.name.toLowerCase().includes(query) ||
        report.description
          .toLowerCase()
          .includes(query);

      const matchesType =
        typeFilter === "All" ||
        report.type === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [search, typeFilter]);

  const generateReport = (report: Report) => {
    let headers: string[] = [];
    let rows: string[][] = [];

    if (report.type === "Candidates") {
      headers = [
        "ID",
        "Name",
        "Exam",
        "State",
        "Centre",
        "Status",
        "Score",
        "Registered At",
      ];

      rows = candidates.map((candidate) => [
        String(candidate.id),
        candidate.name,
        candidate.exam,
        candidate.state,
        candidate.center,
        candidate.status,
        String(candidate.score),
        candidate.registeredAt ?? "",
      ]);
    }

    if (report.type === "Results") {
      headers = [
        "ID",
        "Candidate",
        "Exam",
        "Subject",
        "Score",
        "Grade",
        "Status",
        "Centre",
        "Date",
      ];

      rows = results.map((result) => [
        String(result.id),
        result.candidate,
        result.exam,
        result.subject,
        String(result.score),
        result.grade,
        result.status,
        result.centre,
        new Date(result.date).toLocaleDateString(),
      ]);
    }

    if (report.type === "Centres") {
      headers = [
        "ID",
        "Name",
        "State",
        "Address",
        "Capacity",
        "Status",
      ];

      rows = centres.map((centre) => [
        String(centre.id),
        centre.name,
        centre.state,
        centre.address,
        String(centre.capacity),
        centre.status,
      ]);
    }

    if (report.type === "Examinations") {
      headers = [
        "Examination",
        "Candidates",
        "Results",
        "Verified Results",
        "Average Score",
      ];

      const exams = [
        "WAEC",
        "JAMB",
        "NECO",
        "NABTEB",
      ];

      rows = exams.map((exam) => {
        const examCandidates = candidates.filter(
          (candidate) =>
            candidate.exam === exam,
        );

        const examResults = results.filter(
          (result) => result.exam === exam,
        );

        const verified = examResults.filter(
          (result) =>
            result.status === "Verified",
        ).length;

        const average =
          examResults.length > 0
            ? Math.round(
                examResults.reduce(
                  (sum, result) =>
                    sum + result.score,
                  0,
                ) / examResults.length,
              )
            : 0;

        return [
          exam,
          String(examCandidates.length),
          String(examResults.length),
          String(verified),
          String(average),
        ];
      });
    }

    const escapeCsv = (value: string) => {
      return `"${value.replace(/"/g, '""')}"`;
    };

    const csv = [
      headers.map(escapeCsv).join(","),
      ...rows.map((row) =>
        row.map(escapeCsv).join(","),
      ),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `${report.name
      .toLowerCase()
      .replace(/\s+/g, "-")}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Generate and export examination administration reports"
      />

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard
          title="Candidates"
          value={candidates.length}
          icon={Users}
        />

        <SummaryCard
          title="Results"
          value={results.length}
          icon={FileCheck}
        />

        <SummaryCard
          title="Centres"
          value={centres.length}
          icon={Building2}
        />
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative min-w-0 flex-1">
            <Search
              size={17}
              className="
                pointer-events-none
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                opacity-40
              "
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search reports..."
              className="
                w-full
                rounded-xl
                border
                border-[var(--border)]
                bg-transparent
                py-2.5
                pl-10
                pr-4
                text-sm
                outline-none
                focus:border-cyan-400
              "
            />
          </div>

          <select
            value={typeFilter}
            onChange={(event) =>
              setTypeFilter(
                event.target.value as
                  | "All"
                  | ReportType,
              )
            }
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
              All report types
            </option>

            <option value="Candidates">
              Candidates
            </option>

            <option value="Results">
              Results
            </option>

            <option value="Centres">
              Centres
            </option>

            <option value="Examinations">
              Examinations
            </option>
          </select>
        </div>
      </Card>

      {/* Reports */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {filteredReports.map((report) => {
          const Icon = report.icon;

          return (
            <Card key={report.id}>
              <div className="flex items-start gap-4">
                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-cyan-500/10
                    text-cyan-400
                  "
                >
                  <Icon size={22} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-semibold">
                      {report.name}
                    </h2>

                    <span className="rounded-full bg-[var(--muted)] px-2 py-1 text-[11px] opacity-60">
                      {report.type}
                    </span>
                  </div>

                  <p className="mt-1 text-sm opacity-50">
                    {report.description}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-[var(--border)] pt-4">
                <div className="flex items-center gap-2 text-xs opacity-50">
                  <FileText size={14} />
                  CSV export
                </div>

                <button
                  type="button"
                  onClick={() =>
                    generateReport(report)
                  }
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-cyan-500
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-white
                    transition
                    hover:bg-cyan-400
                  "
                >
                  <Download size={16} />
                  Generate
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredReports.length === 0 && (
        <Card>
          <div className="py-10 text-center">
            <FileText
              size={30}
              className="mx-auto opacity-30"
            />

            <p className="mt-3 text-sm opacity-50">
              No reports match your search.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}

function SummaryCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: number;
  icon: typeof Users;
}) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <p className="text-sm opacity-60">
          {title}
        </p>

        <Icon
          size={20}
          className="text-cyan-400"
        />
      </div>

      <p className="mt-3 text-3xl font-bold">
        {value.toLocaleString()}
      </p>
    </Card>
  );
}