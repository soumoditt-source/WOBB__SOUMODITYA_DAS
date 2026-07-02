import type { Platform, UserProfileSummary } from "@/types";
import { ProfileCard } from "./ProfileCard";
import { motion } from "framer-motion";

interface ProfileListProps {
  profiles: UserProfileSummary[];
  platform: Platform;
  searchQuery: string;
}

export function ProfileList({
  profiles,
  platform,
  searchQuery,
}: ProfileListProps) {
  if (profiles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500">
        <div className="text-4xl mb-4">🔍</div>
        <p className="text-lg">No profiles found</p>
        <p className="text-sm">Try adjusting your search or platform filter</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {profiles.map((profile, index) => (
        <motion.div
          key={profile.user_id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <ProfileCard
            profile={profile}
            platform={platform}
            searchQuery={searchQuery}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

