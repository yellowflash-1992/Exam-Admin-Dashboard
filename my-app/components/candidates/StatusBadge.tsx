export default function StatusBadge({
  status,
}: {
  status: string;
}) {
  const variants = {
    Passed: {
      color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
      dot: "bg-emerald-400",
    },
    Failed: {
      color: "bg-red-500/15 text-red-400 border-red-500/30",
      dot: "bg-red-400",
    },
    Pending: {
      color: "bg-amber-500/15 text-amber-300 border-amber-500/30",
      dot: "bg-amber-400",
    },
  };

  const current =
    variants[status as keyof typeof variants];

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${
        current?.color ??
        "bg-gray-500/15 text-gray-300 border-gray-500/30"
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          current?.dot ?? "bg-gray-400"
        }`}
      />
      {status}
    </span>
  );
}