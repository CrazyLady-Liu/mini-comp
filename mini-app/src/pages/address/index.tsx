import React, { useState } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import { NavBar, AddressModal } from '@/components';
import { useAddress } from '@/store/AddressContext';

const AddressPage: React.FC = () => {
  const { state, dispatch } = useAddress();
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddAddress = () => {
    setModalVisible(true);
  };

  const handleAddressClick = (id: number) => {
    Taro.navigateTo({
      url: `/pages/address-edit/index?id=${id}`
    });
  };

  const handleSetDefault = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    dispatch({ type: 'SET_DEFAULT', payload: { id } });
  };

  return (
    <View className={styles.container}>
      <NavBar title="收货地址" />
      <ScrollView scrollY className={styles.addressList}>
        {state.list.length === 0 ? (
          <View className={styles.empty}>
            <Text className={styles.emptyText}>暂无收货地址</Text>
          </View>
        ) : (
          state.list.map(addr => (
            <View
              key={addr.id}
              className={styles.addressItem}
              onClick={() => handleAddressClick(addr.id)}
            >
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
              <View className={styles.addressFooter}>
                <View
                  className={styles.setDefault}
                  onClick={(e) => handleSetDefault(e, addr.id)}
                >
                  <View className={`${styles.radio} ${addr.isDefault ? styles.radioChecked : ''}`}>
                    {addr.isDefault && <View className={styles.radioInner} />}
                  </View>
                  <Text className={styles.setDefaultText}>设为默认</Text>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <View className={styles.bottomBar}>
        <View className={styles.addBtn} onClick={handleAddAddress}>
          <Text className={styles.addBtnText}>新增收货地址</Text>
        </View>
      </View>

      <AddressModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
};

export default AddressPage;
