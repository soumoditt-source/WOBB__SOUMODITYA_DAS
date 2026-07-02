import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, UserPlus, UserCheck, BarChart2, Users, Heart, MessageCircle, Play } from "lucide-react";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import type { FullUserProfile, ProfileDetailResponse } from "@/types";
import { formatEngagementRate } from "@/utils/formatters";
import { loadProfileByUsername } from "@/utils/profileLoader";
import { useStore } from "@/store/useStore";
import { cn } from "@/utils/cn";

function formatFollowersDetail(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(2) + "M";
  if (count >= 1000) return (count / 1000).toFixed(1) + "K";
  return String(count);
}

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform") || "unknown";
  
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Store
  const isSelected = useStore((state) => state.isProfileSelected(username || ""));
  const addProfile = useStore((state) => state.addProfile);
  const removeProfile = useStore((state) => state.removeProfile);

  useEffect(() => {
    if (!username) return;

    let isMounted = true;

    const fetchProfile = async () => {
      setLoaded(false);
      const data = await loadProfileByUsername(username);
      if (isMounted) {
        setProfileData(data);
        setLoaded(true);
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, [username]);

  if (!username) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-20 text-slate-500">
          <p className="text-xl mb-4 text-slate-900 font-bold">Invalid Profile Route</p>
          <Link to="/" className="text-primary hover:underline flex items-center gap-2">
            <ArrowLeft size={16} /> Back to Search
          </Link>
        </div>
      </Layout>
    );
  }

  if (!loaded) {
    return (
      <Layout title={`@${username}`}>
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!profileData) {
    return (
      <Layout title={`@${username}`}>
        <div className="flex flex-col items-center justify-center py-20 text-slate-500 bg-white rounded-2xl shadow-sm border border-slate-100 max-w-2xl mx-auto">
          <p className="text-xl mb-4 text-red-500 font-bold">Profile Not Found</p>
          <p className="mb-6">We couldn't load details for @{username}.</p>
          <Link to="/" className="px-6 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors">
            Back to search
          </Link>
        </div>
      </Layout>
    );
  }

  const user: FullUserProfile = profileData.data.user_profile;

  const handleToggleList = () => {
    if (isSelected) {
      removeProfile(user.username);
    } else {
      addProfile(user);
    }
  };

  return (
    <Layout title={user.fullname}>
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Back to search
        </Link>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            
            {/* Avatar & Basic Info */}
            <div className="flex-shrink-0 text-center md:text-left">
              <div className="relative inline-block">
                <img
                  src={user.picture}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover ring-4 ring-slate-50 shadow-lg"
                  alt={user.fullname}
                />
                {isSelected && (
                  <div className="absolute bottom-2 right-2 bg-primary text-white p-2 rounded-full border-4 border-white shadow-md">
                    <UserCheck size={20} />
                  </div>
                )}
              </div>
              
              <div className="mt-6 space-y-4">
                <button
                  onClick={handleToggleList}
                  className={cn(
                    "w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all shadow-sm",
                    isSelected
                      ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                      : "bg-primary text-white hover:bg-primary-dark hover:shadow-md"
                  )}
                >
                  {isSelected ? (
                    <>
                      <UserCheck size={18} />
                      <span>Remove from List</span>
                    </>
                  ) : (
                    <>
                      <UserPlus size={18} />
                      <span>Add to List</span>
                    </>
                  )}
                </button>

                {user.url && (
                  <a
                    href={user.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    View on {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>

            {/* Profile Details */}
            <div className="flex-1 w-full">
              <div className="mb-2">
                <h2 className="text-3xl font-extrabold text-slate-900 flex items-center gap-2 flex-wrap">
                  @{user.username}
                  <VerifiedBadge verified={user.is_verified} />
                </h2>
                <p className="text-xl text-slate-600 mt-1 font-medium">{user.fullname}</p>
                <div className="inline-flex mt-3 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider">
                  {platform}
                </div>
              </div>

              {user.description && (
                <div className="mt-6 p-4 bg-slate-50 rounded-2xl text-slate-700 leading-relaxed border border-slate-100">
                  {user.description}
                </div>
              )}

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
                <MetricCard 
                  icon={<Users className="text-blue-500" />} 
                  label="Followers" 
                  value={formatFollowersDetail(user.followers)} 
                />
                
                {user.engagement_rate !== undefined && (
                  <MetricCard 
                    icon={<BarChart2 className="text-purple-500" />} 
                    label="Engagement Rate" 
                    value={(user.engagement_rate * 10000).toFixed(2) + "%"} 
                  />
                )}
                
                {user.posts_count !== undefined && (
                  <MetricCard 
                    icon={<BarChart2 className="text-emerald-500" />} 
                    label="Posts" 
                    value={formatFollowersDetail(user.posts_count)} 
                  />
                )}
                
                {user.avg_likes !== undefined && (
                  <MetricCard 
                    icon={<Heart className="text-rose-500" />} 
                    label="Avg Likes" 
                    value={formatFollowersDetail(user.avg_likes)} 
                  />
                )}
                
                {user.avg_comments !== undefined && (
                  <MetricCard 
                    icon={<MessageCircle className="text-sky-500" />} 
                    label="Avg Comments" 
                    value={formatFollowersDetail(user.avg_comments)} 
                  />
                )}
                
                {user.avg_views !== undefined && user.avg_views > 0 && (
                  <MetricCard 
                    icon={<Play className="text-red-500" />} 
                    label="Avg Views" 
                    value={formatFollowersDetail(user.avg_views)} 
                  />
                )}
                
                {user.engagements !== undefined && (
                  <MetricCard 
                    icon={<BarChart2 className="text-indigo-500" />} 
                    label="Engagements" 
                    value={formatEngagementRate(user.engagement_rate)} 
                  />
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}

function MetricCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex flex-col p-4 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 text-slate-500 mb-2 font-medium text-sm">
        {icon}
        {label}
      </div>
      <div className="text-2xl font-bold text-slate-900">{value}</div>
    </div>
  );
}

