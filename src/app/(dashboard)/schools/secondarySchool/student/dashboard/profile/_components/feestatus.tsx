"use client";
// components/profile/sections/FeeStatusCard.tsx
import { useState } from "react";
import type { FeeStatus, FeeBreakdown } from "../profileData";
import { Download } from "lucide-react";
import FeeBreakdownModal from "./FeeBreakdownModal";
import { PiNoteLight } from "react-icons/pi";

interface Props {
  fee: FeeStatus;
  breakdown: FeeBreakdown;
}

const feeStatusStyles: Record<string, string> = {
  Overdue: "bg-red-100 text-red-600",
  Paid: "bg-green-100 text-green-600",
  Pending: "bg-orange-100 text-orange-500",
};

export default function FeeStatusCard({ fee, breakdown }: Props) {
  const [showBreakdown, setShowBreakdown] = useState(false);

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-100 p-5 h-full flex flex-col shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[28px] font-semibold text-gray-900">Fee Status</h3>
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${feeStatusStyles[fee.status]}`}>
            {fee.status}
          </span>
        </div>

        {fee.status === "Overdue" && (
          <div className="bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-4">
            <p className="text-xs text-red-500">
              Payment deadline has passed. Please settle your fees to avoid penalties.
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm flex-1">
          <div>
            <p className="text-xs text-gray-400">Last Payment Date</p>
            <p className="font-semibold text-gray-800 mt-0.5">{fee.lastPaymentDate}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Next Payment For</p>
            <p className="font-semibold text-gray-800 mt-0.5">{fee.nextPaymentFor}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Amount Paid</p>
            <p className="font-semibold text-gray-800 mt-0.5">{fee.amountPaid}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Amount Due</p>
            <p className="font-semibold text-gray-800 mt-0.5">{fee.amountDue}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Payment Method</p>
            <p className="font-semibold text-gray-800 mt-0.5">{fee.paymentMethod}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Due Date</p>
            <p className="font-semibold text-gray-800 mt-0.5">{fee.dueDate}</p>
          </div>
        </div>

        <div className="flex gap-3 mt-5">
          <button
            onClick={() => setShowBreakdown(true)}
            className="flex-1 flex items-center justify-center gap-2 text-sm text-[#2A7EAF] font-medium border border-[#2A7EAF] rounded-lg py-2 hover:bg-gray-50 hover:cursor-pointer transition-colors"
          >
            <PiNoteLight />
            View Breakdown
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 text-sm text-[#2A7EAF] font-medium border border-[#2A7EAF] rounded-lg py-2 hover:bg-gray-50 hover:cursor-pointer transition-colors">
            <Download className="w-4 h-4" />
            Download Receipt
          </button>
        </div>
      </div>

      {showBreakdown && (
        <FeeBreakdownModal
          breakdown={breakdown}
          onClose={() => setShowBreakdown(false)}
        />
      )}
    </>
  );
}
