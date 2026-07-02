import { useMemo } from "react";
import { useStore } from "@/store/useStore";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";

export function SearchPage() {
  const platform = useStore((state) => state.platform);
  const setPlatform = useStore((state) => state.setPlatform);
  const searchQuery = useStore((state) => state.searchQuery);
  const setSearchQuery = useStore((state) => state.setSearchQuery);
  const sortBy = useStore((state) => state.sortBy);
  const setSortBy = useStore((state) => state.setSortBy);

  const allProfiles = useMemo(() => extractProfiles(platform), [platform]);
  const filtered = useMemo(() => {
    const result = filterProfiles(allProfiles, searchQuery);
    
    // Sort logic
    result.sort((a, b) => {
      if (sortBy === "followers") {
        return (b.followers || 0) - (a.followers || 0);
      } else if (sortBy === "engagement") {
        return (b.engagement_rate || 0) - (a.engagement_rate || 0);
      }
      return 0;
    });
    
    return result;
  }, [allProfiles, searchQuery, sortBy]);

  return (
    <Layout>
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-4">
          Discover Top Creators
        </h2>
        <p className="text-lg text-slate-600">
          Find and shortlist the best influencers across Instagram, YouTube, and TikTok for your next campaign.
        </p>
      </div>

      <PlatformFilter
        selected={platform}
        onChange={setPlatform}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <div className="flex items-center justify-between mb-6">
        <p className="text-sm font-medium text-slate-500">
          Showing <span className="text-slate-900 font-bold">{filtered.length}</span> of {allProfiles.length} creators
        </p>
      </div>

      <ProfileList
        profiles={filtered}
        platform={platform}
        searchQuery={searchQuery}
      />
    </Layout>
  );
}

