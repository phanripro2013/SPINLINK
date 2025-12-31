
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, MessageSquare } from 'lucide-react';

const Admin: React.FC = () => {
  const navigate = useNavigate();

  const handleZaloClick = () => {
    window.open('https://zalo.me/0927099940', '_blank');
  };

  const handleCallClick = () => {
    window.open('tel:0927099940', '_self');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center py-2">
        <button 
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-100 text-blue-600 font-bold text-xs flex items-center gap-2 active:scale-95 transition-all"
        >
          <ArrowLeft size={16} /> Quay lại
        </button>
      </div>

      <div className="bg-white rounded-[3.5rem] p-10 shadow-2xl shadow-slate-200 flex flex-col items-center text-center space-y-6 relative overflow-hidden">
        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20"></div>
        
        <div className="w-24 h-24 bg-blue-600 rounded-[2.2rem] flex items-center justify-center shadow-2xl shadow-blue-300 relative">
          <span className="text-white text-4xl font-black italic">TW</span>
          <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full shadow-lg">
            <div className="w-4 h-4 bg-emerald-500 rounded-full border-2 border-white animate-pulse"></div>
          </div>
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl font-black tracking-tighter text-slate-800 uppercase italic">TW VŨ SPIN</h2>
          <p className="text-[10px] font-black text-slate-400 tracking-[0.3em] uppercase">Hỗ Trợ Trực Tuyến 24/7</p>
        </div>

        <div className="w-full space-y-3 pt-4">
          <button 
            onClick={handleCallClick}
            className="w-full py-4 px-6 bg-blue-50 border border-blue-100 rounded-[1.8rem] font-black text-blue-600 text-lg tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-all"
          >
            <Phone size={20} />
            0927.099.940
          </button>
          
          <button 
            onClick={handleZaloClick}
            className="w-full py-4 px-6 bg-emerald-50 border border-emerald-100 rounded-[1.8rem] font-black text-emerald-600 text-lg uppercase tracking-tight flex items-center justify-center gap-3 active:scale-95 transition-all shadow-sm"
          >
            <MessageSquare size={20} />
            NHẮN ZALO TW VŨ
          </button>
        </div>

        <div className="pt-4 px-4">
          <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
            Nếu bạn gặp bất kỳ vấn đề nào khi nhận Link quà tặng từ hệ thống <span className="font-bold text-slate-600">TW Vũ</span>, vui lòng liên hệ trực tiếp qua Zalo hoặc Hotline để được xử lý nhanh nhất.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
