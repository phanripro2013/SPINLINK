
import React, { useState, useEffect, useMemo } from 'react';
import { REWARD_LINKS } from '../constants';
import { RefreshCw, Coins, Zap, Share2, Loader2, CheckCircle2, Cloud, AlertCircle } from 'lucide-react';
import { RewardLink } from '../types';

interface HomeProps {
  claimedIds: Record<string, boolean>;
  onClaim: (id: string, rewardId: string) => void;
}

const Home: React.FC<HomeProps> = ({ claimedIds, onClaim }) => {
  const [isUpdating, setIsUpdating] = useState(true);
  const [lastUpdate, setLastUpdate] = useState('');
  const [showUpdateToast, setShowUpdateToast] = useState(false);

  const refreshData = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      const now = new Date();
      setLastUpdate(`${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`);
      setShowUpdateToast(true);
      setTimeout(() => setShowUpdateToast(false), 3000);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  useEffect(() => {
    refreshData();
  }, []);

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
    <div className="flex flex-col relative min-h-screen overflow-hidden">
      {/* Background clouds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden h-full z-0">
        <Cloud className="cloud text-slate-100" size={64} style={{ top: '15%', animationDuration: '40s', animationDelay: '0s' }} />
        <Cloud className="cloud text-slate-100" size={48} style={{ top: '40%', animationDuration: '35s', animationDelay: '-10s' }} />
        <Cloud className="cloud text-slate-100" size={80} style={{ top: '65%', animationDuration: '50s', animationDelay: '-25s' }} />
        <Cloud className="cloud text-slate-100" size={56} style={{ top: '85%', animationDuration: '45s', animationDelay: '-5s' }} />
      </div>

      {/* Toast Notification */}
      {showUpdateToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] animate-bounce">
          <div className="bg-emerald-500 text-white px-4 py-2 rounded-full shadow-xl flex items-center gap-2 text-xs font-bold border border-emerald-400">
            <CheckCircle2 size={14} />
            Hệ thống TW Vũ đã cập nhật link mới!
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
                <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">100+ Link Daily</p>
             </div>
          </div>
          <div className="flex gap-2">
            <button onClick={refreshData} title="Làm mới" className="p-3 bg-white/20 rounded-2xl backdrop-blur-md active:scale-90 transition-all">
              <RefreshCw size={20} className={isUpdating ? 'animate-spin' : ''} />
            </button>
            <button onClick={handleShare} title="Chia sẻ" className="p-3 bg-white/20 rounded-2xl backdrop-blur-md active:scale-90 transition-all">
              <Share2 size={20} />
            </button>
          </div>
        </div>
        
        <div className="bg-white/10 p-4 rounded-3xl backdrop-blur-sm border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isUpdating ? (
              <Loader2 className="animate-spin text-yellow-400" size={16} />
            ) : (
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            )}
            <p className="text-xs font-medium">
              {isUpdating ? 'Đang quét link từ Database...' : `Cập nhật: ${lastUpdate}`}
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
      <div className="px-4 -mt-6 space-y-8 pb-10 relative z-10">
        {isUpdating ? (
          <div className="space-y-4 pt-10">
             {[1,2,3,4,5,6].map(i => (
               <div key={i} className="h-24 bg-white/80 backdrop-blur-sm rounded-[1.8rem] animate-pulse border border-slate-100"></div>
             ))}
          </div>
        ) : (
          <>
            {Object.entries(groups).map(([date, items]) => (
              <div key={date} className="space-y-4">
                <div className="flex items-center gap-3 px-2 sticky top-[140px] z-30 py-2 bg-slate-50/80 backdrop-blur-sm rounded-xl">
                   <div className="h-[2px] flex-1 bg-slate-200"></div>
                   <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100">
                     {date}
                   </span>
                   <div className="h-[2px] flex-1 bg-slate-200"></div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {/* Fix: Explicitly cast items to RewardLink[] to resolve 'Property map does not exist on type unknown' */}
                  {(items as RewardLink[]).map((link) => (
                    <div 
                      key={link.id}
                      className={`
                        flex items-center p-4 bg-white/90 backdrop-blur-sm rounded-[1.8rem] shadow-sm border border-slate-100 transition-all
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
                          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">Xác minh bởi TW Vũ</p>
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
            ))}
            
            {/* Disclaimer / Legal Notice */}
            <div className="mt-12 mb-20 p-6 bg-slate-100/50 rounded-[2.5rem] border border-slate-200 flex flex-col items-center gap-3">
              <AlertCircle className="text-slate-400" size={24} />
              <p className="text-[10px] text-slate-500 font-medium text-center leading-relaxed italic">
                <b>THÔNG BÁO PHÁP LÝ:</b> Ứng dụng này là một fan-app được phát triển bởi TW Vũ. Chúng tôi không liên kết, tài trợ hoặc được phê duyệt bởi Moon Active (nhà phát triển Coin Master). Tất cả các link quà tặng đều được tổng hợp từ các nguồn công khai chính thức của trò chơi.
              </p>
              <div className="h-[1px] w-12 bg-slate-300"></div>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">© 2024 TW VŨ DIGITAL</p>
            </div>
          </>
        )}
      </div>

      {/* Stats Footer */}
      {!isUpdating && (
        <div className="fixed bottom-24 left-0 w-full px-4 pointer-events-none z-50">
           <div className="max-w-lg mx-auto bg-slate-800/80 backdrop-blur-md text-white/70 text-[9px] py-1 px-4 rounded-full text-center font-bold uppercase tracking-widest border border-white/10 shadow-lg">
             Đang hiển thị {REWARD_LINKS.length} link quà tặng khả dụng
           </div>
        </div>
      )}
    </div>
  );
};

export default Home;
