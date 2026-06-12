import React, { useMemo } from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import styles from './index.module.scss';
import { userInfo } from '@/data/user';
import { useFootprint, selectFootprintCount } from '@/store/FootprintContext';

const MinePage: React.FC = () => {
  const { state: footprintState } = useFootprint();

  const footprintCount = useMemo(() => {
    return selectFootprintCount(footprintState.items);
  }, [footprintState.items]);

  useDidShow(() => {});

  const handleFootprint = () => {
    console.log('[Mine] 浏览足迹');
    Taro.navigateTo({
      url: '/pages/footprint/index'
    });
  };

  const handleOrderClick = (status: string) => {
    console.log('[Mine] 查看订单:', status);
    Taro.switchTab({
      url: '/pages/order/index'
    });
  };

  const handleAllOrders = () => {
    console.log('[Mine] 查看全部订单');
    Taro.switchTab({
      url: '/pages/order/index'
    });
  };

  const handleAddress = () => {
    console.log('[Mine] 地址管理');
    Taro.navigateTo({
      url: '/pages/address/index'
    });
  };

  const handlePickupPoint = () => {
    console.log('[Mine] 自提点');
    Taro.navigateTo({
      url: '/pages/pickup-point/index'
    });
  };

  const handleCoupon = () => {
    console.log('[Mine] 优惠券');
    Taro.showToast({ title: '优惠券功能开发中', icon: 'none' });
  };

  const handleService = () => {
    console.log('[Mine] 联系客服');
    Taro.showToast({ title: '客服功能开发中', icon: 'none' });
  };

  const handleSettings = () => {
    console.log('[Mine] 设置');
    Taro.showToast({ title: '设置功能开发中', icon: 'none' });
  };

  const orderQuickItems = [
    { key: 'pending', label: '待付款', icon: '💳', badge: 1 },
    { key: 'picking', label: '备货中', icon: '📦', badge: 0 },
    { key: 'ready', label: '待自提', icon: '🏪', badge: 1 },
    { key: 'completed', label: '已完成', icon: '✅', badge: 0 }
  ];

  const menuItems = [
    { key: 'address', label: '收货地址', icon: '📍', onClick: handleAddress },
    { key: 'pickup', label: '自提点管理', icon: '🏠', onClick: handlePickupPoint },
    { key: 'coupon', label: '我的优惠券', icon: '🎫', onClick: handleCoupon },
    { key: 'service', label: '联系客服', icon: '💬', onClick: handleService },
    { key: 'settings', label: '设置', icon: '⚙️', onClick: handleSettings }
  ];

  return (
    <View className={styles.container}>
      <View className={styles.header}>
        <View className={styles.userInfo}>
          <Image
            className={styles.avatar}
            src={userInfo.avatar}
            mode="aspectFill"
          />
          <View className={styles.userInfoRight}>
            <Text className={styles.nickname}>{userInfo.nickname}</Text>
            <Text className={styles.phone}>{userInfo.phone}</Text>
            <View>
              <Text className={styles.levelBadge}>🌟 VIP会员</Text>
            </View>
          </View>
        </View>
      </View>

      <View className={styles.assetsCard}>
        <View className={styles.assetItem} onClick={handleCoupon}>
          <Text className={styles.assetValue}>{userInfo.couponCount}</Text>
          <Text className={styles.assetLabel}>优惠券</Text>
        </View>
        <View className={styles.assetItem}>
          <Text className={styles.assetValue}>{userInfo.points}</Text>
          <Text className={styles.assetLabel}>积分</Text>
        </View>
        <View className={styles.assetItem}>
          <Text className={styles.assetValue}>3</Text>
          <Text className={styles.assetLabel}>收藏</Text>
        </View>
        <View className={styles.assetItem} onClick={handleFootprint}>
          <Text className={styles.assetValue}>{footprintCount}</Text>
          <Text className={styles.assetLabel}>足迹</Text>
        </View>
      </View>

      <View className={styles.orderSection}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>我的订单</Text>
          <Text className={styles.sectionMore} onClick={handleAllOrders}>
            全部订单 ›
          </Text>
        </View>
        <View className={styles.orderQuick}>
          {orderQuickItems.map(item => (
            <View
              key={item.key}
              className={styles.orderQuickItem}
              onClick={() => handleOrderClick(item.key)}
            >
              <Text className={styles.orderIcon}>{item.icon}</Text>
              <Text className={styles.orderLabel}>{item.label}</Text>
              {item.badge > 0 && (
                <View className={styles.badge}>
                  <Text>{item.badge}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>

      <View className={styles.menuSection}>
        {menuItems.map(item => (
          <View
            key={item.key}
            className={styles.menuItem}
            onClick={item.onClick}
          >
            <Text className={styles.menuIcon}>{item.icon}</Text>
            <Text className={styles.menuText}>{item.label}</Text>
            <Text className={styles.menuArrow}>›</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default MinePage;
