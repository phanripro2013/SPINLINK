
import React from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, Coins, Star, Phone } from 'lucide-react';

const Home: React.FC = () => {
  const menuItems = [
    { title: 'SPIN LINKS', sub: 'Auto Update PRO', icon: RefreshCw, color: 'blue', path: '/spins' },
    { title: 'COIN LINKS', sub: 'Auto Update PRO', icon: Coins, color: 'amber', path: '/coins' },
    { title: 'ZALO ADMIN', sub: 'Support 24/7', icon: Phone, color: 'green', path: '/admin' },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-600 text-white';
      case 'amber': return 'bg-amber-500 text-white';
      case 'green': return 'bg-emerald-500 text-white';
      default: return 'bg-slate-600 text-white';
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="relative overflow-hidden hero-gradient rounded-[2.5rem] p-8 text-white shadow-2xl shadow-blue-200">
        <div className="absolute top-0 right-0 p-4 opacity-10">
           <Star size={120} />
        </div>
        <div className="relative z-10 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-[10px] font-bold tracking-widest uppercase opacity-80">HỆ THỐNG ĐANG HOẠT ĐỘNG</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight leading-none uppercase">VŨ.SYMCOINMASTER</h1>
          <p className="text-sm opacity-90 font-medium">Tự động cập nhật link từ Game mỗi 30 phút.</p>
        </div>
      </div>

      {/* Grid Menu */}
      <div className="grid grid-cols-2 gap-4">
        {menuItems.map((item, idx) => (
          <Link 
            key={idx} 
            to={item.path}
            className={`
              flex flex-col p-5 bg-white rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-md transition-all active:scale-95
              ${item.title === 'ZALO ADMIN' ? 'col-span-2' : ''}
            `}
          >
            <div className="flex items-center gap-3">
               <div className={`p-3 rounded-2xl ${getColorClasses(item.color)} shadow-lg`}>
                 <item.icon size={20} />
               </div>
               <div className="flex flex-col">
                 <span className="font-extrabold text-[13px] tracking-tight text-slate-800 leading-tight">{item.title}</span>
                 <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase">
                    {item.sub}
                    {item.sub.includes('PRO') && <span className="text-blue-500">PRO</span>}
                 </span>
               </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
