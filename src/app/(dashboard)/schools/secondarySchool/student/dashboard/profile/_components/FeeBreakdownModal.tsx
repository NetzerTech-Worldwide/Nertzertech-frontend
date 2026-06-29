"use client";
// components/profile/FeeBreakdownModal.tsx
import { X, Download } from "lucide-react";
import type { FeeBreakdown } from "../profileData";

interface Props {
  breakdown: FeeBreakdown;
  onClose: () => void;
}

function formatNaira(amount: number) {
  return "₦" + amount.toLocaleString("en-NG");
}

export default function FeeBreakdownModal({ breakdown, onClose }: Props) {
  const subtotal = breakdown.items.reduce((sum, i) => sum + i.amount, 0);
  const outstanding = subtotal - breakdown.amountPaid;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <h2 className="text-[28px] font-semibold text-[#000000]">Fee Breakdown</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 hover:cursor-pointer transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 pb-6 space-y-5">
          {/* Session + Term */}
          <div className="bg-gray-50 rounded-xl p-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-400 mb-1">Academic Session</p>
              <p className="text-lg font-bold text-gray-900">{breakdown.academicSession}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Term</p>
              <p className="text-lg font-bold text-gray-900">{breakdown.term}</p>
            </div>
          </div>

          {/* Fee Items */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Fee Items</p>
            <div className="border border-gray-100 rounded-xl overflow-hidden">
              <div className="grid grid-cols-2 bg-gray-50 px-4 py-2.5 border-b border-gray-100">
                <span className="text-xs font-semibold text-gray-600">Item</span>
                <span className="text-xs font-semibold text-gray-600 text-right">Amount</span>
              </div>
              {breakdown.items.map((item, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-2 px-4 py-3 ${
                    i !== breakdown.items.length - 1 ? "border-b border-gray-100" : ""
                  }`}
                >
                  <span className="text-sm text-gray-700">{item.item}</span>
                  <span className="text-sm text-gray-700 text-right">{formatNaira(item.amount)}</span>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-3 space-y-1.5 px-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Subtotal</span>
                <span className="text-sm text-gray-700">{formatNaira(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Amount Paid</span>
                <span className="text-sm text-green-600">-{formatNaira(breakdown.amountPaid)}</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                <span className="text-sm font-semibold text-gray-800">Outstanding Balance</span>
                <span className={`text-sm font-semibold ${outstanding <= 0 ? "text-green-600" : "text-red-500"}`}>
                  {formatNaira(outstanding <= 0 ? 0 : outstanding)}
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="px-6 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 hover:cursor-pointer transition-colors"
            >
              Close
            </button>
            <button className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-[#2E8BC0] hover:bg-blue-600 hover:cursor-pointer rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              Download Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
