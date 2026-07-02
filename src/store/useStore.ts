import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Platform, UserProfileSummary } from "@/types";

interface AppState {
  // Filters
  platform: Platform;
  setPlatform: (platform: Platform) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: "followers" | "engagement";
  setSortBy: (sortBy: "followers" | "engagement") => void;

  // Selected Profiles
  selectedProfiles: UserProfileSummary[];
  addProfile: (profile: UserProfileSummary) => void;
  removeProfile: (username: string) => void;
  isProfileSelected: (username: string) => boolean;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      platform: "instagram",
      setPlatform: (platform) => set({ platform, searchQuery: "" }), // Reset search on platform change
      searchQuery: "",
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      sortBy: "followers",
      setSortBy: (sortBy) => set({ sortBy }),

      selectedProfiles: [],
      addProfile: (profile) =>
        set((state) => {
          if (state.selectedProfiles.some((p) => p.username === profile.username)) {
            return state; // Prevent duplicates
          }
          return {
            selectedProfiles: [...state.selectedProfiles, profile],
          };
        }),
      removeProfile: (username) =>
        set((state) => ({
          selectedProfiles: state.selectedProfiles.filter(
            (p) => p.username !== username
          ),
        })),
      isProfileSelected: (username) => {
        return get().selectedProfiles.some((p) => p.username === username);
      },
    }),
    {
      name: "wobb-influencer-storage",
      partialize: (state) => ({ selectedProfiles: state.selectedProfiles }), // Only persist selectedProfiles
    }
  )
);
