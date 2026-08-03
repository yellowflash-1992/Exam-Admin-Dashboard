type DashboardCardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function DashboardCard({
  children,
  className = "",
}: DashboardCardProps) {
  return (
    <div
      className={`
        bg-[var(--card)]
        border border-[var(--border)]
        rounded-2xl
        shadow-lg
        shadow-black/10
        hover:border-cyan-500/30
        transition-all duration-300
        ${className}
      `}
    >
      {children}
    </div>
  );
}
