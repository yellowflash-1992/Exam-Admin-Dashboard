import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import DashboardModals from "@/components/layout/DashboardModals";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
 <div className="flex h-screen overflow-hidden">
  <Sidebar />

  <div className="flex-1 overflow-y-auto">

    <Navbar />

    <main className="px-4 pb-6">
      {children}
    </main>

  </div>

  <DashboardModals />
</div>
  );
}