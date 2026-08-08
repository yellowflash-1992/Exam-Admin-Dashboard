"use client";

import { SidebarItem as SidebarItemType } from "@/lib/types/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SidebarAccordion from "./SidebarAccordion";

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

  /*
   * Examination parent is considered active when:
   * 1. We are actually inside an examination route, OR
   * 2. The user has just opened the examination dropdown.
   */
  const isExamPage = pathname.startsWith("/examinations");

  if (item.children) {
    return (
      <SidebarAccordion
        title={item.name}
        icon={Icon}
        open={examOpen}
        active={isExamPage || activeMenu === "Examinations"}
        onToggle={() => {
          setExamOpen((prev) => {
            const nextOpen = !prev;

            if (nextOpen) {
              setActiveMenu("Examinations");
            } else {
              /*
               * When closing the dropdown, remove the temporary
               * Examination highlight. The actual page will then
               * determine the active item from the URL.
               */
              setActiveMenu("");
            }

            return nextOpen;
          });
        }}
      >
        {item.children.map((child) => {
          const ChildIcon = child.icon;

          const isChildActive = pathname === child.href;

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
                  isChildActive
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

  /*
   * Normal pages use the URL as the source of truth.
   *
   * activeMenu is only used as a temporary override while the
   * Examination dropdown is being interacted with.
   */
  const isActive =
    activeMenu === item.name ||
    (activeMenu === "" && pathname === item.href);

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
          isActive
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