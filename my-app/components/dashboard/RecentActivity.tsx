export default function RecentActivityCard() {
  const activities = [
    { text: "New WAEC registration: Lagos center", time: "2m ago" },
    { text: "JAMB score uploaded: Abuja batch", time: "10m ago" },
    { text: "Exam center approved: Kano", time: "1h ago" },
    { text: "System update completed", time: "3h ago" },
  ];

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 h-[360px]">
      
      <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>

      <div className="space-y-4 overflow-y-auto h-[280px] pr-2">
        {activities.map((a, i) => (
          <div
            key={i}
            className="flex justify-between items-start border-b border-white/5 pb-2"
          >
            <p className="text-sm">{a.text}</p>
            <span className="text-xs opacity-60">{a.time}</span>
          </div>
        ))}
      </div>

    </div>
  );
}