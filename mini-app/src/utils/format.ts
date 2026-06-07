export const formatPrice = (price: number): string => {
  return price.toFixed(2);
};

export const formatSales = (sales: number): string => {
  if (sales >= 10000) {
    return (sales / 10000).toFixed(1) + '万';
  }
  return sales.toString();
};

export const formatTime = (time: string): string => {
  return time;
};

export const getTagText = (tag?: string): string => {
  const tagMap: Record<string, string> = {
    preorder: '预售',
    new: '新品',
    hot: '热销',
    discount: '特惠'
  };
  return tag ? tagMap[tag] || '' : '';
};
