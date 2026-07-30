type Candidate = {
  status: string;
};

export default function CandidateStats({
  candidates,
}: {
  candidates: Candidate[];
}) {
  const total = candidates.length;

  const passed = candidates.filter(
    (c) => c.status === "Passed"
  ).length;

  const failed = candidates.filter(
    (c) => c.status === "Failed"
  ).length;

  const pending = candidates.filter(
    (c) => c.status === "Pending"
  ).length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

      <Card
        title="Total"
        value={total}
        color="text-cyan-400"
      />

      <Card
        title="Passed"
        value={passed}
        color="text-green-400"
      />

      <Card
        title="Failed"
        value={failed}
        color="text-red-400"
      />

      <Card
        title="Pending"
        value={pending}
        color="text-yellow-400"
      />

    </div>
  );
}

function Card({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">

      <p className="text-sm opacity-60">
        {title}
      </p>

      <h2 className={`mt-2 text-3xl font-bold ${color}`}>
        {value}
      </h2>

    </div>
  );
}