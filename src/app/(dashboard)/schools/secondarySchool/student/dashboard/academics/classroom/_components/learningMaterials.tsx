"use client";
import React from "react";
import { Users, FileText } from "lucide-react";
import type { LearningMaterialDto } from "@/types/academic-classroom";
import { DEMO_MATERIALS } from "../demoData";

// ─── Split materials by type ──────────────────────────────────────────────────
const VIDEO_TYPES: LearningMaterialDto["fileType"][] = ["video", "audio"];
const DOC_TYPES: LearningMaterialDto["fileType"][] = ["pdf", "doc", "image"];

interface LearningMaterialsProps {
  // TODO: replace with API data
  materials?: LearningMaterialDto[];
}

const VideoCard: React.FC<{ material: LearningMaterialDto; isActive?: boolean }> = ({
  material,
  isActive,
}) => (
  <div
    className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${
      isActive
        ? "border-[#216388] bg-blue-50/40"
        : "border-gray-200 bg-white hover:border-gray-300"
    }`}
  >
    <div className="flex flex-col gap-1 min-w-0">
      <h4 className="text-sm font-semibold text-gray-800 truncate">{material.name}</h4>
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <span>Mathematics</span>
        {material.duration && (
          <>
            <span>·</span>
            <span>{material.duration}</span>
          </>
        )}
      </div>
      <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
        <Users className="w-3.5 h-3.5" />
        <span>{material.views} View</span>
      </div>
    </div>
    <button className="ml-4 flex-shrink-0 px-4 py-2 bg-[#216388] hover:bg-[#1a5070] text-white text-xs font-semibold rounded-lg transition-colors">
      {isActive ? "Continue" : "View"}
    </button>
  </div>
);

const DocCard: React.FC<{ material: LearningMaterialDto }> = ({ material }) => (
  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-white hover:border-gray-300 transition-colors">
    <div className="flex flex-col gap-1 min-w-0">
      <h4 className="text-sm font-semibold text-gray-800 truncate">{material.name}</h4>
      <div className="flex items-center gap-1 text-xs text-red-500">
        <FileText className="w-3 h-3" />
        <span>PDF · 22 Pages</span>
      </div>
      <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
        <Users className="w-3.5 h-3.5" />
        <span>{material.views} View</span>
      </div>
    </div>
    <button className="ml-4 flex-shrink-0 px-4 py-2 bg-[#216388] hover:bg-[#1a5070] text-white text-xs font-semibold rounded-lg transition-colors">
      View
    </button>
  </div>
);

export const LearningMaterials: React.FC<LearningMaterialsProps> = ({
  materials = DEMO_MATERIALS,
}) => {
  const videos = materials.filter((m) => VIDEO_TYPES.includes(m.fileType));
  const docs = materials.filter((m) => DOC_TYPES.includes(m.fileType));

  return (
    <div className="border border-gray-200 rounded-xl p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ── Video Lecture ── */}
        <div>
          <h3 className="text-base font-bold text-gray-800 mb-4">Video Lecture</h3>
          <div className="flex flex-col gap-3">
            {videos.map((m, i) => (
              <VideoCard key={m.id} material={m} isActive={i === 0} />
            ))}
          </div>
        </div>

        {/* ── Study Guide ── */}
        <div>
          <h3 className="text-base font-bold text-gray-800 mb-4">Study Guide</h3>
          <div className="flex flex-col gap-3">
            {docs.map((m) => (
              <DocCard key={m.id} material={m} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};