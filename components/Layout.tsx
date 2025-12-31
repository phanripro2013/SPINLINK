
import React from 'react';
import Navigation from './Navigation';
import { useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen pb-32 max-w-lg mx-auto bg-slate-50 relative shadow-xl overflow-hidden">
      {/* Header Logo */}
      <div className="p-6 flex items-center gap-2">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
           <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
           </svg>
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold text-lg tracking-tighter text-slate-800 leading-none">TW VŨ SPIN</span>
          <span className="text-[10px] font-bold text-blue-600 uppercase">CoinsMaster</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-4">
        {children}
      </main>

      {/* Bottom Nav */}
      <Navigation />
    </div>
  );
};

export default Layout;
