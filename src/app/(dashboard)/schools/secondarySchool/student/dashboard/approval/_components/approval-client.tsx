"use client";

// components/approval/ApprovalClient.tsx
import { useState } from "react";
import { LeaveRequest, LeaveStatus } from "../approval-data";
import RequestDetailsModal from "./request-details-modal";
import RequestLeaveModal from "./request-modal";
import { Plus } from "lucide-react";

type Tab = "All" | "Pending" | "Approved" | "Rejected";

const tabs: Tab[] = ["All", "Pending", "Approved", "Rejected"];

const statusStyles: Record<LeaveStatus, string> = {
  Pending: "text-orange-400",
  Approved: "text-green-500",
  Rejected: "text-red-500",
};

interface Props {
  requests: LeaveRequest[];
}

export default function ApprovalClient({ requests }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);

  const filtered =
    activeTab === "All"
      ? requests
      : requests.filter((r) => r.status === activeTab);

  const total = requests.length;
  const pending = requests.filter((r) => r.status === "Pending").length;
  const approved = requests.filter((r) => r.status === "Approved").length;
  const rejected = requests.filter((r) => r.status === "Rejected").length;

  return (
    <>
      {/* Page header */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <h1 className="text-[28px] font-bold text-gray-900">
            Leave &amp; Absence Approval
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Request and manage leave applications
          </p>
        </div>
        <button
          onClick={() => setShowRequestModal(true)}
          className="flex items-center gap-1.5 bg-[#2A7EAF] hover:bg-teal-800 text-white text-[16px] font-[400] px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Request Leave
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-100 px-5 shadow py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Total Requests</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{total}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#194C6A] flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 px-5 py-4  shadow flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Pending</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{pending}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#FF925C] flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 px-5 py-4  shadow flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Approved</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{approved}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#31AC0E] flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <div className="bg-white rounded-xl border shadow border-gray-100 px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Rejected</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{rejected}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#A32A21] flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Tabs + table */}
      <div className="bg-white rounded-xl border border-gray-100">
        {/* Tabs */}
        <div className="flex items-center gap-1 px-4 pt-4 pb-0 border-b border-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-[20px] font-medium transition-colors relative ${
                activeTab === tab
                  ? " font-[600] text-[#2A7EAF]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#216388] rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-6 py-3 text-[16px] font-medium text-black">
                  Request Type
                </th>
                <th className="text-left px-6 py-3 text-[16px] font-medium text-black">
                  Date Submitted
                </th>
                <th className="text-left px-6 py-3 text-[16px] font-medium text-black">
                  Leave Date
                </th>
                <th className="text-left px-6 py-3 text-[16px] font-medium text-black">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-[16px] font-medium text-black">
                  Approved By
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-gray-400 text-sm">
                    No requests found.
                  </td>
                </tr>
              ) : (
                filtered.map((req, i) => (
                  <tr
                    key={req.id}
                    onClick={() => setSelectedRequest(req)}
                    className={`cursor-pointer hover:bg-gray-50 transition-colors ${
                      i !== filtered.length - 1 ? "border-b border-gray-100" : ""
                    }`}
                  >
                    <td className="px-6 py-4 text-gray-800">{req.requestType}</td>
                    <td className="px-6 py-4 text-gray-600">{req.dateSubmitted}</td>
                    <td className="px-6 py-4 text-gray-600">{req.leaveDate}</td>
                    <td className={`px-6 py-4 font-medium ${statusStyles[req.status]}`}>
                      {req.status}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{req.approvedBy}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {selectedRequest && (
        <RequestDetailsModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
        />
      )}
      {showRequestModal && (
        <RequestLeaveModal onClose={() => setShowRequestModal(false)} />
      )}
    </>
  );
}