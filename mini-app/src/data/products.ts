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
