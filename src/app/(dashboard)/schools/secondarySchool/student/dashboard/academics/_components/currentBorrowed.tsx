"use client";
import { BookOpen, Clock, Shield, RefreshCw } from "lucide-react";

const BORROWED: any[] = [
  {
    id: 1,
    title: "Introduction to Algorithms",
    author: "Raymond A. Samuel",
    cover: "💻",
    color: "#1F618D",
    borrowDate: "Feb 10, 2026",
    dueDate: "March 1, 2026",
    daysLeft: 5,
    lateFee: 0,
    status: "On due",
  },
];

const FEATURE_CARDS = [
  {
    icon: <Clock className="w-4 h-4 text-white" />,
    title: "Due Date Tracking",
    desc: "Get reminders before your book is due so you never miss a return date.",
    color: "bg-[#216388]",
  },
  {
    icon: <Shield className="w-4 h-4 text-white" />,
    title: "Overdue Alerts",
    desc: "Instant alerts if a book becomes overdue, with fine details and payment options.",
    color: "bg-orange-500",
  },
  {
    icon: <RefreshCw className="w-4 h-4 text-white" />,
    title: "Easy Renewal",
    desc: "Renew your borrowed books with one click before they become overdue.",
    color: "bg-[#216388]",
  },
];

const STATS = [
  { label: "Currently Borrowed", value: "1",     color: "bg-[#216388] text-white" },
  { label: "Reading Progress",   value: "3,056", sub: "Total pages read", color: "bg-orange-500 text-white" },
  { label: "Days Left",          value: "5",     sub: "Return deadline",  color: "bg-white border border-gray-200 text-gray-800" },
];

export const CurrentBorrowed = () => {
  if (BORROWED.length === 0) {
    return (
      <div className="flex flex-col items-center py-8 gap-6 w-full">
        {/* Icon */}
        <div className="w-20 h-20 rounded-full border-2 border-gray-300 flex items-center justify-center">
          <BookOpen className="w-10 h-10 text-[#216388]" strokeWidth={2.5} />
        </div>

        {/* Text */}
        <div className="text-center">
          <h3 className="text-base font-semibold text-gray-700 mb-1">No Books Borrowed Yet</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            You haven't borrowed any books from the library yet. Browse<br />
            our collection and borrow a book to get started!
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Once you borrow a book, you'll see due date reminders, overdue notices, and fine details right here.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
          {FEATURE_CARDS.map((card) => (
            <div key={card.title} className={`${card.color} rounded-xl p-4 text-white flex flex-col gap-2`}>
              <div className="flex items-start justify-between">
                <div className="p-1.5 bg-white/20 rounded-lg">{card.icon}</div>
                <button className="p-1 bg-white/10 rounded hover:bg-white/20 transition-colors">
                  <RefreshCw className="w-3 h-3 text-white/70" />
                </button>
              </div>
              <p className="text-xs font-semibold leading-tight">{card.title}</p>
              <p className="text-[10px] text-white/80 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button className="px-5 py-2 text-xs font-medium bg-[#216388] text-white rounded-lg hover:bg-[#1a5070] transition-colors">
          Browse &amp; Borrow a Book
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Success banner */}
      <div className="flex items-start gap-2 bg-green-50 border border-green-200 rounded-lg p-3 text-xs text-green-700">
        <BookOpen className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <p>Book borrowed successfully! Due in 5 days. Check 'Current Borrowed' to track your book.</p>
      </div>

      {BORROWED.map((book) => (
        <div key={book.id} className="border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row gap-4 bg-white">
          <div
            className="rounded-lg flex items-center justify-center text-3xl flex-shrink-0"
            style={{ backgroundColor: book.color, height: "88px", width: "64px" }}
          >
            {book.cover}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">{book.title}</h3>
                <p className="text-xs text-gray-400">{book.author}</p>
              </div>
              <span className="bg-red-100 text-red-600 text-[10px] px-2 py-0.5 rounded font-medium flex-shrink-0">
                On Due
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-3">
              <div><p className="text-gray-400">Borrow Date</p><p className="font-medium text-gray-700">{book.borrowDate}</p></div>
              <div><p className="text-gray-400">Due Date</p><p className="font-medium text-gray-700">{book.dueDate}</p></div>
              <div><p className="text-gray-400">Days Left</p><p className="font-medium text-orange-500">{book.daysLeft} days</p></div>
              <div><p className="text-gray-400">Late Fee</p><p className="font-medium text-gray-700">₦{book.lateFee}</p></div>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-xs font-medium bg-[#216388] text-white rounded-lg hover:bg-[#1a5070] transition-colors">
                Renew
              </button>
              <button className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                No Renew
              </button>
              <button className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                Return Book
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1">
        {STATS.map((s) => (
          <div key={s.label} className={`rounded-xl p-4 flex flex-col gap-1 ${s.color}`}>
            <p className="text-[11px] opacity-70">{s.label}</p>
            <p className="text-2xl font-bold">{s.value}</p>
            {s.sub && <p className="text-[10px] opacity-60">{s.sub}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};