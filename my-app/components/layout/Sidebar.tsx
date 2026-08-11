"use client";

import Link from "next/link";
import SidebarSection from "@/components/layout/SidebarSection";
import { sidebarMenu } from "@/lib/data/sidebar";
import { LogOut, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const [examOpen, setExamOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  const pathname = usePathname();

  const settingsActive = pathname === "/settings";

  return (
    <div className="
        hidden
        md:flex
        w-64
        p-4
        shrink-0
        flex-col
        bg-[var(--card)]
        border-r
        border-[var(--border)]
        overflow-y-auto
      ">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-xl font-bold">Exam Admin</h1>

        <p className="text-xs opacity-50 mt-1">
          National Examination System
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-8">
        {sidebarMenu.map((section) => (
          <SidebarSection
            key={section.title}
            section={section}
            examOpen={examOpen}
            setExamOpen={setExamOpen}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="pt-6 border-t border-[var(--border)] space-y-2">
        {/* Settings */}
        <Link
          href="/settings"
          className={`
            flex
            items-center
            gap-3
            w-full
            px-3
            py-3
            rounded-xl
            transition
            ${
              settingsActive
                ? "bg-cyan-500/10 text-cyan-400"
                : "hover:bg-[var(--muted)]"
            }
          `}
        >
          <Settings size={18} />

          <span>Settings</span>
        </Link>

        {/* Logout */}
        <button
          type="button"
          className="
            flex
            items-center
            gap-3
            w-full
            px-3
            py-3
            rounded-xl
            text-red-400
            hover:bg-red-500/20
            transition
          "
        >
          <LogOut size={18} />

          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}