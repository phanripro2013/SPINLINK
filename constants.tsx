
import { RewardLink } from './types';

// Hàm hỗ trợ tạo link giả lập để đảm bảo số lượng ~100
const generateLinks = (): RewardLink[] => {
  const links: RewardLink[] = [];
  const now = Date.now();
  const dayInMs = 86400000;

  // Cấu hình các loại phần thưởng
  const rewards = [
    { amount: '25 Vòng quay', type: 'spin' as const },
    { amount: '50 Vòng quay', type: 'spin' as const },
    { amount: '100 Vòng quay', type: 'spin' as const },
    { amount: '2 Triệu Xu', type: 'coin' as const },
    { amount: '5 Triệu Xu', type: 'coin' as const },
    { amount: '10 Triệu Xu', type: 'coin' as const },
    { amount: '25 Vòng quay & 1M Xu', type: 'multi' as const },
  ];

  // Tạo dữ liệu cho 10 ngày gần nhất
  for (let d = 0; d < 10; d++) {
    const date = new Date(now - d * dayInMs);
    const dateLabel = d === 0 ? 'Hôm nay' : 
                     d === 1 ? 'Hôm qua' : 
                     `Ngày ${date.getDate()} Tháng ${date.getMonth() + 1}`;
    
    // Mỗi ngày tạo khoảng 10 link
    for (let i = 0; i < 10; i++) {
      const reward = rewards[Math.floor(Math.random() * rewards.length)];
      const id = `link-${d}-${i}`;
      links.push({
        id,
        amount: reward.amount,
        type: reward.type,
        dateLabel,
        timestamp: now - (d * dayInMs) - (i * 3600000),
        rewardId: `CM_REWARD_${d}_${i}_${Math.random().toString(36).substring(7).toUpperCase()}`,
        isNew: d === 0 // Chỉ đánh dấu "Mới" cho ngày hôm nay
      });
    }
  }

  return links;
};

export const REWARD_LINKS: RewardLink[] = generateLinks();
