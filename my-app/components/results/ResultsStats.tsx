"use client";

import { Clock3, FileCheck, Files, XCircle } from "lucide-react";

import { Result } from "@/lib/types/result";

type ResultsStatsProps = {
  results: Result[];
};

export default function ResultsStats({ results }: ResultsStatsProps) {
  const total = results.length;

  const verified = results.filter(
    (result) => result.status === "Verified",
  ).length;

  const pending = results.filter(
    (result) => result.status === "Pending",
  ).length;

  const rejected = results.filter(
    (result) => result.status === "Rejected",
  ).length;

  const cards = [
    {
      title: "Total Results",
      value: total,
      icon: Files,
      color: "text-cyan-400",
    },
    {
      title: "Verified",
      value: verified,
      icon: FileCheck,
      color: "text-green-400",
    },
    {
      title: "Pending",
      value: pending,
      icon: Clock3,
      color: "text-amber-400",
    },
    {
      title: "Rejected",
      value: rejected,
      icon: XCircle,
      color: "text-red-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
            rounded-2xl
            border
            border-[var(--border)]
            bg-[var(--card)]
            p-5
            "
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">{card.title}</p>

              <Icon size={20} className={card.color} />
            </div>

            <h2 className="mt-4 text-3xl font-bold">
              {card.value.toLocaleString()}
            </h2>
          </div>
        );
      })}
    </div>
  );
}
