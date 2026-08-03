"use client";

import { useState } from "react";

import AddCandidateModal from "@/components/candidates/AddCandidateModal";
import CandidateFilters from "@/components/candidates/CandidateFilters";
import CandidateModal from "@/components/candidates/CandidateModal";
import CandidatesHeader from "@/components/candidates/CandidatesHeader";
import CandidateStats from "@/components/candidates/CandidateStats";
import CandidateTable from "@/components/candidates/CandidateTable";
import DeleteCandidateModal from "@/components/candidates/DeleteCandidateModal";
import EditCandidateModal from "@/components/candidates/EditCandidateModal";
import Pagination from "@/components/candidates/Pagination";
import { candidates } from "@/lib/data/candidates";
import type { Candidate } from "@/lib/types/candidate";

// const candidates = [
//   ...
// ];

export default function CandidatesPage() {
  const [candidateList, setCandidateList] = useState(candidates);

  const [search, setSearch] = useState("");
  const [exam, setExam] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);

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
      <CandidatesHeader onAdd={() => setShowAddModal(true)} />

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
        setCurrentPage={setCurrentPage}
      />

      <CandidateModal
        candidate={selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
      />

      <EditCandidateModal
        candidate={editingCandidate}
        onClose={() => setEditingCandidate(null)}
        onSave={(updatedCandidate) => {
          setCandidateList((prev) =>
            prev.map((candidate) =>
              candidate.id === updatedCandidate.id
                ? updatedCandidate
                : candidate,
            ),
          );

          setEditingCandidate(null);
        }}
      />

      <AddCandidateModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={(candidate) => {
          setCandidateList([...candidateList, candidate]);

          setShowAddModal(false);
        }}
      />

      <DeleteCandidateModal
        candidate={deletingCandidate}
        onClose={() => setDeletingCandidate(null)}
        onDelete={(id) => {
          setCandidateList((prev) =>
            prev.filter((candidate) => candidate.id !== id),
          );

          setDeletingCandidate(null);
        }}
      />
    </div>
  );
}
