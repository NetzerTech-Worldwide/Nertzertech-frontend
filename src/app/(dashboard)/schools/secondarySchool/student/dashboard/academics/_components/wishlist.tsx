"use client";
import React from "react";
import { Heart } from "lucide-react";

export const Wishlist = () => (
  <div className="flex flex-col items-center justify-center py-16 text-gray-400 gap-3">
    <Heart className="w-12 h-12 opacity-30" />
    <p className="text-sm font-medium">Your Wishlist is Empty</p>
    <p className="text-xs">Heart a book while browsing to save it here.</p>
  </div>
);