"use client";

import { SidebarSection as SidebarSectionType } from "@/lib/types/sidebar";
import SidebarItem from "./SidebarItem";

interface Props {
  section: SidebarSectionType;
  examOpen: boolean;
  setExamOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeMenu: string;
  setActiveMenu: React.Dispatch<React.SetStateAction<string>>;
}

export default function SidebarSection({
  section,
  examOpen,
  setExamOpen,
  activeMenu,
  setActiveMenu,
}: Props) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider opacity-50 mb-3">
        {section.title}
      </p>

      <div className="space-y-1">
        {section.items.map((item) => (
          <SidebarItem
            key={item.name}
            item={item}
            examOpen={examOpen}
            setExamOpen={setExamOpen}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />
        ))}
      </div>
    </div>
  );
}
