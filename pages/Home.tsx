
import React, { useState, useEffect, useMemo } from 'react';
import { REWARD_LINKS } from '../constants';
import { RefreshCw, Coins, Zap, Share2, Loader2, CheckCircle2 } from 'lucide-react';
// Import RewardLink type for explicit typing to resolve TS inference issues
import { RewardLink } from '../types';

interface HomeProps {
  claimedIds: Record<string, boolean>;
  onClaim: (id: string, rewardId: string) => void;
}

const Home: React.FC<HomeProps> = ({ claimedIds, onClaim }) => {
  const [isUpdating, setIsUpdating] = useState(true);
  const [lastUpdate, setLastUpdate] = useState('');
  const [showUpdateToast, setShowUpdateToast] = useState(false);

  useEffect(() => {
    // Hiệu ứng khởi động và "tải link"
    const timer = setTimeout(() => {
      setIsUpdating(false);
      const now = new Date();
      setLastUpdate(`${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`);
      
      // Hiển thị thông báo đã cập nhật thành công
      setShowUpdateToast(true);
      setTimeout(() => setShowUpdateToast(false), 3000);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Memoize việc nhóm để tối ưu hiệu năng cho danh sách lớn
  // Fix: Explicitly type the accumulator as Record<string, RewardLink[]> to ensure 'items' in map is correctly inferred
  const groups = useMemo(() => {
    return REWARD_LINKS.reduce((acc, link) => {
      if (!acc[link.dateLabel]) acc[link.dateLabel] = [];
      acc[link.dateLabel].push(link);
      return acc;
    }, {} as Record<string, RewardLink[]>);
  }, []);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const homepageLink = 'https://tonyhoaivu.profreehost.com';
    if (navigator.share) {
      navigator.share({
        title: 'TW Vũ Spin CoinsMaster - 100+ Link Mỗi Ngày',
        text: 'Nhận hàng trăm vòng quay và xu miễn phí mỗi ngày tại đây!',
        url: homepageLink,
      });
    } else {
      navigator.clipboard.writeText(homepageLink);
      alert('Đã sao chép link trang chủ vào bộ nhớ tạm!');
    }
  };

  return (
    <div className="flex flex-col relative min-h-screen">
      {/* Toast Notification */}
      {showUpdateToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] animate-bounce">
          <div className="bg-emerald-500 text-white px-4 py-2 rounded-full shadow-xl flex items-center gap-2 text-xs font-bold border border-emerald-400">
            <CheckCircle2 size={14} />
            Hệ thống TW Vũ đã cập nhật 100+ link mới!
          </div>
        </div>
      )}

      {/* Premium Header */}
      <div className="gradient-purple p-6 pb-12 rounded-b-[2.5rem] text-white relative sticky top-0 z-40 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/30">
                <Zap className="text-purple-900 fill-current" size={28} />
             </div>
             <div>
                <h1 className="text-xl font-black italic tracking-tighter">TW VŨ SPIN</h1>
                <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">Hệ thống 100+ Link Daily</p>
             </div>
          </div>
          <button onClick={handleShare} title="Chia sẻ ứng dụng" className="p-3 bg-white/20 rounded-2xl backdrop-blur-md active:scale-90 transition-all">
            <Share2 size={20} />
          </button>
        </div>
        
        <div className="bg-white/10 p-4 rounded-3xl backdrop-blur-sm border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isUpdating ? (
              <Loader2 className="animate-spin text-yellow-400" size={16} />
            ) : (
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            )}
            <p className="text-xs font-medium">
              {isUpdating ? 'Đang quét link từ Database TW Vũ...' : `Tự động cập nhật: ${lastUpdate}`}
            </p>
          </div>
          {!isUpdating && (
            <div className="flex items-center gap-1">
               <span className="text-[9px] bg-emerald-500 px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">Online</span>
            </div>
          )}
        </div>
      </div>

      {/* Reward List */}
      <div className="px-4 -mt-6 space-y-8 pb-32">
        {isUpdating ? (
          <div className="space-y-4 pt-10">
             {[1,2,3,4,5,6].map(i => (
               <div key={i} className="h-24 bg-white rounded-[1.8rem] animate-pulse border border-slate-100"></div>
             ))}
          </div>
        ) : (
          Object.entries(groups).map(([date, items]) => (
            <div key={date} className="space-y-4">
              <div className="flex items-center gap-3 px-2 sticky top-[140px] z-30 py-2 bg-slate-50/80 backdrop-blur-sm rounded-xl">
                 <div className="h-[2px] flex-1 bg-slate-200"></div>
                 <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100">
                   {date}
                 </span>
                 <div className="h-[2px] flex-1 bg-slate-200"></div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {items.map((link) => (
                  <div 
                    key={link.id}
                    className={`
                      flex items-center p-4 bg-white rounded-[1.8rem] shadow-sm border border-slate-100 transition-all
                      ${claimedIds[link.id] ? 'claimed-item' : 'hover:border-purple-200 active:scale-[0.98]'}
                    `}
                  >
                    <div className={`p-4 rounded-2xl ${
                      link.type === 'coin' ? 'bg-amber-100 text-amber-600' : 
                      link.type === 'multi' ? 'bg-emerald-100 text-emerald-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      {link.type === 'coin' ? <Coins size={24} /> : <RefreshCw size={24} />}
                    </div>

                    <div className="ml-4 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-800 text-base">{link.amount}</h4>
                        {link.isNew && !claimedIds[link.id] && (
                          <span className="bg-red-500 text-white text-[8px] px-1.5 py-0.5 rounded-full font-black uppercase tracking-tighter shadow-sm animate-pulse">New</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Zap size={10} className="text-yellow-500 fill-current" />
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">Hệ thống TW Vũ</p>
                      </div>
                    </div>

                    <button 
                      disabled={claimedIds[link.id]}
                      onClick={() => onClaim(link.id, link.rewardId)}
                      className={`
                        px-5 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-wider shadow-md transition-all
                        ${claimedIds[link.id] 
                          ? 'bg-slate-100 text-slate-400 shadow-none' 
                          : 'bg-yellow-400 text-purple-900 shadow-yellow-100 hover:bg-yellow-500 active:bg-yellow-600'}
                      `}
                    >
                      {claimedIds[link.id] ? 'Xong' : 'Nhận'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Stats Footer */}
      {!isUpdating && (
        <div className="fixed bottom-24 left-0 w-full px-4 pointer-events-none">
           <div className="max-w-lg mx-auto bg-slate-800/80 backdrop-blur-md text-white/70 text-[9px] py-1 px-4 rounded-full text-center font-bold uppercase tracking-widest border border-white/10 shadow-lg">
             Đang hiển thị {REWARD_LINKS.length} link quà tặng khả dụng
           </div>
        </div>
      )}
    </div>
  );
};

export default Home;
