"use client";

import { useEffect, useState } from "react";
import type { Candidate } from "@/lib/types/candidate";
import { X } from "lucide-react";

type Props = {
  candidate: Candidate | null;
  onClose: () => void;
  onSave: (candidate: Candidate) => void;
};

export default function EditCandidateModal({
  candidate,
  onClose,
  onSave,
}: Props) {

  const [formData, setFormData] = useState<Candidate | null>(candidate);

const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");

 useEffect(() => {
  if (!candidate) {
    setFormData(null);
    setFirstName("");
    setLastName("");
    return;
  }

  setFormData(candidate);

  const parts = candidate.name.trim().split(" ");

  setFirstName(parts[0] ?? "");
  setLastName(parts.slice(1).join(" "));
}, [candidate]);


const handleClose = () => {
  onClose();
};

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData) return;

  onSave({
    ...formData,
    name: `${firstName} ${lastName}`.trim(),
  });

  handleClose();
};

if (!candidate || !formData) return null;



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

      <div className="w-full max-w-lg rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-xl">

        <div className="flex items-center justify-between border-b border-[var(--border)] p-4">
          <h2 className="text-xl font-semibold">
            Edit Candidate
          </h2>


<button
             onClick={handleClose}
            className="rounded-lg p-2 hover:bg-[var(--muted)]"
          >
            <X size={18} />
          </button>
        </div>


          <form onSubmit={handleSubmit}>

        <div className="space-y-4 p-4">

         <div className="grid grid-cols-2 gap-4">

  <div className="space-y-2">
    <label className="text-sm font-medium">
      First Name
    </label>

    <input
      value={firstName}
      onChange={(e) => setFirstName(e.target.value)}
      className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
    />
  </div>

  <div className="space-y-2">
    <label className="text-sm font-medium">
      Last Name
    </label>

    <input
      value={lastName}
      onChange={(e) => setLastName(e.target.value)}
      className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
    />
  </div>

</div>
         <div className="grid grid-cols-2 gap-4">

  <div className="space-y-2">
    <label className="text-sm font-medium">
      Exam
    </label>

    <input
      value={formData.exam}
      onChange={(e) =>
        setFormData({
          ...formData,
          exam: e.target.value,
        })
      }
      className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
    />
  </div>

  <div className="space-y-2">
    <label className="text-sm font-medium">
      State
    </label>

    <input
      value={formData.state}
      onChange={(e) =>
        setFormData({
          ...formData,
          state: e.target.value,
        })
      }
      className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
    />
  </div>

</div>

         <div className="grid grid-cols-2 gap-4">

  <div className="space-y-2">
    <label className="text-sm font-medium">
      Status
    </label>

    <select
      value={formData.status}
      onChange={(e) =>
        setFormData({
          ...formData,
          status: e.target.value,
        })
      }
      className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
    >
      <option>Passed</option>
      <option>Failed</option>
      <option>Pending</option>
    </select>
  </div>

  <div className="space-y-2">
    <label className="text-sm font-medium">
      Score
    </label>

    <input
      type="number"
      value={formData.score}
      onChange={(e) =>
        setFormData({
          ...formData,
          score: Number(e.target.value),
        })
      }
      className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
    />
  </div>

</div>
         <div className="space-y-2">
  <label className="text-sm font-medium">
    Center
  </label>

  <textarea
    rows={3}
    value={formData.center}
    onChange={(e) =>
      setFormData({
        ...formData,
        center: e.target.value,
      })
    }
    className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-1.5
     resize-none outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
  />
</div>

         
        </div>

       <div className="flex justify-end gap-3 border-t border-[var(--border)] p-4">

  <button
    type="button"
     onClick={handleClose}
    className="rounded-xl border border-[var(--border)] px-3 py-2 hover:bg-[var(--muted)]"
  >
    Cancel
  </button>

  <button
    type="submit"
    className="rounded-xl bg-cyan-500 px-3 py-2 font-semibold text-white hover:bg-cyan-600"
  >
    Save Changes
  </button>

</div>

</form>
      </div>

    </div>
  );
}