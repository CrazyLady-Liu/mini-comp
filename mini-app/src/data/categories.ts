import type { Category } from '@/types';

export const categories: Category[] = [
  { id: 0, name: '全部' },
  { id: 1, name: '时令蔬菜' },
  { id: 2, name: '新鲜水果' },
  { id: 3, name: '蛋奶豆品' },
  { id: 4, name: '肉禽蛋品' },
  { id: 5, name: '海鲜水产' },
  { id: 6, name: '粮油调味' },
  { id: 7, name: '酒水饮料' },
  { id: 8, name: '休闲零食' }
];

export const getCategoryById = (id: number): Category | undefined => {
  return categories.find(c => c.id === id);
};
