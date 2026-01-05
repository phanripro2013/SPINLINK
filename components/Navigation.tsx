
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, RefreshCw, Coins, MessageCircle } from 'lucide-react';

const Navigation: React.FC = () => {
  const navItems = [
    { path: '/', icon: Home, label: 'Trang chủ' },
    { path: '/spins', icon: RefreshCw, label: 'Vòng quay' },
    { path: '/coins', icon: Coins, label: 'Nhận Xu' },
    { path: '/support', icon: MessageCircle, label: 'Hỗ trợ' },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[500px] z-50 px-4 pb-6">
      <div className="bg-white/95 backdrop-blur-xl border border-slate-200 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] rounded-[2.5rem] p-2 flex justify-around items-center">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex flex-col items-center gap-1.5 p-3 px-5 rounded-[2rem] transition-all duration-300
              ${isActive ? 'bg-purple-600 text-white shadow-lg shadow-purple-200 scale-105' : 'text-slate-400 hover:text-purple-400'}
            `}
          >
            {/* Fix: use render prop for NavLink children to access isActive status */}
            {({ isActive }) => (
              <>
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span className={`text-[8px] font-black uppercase tracking-widest ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
