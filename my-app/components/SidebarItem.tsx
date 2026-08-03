"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SidebarAccordion from "./SidebarAccordion";
import { SidebarItem as SidebarItemType } from "@/lib/types/sidebar";

interface Props {
  item: SidebarItemType;
  examOpen: boolean;
  setExamOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeMenu: string;
  setActiveMenu: React.Dispatch<React.SetStateAction<string>>;
}

export default function SidebarItem({
  item,
  examOpen,
  setExamOpen,
  activeMenu,
  setActiveMenu,
}: Props) {
  const pathname = usePathname();

  const Icon = item.icon;

  const examRoutes = ["/waec", "/jamb", "/neco", "/nabteb"];

  const isExamPage = examRoutes.includes(pathname);

  if (item.children) {
    return (
      <SidebarAccordion
        title={item.name}
        icon={Icon}
        open={examOpen}
         active={activeMenu === "Examinations"}
         onToggle={() => {
        setExamOpen(prev => !prev);
        setActiveMenu("Examinations");
    }}
      >
        {item.children.map((child) => {
          const ChildIcon = child.icon;

          return (
            <Link
              key={child.name}
              href={child.href}
              onClick={() => {
    setExamOpen(true);
    setActiveMenu(child.name);
}}

              className={`
                flex items-center gap-3
                px-3 py-2
                rounded-lg
                transition-all
                ${
                  pathname === child.href
                    ? "bg-[var(--muted)] text-cyan-500 font-semibold"
                    : "hover:bg-[var(--muted)]"
                }
              `}
            >
              <ChildIcon size={16} />
              <span>{child.name}</span>
            </Link>
          );
        })}
      </SidebarAccordion>
    );
  }

  if (!item.href) return null;

  return (
    <Link
      href={item.href}
       onClick={() => {
    setActiveMenu(item.name);
    setExamOpen(false);
  }}
      className={`
        flex items-center gap-3
        px-3 py-3
        rounded-xl
        transition-all
        ${
          activeMenu === item.name
    ? "bg-cyan-500 text-white shadow-lg"
    : "hover:bg-[var(--muted)] text-gray-300"
        }
      `}
    >
      <Icon size={18} />
      <span>{item.name}</span>
    </Link>
  );
}