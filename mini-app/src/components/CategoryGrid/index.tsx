import React, { useState, useRef, useCallback } from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import classnames from 'classnames';
import type { Category } from '@/types';

export interface CategoryGridProps {
  categories: Category[];
  count?: number;
  onItemClick?: (category: Category) => void;
  debounceTime?: number;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  count = 8,
  onItemClick,
  debounceTime = 300
}) => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const lastClickTimeRef = useRef<number>(0);

  const displayCategories = categories.slice(0, count);

  const handleItemClick = useCallback((category: Category) => {
    const now = Date.now();
    if (now - lastClickTimeRef.current < debounceTime) {
      return;
    }
    lastClickTimeRef.current = now;

    if (onItemClick) {
      onItemClick(category);
    } else {
      Taro.setStorageSync('activeCategoryId', category.id);
      Taro.switchTab({
        url: '/pages/category/index'
      });
    }
  }, [onItemClick, debounceTime]);

  const handleTouchStart = (id: number) => {
    setActiveId(id);
  };

  const handleTouchEnd = () => {
    setActiveId(null);
  };

  const handleTouchCancel = () => {
    setActiveId(null);
  };

  return (
    <View className={styles.categoryGrid}>
      {displayCategories.map(category => (
        <View
          key={category.id}
          className={classnames(
            styles.categoryItem,
            activeId === category.id && styles.active
          )}
          onClick={() => handleItemClick(category)}
          onTouchStart={() => handleTouchStart(category.id)}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchCancel}
        >
          <View className={styles.categoryIconWrap}>
            <Text className={styles.categoryIcon}>
              {category.icon || '🏷️'}
            </Text>
          </View>
          <Text className={styles.categoryName}>{category.name}</Text>
        </View>
      ))}
    </View>
  );
};

export default CategoryGrid;
