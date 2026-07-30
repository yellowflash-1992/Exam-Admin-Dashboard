"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  GraduationCap,
  BookOpen,
  School,
  ClipboardList,
  Users,
  Building2,
  UserCog,
  FileCheck,
  BarChart3,
  PieChart,
  TrendingUp,
  Settings,
  LogOut,
} from "lucide-react";
export default function Sidebar() {

  const menu = [
  {
    title: "MAIN",
    items: [
      { name: "Dashboard", href: "/", icon: LayoutDashboard },
      { name: "Overview", href: "/overview", icon: Home },
    ],
  },
  {
    title: "EXAMS",
    items: [
      { name: "WAEC", href: "/waec", icon: GraduationCap },
      { name: "JAMB", href: "/jamb", icon: BookOpen },
      { name: "NECO", href: "/neco", icon: School },
      { name: "NABTEB", href: "/nabteb", icon: ClipboardList },
    ],
  },
  {
    title: "MANAGEMENT",
    items: [
      { name: "Candidates", href: "/candidates", icon: Users },
      { name: "Centers", href: "/centers", icon: Building2 },
      { name: "Officials", href: "/officials", icon: UserCog },
      { name: "Results", href: "/results", icon: FileCheck },
    ],
  },
  {
    title: "ANALYTICS",
    items: [
      { name: "Reports", href: "/reports", icon: BarChart3 },
      { name: "Statistics", href: "/statistics", icon: PieChart },
      { name: "Performance", href: "/performance", icon: TrendingUp },
    ],
  },
];

const pathname = usePathname();

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
">
      <div className="mb-8">
    <h1 className="text-2xl font-bold">
        Exam Admin
    </h1>

    <p className="text-xs opacity-60">
        National Examination System
    </p>
</div>

      <nav className="flex-1 space-y-8">
    {menu.map((section) => (
        <div key={section.title}>

            <p className="text-xs uppercase tracking-wider opacity-50 mb-3">
                {section.title}
            </p>

            <div className="space-y-1">

                {section.items.map((item) => {
                    const Icon = item.icon;

                    return (
                       <Link
  key={item.name}
  href={item.href}
  className={`
    flex items-center gap-3
    px-3 py-3 rounded-xl
    transition-all

    ${
      pathname === item.href
        ? "bg-cyan-500 text-white shadow-lg"
        : "hover:bg-[var(--muted)] text-gray-300"
    }
  `}
>
  <Icon size={18} />
  <span>{item.name}</span>
</Link>
                    );
                })}

            </div>

        </div>
    ))}
</nav>

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