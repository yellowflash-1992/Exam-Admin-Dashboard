"use client";

import { ChevronRight, LucideIcon } from "lucide-react";

interface SidebarAccordionProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  active: boolean;
  open: boolean;
  onToggle: () => void;
}

export default function SidebarAccordion({
  title,
  icon: Icon,
  children,
  active,
  open,
  onToggle,
}: SidebarAccordionProps) {
  return (
    <div>
      <button
        onClick={onToggle}
        className={`
          w-full
          flex
          items-center
          justify-between
          px-3
          py-3
          rounded-xl
          transition-all
         ${
  active
    ? "bg-cyan-500 text-white shadow-lg"
    : "hover:bg-[var(--muted)]"
}
        `}
      >
        <div className="flex items-center gap-3">
          <Icon size={18} />
          <span>{title}</span>
        </div>

        <ChevronRight
          size={18}
          className={`
            transition-transform
            duration-1000
            ${open ? "rotate-90" : ""}
          `}
        />
      </button>

      <div
        className={`
          overflow-hidden
          transition-all
          duration-1000
          ${open ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="ml-8 mt-2 space-y-1">
          {children}
        </div>
      </div>
    </div>
  );
}