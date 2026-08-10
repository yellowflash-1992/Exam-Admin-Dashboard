"use client";

import { useState } from "react";

import CentreFilters from "@/components/centres/CentreFilters";
import CentreModal from "@/components/centres/CentreModal";
import CentresHeader from "@/components/centres/CentresHeader";
import CentreStats from "@/components/centres/CentreStats";
import CentreTable from "@/components/centres/CentreTable";
import DeleteCentreModal from "@/components/centres/DeleteCentreModal";
import EditCentreModal from "@/components/centres/EditCentreModal";
import Pagination from "@/components/ui/Pagination";

import { useCentreStore } from "@/lib/stores/centreStore";
import { useUIStore } from "@/lib/stores/uiStore";

import type { Centre } from "@/lib/types/centre";

export default function CentresPage() {
  const openAddCentre = useUIStore((state) => state.openAddCentre);

  const centres = useCentreStore((state) => state.centres);

  const updateCentre = useCentreStore((state) => state.updateCentre);

  const deleteCentre = useCentreStore((state) => state.deleteCentre);

  const [selectedCentre, setSelectedCentre] = useState<Centre | null>(null);

  const [editingCentre, setEditingCentre] = useState<Centre | null>(null);

  const [deletingCentre, setDeletingCentre] = useState<Centre | null>(null);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState<"All" | "Active" | "Inactive">("All");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const filteredCentres = centres.filter((centre) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      centre.name.toLowerCase().includes(searchText) ||
      centre.state.toLowerCase().includes(searchText) ||
      centre.address.toLowerCase().includes(searchText);

    const matchesStatus = status === "All" || centre.status === status;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredCentres.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedCentres = filteredCentres.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <div className="space-y-6 px-4 py-4">
      <CentresHeader onAdd={openAddCentre} />

      <CentreStats centres={centres} />

      <CentreFilters
        search={search}
        status={status}
        onSearchChange={(value) => {
          setSearch(value);
          setCurrentPage(1);
        }}
        onStatusChange={(value) => {
          setStatus(value);
          setCurrentPage(1);
        }}
      />

      <CentreTable
        centres={paginatedCentres}
        onView={setSelectedCentre}
        onEdit={setEditingCentre}
        onDelete={setDeletingCentre}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <CentreModal
        centre={selectedCentre}
        onClose={() => setSelectedCentre(null)}
      />

      <EditCentreModal
        key={editingCentre?.id}
        centre={editingCentre}
        onClose={() => setEditingCentre(null)}
        onSave={(updatedCentre) => {
          updateCentre(updatedCentre);
          setEditingCentre(null);
        }}
      />

      <DeleteCentreModal
        centre={deletingCentre}
        onClose={() => setDeletingCentre(null)}
        onDelete={(id) => {
          deleteCentre(id);
          setDeletingCentre(null);
        }}
      />
    </div>
  );
}
