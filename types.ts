// Fix: Import React to resolve 'React' namespace error for ElementType
import React from 'react';

export interface LinkItem {
  id: string;
  title: string;
  subtitle: string;
  timeLabel: string;
  type: 'spin' | 'coin';
  url: string;
}

export interface NavItem {
  id: string;
  icon: React.ElementType;
  path: string;
}