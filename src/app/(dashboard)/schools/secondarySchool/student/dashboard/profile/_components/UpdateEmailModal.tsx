"use client";
// components/profile/UpdateEmailModal.tsx
import { X } from "lucide-react";

interface Props {
  onClose: () => void;
}

export default function UpdateEmailModal({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/30">
      <div className="bg-white h-full w-full max-w-sm shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-[28px] font-semibold text-[#000000]">Update Email</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 hover:cursor-pointer transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 px-6 py-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Current Email
            </label>
            <input
              type="email"
              defaultValue="samuel@student.edu"
              readOnly
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              New Email
            </label>
            <input
              type="email"
              placeholder="Enter new email"
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2E8BC0] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Confirm Email
            </label>
            <input
              type="email"
              placeholder="Confirm new email"
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2E8BC0] focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 hover:cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button className="px-5 py-2 text-sm font-medium text-white bg-[#2E8BC0] hover:bg-blue-600 hover:cursor-pointer rounded-lg transition-colors">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
