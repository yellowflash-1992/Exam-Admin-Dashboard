

type Props = {
  onAdd: () => void;
};



import { Plus, Download, Upload } from "lucide-react";

export default function CandidatesHeader({
  onAdd,
}: Props) {

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

      <div>
        <h1 className="text-3xl font-bold">
          Candidates
        </h1>

        <p className="text-sm opacity-60 mt-1">
          Manage all registered examination candidates.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">

        <button className="px-4 py-2 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:bg-[var(--muted)] flex items-center gap-2">
          <Upload size={18}/>
          Import
        </button>

        <button className="px-4 py-2 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:bg-[var(--muted)] flex items-center gap-2">
          <Download size={18}/>
          Export
        </button>

        <button className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400
         text-black font-semibold flex items-center gap-2" onClick={onAdd}>
          <Plus size={18}/>
          Add Candidate
        </button>

      </div>

    </div>
  );
}