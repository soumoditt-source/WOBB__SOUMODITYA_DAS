import { useState } from "react";
import { X, Trash2, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import { cn } from "@/utils/cn";

export function SelectedProfilesDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const selectedProfiles = useStore((state) => state.selectedProfiles);
  const removeProfile = useStore((state) => state.removeProfile);

  return (
    <>
      {/* Floating Action Button to toggle drawer */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-4 bg-primary text-white rounded-full shadow-lg hover:bg-primary-dark transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
        aria-label="Open selected profiles list"
      >
        <Users size={24} />
        {selectedProfiles.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-md">
            {selectedProfiles.length}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Users className="text-primary" />
                  Your List
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {selectedProfiles.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                    <Users size={48} className="opacity-20" />
                    <p className="text-center text-lg">No profiles selected yet.</p>
                    <p className="text-sm text-center">
                      Browse and add influencers to your list to keep track of them.
                    </p>
                  </div>
                ) : (
                  <AnimatePresence>
                    {selectedProfiles.map((profile) => (
                      <motion.div
                        key={profile.username}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-xl border border-gray-100",
                          "bg-white shadow-sm hover:shadow-md transition-shadow group relative"
                        )}
                      >
                        <img
                          src={profile.picture}
                          alt={profile.fullname}
                          className="w-14 h-14 rounded-full object-cover border border-gray-200"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 truncate flex items-center gap-1">
                            @{profile.username}
                            {profile.is_verified && (
                              <svg
                                className="w-4 h-4 text-blue-500"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7L6 12.6l1.5-1.5 2.6 2.6 6.4-6.4 1.5 1.5-8.1 7.9z" />
                              </svg>
                            )}
                          </h3>
                          <p className="text-sm text-gray-500 truncate">
                            {profile.fullname}
                          </p>
                        </div>
                        <button
                          onClick={() => removeProfile(profile.username)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                          title="Remove from list"
                        >
                          <Trash2 size={18} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {selectedProfiles.length > 0 && (
                <div className="p-6 border-t bg-gray-50">
                  <button className="w-full py-3 px-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors shadow-md">
                    Export List ({selectedProfiles.length})
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
