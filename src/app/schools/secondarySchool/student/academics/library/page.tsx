"use client";

import { useMemo, useState } from "react";
import {
  BookOpen,
  Download,
  Search,
  Clock3,
  CalendarRange,
  ClipboardList,
  Users,
  LibraryBig,
} from "lucide-react";

type Book = {
  id: string;
  title: string;
  author: string;
  pages: number;
  size: string;
  downloads: number;
  category: string;
  format: string;
  status?: "recent" | "reading" | "available";
  isFavorite?: boolean;
};

const books: Book[] = [
  {
    id: "calc-math",
    title: "Calculus and Mathematics",
    author: "Mr. Robert Smith",
    pages: 450,
    size: "15.2 MB",
    downloads: 1250,
    category: "Mathematics",
    format: "PDF",
  },
  {
    id: "physics",
    title: "Principles of Physics",
    author: "Mrs. Sarah Johnson",
    pages: 680,
    size: "22.8 MB",
    downloads: 980,
    category: "Physics",
    format: "PDF",
    isFavorite: true,
  },
  {
    id: "org-chem",
    title: "Organic Chemistry: Structure & Function",
    author: "Dr. Michael James",
    pages: 520,
    size: "18.5 MB",
    downloads: 750,
    category: "Chemistry",
    format: "PDF",
    status: "reading",
  },
  {
    id: "world-hist",
    title: "World History: Patterns of Civilization",
    author: "Mr. Robert Smith",
    pages: 450,
    size: "35.2 MB",
    downloads: 1100,
    category: "History",
    format: "PDF",
    status: "recent",
  },
];

const tabs = [
  { key: "all", label: "Digital Books" },
  { key: "recent", label: "Recently Accessed" },
  { key: "favourites", label: "Favourites" },
];

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState<"all" | "recent" | "favourites">(
    "all"
  );
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let result = books;

    if (activeTab === "recent") {
      result = result.filter((b) => b.status === "recent" || b.status === "reading");
    } else if (activeTab === "favourites") {
      result = result.filter((b) => b.isFavorite);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q)
      );
    }

    return result;
  }, [activeTab, query]);

  return (
    <div className="min-h-screen bg-[#f6f8fb] px-4 py-6 md:px-8">
      <header className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Digital Library & Resources
          </h1>
          <p className="text-sm text-gray-500">
            Access academic books and journals.
          </p>
        </div>
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search anything here"
            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm shadow-sm focus:border-[#135D96] focus:outline-none"
          />
        </div>
      </header>

      <div className="mb-6 grid grid-cols-3 overflow-hidden rounded-lg border border-gray-200 bg-white text-sm shadow-sm">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`py-3 font-medium transition ${
                isActive
                  ? "bg-white text-[#135D96] shadow-[inset_0_-2px_0_0_#135D96]"
                  : "bg-gray-50 text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        {filtered.map((book) => (
          <article
            key={book.id}
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{book.title}</h3>
                <p className="text-sm text-gray-500">by {book.author}</p>
              </div>
              <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700">
                {book.category}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-gray-400" />
                <span>Pages: {book.pages}</span>
              </div>
              <div className="text-right font-semibold text-gray-800">
                Format: {book.format}
              </div>
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4 text-gray-400" />
                <span>Size: {book.size}</span>
              </div>
              <div className="text-right text-xs text-gray-500">
                {book.downloads.toLocaleString()} downloads
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <button className="flex-1 rounded-md bg-[#135D96] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0f4c7a]">
                {book.status === "reading" ? "Currently Reading" : "Read Online"}
              </button>
              <button
                className="flex h-11 w-11 items-center justify-center rounded-md border border-gray-200 text-gray-700 transition hover:bg-gray-50"
                title="Download"
              >
                <Download className="h-4 w-4" />
              </button>
            </div>
          </article>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-500">
            No resources match your search.
          </div>
        )}
      </section>

      <section className="mt-8">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-900">Quick Access</h2>
          <p className="text-sm text-gray-500">
            Jump to your most-used tools and features
          </p>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <QuickAccessCard
            icon={<CalendarRange className="h-5 w-5 text-emerald-600" />}
            label="Class Schedule"
          />
          <QuickAccessCard
            icon={<ClipboardList className="h-5 w-5 text-amber-500" />}
            label="Assignments"
          />
          <QuickAccessCard
            icon={<Users className="h-5 w-5 text-rose-500" />}
            label="Study Group"
          />
          <QuickAccessCard
            icon={<LibraryBig className="h-5 w-5 text-indigo-600" />}
            label="Digital Library"
            isActive
          />
        </div>
      </section>
    </div>
  );
}

function QuickAccessCard({
  icon,
  label,
  isActive,
}: {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}) {
  return (
    <button
      className={`flex items-center justify-center gap-3 rounded-xl border px-4 py-5 text-sm font-semibold shadow-sm transition ${
        isActive
          ? "border-[#135D96] bg-[#f0f6fb] text-[#135D96]"
          : "border-gray-200 bg-white text-gray-800 hover:-translate-y-0.5 hover:shadow-md"
      }`}
    >
      {icon}
      <span>{label}</span>
      <ArrowPill />
    </button>
  );
}

function ArrowPill() {
  return (
    <span className="ml-auto inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-gray-400 shadow">
      <Clock3 className="h-3.5 w-3.5" />
    </span>
  );
}
