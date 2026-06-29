"use client";
// components/profile/SessionHistoryModal.tsx
import { X, Monitor, Smartphone } from "lucide-react";
import type { SessionDevice } from "../profileData";

interface Props {
  devices: SessionDevice[];
  onClose: () => void;
}

export default function SessionHistoryModal({ devices, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/30">
      <div className="bg-white h-full w-full max-w-sm shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-[28px] font-semibold text-[#000000]">Session History</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Device list */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {devices.map((device) => {
            const isPhone =
              device.device.toLowerCase().includes("iphone") ||
              device.device.toLowerCase().includes("android");
            return (
              <div
                key={device.id}
                className="border border-gray-100 rounded-xl p-4"
              >
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-2">
                    {isPhone ? (
                      <Smartphone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    ) : (
                      <Monitor className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    )}
                    <span className="text-sm font-semibold text-gray-800">
                      {device.device}
                    </span>
                  </div>
                  {device.isActive && (
                    <span className="text-xs font-medium text-white bg-green-500 px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 ml-6">
                  {device.browser} &bull; {device.location}
                </p>
                <p className="text-xs text-gray-400 ml-6 mt-0.5">{device.date}</p>
                <div className="mt-3 ml-6">
                  <button className="text-sm font-medium text-gray-700 border border-gray-200 px-4 py-1.5 rounded-lg hover:bg-gray-50 hover:cursor-pointer transition-colors">
                    Logout
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 hover:cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button className="px-5 py-2 text-sm font-medium text-white bg-[#2E8BC0] hover:bg-blue-600 hover:cursor-pointer rounded-lg transition-colors">
            Logout All Devices
          </button>
        </div>
      </div>
    </div>
  );
}
