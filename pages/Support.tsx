
import React from 'react';
import { MessageCircle, Mail, Globe, ArrowRight, ShieldCheck } from 'lucide-react';

const Support: React.FC = () => {
  const supportItems = [
    { 
      icon: MessageCircle, 
      title: 'Hỗ trợ Telegram', 
      sub: '@tonyhoaivu', 
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
    <div className="p-6 space-y-6 pb-32">
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

      <div className="bg-blue-50 p-6 rounded-[2rem] border border-blue-100">
        <div className="flex items-center gap-2 mb-3 text-blue-800">
          <ShieldCheck size={18} />
          <h4 className="font-bold text-sm uppercase italic">Chính sách bảo mật</h4>
        </div>
        <div className="text-[11px] text-blue-600 leading-relaxed space-y-2 font-medium">
          <p>Hệ thống <b>TW Vũ Spin</b> cam kết không thu thập bất kỳ dữ liệu cá nhân nào từ tài khoản Coin Master của bạn.</p>
          <p>Chúng tôi chỉ lưu trữ lịch sử nhận quà cục bộ (Local Storage) trên điện thoại của bạn để tránh việc nhấn nhầm link đã nhận.</p>
        </div>
      </div>

      <div className="bg-purple-50 p-6 rounded-[2rem] border border-purple-100">
        <h4 className="font-bold text-purple-800 text-sm mb-2 uppercase italic">Hướng dẫn PWA</h4>
        <div className="text-[11px] text-purple-600 leading-relaxed space-y-2">
          <p className="flex gap-2">
            <span className="font-black">1.</span> 
            <span>Nhấn vào menu trình duyệt (3 dấu chấm hoặc mũi tên).</span>
          </p>
          <p className="flex gap-2">
            <span className="font-black">2.</span> 
            <span>Chọn <b>"Thêm vào màn hình chính"</b> (Add to Home Screen).</span>
          </p>
          <p className="flex gap-2">
            <span className="font-black">3.</span> 
            <span>Mở ứng dụng từ màn hình chính để có trải nghiệm như app thật!</span>
          </p>
        </div>
      </div>

      <div className="text-center pt-10">
        <p className="text-[10px] text-slate-400 font-medium">Phiên bản 1.0.2 • Hệ thống TW Vũ Digital</p>
        <p className="text-[9px] text-slate-300 font-bold uppercase mt-1">Design by Tony Hoai Vu</p>
      </div>
    </div>
  );
};

export default Support;
