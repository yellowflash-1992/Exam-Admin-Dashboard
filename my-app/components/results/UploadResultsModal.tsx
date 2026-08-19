"use client";

import { FileUp, X } from "lucide-react";
import { useState } from "react";

type Props = { isOpen: boolean; onClose: () => void };

export default function UploadResultsModal({ isOpen, onClose }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  if (!isOpen) return null;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) {
      setError("Choose a CSV file first.");
      return;
    }
    setUploading(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch("/api/results", {
        method: "POST",
        headers: { "Content-Type": "text/csv" },
        body: await file.text(),
      });
      const data = (await response.json()) as {
        error?: string;
        imported?: number;
        skipped?: number;
      };
      if (!response.ok)
        throw new Error(data.error || "Failed to upload results.");
      setMessage(
        `Imported ${data.imported ?? 0} result${data.imported === 1 ? "" : "s"}. ${data.skipped ?? 0} row${data.skipped === 1 ? "" : "s"} skipped.`,
      );
      setFile(null);
      window.setTimeout(() => {
        onClose();
        window.location.reload();
      }, 1000);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Failed to upload results.",
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[var(--border)] p-5">
          <div>
            <h2 className="text-lg font-semibold">
              Upload examination results
            </h2>
            <p className="text-sm opacity-60">
              Import a CSV and match rows to candidates and examinations.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-[var(--muted)]"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 p-5">
          <div className="rounded-xl border border-dashed border-cyan-500/40 bg-cyan-500/5 p-5 text-sm">
            <p className="font-medium">Required CSV columns</p>
            <p className="mt-2 opacity-70">
              candidateNo, examinationCode, score
            </p>
            <p className="mt-1 opacity-70">
              Optional: grade, status, publishedAt
            </p>
          </div>
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[var(--border)] px-4 py-4 hover:bg-[var(--muted)]">
            <FileUp className="text-cyan-400" size={20} />
            <span className="min-w-0 flex-1 truncate text-sm">
              {file?.name || "Choose CSV file"}
            </span>
            <input
              type="file"
              accept=".csv,text/csv"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="sr-only"
            />
          </label>
          {error && (
            <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
              {error}
            </p>
          )}
          {message && (
            <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
              {message}
            </p>
          )}
          <div className="flex justify-end gap-3 border-t border-[var(--border)] pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[var(--border)] px-4 py-2 text-sm hover:bg-[var(--muted)]"
            >
              Cancel
            </button>
            <button
              disabled={uploading}
              className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400 disabled:opacity-60"
            >
              {uploading ? "Uploading..." : "Upload results"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
