// note: This component (is no more in use) in the candidates page to display pagination controls.
type Props = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}: Props) {
  return (
    <div className="flex items-center justify-between mt-6">
      <p className="text-sm opacity-60">
        Page {currentPage} of {totalPages}
      </p>

      <div className="flex gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-4 py-2 rounded-lg border border-[var(--border)] disabled:opacity-40"
        >
          Previous
        </button>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-4 py-2 rounded-lg border border-[var(--border)] disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
