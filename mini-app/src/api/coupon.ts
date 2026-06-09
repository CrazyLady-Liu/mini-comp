import type { Coupon, Product } from '@/types';
import { coupons as mockCoupons, couponCategories } from '@/data/coupons';
import { getDiscountProducts } from '@/data/products';

export const COUPON_ERROR_CODES = {
  COUPON_NOT_EXIST: 1001,
  COUPON_OUT_OF_STOCK: 1002,
  COUPON_ALREADY_RECEIVED: 1003,
  COUPON_EXPIRED: 1004,
  COUPON_NOT_STARTED: 1005,
  USER_NOT_QUALIFIED: 1006,
  USER_NOT_LOGIN: 1007,
  SELF_POINT_NOT_MATCH: 1008,
  SYSTEM_ERROR: 500
} as const;

export const COUPON_ERROR_MESSAGES: Record<number, string> = {
  [COUPON_ERROR_CODES.COUPON_NOT_EXIST]: '优惠券不存在',
  [COUPON_ERROR_CODES.COUPON_OUT_OF_STOCK]: '券已领完',
  [COUPON_ERROR_CODES.COUPON_ALREADY_RECEIVED]: '已领取过该券',
  [COUPON_ERROR_CODES.COUPON_EXPIRED]: '优惠券已过期',
  [COUPON_ERROR_CODES.COUPON_NOT_STARTED]: '活动未开始',
  [COUPON_ERROR_CODES.USER_NOT_QUALIFIED]: '不符合领取条件',
  [COUPON_ERROR_CODES.USER_NOT_LOGIN]: '请先登录',
  [COUPON_ERROR_CODES.SELF_POINT_NOT_MATCH]: '该自提点不支持此优惠券',
  [COUPON_ERROR_CODES.SYSTEM_ERROR]: '系统繁忙，请稍后再试'
};

export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

export interface ReceiveCouponParams {
  couponId: number;
  selfPointId?: number;
}

export interface CouponListParams {
  type?: string;
  selfPointId?: number;
  page?: number;
  pageSize?: number;
}

export interface MyCouponListParams {
  status?: 'available' | 'used' | 'expired' | 'all';
  page?: number;
  pageSize?: number;
}

let userCoupons: (Coupon & { userCouponId: number; receiveTime: string; validStart: string; validEnd: string })[] = [];
let nextUserCouponId = 1;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const generateError = (code: number, message: string): ApiResponse => ({
  code,
  message,
  data: null
});

const generateSuccess = <T>(data: T, message = 'success'): ApiResponse<T> => ({
  code: 0,
  message,
  data
});

export async function getCouponList(params: CouponListParams = {}): Promise<ApiResponse<{ list: Coupon[]; total: number }>> {
  await delay(300 + Math.random() * 200);

  let list = [...mockCoupons];

  if (params.type && params.type !== 'all') {
    list = list.filter(c => c.type === params.type);
  }

  if (params.selfPointId) {
    list = list.filter(c => {
      if (c.type === 'pickup') {
        return true;
      }
      return true;
    });
  }

  const total = list.length;

  if (params.page && params.pageSize) {
    const start = (params.page - 1) * params.pageSize;
    list = list.slice(start, start + params.pageSize);
  }

  return generateSuccess({ list, total });
}

export async function receiveCoupon(params: ReceiveCouponParams): Promise<ApiResponse<Coupon & { userCouponId: number }>> {
  await delay(500 + Math.random() * 300);

  const coupon = mockCoupons.find(c => c.id === params.couponId);
  if (!coupon) {
    return generateError(1001, '优惠券不存在');
  }

  if (coupon.stock <= 0) {
    return generateError(1002, '券已领完');
  }

  const receivedCount = userCoupons.filter(uc => uc.id === params.couponId).length;
  const limitPerUser = coupon.type === 'full' && coupon.id === 1 ? 1 :
                       coupon.type === 'full' && coupon.id === 2 ? 3 :
                       coupon.type === 'full' && coupon.id === 3 ? 1 :
                       coupon.type === 'category' && coupon.id === 4 ? 5 :
                       coupon.type === 'category' && coupon.id === 5 ? 3 :
                       coupon.type === 'category' && coupon.id === 6 ? 2 :
                       coupon.type === 'threshold' && coupon.id === 7 ? 1 :
                       coupon.type === 'threshold' && coupon.id === 8 ? 1 :
                       coupon.type === 'preorder' && coupon.id === 9 ? 2 :
                       coupon.type === 'preorder' && coupon.id === 10 ? 2 :
                       coupon.type === 'pickup' && coupon.id === 11 ? 1 :
                       coupon.type === 'pickup' && coupon.id === 12 ? 2 : 1;

  if (receivedCount >= limitPerUser) {
    return generateError(1003, '已领取过该券');
  }

  const now = new Date();
  const validDays = coupon.validDays || 30;
  const validEnd = new Date(now.getTime() + validDays * 24 * 60 * 60 * 1000);

  const userCoupon = {
    ...coupon,
    userCouponId: nextUserCouponId++,
    receiveTime: now.toISOString(),
    validStart: coupon.validFrom ? new Date(coupon.validFrom).toISOString() : now.toISOString(),
    validEnd: coupon.validTo ? new Date(coupon.validTo).toISOString() : validEnd.toISOString(),
    status: 'available' as const
  };

  userCoupons.push(userCoupon);

  coupon.stock = Math.max(0, coupon.stock - 1);
  coupon.receivedCount = coupon.receivedCount + 1;

  return generateSuccess(userCoupon, '领取成功');
}

export async function getMyCouponList(params: MyCouponListParams = {}): Promise<ApiResponse<{ list: (Coupon & { userCouponId: number; receiveTime: string })[]; total: number }>> {
  await delay(300 + Math.random() * 200);

  let list = [...userCoupons];

  const now = new Date();
  list = list.map(uc => {
    const validEnd = new Date(uc.validEnd);
    if (validEnd < now && uc.status === 'available') {
      return { ...uc, status: 'expired' as const };
    }
    return uc;
  });

  if (params.status && params.status !== 'all') {
    list = list.filter(uc => uc.status === params.status);
  }

  list.sort((a, b) => {
    if (a.status !== b.status) {
      const order: Record<string, number> = { available: 0, used: 1, expired: 2 };
      return order[a.status || 'available'] - order[b.status || 'available'];
    }
    return new Date(b.receiveTime).getTime() - new Date(a.receiveTime).getTime();
  });

  const total = list.length;

  if (params.page && params.pageSize) {
    const start = (params.page - 1) * params.pageSize;
    list = list.slice(start, start + params.pageSize);
  }

  return generateSuccess({ list, total });
}

export async function getRecommendProducts(count = 8): Promise<ApiResponse<Product[]>> {
  await delay(200 + Math.random() * 200);
  const products = getDiscountProducts().slice(0, count);
  return generateSuccess(products);
}

export async function getMoreRecommendProducts(page = 1, pageSize = 10): Promise<ApiResponse<{ list: Product[]; total: number }>> {
  await delay(300 + Math.random() * 200);
  const allProducts = getDiscountProducts();
  const total = allProducts.length;
  const start = (page - 1) * pageSize;
  const list = allProducts.slice(start, start + pageSize);
  return generateSuccess({ list, total });
}

export function getCouponCategories() {
  return couponCategories;
}
