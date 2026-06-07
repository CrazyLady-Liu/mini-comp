import React from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import { NavBar } from '@/components';
import { addresses } from '@/data/user';

const AddressPage: React.FC = () => {
  const handleAddAddress = () => {
    Taro.showToast({ title: '新增地址功能开发中', icon: 'none' });
  };

  return (
    <View className={styles.container}>
      <NavBar title="收货地址" />
      <ScrollView scrollY className={styles.addressList}>
        {addresses.map(addr => (
          <View key={addr.id} className={styles.addressItem}>
            <View className={styles.addressHeader}>
              <Text className={styles.name}>{addr.name}</Text>
              <Text className={styles.phone}>{addr.phone}</Text>
              {addr.isDefault && (
                <Text className={styles.defaultTag}>默认</Text>
              )}
            </View>
            <Text className={styles.addressDetail}>
              {addr.province}{addr.city}{addr.district}{addr.detail}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '24rpx 32rpx',
        paddingBottom: 'calc(24rpx + env(safe-area-inset-bottom))',
        background: '#fff'
      }}>
        <View
          style={{
            width: '100%',
            height: '88rpx',
            background: 'linear-gradient(135deg, #22c55e 0%, #4ade80 100%)',
            borderRadius: '48rpx',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={handleAddAddress}
        >
          <Text style={{ color: '#fff', fontSize: '30rpx', fontWeight: '600' }}>新增收货地址</Text>
        </View>
      </View>
    </View>
  );
};

export default AddressPage;
