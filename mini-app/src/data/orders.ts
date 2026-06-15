import type { Order, OrderStatus } from '@/types';

const statusTextMap: Record<OrderStatus, string> = {
  pending: '待付款',
  paid: '待备货',
  picking: '分拣中',
  ready: '待自提',
  completed: '已完成',
  cancelled: '已取消'
};

export const orders: Order[] = [
  {
    id: '1',
    orderNo: '202406070001',
    status: 'ready',
    statusText: '待自提',
    items: [
      {
        productId: 1,
        productName: '有机西红柿',
        productImage: 'https://picsum.photos/id/292/200/200',
        price: 5.99,
        quantity: 2,
        specName: '3斤装'
      },
      {
        productId: 2,
        productName: '新鲜黄瓜',
        productImage: 'https://picsum.photos/id/312/200/200',
        price: 3.99,
        quantity: 1,
        specName: '1斤装'
      }
    ],
    totalAmount: 22.97,
    payAmount: 15.97,
    discountAmount: 7,
    createTime: '2024-06-07 09:30:00',
    payTime: '2024-06-07 09:32:00',
    pickupCode: 'A8K3',
    pickupPoint: {
      id: 1,
      name: '阳光社区自提点',
      address: '阳光小区1号楼1单元101室',
      phone: '13800138001',
      businessHours: '08:00-20:00'
    }
  },
  {
    id: '2',
    orderNo: '202406060002',
    status: 'completed',
    statusText: '已完成',
    items: [
      {
        productId: 4,
        productName: '土鸡蛋',
        productImage: 'https://picsum.photos/id/326/200/200',
        price: 19.9,
        quantity: 1,
        specName: '10枚装'
      },
      {
        productId: 5,
        productName: '新鲜牛奶',
        productImage: 'https://picsum.photos/id/401/200/200',
        price: 12.9,
        quantity: 2,
        specName: '1L装'
      }
    ],
    totalAmount: 45.7,
    payAmount: 45.7,
    createTime: '2024-06-06 14:20:00',
    payTime: '2024-06-06 14:22:00',
    pickupPoint: {
      id: 1,
      name: '阳光社区自提点',
      address: '阳光小区1号楼1单元101室',
      phone: '13800138001',
      businessHours: '08:00-20:00'
    }
  },
  {
    id: '3',
    orderNo: '202606120003',
    status: 'pending',
    statusText: '待付款',
    items: [
      {
        productId: 6,
        productName: '精选五花肉',
        productImage: 'https://picsum.photos/id/570/200/200',
        price: 28.9,
        quantity: 1,
        specName: '1斤装'
      }
    ],
    totalAmount: 28.9,
    payAmount: 28.9,
    createTime: '2026-06-12 21:40:00',
    pickupPoint: {
      id: 2,
      name: '绿园小区自提点',
      address: '绿园小区东门便利店',
      phone: '13900139002',
      businessHours: '07:00-22:00'
    }
  },
  {
    id: '5',
    orderNo: '202606120005',
    status: 'pending',
    statusText: '待付款',
    items: [
      {
        productId: 10,
        productName: '有机蓝莓',
        productImage: 'https://picsum.photos/id/654/200/200',
        price: 35.9,
        quantity: 2,
        specName: '125g装'
      },
      {
        productId: 11,
        productName: '进口车厘子',
        productImage: 'https://picsum.photos/id/660/200/200',
        price: 59.9,
        quantity: 1,
        specName: '500g装'
      }
    ],
    totalAmount: 131.7,
    payAmount: 121.7,
    discountAmount: 10,
    createTime: '2026-06-12 21:35:00',
    pickupPoint: {
      id: 1,
      name: '阳光社区自提点',
      address: '阳光小区1号楼1单元101室',
      phone: '13800138001',
      businessHours: '08:00-20:00'
    }
  },
  {
    id: '6',
    orderNo: '202606120006',
    status: 'pending',
    statusText: '待付款',
    items: [
      {
        productId: 12,
        productName: '有机生菜',
        productImage: 'https://picsum.photos/id/429/200/200',
        price: 6.9,
        quantity: 3,
        specName: '200g装'
      },
      {
        productId: 13,
        productName: '紫甘蓝',
        productImage: 'https://picsum.photos/id/440/200/200',
        price: 8.5,
        quantity: 1,
        specName: '1个装'
      },
      {
        productId: 14,
        productName: '胡萝卜',
        productImage: 'https://picsum.photos/id/458/200/200',
        price: 4.5,
        quantity: 2,
        specName: '1斤装'
      }
    ],
    totalAmount: 40.2,
    payAmount: 35.2,
    discountAmount: 5,
    createTime: '2026-06-12 21:30:00',
    pickupPoint: {
      id: 2,
      name: '绿园小区自提点',
      address: '绿园小区东门便利店',
      phone: '13900139002',
      businessHours: '07:00-22:00'
    }
  },
  {
    id: '4',
    orderNo: '202406040004',
    status: 'picking',
    statusText: '分拣中',
    items: [
      {
        productId: 7,
        productName: '新鲜草莓',
        productImage: 'https://picsum.photos/id/580/200/200',
        price: 25.9,
        quantity: 2,
        specName: '250g装'
      },
      {
        productId: 9,
        productName: '香蕉',
        productImage: 'https://picsum.photos/id/1080/200/200',
        price: 4.99,
        quantity: 2,
        specName: '2斤装'
      }
    ],
    totalAmount: 61.78,
    payAmount: 61.78,
    createTime: '2024-06-04 10:00:00',
    payTime: '2024-06-04 10:05:00',
    pickupPoint: {
      id: 1,
      name: '阳光社区自提点',
      address: '阳光小区1号楼1单元101室',
      phone: '13800138001',
      businessHours: '08:00-20:00'
    }
  }
];

export const getOrdersByStatus = (status: OrderStatus | 'all'): Order[] => {
  if (status === 'all') return orders;
  return orders.filter(o => o.status === status);
};

export const getOrderById = (id: string): Order | undefined => {
  return orders.find(o => o.id === id);
};
