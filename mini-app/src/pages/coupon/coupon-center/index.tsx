import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro, { useRouter, usePullDownRefresh } from '@tarojs/taro';
import styles from './index.module.scss';
import { NavBar, CouponCard, ProductCard } from '@/components';
import { couponCategories } from '@/data/coupons';
import { getCouponList, receiveCoupon, getRecommendProducts, getMyCouponList } from '@/api/coupon';
import type { Coupon, Product } from '@/types';
import classnames from 'classnames';

const CouponCenterPage: React.FC = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [couponList, setCouponList] = useState<Coupon[]>([]);
  const [receivedIds, setReceivedIds] = useState<number[]>([]);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [recommendProducts, setRecommendProducts] = useState<Product[]>([]);
  const [myCouponCount, setMyCouponCount] = useState<number>(0);

  const selfPointId = useMemo(() => {
    const id = router.params.selfPointId;
    return id ? Number(id) : 1;
  }, [router.params]);

  const fetchCouponList = useCallback(async (type = 'all') => {
    setLoading(true);
    try {
      const res = await getCouponList({ type, selfPointId });
      if (res.code === 0) {
        setCouponList(res.data.list);
      }
    } catch (e) {
      console.error('[CouponCenter] 获取优惠券列表失败:', e);
    } finally {
      setLoading(false);
    }
  }, [selfPointId]);

  const fetchRecommendProducts = useCallback(async () => {
    try {
      const res = await getRecommendProducts(8);
      if (res.code === 0) {
        setRecommendProducts(res.data);
      }
    } catch (e) {
      console.error('[CouponCenter] 获取推荐商品失败:', e);
    }
  }, []);

  const fetchMyCouponCount = useCallback(async () => {
    try {
      const res = await getMyCouponList({ status: 'available' });
      if (res.code === 0) {
        setMyCouponCount(res.data.total);
      }
    } catch (e) {
      console.error('[CouponCenter] 获取我的优惠券数量失败:', e);
    }
  }, []);

  React.useEffect(() => {
    fetchCouponList(activeCategory);
    fetchRecommendProducts();
    fetchMyCouponCount();
  }, []);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    fetchCouponList(categoryId);
  };

  const handleReceive = async (coupon: Coupon) => {
    if (loadingId !== null) return;
    if (receivedIds.includes(coupon.id)) {
      Taro.showToast({
        title: '已领取过该券',
        icon: 'none'
      });
      return;
    }
    if (coupon.stock <= 0) {
      Taro.showToast({
        title: '券已领完',
        icon: 'none'
      });
      return;
    }

    setLoadingId(coupon.id);
    try {
      const res = await receiveCoupon({ couponId: coupon.id, selfPointId });
      if (res.code === 0) {
        setReceivedIds(prev => [...prev, coupon.id]);
        setCouponList(prev => prev.map(c =>
          c.id === coupon.id
            ? { ...c, stock: Math.max(0, c.stock - 1), receivedCount: c.receivedCount + 1 }
            : c
        ));
        setMyCouponCount(prev => prev + 1);
        Taro.showToast({
          title: '领取成功！',
          icon: 'success'
        });
      } else {
        Taro.showToast({
          title: res.message || '领取失败',
          icon: 'none'
        });
      }
    } catch (e: any) {
      Taro.showToast({
        title: e?.message || '不符合领取条件',
        icon: 'none'
      });
    } finally {
      setLoadingId(null);
    }
  };

  const handleMyCoupons = () => {
    Taro.navigateTo({
      url: '/pages/coupon/my-coupon/index'
    });
  };

  const handleMoreProducts = () => {
    Taro.navigateTo({
      url: '/pages/category/index?from=coupon'
    });
  };

  usePullDownRefresh(() => {
    Promise.all([
      fetchCouponList(activeCategory),
      fetchRecommendProducts(),
      fetchMyCouponCount()
    ]).finally(() => {
      Taro.stopPullDownRefresh();
    });
  });

  const rightContent = (
    <View className={styles.navBarRight} onClick={handleMyCoupons}>
      <Text className={styles.myCoupons}>我的优惠券</Text>
      {myCouponCount > 0 && (
        <View className={styles.couponBadge}>
          <Text className={styles.badgeText}>{myCouponCount > 99 ? '99+' : myCouponCount}</Text>
        </View>
      )}
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
          enhanced
          showScrollbar={false}
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
        ) : couponList.length > 0 ? (
          couponList.map(coupon => (
            <CouponCard
              key={coupon.id}
              coupon={coupon}
              received={receivedIds.includes(coupon.id)}
              loading={loadingId === coupon.id}
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
          <Text className={styles.sectionMore} onClick={handleMoreProducts}>更多 ›</Text>
        </View>
        <ScrollView
          scrollX
          className={styles.productScroll}
          enhanced
          showScrollbar={false}
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
