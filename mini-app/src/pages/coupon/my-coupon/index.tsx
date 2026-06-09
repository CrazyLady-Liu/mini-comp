import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro, { usePullDownRefresh } from '@tarojs/taro';
import styles from './index.module.scss';
import { NavBar, CouponCard } from '@/components';
import { getMyCouponList } from '@/api/coupon';
import type { Coupon } from '@/types';
import classnames from 'classnames';

const tabs = [
  { id: 'available', name: '可使用' },
  { id: 'used', name: '已使用' },
  { id: 'expired', name: '已过期' }
];

const MyCouponPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('available');
  const [couponList, setCouponList] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMyCoupons = useCallback(async (status = 'available') => {
    setLoading(true);
    try {
      const res = await getMyCouponList({ status: status as any });
      if (res.code === 0) {
        setCouponList(res.data.list);
      }
    } catch (e) {
      console.error('[MyCoupon] 获取我的优惠券失败:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMyCoupons(activeTab);
  }, [activeTab, fetchMyCoupons]);

  usePullDownRefresh(() => {
    fetchMyCoupons(activeTab).finally(() => {
      Taro.stopPullDownRefresh();
    });
  });

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleUseCoupon = (coupon: Coupon) => {
    if (coupon.status === 'available') {
      Taro.switchTab({
        url: '/pages/home/index'
      });
    }
  };

  const getEmptyText = () => {
    switch (activeTab) {
      case 'available':
        return '暂无可用优惠券';
      case 'used':
        return '暂无已使用优惠券';
      case 'expired':
        return '暂无已过期优惠券';
      default:
        return '暂无优惠券';
    }
  };

  const getActionText = (coupon: Coupon) => {
    switch (coupon.status) {
      case 'used':
        return '已使用';
      case 'expired':
        return '已过期';
      default:
        return '去使用';
    }
  };

  return (
    <View className={styles.container}>
      <NavBar
        title="我的优惠券"
        showBack
        borderBottom
      />

      <View className={styles.tabBar}>
        {tabs.map(tab => (
          <View
            key={tab.id}
            className={classnames(
              styles.tabItem,
              activeTab === tab.id && styles.active
            )}
            onClick={() => handleTabChange(tab.id)}
          >
            <Text className={styles.tabText}>{tab.name}</Text>
          </View>
        ))}
      </View>

      <ScrollView
        scrollY
        className={styles.scrollArea}
        refresherEnabled
        refresherTriggered={loading}
      >
        {loading && couponList.length === 0 ? (
          <View className={styles.loading}>
            <Text>加载中...</Text>
          </View>
        ) : couponList.length > 0 ? (
          <View className={styles.couponList}>
            {couponList.map(coupon => (
              <CouponCard
                key={(coupon as any).userCouponId || coupon.id}
                coupon={coupon}
                showAction={coupon.status === 'available'}
                actionText={getActionText(coupon)}
                received={coupon.status !== 'available'}
                disabled={coupon.status !== 'available'}
                onClick={() => handleUseCoupon(coupon)}
              />
            ))}
          </View>
        ) : (
          <View className={styles.emptyState}>
            <Text className={styles.emptyIcon}>🎫</Text>
            <Text className={styles.emptyText}>{getEmptyText()}</Text>
            <View className={styles.emptyBtn} onClick={() => Taro.navigateBack()}>
              <Text className={styles.emptyBtnText}>去领券</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default MyCouponPage;
