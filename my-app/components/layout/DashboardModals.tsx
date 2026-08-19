"use client";

import AddCandidateModal from "@/components/candidates/AddCandidateModal";
import AddCentreModal from "@/components/centres/AddCentreModal";
import CreateExamModal from "@/components/examinations/CreateExamModal";
import UploadResultsModal from "@/components/results/UploadResultsModal";
import { useCandidateStore } from "@/lib/stores/candidateStore";
import { useCentreStore } from "@/lib/stores/centreStore";
import { useUIStore } from "@/lib/stores/uiStore";

export default function DashboardModals() {
  const addCandidateOpen = useUIStore((state) => state.addCandidateOpen);

  const closeAddCandidate = useUIStore((state) => state.closeAddCandidate);

  const addCandidate = useCandidateStore((state) => state.addCandidate);

  const addCentreOpen = useUIStore((state) => state.addCentreOpen);

  const closeAddCentre = useUIStore((state) => state.closeAddCentre);

  const addCentre = useCentreStore((state) => state.addCentre);

  const createExamOpen = useUIStore((state) => state.createExamOpen);
  const closeCreateExam = useUIStore((state) => state.closeCreateExam);
  const uploadResultsOpen = useUIStore((state) => state.uploadResultsOpen);
  const closeUploadResults = useUIStore((state) => state.closeUploadResults);

  return (
    <>
      <AddCandidateModal
        isOpen={addCandidateOpen}
        onClose={closeAddCandidate}
        onAdd={(candidate) => {
          addCandidate(candidate);
          closeAddCandidate();
        }}
      />

      <AddCentreModal
        isOpen={addCentreOpen}
        onClose={closeAddCentre}
        onAdd={(centre) => {
          addCentre(centre);
          closeAddCentre();
        }}
      />

      <CreateExamModal isOpen={createExamOpen} onClose={closeCreateExam} />
      <UploadResultsModal
        isOpen={uploadResultsOpen}
        onClose={closeUploadResults}
      />
    </>
  );
}
