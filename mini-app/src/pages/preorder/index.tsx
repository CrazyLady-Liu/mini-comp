import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import styles from './index.module.scss';
import ProductCard from '@/components/ProductCard';
import { getPreorderProducts } from '@/data/products';
import type { Product } from '@/types';
import classnames from 'classnames';

type FilterType = 'all' | 'new' | 'limited';

const PreorderPage: React.FC = () => {
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [products, setProducts] = useState<Product[]>([]);

  useDidShow(() => {
    const preorderProducts = getPreorderProducts();
    setProducts(preorderProducts);
  });

  const filteredProducts = useMemo(() => {
    let result = [...products];

    switch (filterType) {
      case 'new':
        result = result.filter(p => p.preorderTag === 'new');
        break;
      case 'limited':
        result = result.filter(p => p.preorderTag === 'limited');
        break;
      default:
        break;
    }

    return result;
  }, [products, filterType]);

  const handleFilterChange = (type: FilterType) => {
    console.log('[Preorder] 切换筛选:', type);
    setFilterType(type);
  };

  const getFilterLabel = (type: FilterType): string => {
    const labels: Record<FilterType, string> = {
      all: '全部预售',
      new: '新品预售',
      limited: '限时预售'
    };
    return labels[type];
  };

  return (
    <View className={styles.container}>
      <View className={styles.headerBanner}>
        <Text className={styles.bannerTitle}>预售专区</Text>
        <Text className={styles.bannerSubtitle}>提前下单，新鲜直达</Text>
      </View>

      <View className={styles.filterBar}>
        <View
          className={classnames(styles.filterItem, filterType === 'all' && styles.active)}
          onClick={() => handleFilterChange('all')}
        >
          全部预售
        </View>
        <View
          className={classnames(styles.filterItem, filterType === 'new' && styles.active)}
          onClick={() => handleFilterChange('new')}
        >
          新品预售
        </View>
        <View
          className={classnames(styles.filterItem, filterType === 'limited' && styles.active)}
          onClick={() => handleFilterChange('limited')}
        >
          限时预售
        </View>
      </View>

      <View className={styles.sectionHeader}>
        <Text className={styles.sectionTitle}>{getFilterLabel(filterType)}</Text>
        <Text className={styles.sectionCount}>共{filteredProducts.length}件</Text>
      </View>

      <ScrollView scrollY className={styles.productList}>
        {filteredProducts.map(product => (
          <View key={product.id} className={styles.productItem}>
            <ProductCard product={product} layout="horizontal" />
          </View>
        ))}
        {filteredProducts.length === 0 && (
          <View className={styles.emptyState}>
            <Text className={styles.emptyIcon}>📦</Text>
            <Text className={styles.emptyText}>暂无预售商品</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default PreorderPage;
