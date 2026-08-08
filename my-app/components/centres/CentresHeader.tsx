"use client";

import { Plus } from "lucide-react";

type Props = {
  onAdd: () => void;
};

export default function CentresHeader({ onAdd }: Props) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold">
          Examination Centres
        </h1>

        <p className="text-sm opacity-60">
          Manage examination centres and their details
        </p>
      </div>

      <button
        type="button"
        onClick={onAdd}
        className="
          inline-flex
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-cyan-500
          px-4
          py-2
          text-sm
          font-semibold
          text-black
          transition
          hover:bg-cyan-400
        "
      >
        <Plus size={18} />
        Add Centre
      </button>
    </div>
  );
}