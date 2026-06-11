import React, { useState, useMemo, useRef, useCallback } from 'react';
import { View, Text, Image, Swiper, SwiperItem, ScrollView, Input } from '@tarojs/components';
import Taro, { usePullDownRefresh, useDidShow } from '@tarojs/taro';
import styles from './index.module.scss';
import ProductCard from '@/components/ProductCard';
import CategoryGrid from '@/components/CategoryGrid';
import SearchPanel from '@/components/SearchPanel';
import { banners } from '@/data/banners';
import { categories } from '@/data/categories';
import { getHotProducts, getPreorderProducts, getDiscountProducts } from '@/data/products';
import { pickupPoints } from '@/data/user';
import type { Product, Category, PickupPoint } from '@/types';

const HomePage: React.FC = () => {
  const [hotProducts] = useState<Product[]>(getHotProducts());
  const [preorderProducts] = useState<Product[]>(getPreorderProducts());
  const [discountProducts] = useState<Product[]>(getDiscountProducts());
  const [searchVisible, setSearchVisible] = useState<boolean>(false);
  const [selfPointId, setSelfPointId] = useState<number>(1);

  const currentPickupPoint = useMemo<PickupPoint | undefined>(() => {
    return pickupPoints.find(p => p.id === selfPointId);
  }, [selfPointId]);

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

  const handleCouponCenter = () => {
    console.log('========== 点击领券中心 ==========');
    console.log('当前自提点ID:', selfPointId);
    try {
      const url = '/pages/coupon/coupon-center/index?selfPointId=' + selfPointId;
      console.log('跳转URL:', url);
      Taro.showToast({
        title: '跳转中...',
        icon: 'none',
        duration: 1000
      });
      Taro.navigateTo({
        url: url,
        success: function(res) {
          console.log('跳转成功:', res);
        },
        fail: function(err) {
          console.log('跳转失败:', err);
          Taro.showToast({
            title: '跳转失败',
            icon: 'none'
          });
        }
      });
    } catch (e) {
      console.log('跳转异常:', e);
      Taro.showToast({
        title: '发生错误',
        icon: 'none'
      });
    }
  };

  const lastClickTimeRef = useRef<number>(0);

  const navigateToPreorder = useCallback(() => {
    const now = Date.now();
    if (now - lastClickTimeRef.current < 1000) {
      console.log('[Home] 点击过于频繁，已防抖');
      return;
    }
    lastClickTimeRef.current = now;

    console.log('========== 跳转预售专区 ==========');
    try {
      const url = '/pages/preorder/index';
      console.log('跳转URL:', url);
      Taro.showToast({
        title: '跳转中...',
        icon: 'none',
        duration: 800
      });
      Taro.navigateTo({
        url: url,
        success: function(res) {
          console.log('跳转成功:', res);
        },
        fail: function(err) {
          console.log('跳转失败:', err);
          Taro.showToast({
            title: '跳转失败',
            icon: 'none'
          });
          lastClickTimeRef.current = 0;
        }
      });
    } catch (e) {
      console.log('跳转异常:', e);
      Taro.showToast({
        title: '发生错误',
        icon: 'none'
      });
      lastClickTimeRef.current = 0;
    }
  }, []);

  const handlePreorderEntry = useCallback(() => {
    console.log('[Home] 点击预售专区快捷入口');
    navigateToPreorder();
  }, [navigateToPreorder]);

  const handleViewMorePreorder = useCallback(() => {
    console.log('[Home] 点击明日预售查看更多');
    navigateToPreorder();
  }, [navigateToPreorder]);

  usePullDownRefresh(() => {
    console.log('[Home] 下拉刷新');
    setTimeout(() => {
      Taro.stopPullDownRefresh();
    }, 1000);
  });

  useDidShow(() => {
    console.log('[Home] 页面显示');
    const savedPointId = Taro.getStorageSync('selfPointId');
    if (savedPointId) {
      setSelfPointId(Number(savedPointId));
      console.log('[Home] 从缓存读取自提点ID:', savedPointId);
    }
  });

  return (
    <View className={styles.container}>
      <View className={styles.header}>
        <View className={styles.locationBar} onClick={handleLocationClick}>
          <Text className={styles.locationIcon}>📍</Text>
          <Text className={styles.locationText}>
            {currentPickupPoint?.name || '选择自提点'}
          </Text>
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
        <View
          className={styles.quickItem}
          onClick={handlePreorderEntry}
          onTouchStart={() => {}}
        >
          <View className={styles.quickIconBox}>
            <Text className={styles.quickIcon}>📦</Text>
            <View className={styles.quickRedDot}></View>
          </View>
          <Text className={styles.quickText}>预售专区</Text>
        </View>
        <View className={styles.quickItem}>
          <Text className={styles.quickIcon}>🔥</Text>
          <Text className={styles.quickText}>今日特惠</Text>
        </View>
        <View className={styles.quickItem} onClick={handleCouponCenter}>
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
          <View className={styles.sectionTitleWrap}>
            <Text className={styles.sectionTitle}>明日预售</Text>
            <Text className={styles.preorderBadge}>限时</Text>
          </View>
          <View
            className={styles.sectionMore}
            onClick={handleViewMorePreorder}
          >
            <Text className={styles.sectionMoreText}>查看更多</Text>
            <Text className={styles.sectionMoreArrow}>›</Text>
          </View>
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
