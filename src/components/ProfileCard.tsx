import { useNavigate } from "react-router-dom";
import { UserPlus, UserCheck } from "lucide-react";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { useStore } from "@/store/useStore";
import { cn } from "@/utils/cn";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  searchQuery: string;
}

function formatFollowersLocal(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + "M followers";
  if (count >= 1000) return (count / 1000).toFixed(0) + "K followers";
  return count + " followers";
}

export function ProfileCard({
  profile,
  platform,
  searchQuery,
}: ProfileCardProps) {
  const navigate = useNavigate();
  const isSelected = useStore((state) => state.isProfileSelected(profile.username));
  const addProfile = useStore((state) => state.addProfile);
  const removeProfile = useStore((state) => state.removeProfile);

  const handleClick = () => {
    navigate(`/profile/${profile.username}?platform=${platform}`);
  };

  const handleToggleList = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSelected) {
      removeProfile(profile.username);
    } else {
      addProfile(profile);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "group relative flex flex-col p-5 bg-white rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden",
        "hover:shadow-xl hover:border-primary/30",
        isSelected ? "border-primary shadow-md shadow-primary/10" : "border-slate-200 shadow-sm"
      )}
      data-search={searchQuery}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img 
              src={profile.picture} 
              className="w-16 h-16 rounded-full object-cover ring-2 ring-slate-100 group-hover:ring-primary/20 transition-all" 
              loading="lazy"
              alt={profile.fullname}
            />
            {isSelected && (
              <div className="absolute -bottom-1 -right-1 bg-primary text-white p-1 rounded-full border-2 border-white">
                <UserCheck size={12} />
              </div>
            )}
          </div>
          <div className="text-left flex-1 min-w-0">
            <div className="font-bold text-slate-900 truncate flex items-center gap-1 text-lg">
              @{profile.username}
              <VerifiedBadge verified={profile.is_verified} />
            </div>
            <div className="text-sm text-slate-500 truncate font-medium">{profile.fullname}</div>
            <div className="text-sm text-slate-600 mt-1 inline-flex px-2 py-0.5 bg-slate-100 rounded-md">
              {formatFollowersLocal(profile.followers)}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex justify-end">
        <button
          onClick={handleToggleList}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all w-full justify-center",
            isSelected
              ? "bg-primary/10 text-primary hover:bg-red-50 hover:text-red-600 border border-primary/20 hover:border-red-200"
              : "bg-slate-900 text-white hover:bg-slate-800 hover:shadow-md"
          )}
        >
          {isSelected ? (
            <>
              <UserCheck size={16} />
              <span className="group-hover:hidden">Added to List</span>
              <span className="hidden group-hover:inline">Remove</span>
            </>
          ) : (
            <>
              <UserPlus size={16} />
              <span>Add to List</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

