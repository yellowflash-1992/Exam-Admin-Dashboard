"use client";

import SidebarSection from "@/components/layout/SidebarSection";
import { sidebarMenu } from "@/lib/data/sidebar";
import { LogOut, Settings } from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const [examOpen, setExamOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  // const examRoutes = ["/waec", "/jamb", "/neco", "/nabteb"];

  // const isExamPage = examRoutes.includes(pathname);

  return (
    <div
      className="
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
      "
    >
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Exam Admin</h1>
        <p className="text-xs opacity-60">National Examination System</p>
      </div>

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
        <button className="flex items-center gap-3 w-full px-3 py-3 rounded-xl hover:bg-[var(--muted)]">
          <Settings size={18} />
          <span>Settings</span>
        </button>

        <button className="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-red-400 hover:bg-red-500/20">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
