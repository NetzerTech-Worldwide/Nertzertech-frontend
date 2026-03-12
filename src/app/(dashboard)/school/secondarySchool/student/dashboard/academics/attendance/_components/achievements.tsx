import React from "react";
import { Award, Star, Shield, Zap } from "lucide-react";

interface Achievement {
  icon: React.ReactNode;
  title: string;
  desc: string;
  color: string;
  bg: string;
}

const achievements: Achievement[] = [
  {
    icon: <Award className="w-4 h-4" />,
    title: "Perfect Week",
    desc: "5 days present",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
  {
    icon: <Star className="w-4 h-4" />,
    title: "Excellent Learner",
    desc: "90%+ attendance",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: <Shield className="w-4 h-4" />,
    title: "8-Day Streak",
    desc: "No absences",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: <Zap className="w-4 h-4" />,
    title: "No Absence",
    desc: "This semester",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

export const Achievements = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 flex-1">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Achievements</h3>
      <div className="space-y-2.5">
        {achievements.map((a) => (
          <div key={a.title} className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${a.bg} ${a.color}`}>
              {a.icon}
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-700">{a.title}</p>
              <p className="text-[11px] text-gray-400">{a.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};