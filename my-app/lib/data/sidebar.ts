import { SidebarSection } from "@/lib/types/sidebar";
import {
  BarChart3,
  BookOpen,
  Building2,
  ClipboardList,
  FileCheck,
  GraduationCap,
  LayoutDashboard,
  PieChart,
  School,
  UserCog,
  Users,
} from "lucide-react";

export const sidebarMenu: SidebarSection[] = [
  {
    title: "MAIN",
    items: [
      {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    title: "EXAMINATIONS",
    items: [
      {
        name: "Examinations",
        icon: GraduationCap,

        children: [
          {
            name: "WAEC",
            href: "/examinations/waec",
            icon: GraduationCap,
          },
          {
            name: "JAMB",
            href: "/examinations/jamb",
            icon: BookOpen,
          },
          {
            name: "NECO",
            href: "/examinations/neco",
            icon: School,
          },
          {
            name: "NABTEB",
            href: "/examinations/nabteb",
            icon: ClipboardList,
          },
        ],
      },
    ],
  },

  {
    title: "MANAGEMENT",
    items: [
      {
        name: "Candidates",
        href: "/candidates",
        icon: Users,
      },

      {
        name: "Centres",
        href: "/centres",
        icon: Building2,
      },

      {
        name: "Officials",
        href: "/officials",
        icon: UserCog,
      },

      {
        name: "Results",
        href: "/results",
        icon: FileCheck,
      },
    ],
  },

  {
    title: "ANALYTICS",
    items: [
      {
        name: "Reports",
        href: "/reports",
        icon: BarChart3,
      },

      {
        name: "Statistics",
        href: "/statistics",
        icon: PieChart,
      },
    ],
  },
];
