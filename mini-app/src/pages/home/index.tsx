import React, { useState } from 'react';
import { View, Text, Image, Swiper, SwiperItem, ScrollView, Input } from '@tarojs/components';
import Taro, { usePullDownRefresh } from '@tarojs/taro';
import styles from './index.module.scss';
import { ProductCard, CategoryGrid, SearchPanel } from '@/components';
import { banners } from '@/data/banners';
import { categories } from '@/data/categories';
import { getHotProducts, getPreorderProducts, getDiscountProducts } from '@/data/products';
import type { Product, Category } from '@/types';

const HomePage: React.FC = () => {
  const [hotProducts] = useState<Product[]>(getHotProducts());
  const [preorderProducts] = useState<Product[]>(getPreorderProducts());
  const [discountProducts] = useState<Product[]>(getDiscountProducts());
  const [searchVisible, setSearchVisible] = useState<boolean>(false);

  const handleCategoryClick = (category: Category) => {
    console.log('[Home] 点击分类:', category);
    Taro.setStorageSync('activeCategoryId', category.id);
    Taro.switchTab({
      url: '/pages/category/index'
    });
  };

  const handleLocationClick = () => {
    console.log('[Home] 点击自提点');
    Taro.navigateTo({
      url: '/pages/pickup-point/index'
    });
  };

  const handleSearch = () => {
    console.log('[Home] 点击搜索');
    setSearchVisible(true);
  };

  const handleSearchPanelClose = () => {
    setSearchVisible(false);
  };

  usePullDownRefresh(() => {
    console.log('[Home] 下拉刷新');
    setTimeout(() => {
      Taro.stopPullDownRefresh();
    }, 1000);
  });

  return (
    <View className={styles.container}>
      <View className={styles.header}>
        <View className={styles.locationBar} onClick={handleLocationClick}>
          <Text className={styles.locationIcon}>📍</Text>
          <Text className={styles.locationText}>阳光社区自提点</Text>
          <Text className={styles.locationArrow}>▼</Text>
        </View>
        <View className={styles.searchBar} onClick={handleSearch}>
          <Text className={styles.searchIcon}>🔍</Text>
          <Text className={styles.searchPlaceholder}>搜索新鲜好货</Text>
        </View>
      </View>

      <View className={styles.bannerSection}>
        <Swiper
          className={styles.banner}
          autoplay
          circular
          indicatorDots
          indicatorColor="rgba(255,255,255,0.5)"
          indicatorActiveColor="#ffffff"
        >
          {banners.map(banner => (
            <SwiperItem key={banner.id}>
              <Image
                className={styles.bannerImage}
                src={banner.image}
                mode="aspectFill"
              />
            </SwiperItem>
          ))}
        </Swiper>
      </View>

      <View className={styles.categorySection}>
        <CategoryGrid
          categories={categories.slice(1)}
          count={8}
          onItemClick={handleCategoryClick}
        />
      </View>

      <View className={styles.quickEntry}>
        <View className={styles.quickItem}>
          <Text className={styles.quickIcon}>📦</Text>
          <Text className={styles.quickText}>预售专区</Text>
        </View>
        <View className={styles.quickItem}>
          <Text className={styles.quickIcon}>🔥</Text>
          <Text className={styles.quickText}>今日特惠</Text>
        </View>
        <View className={styles.quickItem}>
          <Text className={styles.quickIcon}>🎫</Text>
          <Text className={styles.quickText}>领券中心</Text>
        </View>
        <View className={styles.quickItem}>
          <Text className={styles.quickIcon}>🏠</Text>
          <Text className={styles.quickText}>自提点</Text>
        </View>
      </View>

      <View className={`${styles.section} ${styles.preorderSection}`}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>
            明日预售
            <Text className={styles.preorderBadge}>限时</Text>
          </Text>
          <Text className={styles.sectionMore}>查看更多 ›</Text>
        </View>
        <ScrollView scrollX className={styles.productScroll}>
          <View className={styles.productGrid}>
            {preorderProducts.map(product => (
              <View key={product.id} className={styles.productItem}>
                <ProductCard product={product} />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <View className={`${styles.section} ${styles.hotSection}`}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>热销爆款</Text>
          <Text className={styles.sectionMore}>查看更多 ›</Text>
        </View>
        <View className={styles.productGrid}>
          {hotProducts.slice(0, 4).map(product => (
            <View key={product.id} className={styles.productItem}>
              <ProductCard product={product} />
            </View>
          ))}
        </View>
      </View>

      <View className={`${styles.section} ${styles.discountSection}`}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>限时特惠</Text>
          <Text className={styles.sectionMore}>查看更多 ›</Text>
        </View>
        <View className={styles.productGrid}>
          {discountProducts.slice(0, 4).map(product => (
            <View key={product.id} className={styles.productItem}>
              <ProductCard product={product} />
            </View>
          ))}
        </View>
      </View>

      <SearchPanel
        visible={searchVisible}
        onClose={handleSearchPanelClose}
      />
    </View>
  );
};

export default HomePage;
