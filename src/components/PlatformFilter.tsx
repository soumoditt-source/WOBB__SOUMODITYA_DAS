import { Search } from "lucide-react";
import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";
import { cn } from "@/utils/cn";

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function PlatformFilter({
  selected,
  onChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
}: PlatformFilterProps & { sortBy?: string; onSortChange?: (sort: "followers" | "engagement") => void }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
      {/* Platform Toggle */}
      <div className="flex p-1 bg-white/50 backdrop-blur-md rounded-2xl border border-slate-200/60 shadow-sm w-full md:w-auto">
        {PLATFORMS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            className={cn(
              "flex-1 md:flex-none px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ease-in-out",
              selected === p
                ? "bg-white text-primary shadow-sm ring-1 ring-slate-900/5"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/40"
            )}
          >
            {getPlatformLabel(p)}
          </button>
        ))}
      </div>

      {/* Search & Sort Input */}
      <div className="flex gap-3 w-full md:w-auto">
        <div className="relative flex-1 md:w-80 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
            <Search size={18} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by username or name..."
            className="block w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
          />
        </div>
        
        {onSortChange && sortBy && (
          <select 
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as "followers" | "engagement")}
            className="bg-white border border-slate-200 rounded-2xl text-sm shadow-sm px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
          >
            <option value="followers">Followers</option>
            <option value="engagement">Engagement</option>
          </select>
        )}
      </div>
    </div>
  );
}

