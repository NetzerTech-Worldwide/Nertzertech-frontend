"use client";

import { ReactNode } from "react";
import { ArrowLeft, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

type AcademicsPageHeaderProps = {
  title: string;
  subtitle: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  showBack?: boolean;
  onBack?: () => void;
  actions?: ReactNode;
  searchParamName?: string;
};

export default function AcademicsPageHeader({
  title,
  subtitle,
  searchValue,
  onSearchChange,
  searchPlaceholder,
  showBack = false,
  onBack,
  actions,
  searchParamName,
}: AcademicsPageHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleSearchChange = (value: string) => {
    if (onSearchChange) {
      onSearchChange(value);
      return;
    }

    if (!searchParamName) return;

    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set(searchParamName, value);
    } else {
      params.delete(searchParamName);
    }

    router.replace(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {(onSearchChange || searchParamName) && (
            <div className="w-full sm:w-[360px]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchValue ?? ""}
                  onChange={(event) => handleSearchChange(event.target.value)}
                  placeholder={searchPlaceholder ?? "Search anything here"}
                  className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-sky-300 focus:ring-2 focus:ring-sky-200"
                />
              </div>
            </div>
          )}

          {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
        </div>
      </div>

      {showBack && (
        <button
          type="button"
          onClick={onBack ?? router.back}
          className="inline-flex items-center gap-2 rounded-md bg-[#216388] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1a5070]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </button>
      )}
    </section>
  );
}
