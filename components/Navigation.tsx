
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Star, Share2, Lock, MessageCircle } from 'lucide-react';

const Navigation: React.FC = () => {
  const navItems = [
    { path: '/', icon: Star, label: 'Phần thưởng' },
    { path: '/share', icon: Share2, label: 'Chia sẻ' },
    { path: '/privacy', icon: Lock, label: 'Bảo mật' },
    { path: '/support', icon: MessageCircle, label: 'Hỗ trợ' },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[500px] z-50 px-4 pb-6">
      <div className="bg-white/90 backdrop-blur-xl border border-slate-200 shadow-2xl rounded-[2.5rem] p-2 flex justify-around items-center">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex flex-col items-center gap-1 p-3 rounded-3xl transition-all
              ${isActive ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400'}
            `}
          >
            <item.icon size={20} />
            <span className="text-[8px] font-bold uppercase tracking-widest">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
