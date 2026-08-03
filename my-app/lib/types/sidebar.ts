import { LucideIcon } from "lucide-react";

export type SidebarChild = {
  name: string;
  href: string;
  icon: LucideIcon;
};

export type SidebarItem = {
  name: string;
  href?: string;
  icon: LucideIcon;
  children?: SidebarChild[];
};

export type SidebarSection = {
  title: string;
  items: SidebarItem[];
};