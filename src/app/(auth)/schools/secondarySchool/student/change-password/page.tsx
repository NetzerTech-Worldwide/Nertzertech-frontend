"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";

export default function ChangePassword() {
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [done, setDone] = useState(false);
  const router = useRouter();

  const passwordsMatch = newPass && confirmPass && newPass === confirmPass;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordsMatch) setDone(true);
  };

  const goToDashboard = () => {
    router.push("/schools/secondarySchool/student/dashboard");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/10 px-4 py-6 backdrop-blur-[2px]">
      {!done ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full max-w-md rounded-xl shadow-xl p-5 sm:p-6 space-y-4 text-center"
        >
          <h2 className="text-xl font-semibold text-gray-900">Change Password</h2>
          <p className="text-sm text-gray-500">
            Change password to access your dashboard
          </p>

          {/* New Password */}
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-[#135D96]"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-[#135D96]"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={!passwordsMatch}
            className={`w-full py-2.5 rounded-md text-sm font-medium text-white ${
              passwordsMatch
                ? "bg-[#135D96] hover:bg-[#0f4c7a]"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Change Password
          </button>
        </form>
      ) : (
        <div className="bg-white w-full max-w-sm rounded-xl shadow-xl p-5 sm:p-6 text-center space-y-3">
          <div className="mx-auto w-16 h-16 bg-[#EAF3F9] rounded-full flex items-center justify-center">
            <CheckCircle2 className="text-[#135D96]" size={40} />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Password Changed!</h2>
          <p className="text-sm text-gray-500">
            You can log in with the new password whenever you want to access your
            portal.
          </p>
          <button
            onClick={goToDashboard}
            className="mt-2 w-full py-2.5 bg-[#135D96] hover:bg-[#0f4c7a] text-white text-sm font-medium rounded-md"
          >
            Go to dashboard
          </button>
        </div>
      )}
    </div>
  );
}

