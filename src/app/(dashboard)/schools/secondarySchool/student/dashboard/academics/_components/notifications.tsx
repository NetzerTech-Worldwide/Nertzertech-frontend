import React from "react";
import { Bell, AlertCircle, CheckCircle2, Info } from "lucide-react";

interface Notification {
  icon: React.ReactNode;
  text: string;
  type: "warning" | "success" | "info";
}

const notifications: Notification[] = [
  {
    icon: <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />,
    text: "No more failures on Feb 15",
    type: "warning",
  },
  {
    icon: <Info className="w-3.5 h-3.5 flex-shrink-0" />,
    text: "Attendance report due Feb 6",
    type: "info",
  },
  {
    icon: <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />,
    text: "Perfect week! 4th week present",
    type: "success",
  },
  {
    icon: <Bell className="w-3.5 h-3.5 flex-shrink-0" />,
    text: "Attendance schedule available for Jan",
    type: "info",
  },
];

const typeStyles = {
  warning: "text-orange-500",
  success: "text-green-500",
  info: "text-blue-500",
};

export const Notifications = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 flex-1">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Notifications</h3>
      <div className="space-y-3">
        {notifications.map((n, i) => (
          <div key={i} className={`flex items-start gap-2 text-xs ${typeStyles[n.type]}`}>
            {n.icon}
            <span className="text-gray-600 leading-relaxed">{n.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};