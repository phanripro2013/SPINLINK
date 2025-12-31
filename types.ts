
import React from 'react';

export interface RewardLink {
  id: string;
  amount: string;
  type: 'spin' | 'coin' | 'multi';
  dateLabel: string; // 'Today', '7 September', etc.
  timestamp: number;
  rewardId: string;
  isNew?: boolean;
}

export interface ClaimState {
  [id: string]: boolean;
}
