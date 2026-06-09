"use client";
import React, { useState } from "react";
import { Search, BookOpen, X, AlertCircle } from "lucide-react";
import { Book, BookCard, StarRating } from "./BookCard";

const MOCK_BOOKS: Book[] = [
  { id: 1,  title: "To Kill a Mockingbird", author: "Harper Lee",         genre: "Fiction",          cover: "📖", color: "#8B5E3C", rating: 4.8, reviews: 142, status: "Available", pages: 281, isbn: "978-0-06-112008-4" },
  { id: 2,  title: "1984",                  author: "George Orwell",      genre: "Dystopian",        cover: "📕", color: "#2C3E50", rating: 4.7, reviews: 198, status: "Borrowed",  pages: 328, isbn: "978-0-45-228423-4" },
  { id: 3,  title: "The Great Gatsby",      author: "F. Scott Fitzgerald",genre: "Classic",          cover: "📗", color: "#1A5276", rating: 4.5, reviews: 87,  status: "Available", pages: 180, isbn: "978-0-74-327356-5" },
  { id: 4,  title: "Introduction to Algorithms", author: "Raymond G. Terry", genre: "Computer Studies", cover: "💻", color: "#1F618D", rating: 4.6, reviews: 56, status: "Available", pages: 1312, isbn: "978-0-262-03384-8" },
  { id: 5,  title: "A Brief History of Time",    author: "Stephen Hawking",   genre: "Science",         cover: "🌌", color: "#1B2631", rating: 4.9, reviews: 203, status: "Available", pages: 256, isbn: "978-0-553-10953-5" },
  { id: 6,  title: "General Mathematics",        author: "R. North Smith",    genre: "Mathematics",     cover: "📐", color: "#7D3C98", rating: 4.2, reviews: 34,  status: "Reserved", pages: 420, isbn: "978-1-234-56789-7" },
  { id: 7,  title: "English Grammar",            author: "Oxford Press",      genre: "Language",        cover: "🇬🇧", color: "#1A5276", rating: 4.4, reviews: 61,  status: "Available", pages: 220, isbn: "978-0-19-861380-6" },
  { id: 8,  title: "Computer, Commuter & Science", author: "James K. Bright", genre: "Computer Studies", cover: "🖥️", color: "#212F3C", rating: 4.3, reviews: 45, status: "Available", pages: 389, isbn: "978-1-4028-9462-6" },
  { id: 9,  title: "Cyan Wowk",             author: "Sandra Grant",       genre: "Fiction",          cover: "🎨", color: "#148F77", rating: 4.1, reviews: 29,  status: "Borrowed",  pages: 240, isbn: "978-0-00-000000-2" },
];

const GENRES = ["All", "Fiction", "Dystopian", "Classic", "Computer Studies", "Science", "Mathematics", "Language"];

const BookModal = ({ book, onClose, onBorrow }: { book: Book; onClose: () => void; onBorrow: (id: number) => void }) => (
  <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
    <div className="bg-white rounded-xl w-full max-w-sm shadow-xl" onClick={(e) => e.stopPropagation()}>
      <div className="p-5">
        <div className="flex gap-4 mb-4">
          {/* Cover */}
          <div className="w-20 h-28 rounded-lg flex items-center justify-center text-3xl shrink-0"
            style={{ backgroundColor: book.color }}>
            {book.cover}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-800 text-sm leading-tight mb-1">{book.title}</h3>
            <p className="text-xs text-gray-500 mb-2">{book.author}</p>
            <StarRating rating={book.rating} />
            <p className="text-[10px] text-gray-400 mt-1">{book.reviews} reviews</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 self-start">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
          <div>
            <p className="text-gray-400">Category</p>
            <p className="font-medium text-gray-700">{book.genre}</p>
          </div>
          <div>
            <p className="text-gray-400">Total</p>
            <p className="font-medium text-gray-700">126</p>
          </div>
          <div>
            <p className="text-gray-400">Service Date</p>
            <p className="font-medium text-gray-700">Feb 18, 2024</p>
          </div>
          <div>
            <p className="text-gray-400">Due Date</p>
            <p className="font-medium text-gray-700">March 1, 2026</p>
          </div>
          <div>
            <p className="text-gray-400">Due In</p>
            <p className="font-medium text-gray-700">5 days</p>
          </div>
        </div>

        {book.lateFee !== undefined && (
          <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 text-xs text-amber-700">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <p>You have a ₦{book.lateFee} late fee. Pay before borrowing this book again. Fee status: {book.lateFeePaid}</p>
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => { onBorrow(book.id); onClose(); }}
            disabled={book.status !== "Available"}
            className="flex-1 py-2 text-xs font-medium bg-[#216388] text-white rounded-lg hover:bg-[#1a5070] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Borrow Book
          </button>
          <button onClick={onClose} className="flex-1 py-2 text-xs font-medium border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
);

export const BrowseBooks = () => {
  const [search, setSearch]         = useState("");
  const [genre, setGenre]           = useState("All");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [wishlist, setWishlist]     = useState<number[]>([]);
  const [borrowed, setBorrowed]     = useState<number[]>([]);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const filtered = MOCK_BOOKS.filter((b) => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) ||
                        b.author.toLowerCase().includes(search.toLowerCase());
    const matchGenre  = genre === "All" || b.genre === genre;
    return matchSearch && matchGenre;
  });

  const handleBorrow = (id: number) => {
    setBorrowed((prev) => [...prev, id]);
    const book = MOCK_BOOKS.find((b) => b.id === id);
    setSuccessMsg(`"${book?.title}" borrowed successfully! Check 'Current Borrowed' to track your book.`);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  return (
    <div className="flex flex-col gap-4">

      {/* Success notification */}
      {successMsg && (
        <div className="flex items-start gap-2 bg-green-50 border border-green-200 rounded-lg p-3 text-xs text-green-700">
          <BookOpen className="w-4 h-4 shrink-0 mt-0.5" />
          <p>{successMsg}</p>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search books or authors..."
            className="w-full pl-11 pr-3 py-2.5 text-sm border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-300 bg-white"
          />
        </div>

        <div className="flex flex-wrap gap-2 justify-start sm:justify-end">
          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-600 text-xs">
            <span>All categories</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-600 text-xs">
            <span>All</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-600 text-xs">
            <span>Sort: Title</span>
          </div>
        </div>
      </div>

      {/* Book Grid: 3 columns on desktop and larger */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {filtered.map((book) => {
          const isBorrowed = borrowed.includes(book.id) || book.status === "Borrowed";
          const isWishlisted = wishlist.includes(book.id);

          return (
            <BookCard
              key={book.id}
              book={book}
              isBorrowed={isBorrowed}
              isWishlisted={isWishlisted}
              onSelect={setSelectedBook}
              onToggleWishlist={toggleWishlist}
            />
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <BookOpen className="w-10 h-10 mx-auto mb-2 opacity-30" />
          <p className="text-sm">No books found matching your search.</p>
        </div>
      )}

      {/* Book Detail Modal */}
      {selectedBook && (
        <BookModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onBorrow={handleBorrow}
        />
      )}
    </div>
  );
};