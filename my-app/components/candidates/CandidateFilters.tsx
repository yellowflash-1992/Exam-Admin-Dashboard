"use client";

type Props = {
  search: string;
  setSearch: (value: string) => void;

  exam: string;
  setExam: (value: string) => void;

  state: string;
  setState: (value: string) => void;

  exams: string[];
  states: string[];
};

export default function CandidateFilters({
  search,
  setSearch,
  exam,
  setExam,
  state,
  setState,
  exams,
  states,
}: Props) {
  return (
    <div className="flex flex-col lg:flex-row gap-4">

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search candidate..."
        className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3"
      />

      <select
        value={exam}
        onChange={(e) => setExam(e.target.value)}
        className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-4"
      >
        <option value="">All Exams</option>
        {/* <option>WAEC</option>
        <option>JAMB</option>
        <option>NECO</option>
        <option>NABTEB</option> */}

         {exams.map((exam) => (
    <option key={exam} value={exam}>
      {exam}
    </option>
  ))}
      </select>

      <select
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-4"
      >
        <option value="">All States</option>
        {/* <option>Lagos</option>
        <option>Kano</option>
        <option>Kaduna</option>
        <option>Abuja</option> */}

         {states.map((state) => (
    <option key={state} value={state}>
      {state}
    </option>
  ))}
      </select>

    </div>
  );
}