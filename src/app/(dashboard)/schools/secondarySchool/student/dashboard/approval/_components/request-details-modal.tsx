"use client";

// components/approval/RequestDetailsModal.tsx
import { LeaveRequest } from "../approval-data";
import { X, Download } from "lucide-react";

interface Props {
  request: LeaveRequest;
  onClose: () => void;
}

const statusStyles: Record<string, string> = {
  Approved: "text-green-500",
  Rejected: "text-red-500",
  Pending: "text-orange-400",
};

export default function RequestDetailsModal({ request, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <h2 className="text-lg font-semibold text-gray-900">Request Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 pb-6 space-y-5">
          {/* Status row */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-gray-800 w-32">Status:</span>
              <span className={`font-semibold ${statusStyles[request.status]}`}>
                {request.status}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-gray-800 w-32">Approved By:</span>
              <span className="text-gray-600">{request.approvedBy}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-gray-800 w-32">Date Submitted:</span>
              <span className="text-gray-600">{request.dateSubmitted}</span>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Leave details */}
          <div className="space-y-1.5">
            <p className="text-sm font-semibold text-gray-800 mb-2">Leave Details</p>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-gray-800 w-32">Request Type:</span>
              <span className="text-gray-600">{request.requestType}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-gray-800 w-32">Leave Date</span>
              <span className="text-gray-600">{request.leaveDate}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-gray-800 w-32">Return Date</span>
              <span className="text-gray-600">{request.returnDate}</span>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Reason */}
          <div>
            <p className="text-sm font-semibold text-gray-800 mb-1.5">
              Reason for Leave
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">{request.reason}</p>
          </div>

          {/* Admin comment */}
          {request.adminComment && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
              <p className="text-sm text-blue-700">
                <span className="font-semibold">Admin Comments:</span>{" "}
                {request.adminComment}
              </p>
            </div>
          )}

          {/* Footer buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="px-6 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <button className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              Download Approval
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}