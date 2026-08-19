import { redirect } from "next/navigation";

import DashboardModals from "@/components/layout/DashboardModals";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { getCurrentUser } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 overflow-y-auto">
        <Navbar user={user} />

        <main className="px-4 pb-6">{children}</main>
      </div>

      <DashboardModals />
    </div>
  );
}
