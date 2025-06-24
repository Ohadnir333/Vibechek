

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Brain, Home, User } from "lucide-react";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-cream-50 to-sage-100">
      <style jsx>{`
        :root {
          --sage-50: #f8faf8;
          --sage-100: #e8f0e5;
          --sage-200: #d1e0cc;
          --sage-300: #a8c49a;
          --sage-400: #7ca26f;
          --sage-500: #5a8149;
          --sage-600: #486538;
          --sage-700: #3c5230;
          --sage-800: #344229;
          --cream-50: #fefcf9;
          --cream-100: #fdf8f0;
          --cream-200: #faf0e1;
          --cream-300: #f5e6d3;
          --warm-gray-50: #fafaf9;
          --warm-gray-100: #f5f5f4;
          --warm-gray-200: #e7e5e4;
          --warm-gray-300: #d6d3d1;
          --warm-gray-400: #a8a29e;
          --warm-gray-500: #78716c;
          --warm-gray-600: #57534e;
          --warm-gray-700: #44403c;
          --warm-gray-800: #292524;
          --warm-gray-900: #1c1917;
        }
        .bg-sage-50 { background-color: var(--sage-50); }
        .bg-sage-100 { background-color: var(--sage-100); }
        .bg-sage-200 { background-color: var(--sage-200); }
        .bg-sage-300 { background-color: var(--sage-300); }
        .bg-sage-500 { background-color: var(--sage-500); }
        .bg-sage-600 { background-color: var(--sage-600); }
        .bg-cream-50 { background-color: var(--cream-50); }
        .bg-cream-100 { background-color: var(--cream-100); }
        .bg-cream-200 { background-color: var(--cream-200); }
        .text-sage-600 { color: var(--sage-600); }
        .text-sage-700 { color: var(--sage-700); }
        .text-sage-800 { color: var(--sage-800); }
        .text-warm-gray-600 { color: var(--warm-gray-600); }
        .text-warm-gray-700 { color: var(--warm-gray-700); }
        .text-warm-gray-800 { color: var(--warm-gray-800); }
        .border-sage-200 { border-color: var(--sage-200); }
        .border-sage-300 { border-color: var(--sage-300); }
        .hover\\:bg-sage-100:hover { background-color: var(--sage-100); }
        .hover\\:bg-sage-600:hover { background-color: var(--sage-600); }
      `}</style>
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-sage-200 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 bg-sage-500 rounded-full flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-warm-gray-800">VibeCheck</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-sage-200">
        <div className="max-w-md mx-auto px-4 py-2">
          <div className="flex justify-around">
            <Link 
              to={createPageUrl("Dashboard")}
              className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all ${
                location.pathname === createPageUrl("Dashboard") 
                  ? 'bg-sage-100 text-sage-700' 
                  : 'text-warm-gray-600 hover:bg-sage-50 hover:text-sage-600'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="text-xs font-medium">Home</span>
            </Link>
            <Link 
              to={createPageUrl("Profile")}
              className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all ${
                location.pathname === createPageUrl("Profile") 
                  ? 'bg-sage-100 text-sage-700' 
                  : 'text-warm-gray-600 hover:bg-sage-50 hover:text-sage-600'
              }`}
            >
              <User className="w-5 h-5" />
              <span className="text-xs font-medium">Profile</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

