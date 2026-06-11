import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import styles from './index.module.scss';
import ProductCard from '@/components/ProductCard';
import { categories } from '@/data/categories';
import { products } from '@/data/products';
import type { Product } from '@/types';
import classnames from 'classnames';

const CategoryPage: React.FC = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<number>(1);
  const [sortType, setSortType] = useState<string>('default');

  const categoryIcons = ['🛒', '🥬', '🍎', '🥛', '🥩', '🦐', '🍚', '🍺', '🍪', '🧀'];

  useDidShow(() => {
    const storedCategoryId = Taro.getStorageSync('activeCategoryId');
    if (storedCategoryId !== '' && storedCategoryId !== undefined && storedCategoryId !== null) {
      setActiveCategoryId(Number(storedCategoryId));
    }
  });

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategoryId !== 0) {
      result = result.filter(p => p.categoryId === activeCategoryId);
    }

    switch (sortType) {
      case 'sales':
        result.sort((a, b) => b.sales - a.sales);
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return result;
  }, [activeCategoryId, sortType]);

  const handleCategoryClick = (id: number) => {
    console.log('[Category] 切换分类:', id);
    setActiveCategoryId(id);
  };

  const handleSortChange = (type: string) => {
    console.log('[Category] 切换排序:', type);
    setSortType(type);
  };

  const handleSearch = () => {
    Taro.showToast({ title: '搜索功能开发中', icon: 'none' });
  };

  const activeCategory = categories.find(c => c.id === activeCategoryId);

  return (
    <View className={styles.container}>
      <ScrollView scrollY className={styles.sidebar}>
        {categories.slice(1).map((cat, index) => (
          <View
            key={cat.id}
            className={classnames(styles.sidebarItem, activeCategoryId === cat.id && styles.active)}
            onClick={() => handleCategoryClick(cat.id)}
          >
            <Text className={styles.sidebarIcon}>
              {categoryIcons[index % categoryIcons.length]}
            </Text>
            <Text>{cat.name}</Text>
          </View>
        ))}
      </ScrollView>

      <ScrollView scrollY className={styles.content}>
        <View className={styles.searchBar} onClick={handleSearch}>
          <Text className={styles.searchIcon}>🔍</Text>
          <Text className={styles.searchPlaceholder}>搜索商品</Text>
        </View>

        <View className={styles.filterBar}>
          <View
            className={classnames(styles.filterItem, sortType === 'default' && styles.active)}
            onClick={() => handleSortChange('default')}
          >
            综合
          </View>
          <View
            className={classnames(styles.filterItem, sortType === 'sales' && styles.active)}
            onClick={() => handleSortChange('sales')}
          >
            销量
          </View>
          <View
            className={classnames(styles.filterItem, sortType === 'price-asc' && styles.active)}
            onClick={() => handleSortChange('price-asc')}
          >
            价格↑
          </View>
          <View
            className={classnames(styles.filterItem, sortType === 'price-desc' && styles.active)}
            onClick={() => handleSortChange('price-desc')}
          >
            价格↓
          </View>
        </View>

        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>{activeCategory?.name || '全部商品'}</Text>
          <Text className={styles.sectionMore}>共{filteredProducts.length}件</Text>
        </View>

        <View className={styles.productList}>
          {filteredProducts.map(product => (
            <View key={product.id} className={styles.productItem}>
              <ProductCard product={product} layout="horizontal" />
            </View>
          ))}
          {filteredProducts.length === 0 && (
            <View style={{ textAlign: 'center', padding: '80rpx 0', color: '#94a3b8' }}>
              <Text>暂无商品</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default CategoryPage;
