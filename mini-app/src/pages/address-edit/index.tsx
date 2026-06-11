import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import styles from './index.module.scss';
import { NavBar, AddressModal } from '@/components';
import { useAddress } from '@/store/AddressContext';
import type { Address } from '@/types';

const AddressEditPage: React.FC = () => {
  const router = useRouter();
  const { state, dispatch } = useAddress();
  const [editModalVisible, setEditModalVisible] = useState(false);

  const addressId = useMemo(() => {
    const id = router.params?.id;
    return id ? parseInt(id, 10) : null;
  }, [router.params]);

  const address = useMemo(() => {
    if (addressId === null) return null;
    return state.list.find(addr => addr.id === addressId) || null;
  }, [addressId, state.list]);

  useEffect(() => {
    if (addressId !== null && !address) {
      Taro.showToast({ title: '地址不存在', icon: 'none' });
      setTimeout(() => Taro.navigateBack(), 1500);
    }
  }, [addressId, address]);

  const handleEdit = () => {
    setEditModalVisible(true);
  };

  const handleDelete = () => {
    if (!address) return;
    Taro.showModal({
      title: '确认删除',
      content: '确定要删除这个收货地址吗？',
      success: (res) => {
        if (res.confirm) {
          dispatch({ type: 'DELETE_ADDRESS', payload: { id: address.id } });
          Taro.showToast({ title: '删除成功', icon: 'success' });
          setTimeout(() => Taro.navigateBack(), 800);
        }
      }
    });
  };

  const handleSetDefault = () => {
    if (!address) return;
    dispatch({ type: 'SET_DEFAULT', payload: { id: address.id } });
    Taro.showToast({ title: '已设为默认', icon: 'success' });
  };

  if (!address) {
    return (
      <View className={styles.container}>
        <NavBar title="地址详情" />
        <View className={styles.loading}>
          <Text className={styles.loadingText}>加载中...</Text>
        </View>
      </View>
    );
  }

  return (
    <View className={styles.container}>
      <NavBar title="地址详情" />
      <ScrollView scrollY className={styles.content}>
        <View className={styles.addressCard}>
          <View className={styles.addressHeader}>
            <Text className={styles.name}>{address.name}</Text>
            <Text className={styles.phone}>{address.phone}</Text>
            {address.isDefault && (
              <Text className={styles.defaultTag}>默认</Text>
            )}
          </View>

          <View className={styles.addressInfo}>
            <Text className={styles.label}>所在地区</Text>
            <Text className={styles.value}>
              {address.province} {address.city} {address.district}
            </Text>
          </View>

          <View className={styles.addressInfo}>
            <Text className={styles.label}>详细地址</Text>
            <Text className={styles.value}>{address.detail}</Text>
          </View>
        </View>

        <View className={styles.actionList}>
          {!address.isDefault && (
            <View className={styles.actionItem} onClick={handleSetDefault}>
              <Text className={styles.actionText}>设为默认地址</Text>
              <Text className={styles.actionArrow}>›</Text>
            </View>
          )}
          <View className={styles.actionItem} onClick={handleEdit}>
            <Text className={styles.actionText}>修改地址</Text>
            <Text className={styles.actionArrow}>›</Text>
          </View>
          <View className={styles.actionItem} onClick={handleDelete}>
            <Text className={styles.actionTextDanger}>删除地址</Text>
            <Text className={styles.actionArrow}>›</Text>
          </View>
        </View>
      </ScrollView>

      <View className={styles.bottomBar}>
        <View className={styles.editBtn} onClick={handleEdit}>
          <Text className={styles.editBtnText}>修改地址</Text>
        </View>
      </View>

      <AddressModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        editAddress={address}
      />
    </View>
  );
};

export default AddressEditPage;
