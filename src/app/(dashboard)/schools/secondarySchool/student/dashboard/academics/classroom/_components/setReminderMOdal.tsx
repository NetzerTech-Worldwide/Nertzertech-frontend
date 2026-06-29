"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import type { LiveSessionDto, ReminderForm, ReminderType, RepeatOption } from "@/types/academic-classroom";

interface SetReminderModalProps {
  cls: LiveSessionDto;
  onClose: () => void;
  onSuccess: (cls: LiveSessionDto, form: ReminderForm) => void;
}

const REMINDER_TYPES: ReminderType[] = ["Class Session", "Assignment", "Exam/Test"];
const REPEAT_OPTIONS: RepeatOption[] = ["Once", "Daily", "Weekly"];

export const SetReminderModal: React.FC<SetReminderModalProps> = ({ cls, onClose, onSuccess }) => {
  const [form, setForm] = useState<ReminderForm>({
    type: "Class Session",
    title: "",
    date: "Fri, Oct 25",
    repeat: "Once",
    time: "2:00 PM",
    description: "",
    channels: ["inWebsite"],
  });

  const toggleChannel = (channel: ReminderForm["channels"][number]) => {
    setForm((prev) => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter((c) => c !== channel)
        : [...prev.channels, channel],
    }));
  };

  const handleSubmit = () => {
    onSuccess(cls, form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Set Reminder</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-5 flex flex-col gap-5">
          {/* Type toggle */}
          <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
            {REMINDER_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setForm((p) => ({ ...p, type }))}
                className={`flex-1 py-1.5 px-2 text-xs font-semibold rounded-md transition-colors ${
                  form.type === type
                    ? "bg-[#216388] text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Title + Date */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-600">Reminder Title</label>
              <input
                type="text"
                placeholder={`E.g ${cls.subject} Class`}
                value={form.title}
                onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#216388]/30 focus:border-[#216388]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-600">Date</label>
              <input
                type="text"
                value={form.date}
                onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#216388]/30 focus:border-[#216388]"
              />
            </div>
          </div>

          {/* Repeat + Time */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-600">Repeat</label>
              <select
                value={form.repeat}
                onChange={(e) => setForm((p) => ({ ...p, repeat: e.target.value as RepeatOption }))}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#216388]/30 focus:border-[#216388] bg-white"
              >
                {REPEAT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-600">Time</label>
              <select
                value={form.time}
                onChange={(e) => setForm((p) => ({ ...p, time: e.target.value }))}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#216388]/30 focus:border-[#216388] bg-white"
              >
                {["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM"].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-600">Description</label>
            <textarea
              placeholder="Add a note about this reminder..."
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              rows={3}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#216388]/30 focus:border-[#216388] resize-none"
            />
          </div>

          {/* Notification Channel */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-gray-600">Notification Channel</label>
            <div className="flex items-center gap-5">
              {(
                [
                  { key: "inWebsite", label: "In website" },
                  { key: "email", label: "Email" },
                  { key: "sms", label: "SMS" },
                ] as const
              ).map(({ key, label }) => (
                <label key={key} className="flex items-center gap-1.5 text-sm text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.channels.includes(key)}
                    onChange={() => toggleChannel(key)}
                    className="w-4 h-4 rounded accent-[#216388]"
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 pb-6">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-2.5 bg-[#216388] hover:bg-[#1a5070] text-white rounded-xl text-sm font-semibold transition-colors"
          >
            Set reminder
          </button>
        </div>
      </div>
    </div>
  );
};