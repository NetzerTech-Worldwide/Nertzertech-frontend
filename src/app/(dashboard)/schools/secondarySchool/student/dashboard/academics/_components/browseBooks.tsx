"use client";
import React, { useState } from "react";
import { Search, Heart, BookOpen, Star, X, ChevronDown, AlertCircle } from "lucide-react";

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  cover: string;
  rating: number;
  reviews: number;
  status: "Available" | "Borrowed" | "Reserved";
  dueDate?: string;
  lateFee?: number;
  lateFeePaid?: string;
  color: string;
  wishlist?: boolean;
}

const MOCK_BOOKS: Book[] = [
  { id: 1,  title: "To Kill a Mockingbird", author: "Harper Lee",        genre: "Fiction",          cover: "📖", color: "#8B5E3C", rating: 4.8, reviews: 142, status: "Available" },
  { id: 2,  title: "1984",                  author: "George Orwell",     genre: "Dystopian",        cover: "📕", color: "#2C3E50", rating: 4.7, reviews: 198, status: "Borrowed"  },
  { id: 3,  title: "The Great Gatsby",      author: "F. Scott Fitzgerald",genre: "Classic",         cover: "📗", color: "#1A5276", rating: 4.5, reviews: 87,  status: "Available" },
  { id: 4,  title: "Introduction to Algorithms", author: "Raymond G. Terry", genre: "Computer Studies", cover: "💻", color: "#1F618D", rating: 4.6, reviews: 56, status: "Available" },
  { id: 5,  title: "A Brief History of Time",    author: "Stephen Hawking",   genre: "Science",     cover: "🌌", color: "#1B2631", rating: 4.9, reviews: 203, status: "Available" },
  { id: 6,  title: "General Mathematics",        author: "R. North Smith",    genre: "Mathematics", cover: "📐", color: "#7D3C98", rating: 4.2, reviews: 34,  status: "Reserved"  },
  { id: 7,  title: "English Grammar",            author: "Oxford Press",      genre: "Language",    cover: "🇬🇧", color: "#1A5276", rating: 4.4, reviews: 61,  status: "Available" },
  { id: 8,  title: "Computer, Commuter & Science", author: "James K. Bright", genre: "Computer Studies", cover: "🖥️", color: "#212F3C", rating: 4.3, reviews: 45, status: "Available" },
  { id: 9,  title: "Cyan Wowk",             author: "Sandra Grant",      genre: "Fiction",          cover: "🎨", color: "#148F77", rating: 4.1, reviews: 29,  status: "Borrowed"  },
];

const GENRES = ["All", "Fiction", "Dystopian", "Classic", "Computer Studies", "Science", "Mathematics", "Language"];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[1,2,3,4,5].map((s) => (
      <Star key={s} className={`w-3 h-3 ${s <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />
    ))}
    <span className="text-[10px] text-gray-400 ml-1">{rating}</span>
  </div>
);

const StatusBadge = ({ status }: { status: Book["status"] }) => {
  const map = {
    Available: "bg-green-100 text-green-700",
    Borrowed:  "bg-orange-100 text-orange-700",
    Reserved:  "bg-blue-100 text-blue-700",
  };
  return (
    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${map[status]}`}>
      {status}
    </span>
  );
};

const BookModal = ({ book, onClose, onBorrow }: { book: Book; onClose: () => void; onBorrow: (id: number) => void }) => (
  <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
    <div className="bg-white rounded-xl w-full max-w-sm shadow-xl" onClick={(e) => e.stopPropagation()}>
      <div className="p-5">
        <div className="flex gap-4 mb-4">
          {/* Cover */}
          <div className="w-20 h-28 rounded-lg flex items-center justify-center text-3xl flex-shrink-0"
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
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
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
          <BookOpen className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <p>{successMsg}</p>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search books or authors..."
            className="w-full pl-8 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#216388]"
          />
        </div>

        {/* Genre filter */}
        <div className="relative">
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="appearance-none pl-3 pr-7 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#216388] bg-white text-gray-600"
          >
            {GENRES.map((g) => <option key={g}>{g}</option>)}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
        </div>

        <div className="relative">
          <select className="appearance-none pl-3 pr-7 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#216388] bg-white text-gray-600">
            <option>All</option>
            <option>Available</option>
            <option>Borrowed</option>
            <option>Reserved</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
        </div>

        <div className="relative">
          <select className="appearance-none pl-3 pr-7 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#216388] bg-white text-gray-600">
            <option>Sort: Title</option>
            <option>Sort: Rating</option>
            <option>Sort: Author</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
        {filtered.map((book) => {
          const isBorrowed  = borrowed.includes(book.id)  || book.status === "Borrowed";
          const isWishlisted = wishlist.includes(book.id);

          return (
            <div key={book.id} className="flex flex-col gap-2 group">
              {/* Cover */}
              <div
                className="relative rounded-lg overflow-hidden cursor-pointer aspect-[2/3] flex items-center justify-center text-4xl transition-transform group-hover:scale-105"
                style={{ backgroundColor: book.color }}
                onClick={() => setSelectedBook(book)}
              >
                <span>{book.cover}</span>

                {/* Overlays */}
                {isBorrowed && (
                  <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded font-medium">
                    On Due
                  </span>
                )}

                {/* Wishlist heart */}
                <button
                  onClick={(e) => { e.stopPropagation(); toggleWishlist(book.id); }}
                  className="absolute bottom-1.5 right-1.5 p-1 rounded-full bg-white/20 hover:bg-white/40 transition-colors"
                >
                  <Heart className={`w-3 h-3 ${isWishlisted ? "fill-red-400 text-red-400" : "text-white"}`} />
                </button>
              </div>

              {/* Info */}
              <div>
                <p className="text-xs font-semibold text-gray-800 leading-tight line-clamp-2">{book.title}</p>
                <p className="text-[10px] text-gray-400 mt-0.5 truncate">By {book.author}</p>
                <StarRating rating={book.rating} />
                <div className="flex items-center justify-between mt-1.5 gap-1">
                  <StatusBadge status={isBorrowed ? "Borrowed" : book.status} />
                </div>
                <button
                  onClick={() => setSelectedBook(book)}
                  disabled={isBorrowed}
                  className="mt-2 w-full py-1.5 text-[10px] font-medium bg-[#216388] text-white rounded-md hover:bg-[#1a5070] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isBorrowed ? "Borrowed" : "Borrow"}
                </button>
              </div>
            </div>
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