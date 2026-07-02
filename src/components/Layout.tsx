import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { SelectedProfilesDrawer } from "./SelectedProfilesDrawer";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-primary selection:text-white">
      <header className="sticky top-0 z-30 glass border-b border-slate-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              to="/"
              className="flex items-center gap-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500 hover:opacity-80 transition-opacity"
            >
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white text-lg shadow-md">
                W
              </span>
              Vibe Coder
            </Link>
          </div>
        </div>
      </header>
      
      {title && (
        <div className="bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              {title}
            </h1>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <SelectedProfilesDrawer />
    </div>
  );
}
