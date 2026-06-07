import React from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import { NavBar } from '@/components';

const OrderConfirmPage: React.FC = () => {
  const handleSubmit = () => {
    Taro.showToast({ title: '订单提交成功', icon: 'success' });
    setTimeout(() => {
      Taro.switchTab({ url: '/pages/order/index' });
    }, 1500);
  };

  return (
    <View className={styles.container}>
      <NavBar title="确认订单" />
      <View className={styles.placeholder}>
        <Text className={styles.icon}>📝</Text>
        <Text className={styles.title}>确认订单</Text>
        <Text className={styles.desc}>功能正在完善中...</Text>
      </View>

      <View style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '24rpx 32rpx',
        paddingBottom: 'calc(24rpx + env(safe-area-inset-bottom))',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
      }}>
        <View style={{
          marginRight: '32rpx'
        }}>
          <Text style={{ fontSize: '28rpx', color: '#64748b' }}>实付：</Text>
          <Text style={{ fontSize: '40rpx', color: '#ef4444', fontWeight: 'bold' }}>¥0.00</Text>
        </View>
        <View
          style={{
            padding: '0 48rpx',
            height: '88rpx',
            background: 'linear-gradient(135deg, #22c55e 0%, #4ade80 100%)',
            borderRadius: '48rpx',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={handleSubmit}
        >
          <Text style={{ color: '#fff', fontSize: '30rpx', fontWeight: '600' }}>提交订单</Text>
        </View>
      </View>
    </View>
  );
};

export default OrderConfirmPage;
