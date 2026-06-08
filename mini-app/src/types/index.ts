export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  unit: string;
  sales: number;
  tag?: 'preorder' | 'new' | 'hot' | 'discount';
  categoryId: number;
  description?: string;
  stock: number;
  specs?: ProductSpec[];
}

export interface ProductSpec {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export interface Category {
  id: number;
  name: string;
  icon?: string;
}

export interface Banner {
  id: number;
  image: string;
  title?: string;
  link?: string;
}

export interface CartItem {
  productId: number;
  product: Product;
  quantity: number;
  selected: boolean;
  specId?: number;
}

export interface Address {
  id: number;
  name: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  detail: string;
  isDefault: boolean;
}

export type OrderStatus = 'pending' | 'paid' | 'picking' | 'ready' | 'completed' | 'cancelled';

export interface Order {
  id: string;
  orderNo: string;
  status: OrderStatus;
  statusText: string;
  items: OrderItem[];
  totalAmount: number;
  discountAmount?: number;
  payAmount: number;
  createTime: string;
  payTime?: string;
  pickupCode?: string;
  pickupPoint?: PickupPoint;
  remark?: string;
}

export interface OrderItem {
  productId: number;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  specName?: string;
}

export interface PickupPoint {
  id: number;
  name: string;
  address: string;
  phone: string;
  businessHours: string;
  distance?: string;
}

export interface UserInfo {
  id: number;
  avatar: string;
  nickname: string;
  phone: string;
  points: number;
  couponCount: number;
}

export type CouponType = 'full' | 'category' | 'threshold' | 'preorder' | 'pickup';

export type CouponStatus = 'available' | 'used' | 'expired';

export interface Coupon {
  id: number;
  name: string;
  type: CouponType;
  typeText: string;
  discountValue: number;
  discountType: 'amount' | 'percent';
  minAmount: number;
  maxDiscount?: number;
  categoryName?: string;
  categoryId?: number;
  validFrom: string;
  validTo: string;
  validDays?: number;
  stock: number;
  receivedCount: number;
  description: string;
  usageNote?: string;
  status?: CouponStatus;
  useTime?: string;
}
