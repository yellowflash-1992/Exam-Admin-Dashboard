"use client";

import { useState } from "react";

// import AddCandidateModal from "@/components/candidates/AddCandidateModal";
import CandidateFilters from "@/components/candidates/CandidateFilters";
import CandidateModal from "@/components/candidates/CandidateModal";
import CandidatesHeader from "@/components/candidates/CandidatesHeader";
import CandidateStats from "@/components/candidates/CandidateStats";
import CandidateTable from "@/components/candidates/CandidateTable";
import DeleteCandidateModal from "@/components/candidates/DeleteCandidateModal";
import EditCandidateModal from "@/components/candidates/EditCandidateModal";
import Pagination from "@/components/ui/Pagination";
import { useCandidateStore } from "@/lib/stores/candidateStore";
import { useUIStore } from "@/lib/stores/uiStore";
import type { Candidate } from "@/lib/types/candidate";
//import { useActivityStore } from "@/lib/stores/activityStore";

// const candidates = [
//   ...
// ];

export default function CandidatesPage() {
  // const addCandidateOpen = useUIStore((state) => state.addCandidateOpen);

  const openAddCandidate = useUIStore((state) => state.openAddCandidate);

  // const closeAddCandidate = useUIStore((state) => state.closeAddCandidate);

  const candidateList = useCandidateStore((state) => state.candidates);

  const updateCandidate = useCandidateStore((state) => state.updateCandidate);

  const deleteCandidate = useCandidateStore((state) => state.deleteCandidate);

  const [search, setSearch] = useState("");
  const [exam, setExam] = useState("");
  const [selectedState, setSelectedState] = useState("");

  // const [showAddModal, setShowAddModal] = useState(false);

  const filtered = candidateList.filter((candidate) => {
    const matchesSearch = candidate.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesExam = exam === "" || candidate.exam === exam;

    const matchesState =
      selectedState === "" || candidate.state === selectedState;

    return matchesSearch && matchesExam && matchesState;
  });

  const [currentPage, setCurrentPage] = useState(1);

  const perPage = 5;

  const start = (currentPage - 1) * perPage;

  const end = start + perPage;

  const paginatedCandidates = filtered.slice(start, end);

  const totalPages = Math.ceil(filtered.length / perPage);

  const exams = [...new Set(candidateList.map((c) => c.exam))];
  const states = [...new Set(candidateList.map((c) => c.state))];

  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null,
  );

  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(
    null,
  );

  const [deletingCandidate, setDeletingCandidate] = useState<Candidate | null>(
    null,
  );

  return (
    <div className="space-y-6 px-4 py-4">
      <CandidatesHeader onAdd={openAddCandidate} />

      <CandidateStats candidates={filtered} />

      <CandidateFilters
        search={search}
        setSearch={setSearch}
        exam={exam}
        setExam={setExam}
        state={selectedState}
        setState={setSelectedState}
        exams={exams}
        states={states}
      />

      <CandidateTable
        candidates={paginatedCandidates}
        onView={setSelectedCandidate}
        onEdit={setEditingCandidate}
        onDelete={setDeletingCandidate}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <CandidateModal
        candidate={selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
      />

      <EditCandidateModal
        candidate={editingCandidate}
        onClose={() => setEditingCandidate(null)}
        onSave={(updatedCandidate) => {
          updateCandidate(updatedCandidate);
          setEditingCandidate(null);
        }}
      />

      {/* <AddCandidateModal
        isOpen={addCandidateOpen}
        onClose={closeAddCandidate}
        onAdd={(candidate) => {
          addCandidate(candidate);
          closeAddCandidate();
        }}
      /> */}

      {/* <AddCandidateModal
        isOpen={addCandidateOpen}
        onClose={closeAddCandidate}
        onAdd={(candidate) => {
          addCandidate(candidate);
          closeAddCandidate();
        }}
      /> */}

      <DeleteCandidateModal
        candidate={deletingCandidate}
        onClose={() => setDeletingCandidate(null)}
        onDelete={(id) => {
          deleteCandidate(id);
          setDeletingCandidate(null);
        }}
      />
    </div>
  );
}
