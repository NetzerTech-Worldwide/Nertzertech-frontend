"use client";
// components/profile/sections/AccountSecurity.tsx
import { useState } from "react";
import { Lock, Mail, Bell, Shield, Clock, ChevronRight } from "lucide-react";
import type { SessionDevice } from "../profileData";
import ChangePasswordModal from "./CahngePasswordModel";
import UpdateEmailModal from "./UpdateEmailModal";
import SessionHistoryModal from "./SessionHistory";

type ModalType = "changePassword" | "updateEmail" | "sessionHistory" | null;

interface Props {
  devices: SessionDevice[];
}

export default function AccountSecurity({ devices }: Props) {
  const [modal, setModal] = useState<ModalType>(null);

  const items = [
    {
      icon: <Lock className="w-4 h-4 " />,
      label: "Change Password",
      action: () => setModal("changePassword"),
    },
    {
      icon: <Mail className="w-4 h-4 " />,
      label: "Update Email",
      action: () => setModal("updateEmail"),
    },
    {
      icon: <Bell className="w-4 h-4 " />,
      label: "Notification Preferences",
      action: () => {},
    },
    {
      icon: <Shield className="w-4 h-4 " />,
      label: "Privacy Settings",
      action: () => {},
    },
    {
      icon: <Clock className="w-4 h-4 " />,
      label: "Session History",
      action: () => setModal("sessionHistory"),
    },
  ];

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h3 className="text-[28px] font-semibold text-black mb-2">
          Account &amp; Security
        </h3>
        <div className="divide-y divide-gray-100">
          {items.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className="w-full flex items-center justify-between py-3.5 hover:bg-gray-50 hover:cursor-pointer -mx-2 px-2 rounded-lg transition-colors group"
            >
              <div className="flex items-center gap-3 ">
                <span className="text-[#2A7EAF] font-[400] text-[20px] ">{item.icon}</span>
                <span className="text-sm text-gray-700 font-[400] text-[20px]=">{item.label}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {modal === "changePassword" && (
        <ChangePasswordModal onClose={() => setModal(null)} />
      )}
      {modal === "updateEmail" && (
        <UpdateEmailModal onClose={() => setModal(null)} />
      )}
      {modal === "sessionHistory" && (
        <SessionHistoryModal devices={devices} onClose={() => setModal(null)} />
      )}
    </>
  );
}
