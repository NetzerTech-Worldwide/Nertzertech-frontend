// components/profile/sections/RecentActivity.tsx
import type { ActivityItem } from "../profileData";
import { ClipboardList, CreditCard, CheckCircle2 } from "lucide-react";

interface Props {
  activity: ActivityItem[];
}

function ActivityIcon({ type }: { type: string }) {
  switch (type) {
    case "payment":
      return <CreditCard className="w-4 h-4 text-green-600" />;
    case "attendance":
      return <CheckCircle2 className="w-4 h-4 text-blue-500" />;
    default:
      return <ClipboardList className="w-4 h-4 text-teal-600" />;
  }
}

export default function RecentActivity({ activity }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-black font-bold text-[28px]">Recent Activity</h3>
        <button className="text-xs text-teal-600 hover:underline hover:cursor-pointer font-medium">
          View All
        </button>
      </div>
      <div className="divide-y divide-gray-100">
        {activity.map((item) => (
          <div key={item.id} className="flex items-center gap-3 py-3">
            <div className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
              <ActivityIcon type={item.type} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-700 truncate">{item.description}</p>
              <p className="text-xs text-gray-400 mt-0.5">{item.timeAgo}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
