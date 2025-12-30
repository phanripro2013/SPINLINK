
import React from 'react';
import { NavLink } from 'react-router-dom';
import { RefreshCw, Star, User } from 'lucide-react';

const Navigation: React.FC = () => {
  const navItems = [
    { id: 'home', path: '/', icon: RefreshCw },
    { id: 'spins', path: '/spins', icon: Star },
    { id: 'admin', path: '/admin', icon: User },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50">
      <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-[2.5rem] p-3 flex justify-between items-center">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) => `
              relative p-4 rounded-full transition-all duration-300
              ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-300 -translate-y-1' : 'text-slate-400 hover:text-blue-500'}
            `}
          >
            <item.icon size={22} />
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
