"use client";

import { useState, useRef } from "react";
import { X, Upload, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import type { TicketCategory } from "../lib/support-data";
import { CATEGORIES } from "../lib/support-data";

interface SubmitTicketModalProps {
  open: boolean;
  onClose: () => void;
  defaultCategory?: TicketCategory;
}

type FormState = "idle" | "submitting" | "success" | "error";

export default function SubmitTicketModal({
  open,
  onClose,
  defaultCategory,
}: SubmitTicketModalProps) {
  const [category, setCategory] = useState<TicketCategory | "">(
    defaultCategory ?? ""
  );
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);

  function validate() {
    const e: Record<string, string> = {};
    if (!category) e.category = "Please select a category.";
    if (!subject.trim()) e.subject = "Subject is required.";
    if (!description.trim()) e.description = "Description is required.";
    return e;
  }

  function resetForm() {
    setCategory(defaultCategory ?? "");
    setSubject("");
    setDescription("");
    setFile(null);
    setErrors({});
    setFormState("idle");
  }

  function handleClose() {
    resetForm();
    onClose();
  }

  async function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});
    setFormState("submitting");

    try {
      // Dummy API call — replace with real endpoint
      const formData = new FormData();
      formData.append("category", category);
      formData.append("subject", subject);
      formData.append("description", description);
      if (file) formData.append("attachment", file);

      // Simulated delay to mimic real API
      await new Promise((r) => setTimeout(r, 1500));

      // Uncomment and replace with real endpoint:
      // const res = await fetch("/api/support/tickets", {
      //   method: "POST",
      //   body: formData,
      // });
      // if (!res.ok) throw new Error("Submission failed");

      setFormState("success");
    } catch {
      setFormState("error");
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Submit a Support Request
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              We typically respond within 1–2 business days.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Success state */}
        {formState === "success" ? (
          <div className="flex flex-col items-center justify-center py-14 px-6 text-center">
            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-4">
              <CheckCircle className="h-7 w-7 text-green-500" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">
              Request submitted
            </h3>
            <p className="text-sm text-gray-500 max-w-xs">
              Your ticket has been received. You can track its status in{" "}
              <span className="text-[#2A7EAF] font-medium">Ticket History</span>.
            </p>
            <button
              onClick={handleClose}
              className="mt-6 px-5 py-2 rounded-lg bg-[#2A7EAF] text-white text-sm font-medium hover:bg-[#175F89] transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            {/* Form */}
            <div className="px-6 py-5 space-y-4 max-h-[65vh] overflow-y-auto">
              {formState === "error" && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-lg px-3 py-2.5">
                  <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
                  <p className="text-xs text-red-600">
                    Something went wrong. Please try again.
                  </p>
                </div>
              )}

              {/* Category */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Issue Category
                </label>
                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value as TicketCategory)
                  }
                  className={`w-full rounded-lg border px-3 py-2.5 text-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2A7EAF]/30 focus:border-[#2A7EAF] transition-colors ${
                    errors.category
                      ? "border-red-300"
                      : "border-gray-200"
                  }`}
                >
                  <option value="">Select a category</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.label} value={c.label}>
                      {c.label}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-xs text-red-500 mt-1">{errors.category}</p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Brief summary of your issue"
                  className={`w-full rounded-lg border px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2A7EAF]/30 focus:border-[#2A7EAF] transition-colors ${
                    errors.subject ? "border-red-300" : "border-gray-200"
                  }`}
                />
                {errors.subject && (
                  <p className="text-xs text-red-500 mt-1">{errors.subject}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  placeholder="Provide detailed information about your issue..."
                  className={`w-full rounded-lg border px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#2A7EAF]/30 focus:border-[#2A7EAF] transition-colors ${
                    errors.description ? "border-red-300" : "border-gray-200"
                  }`}
                />
                {errors.description && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* File upload */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Attach File{" "}
                  <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <div
                  ref={dragRef}
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => fileInputRef.current?.click()}
                  className="border border-dashed border-gray-200 rounded-lg px-4 py-6 flex flex-col items-center justify-center cursor-pointer hover:border-[#2A7EAF] hover:bg-[#2A7EAF]/[0.02] transition-colors"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".png,.jpg,.jpeg,.pdf"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  />
                  {file ? (
                    <div className="flex items-center gap-2 text-sm text-[#2A7EAF]">
                      <CheckCircle className="h-4 w-4" />
                      <span className="font-medium truncate max-w-[220px]">
                        {file.name}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setFile(null);
                        }}
                        className="text-gray-400 hover:text-gray-600 ml-1"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-5 w-5 text-gray-300 mb-2" />
                      <p className="text-xs text-gray-500">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        PNG, JPG, PDF up to 10 MB
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50">
              <button
                onClick={handleClose}
                className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleSubmit}
                disabled={formState === "submitting"}
                className="px-5 py-2 rounded-lg bg-[#2A7EAF] text-white text-sm font-medium hover:bg-[#175F89] disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {formState === "submitting" ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  "Submit request"
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}