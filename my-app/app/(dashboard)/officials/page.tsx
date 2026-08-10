"use client";

import { useState } from "react";

import AddOfficialModal from "@/components/officials/AddOfficialModal";
import DeleteOfficialModal from "@/components/officials/DeleteOfficialModal";
import EditOfficialModal from "@/components/officials/EditOfficialModal";
import OfficialFilters from "@/components/officials/OfficialFilters";
import OfficialModal from "@/components/officials/OfficialModal";
import OfficialsHeader from "@/components/officials/OfficialsHeader";
import OfficialTable from "@/components/officials/OfficialTable";
import Pagination from "@/components/ui/Pagination";
import { useOfficialStore } from "@/lib/stores/officialStore";
import type { Official } from "@/lib/types/official";
// import { useUIStore } from "@/lib/stores/uiStore";

export default function OfficialsPage() {
  const officials = useOfficialStore((state) => state.officials);

  const [selectedOfficial, setSelectedOfficial] = useState<Official | null>(
    null,
  );

  const [editingOfficial, setEditingOfficial] = useState<Official | null>(null);

  const [deletingOfficial, setDeletingOfficial] = useState<Official | null>(
    null,
  );

  const updateOfficial = useOfficialStore((state) => state.updateOfficial);
  const deleteOfficial = useOfficialStore((state) => state.deleteOfficial);

  const [addOfficialOpen, setAddOfficialOpen] = useState(false);

  // const addOfficialOpen = useUIStore((state) => state.addOfficialOpen);

  // const closeAddOfficial = useUIStore((state) => state.closeAddOfficial);

  const addOfficial = useOfficialStore((state) => state.addOfficial);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Active" | "Inactive"
  >("All");

  const filteredOfficials = officials.filter((official) => {
    const searchTerm = search.toLowerCase().trim();

    const matchesSearch =
      official.name.toLowerCase().includes(searchTerm) ||
      official.email.toLowerCase().includes(searchTerm) ||
      official.phone.toLowerCase().includes(searchTerm) ||
      official.role.toLowerCase().includes(searchTerm) ||
      official.state.toLowerCase().includes(searchTerm);

    const matchesStatus =
      statusFilter === "All" || official.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const totalPages = Math.ceil(filteredOfficials.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedOfficials = filteredOfficials.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <div className="space-y-6">
      <OfficialsHeader onAdd={() => setAddOfficialOpen(true)} />

      <OfficialFilters
        search={search}
        status={statusFilter}
        onSearchChange={(value) => {
          setSearch(value);
          setCurrentPage(1);
        }}
        onStatusChange={(value) => {
          setStatusFilter(value);
          setCurrentPage(1);
        }}
      />

      <OfficialTable
        officials={paginatedOfficials}
        onView={setSelectedOfficial}
        onEdit={setEditingOfficial}
        onDelete={setDeletingOfficial}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <OfficialModal
        official={selectedOfficial}
        onClose={() => setSelectedOfficial(null)}
      />

      <EditOfficialModal
        key={editingOfficial?.id ?? "edit-official"}
        official={editingOfficial}
        onClose={() => setEditingOfficial(null)}
        onSave={(updatedOfficial) => {
          updateOfficial(updatedOfficial);
          setEditingOfficial(null);
        }}
      />

      <DeleteOfficialModal
        official={deletingOfficial}
        onClose={() => setDeletingOfficial(null)}
        onDelete={(id) => {
          deleteOfficial(id);
          setDeletingOfficial(null);
        }}
      />

      <AddOfficialModal
        isOpen={addOfficialOpen}
        onClose={() => setAddOfficialOpen(false)}
        onAdd={(official) => {
          addOfficial(official);
          setAddOfficialOpen(false);
        }}
      />
    </div>
  );
}
