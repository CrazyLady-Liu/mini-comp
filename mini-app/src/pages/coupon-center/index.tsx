import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro, { usePullDownRefresh } from '@tarojs/taro';
import styles from './index.module.scss';
import { NavBar, CouponCard, ProductCard } from '@/components';
import { coupons, couponCategories } from '@/data/coupons';
import { getDiscountProducts } from '@/data/products';
import type { Coupon, Product } from '@/types';
import classnames from 'classnames';

const CouponCenterPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [couponList, setCouponList] = useState<Coupon[]>(coupons);
  const [receivedIds, setReceivedIds] = useState<number[]>([]);
  const [recommendProducts] = useState<Product[]>(getDiscountProducts());

  useEffect(() => {
    console.log('[CouponCenter] 页面初始化');
    console.log('[CouponCenter] 优惠券数量:', coupons.length);
    console.log('[CouponCenter] 推荐商品数量:', recommendProducts.length);
  }, []);

  const filteredCoupons = useMemo(() => {
    if (activeCategory === 'all') {
      return couponList;
    }
    return couponList.filter(c => c.type === activeCategory);
  }, [activeCategory, couponList]);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const handleReceive = (coupon: Coupon) => {
    console.log('[CouponCenter] 领取优惠券:', coupon);
    if (receivedIds.includes(coupon.id)) {
      Taro.showToast({
        title: '您已领取过该优惠券',
        icon: 'none'
      });
      return;
    }
    setReceivedIds([...receivedIds, coupon.id]);
    Taro.showToast({
      title: '领取成功',
      icon: 'success'
    });
  };

  const handleMyCoupons = () => {
    console.log('[CouponCenter] 跳转到我的优惠券');
    Taro.showToast({
      title: '我的优惠券页面开发中',
      icon: 'none'
    });
  };

  usePullDownRefresh(() => {
    console.log('[CouponCenter] 下拉刷新');
    setTimeout(() => {
      Taro.stopPullDownRefresh();
    }, 1000);
  });

  const rightContent = (
    <View className={styles.navBarRight}>
      <Text className={styles.myCoupons} onClick={handleMyCoupons}>
        我的优惠券
      </Text>
    </View>
  );

  return (
    <View className={styles.container}>
      <NavBar
        title="领券中心"
        showBack
        rightContent={rightContent}
        borderBottom
      />

      <View className={styles.categoryTabs}>
        <ScrollView
          scrollX
          className={styles.tabScroll}
          showsHorizontalScrollIndicator={false}
        >
          {couponCategories.map(category => (
            <View
              key={category.id}
              className={classnames(
                styles.tabItem,
                activeCategory === category.id && styles.active
              )}
              onClick={() => handleCategoryChange(category.id)}
            >
              <Text className={styles.tabText}>{category.name}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View className={styles.couponSection}>
        {filteredCoupons.length > 0 ? (
          filteredCoupons.map(coupon => (
            <CouponCard
              key={coupon.id}
              coupon={coupon}
              received={receivedIds.includes(coupon.id)}
              onReceive={() => handleReceive(coupon)}
            />
          ))
        ) : (
          <View className={styles.emptyCoupons}>
            <Text className={styles.emptyIcon}>🎫</Text>
            <Text className={styles.emptyText}>暂无该类型优惠券</Text>
          </View>
        )}
      </View>

      <View className={styles.recommendSection}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>领券好物</Text>
          <Text className={styles.sectionMore}>更多 ›</Text>
        </View>
        <ScrollView
          scrollX
          className={styles.productScroll}
          showsHorizontalScrollIndicator={false}
        >
          {recommendProducts.map(product => (
            <View key={product.id} className={styles.productItem}>
              <ProductCard product={product} />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default CouponCenterPage;
