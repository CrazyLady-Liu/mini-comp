import type { Category } from '@/types';

export const categories: Category[] = [
  { id: 0, name: '全部', icon: '🛒' },
  { id: 1, name: '时令蔬菜', icon: '🥬' },
  { id: 2, name: '新鲜水果', icon: '🍎' },
  { id: 3, name: '蛋奶豆品', icon: '🥛' },
  { id: 4, name: '肉禽蛋品', icon: '🥩' },
  { id: 5, name: '海鲜水产', icon: '🦐' },
  { id: 6, name: '粮油调味', icon: '🍚' },
  { id: 7, name: '酒水饮料', icon: '🍺' },
  { id: 8, name: '休闲零食', icon: '🍪' }
];

export const getCategoryById = (id: number): Category | undefined => {
  return categories.find(c => c.id === id);
};
