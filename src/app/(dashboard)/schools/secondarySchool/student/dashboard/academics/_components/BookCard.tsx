"use client";
import { Heart, Star, AlarmClock } from "lucide-react";

export type Book = {
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
  pages?: number;
  isbn?: string;
};

export const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        className={`w-3 h-3 ${
          s <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-gray-200"
        }`}
      />
    ))}
    <span className="text-[10px] text-amber-500 ml-1">{rating}</span>
  </div>
);

type BookCardProps = {
  book: Book;
  isBorrowed: boolean;
  isWishlisted: boolean;
  onSelect: (book: Book) => void;
  onToggleWishlist: (id: number) => void;
};

export const BookCard = ({ book, isBorrowed, isWishlisted, onSelect, onToggleWishlist }: BookCardProps) => {
  return (
    <div className="group">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div
          className="relative cursor-pointer aspect-2/3 overflow-hidden bg-center bg-cover"
          style={{ backgroundColor: book.color }}
          onClick={() => onSelect(book)}
        >
          <div className="flex items-center justify-center w-full h-full text-4xl">
            <span>{book.cover}</span>
          </div>

          {book.status === "Borrowed" && (
            <span className="absolute left-3 top-3 bg-orange-400 text-white text-[11px] px-2 py-0.5 rounded-full font-semibold">
              Borrowed
            </span>
          )}

          {book.status === "Reserved" && (
            <span className="absolute left-3 top-3 bg-blue-500 text-white text-[11px] px-2 py-0.5 rounded-full font-semibold">
              Reserved
            </span>
          )}

          {isBorrowed && (
            <span className="absolute right-3 top-3 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded font-medium">
              On Due
            </span>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 leading-tight line-clamp-2">{book.title}</p>
              <p className="text-xs text-slate-500 mt-1 truncate">{book.author}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-1 rounded-full">{book.genre}</span>
                <div className="ml-auto flex items-center gap-1">
                  <StarRating rating={book.rating} />
                </div>
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                {book.pages ?? "-"} pages • ISBN {book.isbn ?? "-"}
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={() => onSelect(book)}
              disabled={isBorrowed}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
                isBorrowed ? "bg-slate-100 text-slate-500 cursor-not-allowed" : "bg-[#216388] text-white hover:bg-[#1a5070]"
              }`}
            >
              {isBorrowed ? "Unavailable" : book.status === "Reserved" ? "Reserved" : "Borrow"}
            </button>

            {isBorrowed ? (
              <>
                <button className="w-10 h-10 p-2 rounded-lg border border-slate-100 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50">
                  <AlarmClock className="w-4 h-4" />
                </button>
                <button onClick={() => onToggleWishlist(book.id)} className="w-10 h-10 p-2 rounded-lg border border-slate-100 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50">
                  <Heart className={`w-4 h-4 ${isWishlisted ? "fill-red-400 text-red-400" : ""}`} />
                </button>
              </>
            ) : (
              <button onClick={() => onToggleWishlist(book.id)} className="w-10 h-10 p-2 rounded-lg border border-slate-100 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50">
                <Heart className={`w-4 h-4 ${isWishlisted ? "fill-red-400 text-red-400" : ""}`} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
