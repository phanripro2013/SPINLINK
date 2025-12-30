
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Coins, Zap } from 'lucide-react';
import { SPIN_LINKS, COIN_LINKS } from '../constants';
import { LinkItem } from '../types';

const LinksPage: React.FC<{ type: 'spin' | 'coin' }> = ({ type }) => {
  const navigate = useNavigate();
  const links = type === 'spin' ? SPIN_LINKS : COIN_LINKS;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [type]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between py-2">
        <button 
          onClick={() => navigate(-1)}
          className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 active:scale-90 transition-all"
        >
          <ArrowLeft size={20} className="text-slate-600" />
        </button>
        <div className="flex flex-col items-end">
           <div className="flex items-center gap-2 font-black text-slate-800 italic">
              {type === 'spin' ? <RefreshCw size={18} className="text-blue-600" /> : <Coins size={18} className="text-amber-500" />}
              NHẬN {type === 'spin' ? 'SPIN' : 'VÀNG'}
           </div>
           <span className="text-[10px] font-bold text-blue-600 tracking-wider">ĐÃ CẬP NHẬT LINK</span>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="animate-pulse flex items-center p-4 bg-white rounded-[2rem] gap-4">
              <div className="w-12 h-12 bg-slate-100 rounded-2xl"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                <div className="h-2 bg-slate-50 rounded w-1/4"></div>
              </div>
              <div className="w-16 h-10 bg-slate-100 rounded-2xl"></div>
            </div>
          ))
        ) : (
          links.map((link) => (
            <LinkCard key={link.id} link={link} />
          ))
        )}
      </div>
    </div>
  );
};

const LinkCard: React.FC<{ link: LinkItem }> = ({ link }) => {
  const handleClaim = () => {
    window.open(link.url, '_blank');
  };

  return (
    <div className="group flex items-center p-4 bg-white rounded-[2.2rem] shadow-sm hover:shadow-md border border-slate-50 transition-all">
      <div className={`p-4 rounded-3xl ${link.type === 'spin' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-500'} group-hover:scale-110 transition-transform`}>
        {link.type === 'spin' ? <RefreshCw size={24} /> : <Coins size={24} />}
      </div>
      
      <div className="ml-4 flex-1">
        <h4 className="font-extrabold text-slate-800 text-[15px] leading-tight">{link.title}</h4>
        <p className="text-[10px] font-black text-slate-400 tracking-wider uppercase mt-0.5">{link.subtitle}</p>
      </div>

      <button 
        onClick={handleClaim}
        className={`
          px-6 py-2.5 rounded-2xl font-black text-[11px] tracking-wider transition-all active:scale-95
          ${link.type === 'spin' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-amber-500 text-white shadow-lg shadow-amber-200'}
        `}
      >
        LẤY
      </button>
    </div>
  );
};

export default LinksPage;
