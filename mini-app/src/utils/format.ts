import Taro from '@tarojs/taro';

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

const SEARCH_HISTORY_KEY = 'searchHistory';
const MAX_HISTORY_COUNT = 10;

export const getSearchHistory = (): string[] => {
  try {
    const history = Taro.getStorageSync(SEARCH_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch {
    return [];
  }
};

export const addSearchHistory = (keyword: string): void => {
  if (!keyword.trim()) return;
  const history = getSearchHistory();
  const index = history.indexOf(keyword);
  if (index > -1) {
    history.splice(index, 1);
  }
  history.unshift(keyword);
  if (history.length > MAX_HISTORY_COUNT) {
    history.pop();
  }
  try {
    Taro.setStorageSync(SEARCH_HISTORY_KEY, JSON.stringify(history));
  } catch {
    console.error('保存搜索历史失败');
  }
};

export const clearSearchHistory = (): void => {
  try {
    Taro.removeStorageSync(SEARCH_HISTORY_KEY);
  } catch {
    console.error('清除搜索历史失败');
  }
};

export interface HighlightSegment {
  text: string;
  isHighlight: boolean;
}

export const getHighlightSegments = (text: string, keyword: string): HighlightSegment[] => {
  if (!keyword || !text) return [{ text, isHighlight: false }];
  
  const lowerText = text.toLowerCase();
  const lowerKeyword = keyword.toLowerCase();
  const segments: HighlightSegment[] = [];
  
  let lastIndex = 0;
  let index = lowerText.indexOf(lowerKeyword);
  
  while (index !== -1) {
    if (index > lastIndex) {
      segments.push({
        text: text.slice(lastIndex, index),
        isHighlight: false
      });
    }
    segments.push({
      text: text.slice(index, index + keyword.length),
      isHighlight: true
    });
    lastIndex = index + keyword.length;
    index = lowerText.indexOf(lowerKeyword, lastIndex);
  }
  
  if (lastIndex < text.length) {
    segments.push({
      text: text.slice(lastIndex),
      isHighlight: false
    });
  }
  
  return segments.length > 0 ? segments : [{ text, isHighlight: false }];
};
