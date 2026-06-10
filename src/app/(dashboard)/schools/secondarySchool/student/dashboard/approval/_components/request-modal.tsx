"use client";

// components/approval/RequestLeaveModal.tsx
import { X, Upload } from "lucide-react";
import { useState } from "react";

interface Props {
  onClose: () => void;
}

export default function RequestLeaveModal({ onClose }: Props) {
  const [dragOver, setDragOver] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <h2 className="text-lg font-semibold text-gray-900">Request Leave</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 pb-6 space-y-5">
          {/* Request Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Request Type
            </label>
            <input
              type="text"
              placeholder="Describe your request type"
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* Start Date + End Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Start Date
              </label>
              <input
                type="date"
                placeholder="mm/dd/yyyy"
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                End Date
              </label>
              <input
                type="date"
                placeholder="mm/dd/yyyy"
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Reason for Leave */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Reason for Leave
            </label>
            <textarea
              rows={3}
              placeholder="Please provide a detailed reason for your leave request"
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Supporting Documents */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Supporting Documents{" "}
              <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
              className={`border-2 border-dashed rounded-lg py-8 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                dragOver
                  ? "border-teal-400 bg-teal-50"
                  : "border-gray-300 bg-white hover:bg-gray-50"
              }`}
            >
              <Upload className="w-5 h-5 text-gray-400" />
              <p className="text-sm text-gray-500">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-400">PNG, JPG, PDF up to 10 MB</p>
            </div>
          </div>

          {/* Note */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
            <p className="text-sm text-blue-700 leading-relaxed">
              <span className="font-semibold">Note:</span> Your request will be
              reviewed by the administration. You will be notified once a decision
              has been made. Please ensure all information is accurate.
            </p>
          </div>

          {/* Footer buttons */}
          <div className="flex items-center justify-end gap-3 pt-1">
            <button
              onClick={onClose}
              className="px-6 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <button className="px-6 py-2 text-sm font-medium text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors">
              Submit request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}