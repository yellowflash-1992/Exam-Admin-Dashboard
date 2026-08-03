type CardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
};

export default function Card({
  children,
  className = "",
  hover = false,
}: CardProps) {
  return (
    <div
      className={`
        bg-[var(--card)]
        border border-[var(--border)]
        rounded-2xl
        shadow-lg
        shadow-black/10
        p-6

        transition-all duration-300

         ${
           hover
             ? "hover:border-cyan-500/30 hover:bg-cyan-500/10 hover:-translate-y-1"
             : ""
         }

        ${className}
      `}
    >
      {children}
    </div>
  );
}
