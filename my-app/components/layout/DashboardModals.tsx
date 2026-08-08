"use client";

import AddCandidateModal from "@/components/candidates/AddCandidateModal";
import AddCentreModal from "@/components/centres/AddCentreModal";
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
    </>
  );
}
