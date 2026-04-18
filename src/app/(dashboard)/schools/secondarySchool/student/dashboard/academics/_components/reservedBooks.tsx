"use client";
import React from "react";
import { BookMarked } from "lucide-react";

export const ReservedBooks = () => (
  <div className="flex flex-col items-center justify-center py-16 text-gray-400 gap-3">
    <BookMarked className="w-12 h-12 opacity-30" />
    <p className="text-sm font-medium">No Reserved Books</p>
    <p className="text-xs">Books you reserve will appear here.</p>
  </div>
);