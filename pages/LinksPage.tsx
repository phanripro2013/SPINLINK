
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Coins, Zap, ChevronRight, Loader2 } from 'lucide-react';
import { REWARD_LINKS } from '../constants';
import { RewardLink } from '../types';

const LinksPage: React.FC<{ type: 'spin' | 'coin' }> = ({ type }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [type]);

  const filteredLinks = useMemo(() => 
    REWARD_LINKS.filter(link => link.type === type || (type === 'spin' && link.type === 'multi')),
    [type]
  );

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <div className={`${type === 'spin' ? 'bg-blue-600' : 'bg-amber-500'} p-6 pb-10 rounded-b-[2.5rem] text-white shadow-lg sticky top-0 z-40 transition-colors duration-500`}>
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => navigate('/')}
            className="p-3 bg-white/20 rounded-2xl backdrop-blur-md active:scale-90 transition-all border border-white/10"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex flex-col items-end">
             <div className="flex items-center gap-2 font-black text-lg italic tracking-tighter">
                {type === 'spin' ? <RefreshCw size={22} /> : <Coins size={22} />}
                {type === 'spin' ? 'SPIN MIỄN PHÍ' : 'XU MIỄN PHÍ'}
             </div>
             <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">Cập nhật bởi TW Vũ</p>
          </div>
        </div>
        
        <div className="bg-black/10 p-3 rounded-2xl flex items-center gap-2">
          <Zap size={14} className="text-yellow-400 fill-current" />
          <span className="text-[11px] font-bold">Tìm thấy {filteredLinks.length} link quà tặng mới nhất!</span>
        </div>
      </div>

      {/* List */}
      <div className="px-4 -mt-4 space-y-3 pb-32">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse flex items-center p-5 bg-white rounded-[2rem] gap-4 shadow-sm border border-slate-100">
              <div className="w-14 h-14 bg-slate-100 rounded-2xl"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                <div className="h-2 bg-slate-50 rounded w-1/4"></div>
              </div>
              <div className="w-20 h-10 bg-slate-100 rounded-2xl"></div>
            </div>
          ))
        ) : filteredLinks.length > 0 ? (
          filteredLinks.map((link) => (
            <LinkCard key={link.id} link={link} type={type} />
          ))
        ) : (
          <div className="pt-20 text-center space-y-4">
            <div className="w-20 h-20 bg-slate-200 rounded-full mx-auto flex items-center justify-center text-slate-400">
              <Loader2 size={32} className="animate-spin" />
            </div>
            <p className="text-slate-500 font-bold uppercase text-xs">Đang tải dữ liệu từ server...</p>
          </div>
        )}
      </div>
    </div>
  );
};

const LinkCard: React.FC<{ link: RewardLink; type: string }> = ({ link, type }) => {
  const [claimed, setClaimed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('claimed_rewards');
    if (saved) {
      const data = JSON.parse(saved);
      if (data[link.id]) setClaimed(true);
    }
  }, [link.id]);

  const handleClaim = () => {
    const saved = JSON.parse(localStorage.getItem('claimed_rewards') || '{}');
    saved[link.id] = true;
    localStorage.setItem('claimed_rewards', JSON.stringify(saved));
    setClaimed(true);
    
    const deepLink = `https://vik-game.moonactive.net/external/openReward?rewardId=${link.rewardId}`;
    window.open(deepLink, '_blank');
  };

  return (
    <div className={`
      group flex items-center p-4 bg-white rounded-[2.2rem] shadow-sm transition-all duration-300 border border-slate-100
      ${claimed ? 'opacity-60 grayscale' : 'hover:shadow-md hover:border-blue-100'}
    `}>
      <div className={`
        p-4 rounded-[1.5rem] transition-transform duration-500 group-hover:rotate-12
        ${link.type === 'coin' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}
      `}>
        {link.type === 'coin' ? <Coins size={28} /> : <RefreshCw size={28} />}
      </div>
      
      <div className="ml-4 flex-1">
        <div className="flex items-center gap-1.5">
          <h4 className="font-black text-slate-800 text-[16px] leading-tight tracking-tight">{link.amount}</h4>
          {link.isNew && !claimed && <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></div>}
        </div>
        <div className="flex items-center gap-1 mt-0.5">
          <p className="text-[10px] font-black text-slate-400 tracking-wider uppercase">{link.dateLabel}</p>
          <span className="text-slate-200">•</span>
          <p className="text-[9px] font-bold text-blue-400 uppercase">Xác minh</p>
        </div>
      </div>

      <button 
        onClick={handleClaim}
        disabled={claimed}
        className={`
          relative overflow-hidden px-5 py-3 rounded-2xl font-black text-[11px] tracking-widest transition-all active:scale-95 flex items-center gap-1
          ${claimed 
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
            : type === 'spin' 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
              : 'bg-amber-500 text-white shadow-lg shadow-amber-100'}
        `}
      >
        {claimed ? 'XONG' : 'NHẬN'}
        {!claimed && <ChevronRight size={14} />}
      </button>
    </div>
  );
};

export default LinksPage;
