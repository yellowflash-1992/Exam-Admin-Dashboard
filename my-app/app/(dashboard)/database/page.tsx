"use client";

import { useEffect, useState } from "react";

type DatabaseStats = {
  candidates: number;
  examinations: number;
  centres: number;
  registrations: number;
  results: number;
};

export default function DatabasePage() {
  const [stats, setStats] =
    useState<DatabaseStats | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    async function loadDatabaseStats() {
      try {
        const response = await fetch(
          "/api/database",
        );

        if (!response.ok) {
          throw new Error(
            "Failed to load database statistics",
          );
        }

        const data =
          (await response.json()) as DatabaseStats;

        setStats(data);
      } catch (error) {
        console.error(error);

        setError(
          "Could not load database information.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadDatabaseStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">
          Database Explorer
        </h1>

        <p className="opacity-50">
          Loading database...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">
          Database Explorer
        </h1>

        <p className="text-red-400">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Database Explorer
        </h1>

        <p className="mt-1 text-sm opacity-50">
          Development view of the PostgreSQL database.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <DatabaseCard
          name="Candidates"
          count={stats?.candidates ?? 0}
        />

        <DatabaseCard
          name="Examinations"
          count={stats?.examinations ?? 0}
        />

        <DatabaseCard
          name="Examination Centres"
          count={stats?.centres ?? 0}
        />

        <DatabaseCard
          name="Registrations"
          count={stats?.registrations ?? 0}
        />

        <DatabaseCard
          name="Results"
          count={stats?.results ?? 0}
        />
      </div>
    </div>
  );
}

function DatabaseCard({
  name,
  count,
}: {
  name: string;
  count: number;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
      <p className="text-sm opacity-50">
        {name}
      </p>

      <p className="mt-2 text-3xl font-bold">
        {count}
      </p>

      <p className="mt-1 text-xs opacity-40">
        records
      </p>
    </div>
  );
}