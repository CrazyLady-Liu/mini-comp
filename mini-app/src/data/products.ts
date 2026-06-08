import type { Product } from '@/types';

export const products: Product[] = [
  {
    id: 1,
    name: '有机西红柿',
    image: 'https://picsum.photos/id/292/300/300',
    price: 5.99,
    originalPrice: 8.99,
    unit: '斤',
    sales: 1234,
    tag: 'hot',
    categoryId: 1,
    description: '新鲜有机西红柿，自然成熟，酸甜可口',
    stock: 100,
    specs: [
      { id: 1, name: '1斤装', price: 5.99, stock: 50 },
      { id: 2, name: '3斤装', price: 16.99, stock: 30 }
    ]
  },
  {
    id: 2,
    name: '新鲜黄瓜',
    image: 'https://picsum.photos/id/312/300/300',
    price: 3.99,
    originalPrice: 5.99,
    unit: '斤',
    sales: 856,
    tag: 'new',
    categoryId: 1,
    description: '顶花带刺，新鲜脆嫩',
    stock: 200,
    specs: [
      { id: 1, name: '1斤装', price: 3.99, stock: 100 }
    ]
  },
  {
    id: 3,
    name: '红富士苹果',
    image: 'https://picsum.photos/id/431/300/300',
    price: 6.99,
    originalPrice: 9.99,
    unit: '斤',
    sales: 2341,
    tag: 'preorder',
    categoryId: 2,
    description: '陕西洛川红富士，脆甜多汁',
    stock: 0,
    specs: [
      { id: 1, name: '2斤装', price: 13.99, stock: 0 },
      { id: 2, name: '5斤装', price: 32.99, stock: 0 }
    ]
  },
  {
    id: 4,
    name: '土鸡蛋',
    image: 'https://picsum.photos/id/326/300/300',
    price: 19.9,
    originalPrice: 25.9,
    unit: '盒/10枚',
    sales: 567,
    tag: 'hot',
    categoryId: 3,
    description: '农家散养土鸡蛋，营养丰富',
    stock: 50,
    specs: [
      { id: 1, name: '10枚装', price: 19.9, stock: 30 }
    ]
  },
  {
    id: 5,
    name: '新鲜牛奶',
    image: 'https://picsum.photos/id/401/300/300',
    price: 12.9,
    unit: '盒/1L',
    sales: 789,
    categoryId: 3,
    description: '每日新鲜配送，巴氏杀菌',
    stock: 80,
    specs: [
      { id: 1, name: '1L装', price: 12.9, stock: 50 }
    ]
  },
  {
    id: 6,
    name: '精选五花肉',
    image: 'https://picsum.photos/id/570/300/300',
    price: 28.9,
    originalPrice: 35.9,
    unit: '斤',
    sales: 432,
    tag: 'discount',
    categoryId: 4,
    description: '土猪五花肉，肥瘦相间',
    stock: 30,
    specs: [
      { id: 1, name: '1斤装', price: 28.9, stock: 20 }
    ]
  },
  {
    id: 7,
    name: '新鲜草莓',
    image: 'https://picsum.photos/id/580/300/300',
    price: 25.9,
    originalPrice: 32.9,
    unit: '盒/250g',
    sales: 1024,
    tag: 'preorder',
    categoryId: 2,
    description: '丹东99草莓，香甜可口',
    stock: 0,
    specs: [
      { id: 1, name: '250g装', price: 25.9, stock: 0 },
      { id: 2, name: '500g装', price: 49.9, stock: 0 }
    ]
  },
  {
    id: 8,
    name: '有机西兰花',
    image: 'https://picsum.photos/id/625/300/300',
    price: 8.99,
    unit: '个',
    sales: 567,
    categoryId: 1,
    description: '有机种植，营养丰富',
    stock: 60,
    specs: [
      { id: 1, name: '约400g', price: 8.99, stock: 40 }
    ]
  },
  {
    id: 9,
    name: '香蕉',
    image: 'https://picsum.photos/id/1080/300/300',
    price: 4.99,
    originalPrice: 6.99,
    unit: '斤',
    sales: 1567,
    tag: 'hot',
    categoryId: 2,
    description: '进口香蕉，香甜软糯',
    stock: 150,
    specs: [
      { id: 1, name: '2斤装', price: 9.99, stock: 80 }
    ]
  },
  {
    id: 10,
    name: '新鲜胡萝卜',
    image: 'https://picsum.photos/id/835/300/300',
    price: 2.99,
    unit: '斤',
    sales: 678,
    categoryId: 1,
    description: '新鲜胡萝卜，脆甜多汁',
    stock: 200,
    specs: [
      { id: 1, name: '1斤装', price: 2.99, stock: 100 }
    ]
  },
  {
    id: 11,
    name: '三文鱼',
    image: 'https://picsum.photos/id/1080/300/300',
    price: 89.9,
    originalPrice: 109.9,
    unit: '份/200g',
    sales: 234,
    tag: 'new',
    categoryId: 5,
    description: '进口三文鱼，新鲜刺身级',
    stock: 20,
    specs: [
      { id: 1, name: '200g装', price: 89.9, stock: 15 }
    ]
  },
  {
    id: 12,
    name: '原味酸奶',
    image: 'https://picsum.photos/id/401/300/300',
    price: 8.99,
    unit: '杯/200g',
    sales: 1234,
    categoryId: 3,
    description: '原味酸奶，益生菌发酵',
    stock: 100,
    specs: [
      { id: 1, name: '单杯', price: 8.99, stock: 60 },
      { id: 2, name: '4杯装', price: 32.99, stock: 40 }
    ]
  },
  {
    id: 13,
    name: '金龙鱼大米',
    image: 'https://picsum.photos/id/1080/300/300',
    price: 39.9,
    originalPrice: 49.9,
    unit: '袋/5kg',
    sales: 890,
    tag: 'hot',
    categoryId: 6,
    description: '东北优质大米，颗粒饱满',
    stock: 120,
    specs: [
      { id: 1, name: '5kg装', price: 39.9, stock: 80 }
    ]
  },
  {
    id: 14,
    name: '金龙鱼花生油',
    image: 'https://picsum.photos/id/1080/300/300',
    price: 69.9,
    unit: '桶/5L',
    sales: 567,
    categoryId: 6,
    description: '压榨一级花生油，香浓醇厚',
    stock: 60,
    specs: [
      { id: 1, name: '5L装', price: 69.9, stock: 40 }
    ]
  },
  {
    id: 15,
    name: '海天酱油',
    image: 'https://picsum.photos/id/1080/300/300',
    price: 12.9,
    unit: '瓶/500ml',
    sales: 2345,
    tag: 'hot',
    categoryId: 6,
    description: '鲜味生抽，酿造酱油',
    stock: 200,
    specs: [
      { id: 1, name: '500ml装', price: 12.9, stock: 150 }
    ]
  },
  {
    id: 16,
    name: '雪花啤酒',
    image: 'https://picsum.photos/id/1080/300/300',
    price: 4.99,
    originalPrice: 6.99,
    unit: '瓶/500ml',
    sales: 3456,
    tag: 'discount',
    categoryId: 7,
    description: '清爽型啤酒，麦香浓郁',
    stock: 500,
    specs: [
      { id: 1, name: '单瓶', price: 4.99, stock: 300 },
      { id: 2, name: '6瓶装', price: 27.99, stock: 100 }
    ]
  },
  {
    id: 17,
    name: '可口可乐',
    image: 'https://picsum.photos/id/1080/300/300',
    price: 3.5,
    unit: '瓶/330ml',
    sales: 5678,
    categoryId: 7,
    description: '经典口味，畅爽解渴',
    stock: 800,
    specs: [
      { id: 1, name: '单瓶', price: 3.5, stock: 500 }
    ]
  },
  {
    id: 18,
    name: '农夫山泉',
    image: 'https://picsum.photos/id/1080/300/300',
    price: 2.5,
    unit: '瓶/550ml',
    sales: 9876,
    tag: 'hot',
    categoryId: 7,
    description: '天然矿泉水，健康饮用水',
    stock: 1000,
    specs: [
      { id: 1, name: '单瓶', price: 2.5, stock: 600 }
    ]
  },
  {
    id: 19,
    name: '奥利奥饼干',
    image: 'https://picsum.photos/id/1080/300/300',
    price: 9.99,
    originalPrice: 12.99,
    unit: '盒/116g',
    sales: 2345,
    tag: 'new',
    categoryId: 8,
    description: '巧克力夹心饼干，香脆可口',
    stock: 150,
    specs: [
      { id: 1, name: '单盒', price: 9.99, stock: 100 }
    ]
  },
  {
    id: 20,
    name: '乐事薯片',
    image: 'https://picsum.photos/id/1080/300/300',
    price: 7.99,
    unit: '袋/70g',
    sales: 3456,
    categoryId: 8,
    description: '原味薯片，酥脆美味',
    stock: 200,
    specs: [
      { id: 1, name: '单袋', price: 7.99, stock: 150 }
    ]
  },
  {
    id: 21,
    name: '德芙巧克力',
    image: 'https://picsum.photos/id/1080/300/300',
    price: 19.9,
    originalPrice: 25.9,
    unit: '盒/84g',
    sales: 1234,
    tag: 'discount',
    categoryId: 8,
    description: '丝滑牛奶巧克力，甜蜜享受',
    stock: 100,
    specs: [
      { id: 1, name: '单盒', price: 19.9, stock: 70 }
    ]
  },
  {
    id: 22,
    name: '基围虾',
    image: 'https://picsum.photos/id/1080/300/300',
    price: 45.9,
    originalPrice: 55.9,
    unit: '斤',
    sales: 345,
    tag: 'hot',
    categoryId: 5,
    description: '鲜活基围虾，肉质鲜嫩',
    stock: 50,
    specs: [
      { id: 1, name: '1斤装', price: 45.9, stock: 30 }
    ]
  },
  {
    id: 23,
    name: '大闸蟹',
    image: 'https://picsum.photos/id/1080/300/300',
    price: 128,
    unit: '只',
    sales: 156,
    tag: 'preorder',
    categoryId: 5,
    description: '阳澄湖大闸蟹，膏满黄肥',
    stock: 0,
    specs: [
      { id: 1, name: '单只', price: 128, stock: 0 }
    ]
  },
  {
    id: 24,
    name: '牛肉卷',
    image: 'https://picsum.photos/id/1080/300/300',
    price: 35.9,
    originalPrice: 42.9,
    unit: '盒/500g',
    sales: 567,
    tag: 'discount',
    categoryId: 4,
    description: '肥牛卷，火锅必备',
    stock: 80,
    specs: [
      { id: 1, name: '500g装', price: 35.9, stock: 50 }
    ]
  },
  {
    id: 25,
    name: '鸡腿',
    image: 'https://picsum.photos/id/1080/300/300',
    price: 12.9,
    unit: '斤',
    sales: 876,
    categoryId: 4,
    description: '新鲜鸡腿，肉质紧实',
    stock: 150,
    specs: [
      { id: 1, name: '1斤装', price: 12.9, stock: 100 }
    ]
  },
  {
    id: 26,
    name: '老豆腐',
    image: 'https://picsum.photos/id/1080/300/300',
    price: 4.99,
    unit: '块/300g',
    sales: 2345,
    tag: 'hot',
    categoryId: 3,
    description: '手工老豆腐，豆香浓郁',
    stock: 200,
    specs: [
      { id: 1, name: '1块', price: 4.99, stock: 150 }
    ]
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductsByCategory = (categoryId: number): Product[] => {
  return products.filter(p => p.categoryId === categoryId);
};

export const getHotProducts = (): Product[] => {
  return products.filter(p => p.tag === 'hot' || p.sales > 1000).slice(0, 8);
};

export const getPreorderProducts = (): Product[] => {
  return products.filter(p => p.tag === 'preorder' || p.stock === 0).slice(0, 6);
};

export const getNewProducts = (): Product[] => {
  return products.filter(p => p.tag === 'new').slice(0, 6);
};

export const getDiscountProducts = (): Product[] => {
  return products.filter(p => p.originalPrice).slice(0, 8);
};
