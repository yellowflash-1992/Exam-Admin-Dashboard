import Link from "next/link";
import { LucideIcon, ArrowRight } from "lucide-react";

type ExaminationCardProps = {
  title: string;
  description: string;
  candidates: string;
  href: string;
  icon: LucideIcon;
};

export default function ExaminationCard({
  title,
  description,
  candidates,
  href,
  icon: Icon,
}: ExaminationCardProps) {
  return (
  <Link
    href={href}
    className="
      group
      relative
      overflow-hidden
      rounded-2xl
      border
      border-[var(--border)]
      bg-[var(--card)]
      p-6
      transition-all
      duration-300
      hover:-translate-y-1
      hover:border-cyan-500
      hover:shadow-[0_0_30px_rgba(34,211,238,.12)]
    "
  >
    <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-cyan-500/10 blur-3xl" />

    <div className="relative">

      <div className="flex items-center justify-between">

        <div className="h-14 w-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
          <Icon
            size={28}
            className="text-cyan-400"
          />
        </div>

        <ArrowRight
          className="
            text-slate-500
            transition
            group-hover:translate-x-1
            group-hover:text-cyan-400
          "
        />

      </div>

      <h2 className="mt-6 text-2xl font-bold">
        {title}
      </h2>

      <p className="mt-2 text-sm opacity-70">
        {description}
      </p>

      <div className="mt-8">

        <p className="text-xs uppercase tracking-wider opacity-50">
          Candidates
        </p>

        <h3 className="text-3xl font-bold mt-1">
          {candidates}
        </h3>

      </div>

    </div>
  </Link>
);
}