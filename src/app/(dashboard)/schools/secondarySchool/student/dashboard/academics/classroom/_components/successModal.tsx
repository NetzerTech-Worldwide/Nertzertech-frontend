"use client";
import React from "react";
import { Check } from "lucide-react";

interface SuccessModalProps {
  title: string;
  message: string;
  primaryLabel: string;
  secondaryLabel?: string;
  onPrimary: () => void;
  onSecondary?: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  title,
  message,
  primaryLabel,
  secondaryLabel,
  onPrimary,
  onSecondary,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 flex flex-col items-center text-center gap-5">
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-2 border-dashed border-emerald-300 flex items-center justify-center">
            <Check className="w-6 h-6 text-emerald-600" />
          </div>
        </div>

        {/* Content */}
        <div>
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-500 mt-2 whitespace-pre-line">{message}</p>
        </div>

        {/* Actions */}
        <div className={`flex gap-3 w-full ${secondaryLabel ? "" : "justify-center"}`}>
          {secondaryLabel && (
            <button
              onClick={onSecondary}
              className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              {secondaryLabel}
            </button>
          )}
          <button
            onClick={onPrimary}
            className={`${secondaryLabel ? "flex-1" : "px-6"} py-2.5 bg-[#216388] hover:bg-[#1a5070] text-white rounded-xl text-sm font-semibold transition-colors`}
          >
            {primaryLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
