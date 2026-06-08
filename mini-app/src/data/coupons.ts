import type { Coupon } from '@/types';

export const coupons: Coupon[] = [
  {
    id: 1,
    name: '新人专享券',
    type: 'full',
    typeText: '满减券',
    discountValue: 10,
    discountType: 'amount',
    minAmount: 59,
    validFrom: '2024-01-01',
    validTo: '2026-12-31',
    validDays: 30,
    stock: 1000,
    receivedCount: 856,
    description: '全场通用，满59元减10元',
    usageNote: '限新用户使用，每人限领1张'
  },
  {
    id: 2,
    name: '满减优惠券',
    type: 'full',
    typeText: '满减券',
    discountValue: 20,
    discountType: 'amount',
    minAmount: 99,
    validFrom: '2024-01-01',
    validTo: '2026-12-31',
    validDays: 15,
    stock: 500,
    receivedCount: 423,
    description: '全场通用，满99元减20元',
    usageNote: '每人限领3张'
  },
  {
    id: 3,
    name: '大额满减券',
    type: 'full',
    typeText: '满减券',
    discountValue: 50,
    discountType: 'amount',
    minAmount: 199,
    validFrom: '2024-01-01',
    validTo: '2026-12-31',
    validDays: 7,
    stock: 200,
    receivedCount: 187,
    description: '全场通用，满199元减50元',
    usageNote: '每人限领1张'
  },
  {
    id: 4,
    name: '新鲜蔬菜券',
    type: 'category',
    typeText: '品类券',
    discountValue: 8,
    discountType: 'amount',
    minAmount: 39,
    categoryName: '蔬菜',
    categoryId: 1,
    validFrom: '2024-01-01',
    validTo: '2026-12-31',
    validDays: 7,
    stock: 800,
    receivedCount: 654,
    description: '蔬菜品类满39元减8元',
    usageNote: '仅蔬菜类商品可用'
  },
  {
    id: 5,
    name: '水果专享券',
    type: 'category',
    typeText: '品类券',
    discountValue: 15,
    discountType: 'amount',
    minAmount: 69,
    categoryName: '水果',
    categoryId: 2,
    validFrom: '2024-01-01',
    validTo: '2026-12-31',
    validDays: 10,
    stock: 600,
    receivedCount: 512,
    description: '水果品类满69元减15元',
    usageNote: '仅水果类商品可用'
  },
  {
    id: 6,
    name: '肉禽蛋券',
    type: 'category',
    typeText: '品类券',
    discountValue: 12,
    discountType: 'amount',
    minAmount: 59,
    categoryName: '肉禽蛋',
    categoryId: 4,
    validFrom: '2024-01-01',
    validTo: '2026-12-31',
    validDays: 7,
    stock: 500,
    receivedCount: 389,
    description: '肉禽蛋类满59元减12元',
    usageNote: '仅肉禽蛋类商品可用'
  },
  {
    id: 7,
    name: '无门槛红包',
    type: 'threshold',
    typeText: '无门槛',
    discountValue: 5,
    discountType: 'amount',
    minAmount: 0,
    validFrom: '2024-01-01',
    validTo: '2026-12-31',
    validDays: 3,
    stock: 2000,
    receivedCount: 1876,
    description: '无门槛立减5元',
    usageNote: '全场通用，每人限领1张/天'
  },
  {
    id: 8,
    name: '新人无门槛',
    type: 'threshold',
    typeText: '无门槛',
    discountValue: 15,
    discountType: 'amount',
    minAmount: 0,
    validFrom: '2024-01-01',
    validTo: '2026-12-31',
    validDays: 30,
    stock: 500,
    receivedCount: 423,
    description: '新人专享，无门槛减15元',
    usageNote: '限新用户使用，每人限领1张'
  },
  {
    id: 9,
    name: '预售商品券',
    type: 'preorder',
    typeText: '预售券',
    discountValue: 10,
    discountType: 'amount',
    minAmount: 49,
    validFrom: '2024-01-01',
    validTo: '2026-12-31',
    validDays: 7,
    stock: 300,
    receivedCount: 234,
    description: '预售商品满49元减10元',
    usageNote: '仅预售商品可用'
  },
  {
    id: 10,
    name: '预售大额券',
    type: 'preorder',
    typeText: '预售券',
    discountValue: 30,
    discountType: 'amount',
    minAmount: 129,
    validFrom: '2024-01-01',
    validTo: '2026-12-31',
    validDays: 10,
    stock: 150,
    receivedCount: 98,
    description: '预售商品满129元减30元',
    usageNote: '仅预售商品可用，每人限领2张'
  },
  {
    id: 11,
    name: '自提专属券',
    type: 'pickup',
    typeText: '自提券',
    discountValue: 6,
    discountType: 'amount',
    minAmount: 29,
    validFrom: '2024-01-01',
    validTo: '2026-12-31',
    validDays: 7,
    stock: 1000,
    receivedCount: 876,
    description: '到店自提满29元减6元',
    usageNote: '限到店自提订单使用'
  },
  {
    id: 12,
    name: '自提满减券',
    type: 'pickup',
    typeText: '自提券',
    discountValue: 15,
    discountType: 'amount',
    minAmount: 79,
    validFrom: '2024-01-01',
    validTo: '2026-12-31',
    validDays: 10,
    stock: 400,
    receivedCount: 312,
    description: '到店自提满79元减15元',
    usageNote: '限到店自提订单使用'
  }
];

export const getCouponById = (id: number): Coupon | undefined => {
  return coupons.find(c => c.id === id);
};

export const getCouponsByType = (type: string): Coupon[] => {
  if (type === 'all') return coupons;
  return coupons.filter(c => c.type === type);
};

export const getAvailableCoupons = (): Coupon[] => {
  return coupons.filter(c => c.stock > 0);
};

export const couponCategories = [
  { id: 'all', name: '全部' },
  { id: 'full', name: '满减' },
  { id: 'category', name: '品类' },
  { id: 'threshold', name: '无门槛' },
  { id: 'preorder', name: '预售' },
  { id: 'pickup', name: '自提专属' }
];
