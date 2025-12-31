
import React from 'react';
import { MessageCircle, Mail, Globe, ArrowRight } from 'lucide-react';

const Support: React.FC = () => {
  const supportItems = [
    { 
      icon: MessageCircle, 
      title: 'Hỗ trợ Telegram', 
      sub: '@TWVuSpin_Support', 
      color: 'bg-sky-500',
      link: 'https://t.me/tonyhoaivu' 
    },
    { 
      icon: Mail, 
      title: 'Gửi Email cho tôi', 
      sub: 'tonyhoaivu@gmail.com', 
      color: 'bg-rose-500',
      link: 'mailto:tonyhoaivu@gmail.com'
    },
    { 
      icon: Globe, 
      title: 'Trang chủ chính thức', 
      sub: 'tonyhoaivu.profreehost.com', 
      color: 'bg-indigo-500',
      link: 'https://tonyhoaivu.profreehost.com'
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-black text-slate-800 italic uppercase tracking-tighter">Trung Tâm Hỗ Trợ</h2>
      
      <div className="space-y-4">
        {supportItems.map((item, i) => (
          <a 
            key={i} 
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-5 bg-white rounded-[2rem] border border-slate-100 shadow-sm active:scale-95 transition-all"
          >
            <div className={`p-4 rounded-2xl ${item.color} text-white shadow-lg`}>
              <item.icon size={22} />
            </div>
            <div className="ml-4 flex-1">
              <h3 className="font-bold text-slate-800">{item.title}</h3>
              <p className="text-xs text-slate-400 font-medium">{item.sub}</p>
            </div>
            <ArrowRight size={18} className="text-slate-300" />
          </a>
        ))}
      </div>

      <div className="bg-purple-50 p-6 rounded-[2rem] border border-purple-100">
        <h4 className="font-bold text-purple-800 text-sm mb-2 uppercase italic">Làm thế nào để nhận quà?</h4>
        <div className="text-[11px] text-purple-600 leading-relaxed space-y-2">
          <p className="flex gap-2">
            <span className="font-black">1.</span> 
            <span>Cài đặt game <span className="font-bold">Coin Master</span> chính thức trên thiết bị của bạn.</span>
          </p>
          <p className="flex gap-2">
            <span className="font-black">2.</span> 
            <span>Mở ứng dụng <span className="font-bold italic">TW Vũ Spin</span> mỗi ngày để lấy link mới nhất.</span>
          </p>
          <p className="flex gap-2">
            <span className="font-black">3.</span> 
            <span>Nhấn vào nút <span className="font-bold uppercase tracking-widest text-[9px] bg-purple-200 px-1 rounded">Nhận</span> ở các phần thưởng tương ứng.</span>
          </p>
          <p className="flex gap-2">
            <span className="font-black">4.</span> 
            <span>Chờ game tự động mở và phần quà sẽ tự cộng vào tài khoản của bạn!</span>
          </p>
        </div>
      </div>

      <div className="text-center">
        <p className="text-[10px] text-slate-400 font-medium">Phiên bản 1.0.0 • TW Vũ Digital</p>
        <p className="text-[9px] text-slate-300 font-bold uppercase mt-1">Design by Tony Hoai Vu</p>
      </div>
    </div>
  );
};

export default Support;
