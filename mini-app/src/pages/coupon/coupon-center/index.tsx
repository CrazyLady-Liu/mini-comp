import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro, { useRouter, usePullDownRefresh } from '@tarojs/taro';
import styles from './index.module.scss';
import { NavBar, CouponCard, ProductCard } from '@/components';
import { coupons, couponCategories } from '@/data/coupons';
import { getDiscountProducts } from '@/data/products';
import type { Coupon, Product } from '@/types';
import classnames from 'classnames';

const CouponCenterPage: React.FC = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [receivedIds, setReceivedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [recommendProducts] = useState<Product[]>(getDiscountProducts());

  const selfPointId = useMemo(() => {
    const id = router.params.selfPointId;
    console.log('[CouponCenter] 路由参数:', router.params);
    console.log('[CouponCenter] selfPointId:', id);
    return id ? Number(id) : 1;
  }, [router.params]);

  const filteredCoupons = useMemo(() => {
    if (activeCategory === 'all') {
      return coupons;
    }
    return coupons.filter(c => c.type === activeCategory);
  }, [activeCategory]);

  const handleCategoryChange = (categoryId: string) => {
    console.log('[CouponCenter] 切换分类:', categoryId, 'selfPointId:', selfPointId);
    setActiveCategory(categoryId);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  const handleReceive = (coupon: Coupon) => {
    console.log('[CouponCenter] 领取优惠券:', coupon.id, 'selfPointId:', selfPointId);
    if (receivedIds.includes(coupon.id)) {
      Taro.showToast({
        title: '您已领取过该优惠券',
        icon: 'none'
      });
      return;
    }
    if (coupon.stock <= 0) {
      Taro.showToast({
        title: '优惠券已抢光',
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
      title: '我的优惠券开发中',
      icon: 'none'
    });
  };

  usePullDownRefresh(() => {
    console.log('[CouponCenter] 下拉刷新, selfPointId:', selfPointId);
    setTimeout(() => {
      Taro.stopPullDownRefresh();
    }, 1000);
  });

  const rightContent = (
    <View className={styles.navBarRight} onClick={handleMyCoupons}>
      <Text className={styles.myCoupons}>我的优惠券</Text>
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
        {loading ? (
          <View className={styles.emptyCoupons}>
            <Text className={styles.emptyIcon}>⏳</Text>
            <Text className={styles.emptyText}>加载中...</Text>
          </View>
        ) : filteredCoupons.length > 0 ? (
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
