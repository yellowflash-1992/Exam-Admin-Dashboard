import { create } from "zustand";

interface UIStore {
  addCandidateOpen: boolean;
  addCentreOpen: boolean;
  createExamOpen: boolean;
  uploadResultsOpen: boolean;

  openAddCandidate: () => void;
  closeAddCandidate: () => void;

  openAddCentre: () => void;
  closeAddCentre: () => void;

  openCreateExam: () => void;
  closeCreateExam: () => void;

  openUploadResults: () => void;
  closeUploadResults: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  addCandidateOpen: false,
  addCentreOpen: false,
  createExamOpen: false,
  uploadResultsOpen: false,

  openAddCandidate: () =>
    set({
      addCandidateOpen: true,
    }),

  closeAddCandidate: () =>
    set({
      addCandidateOpen: false,
    }),

  openAddCentre: () =>
    set({
      addCentreOpen: true,
    }),

  closeAddCentre: () =>
    set({
      addCentreOpen: false,
    }),

  openCreateExam: () =>
    set({
      createExamOpen: true,
    }),

  closeCreateExam: () =>
    set({
      createExamOpen: false,
    }),

  openUploadResults: () =>
    set({
      uploadResultsOpen: true,
    }),

  closeUploadResults: () =>
    set({
      uploadResultsOpen: false,
    }),
}));
