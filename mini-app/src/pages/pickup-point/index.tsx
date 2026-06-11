import React, { useState } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import NavBar from '@/components/NavBar';
import { pickupPoints } from '@/data/user';
import classnames from 'classnames';

const PickupPointPage: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number>(1);

  const handleSelect = (id: number) => {
    console.log('[PickupPoint] 选择自提点:', id);
    setSelectedId(id);
    Taro.showToast({ title: '选择成功', icon: 'success' });
    setTimeout(() => {
      Taro.navigateBack();
    }, 500);
  };

  return (
    <View className={styles.container}>
      <NavBar title="选择自提点" />
      <ScrollView scrollY className={styles.pointList}>
        {pickupPoints.map(point => (
          <View
            key={point.id}
            className={classnames(
              styles.pointItem,
              selectedId === point.id && styles.selected
            )}
            onClick={() => handleSelect(point.id)}
          >
            <View className={styles.pointHeader}>
              <Text className={styles.pointName}>{point.name}</Text>
              <Text className={styles.distance}>{point.distance}</Text>
            </View>
            <Text className={styles.pointAddress}>📍 {point.address}</Text>
            <View className={styles.pointInfo}>
              <Text>🕐 {point.businessHours}</Text>
              <Text>📞 {point.phone}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default PickupPointPage;
