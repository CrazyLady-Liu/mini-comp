import type { PickupPoint, Address, UserInfo } from '@/types';

export const pickupPoints: PickupPoint[] = [
  {
    id: 1,
    name: '阳光社区自提点',
    address: '阳光小区1号楼1单元101室',
    phone: '13800138001',
    businessHours: '08:00-20:00',
    distance: '0.5km'
  },
  {
    id: 2,
    name: '绿园小区自提点',
    address: '绿园小区东门便利店',
    phone: '13900139002',
    businessHours: '07:00-22:00',
    distance: '1.2km'
  },
  {
    id: 3,
    name: '幸福家园自提点',
    address: '幸福家园小区南门旁',
    phone: '13700137003',
    businessHours: '08:30-21:00',
    distance: '1.8km'
  }
];

export const addresses: Address[] = [
  {
    id: 1,
    name: '张三',
    phone: '13800138000',
    province: '北京市',
    city: '北京市',
    district: '朝阳区',
    detail: '阳光小区1号楼1单元101室',
    isDefault: true
  },
  {
    id: 2,
    name: '李四',
    phone: '13900139000',
    province: '北京市',
    city: '北京市',
    district: '海淀区',
    detail: '绿园小区2号楼3单元502室',
    isDefault: false
  }
];

export const userInfo: UserInfo = {
  id: 1,
  avatar: 'https://picsum.photos/id/64/200/200',
  nickname: '社区用户',
  phone: '138****8000',
  points: 1280,
  couponCount: 3
};
