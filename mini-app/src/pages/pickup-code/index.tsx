import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import styles from './index.module.scss';
import { NavBar } from '@/components';
import { getOrderById } from '@/data/orders';
import type { Order } from '@/types';

const PickupCodePage: React.FC = () => {
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const id = router.params.id || '1';
    const o = getOrderById(id);
    if (o) {
      setOrder(o);
    }
    console.log('[PickupCode] 订单ID:', id);
  }, [router.params.id]);

  const handleCopyCode = () => {
    if (order?.pickupCode) {
      Taro.setClipboardData({
        data: order.pickupCode,
        success: () => {
          Taro.showToast({ title: '已复制取货码', icon: 'success' });
        }
      });
    }
  };

  if (!order) {
    return (
      <View className={styles.container}>
        <Text>加载中...</Text>
      </View>
    );
  }

  return (
    <View className={styles.container}>
      <NavBar title="自提码" />
      <ScrollView scrollY className={styles.content}>
        <View className={styles.card}>
          <Text className={styles.status}>待自提</Text>

          <View className={styles.qrCodeWrap} onClick={handleCopyCode}>
            <Text className={styles.qrCode}>📱</Text>
          </View>

          <Text className={styles.pickupCode}>{order.pickupCode}</Text>
          <Text className={styles.pickupLabel}>取货码（点击复制）</Text>

          <View className={styles.tip}>
            请向工作人员出示此取货码，或扫描二维码进行核销
          </View>

          <View className={styles.orderInfo}>
            <View className={styles.infoItem}>
              <Text className={styles.infoLabel}>订单号</Text>
              <Text className={styles.infoValue}>{order.orderNo}</Text>
            </View>
            <View className={styles.infoItem}>
              <Text className={styles.infoLabel}>下单时间</Text>
              <Text className={styles.infoValue}>{order.createTime}</Text>
            </View>
            <View className={styles.infoItem}>
              <Text className={styles.infoLabel}>商品数量</Text>
              <Text className={styles.infoValue}>
                {order.items.reduce((sum, item) => sum + item.quantity, 0)}件
              </Text>
            </View>
            <View className={styles.infoItem}>
              <Text className={styles.infoLabel}>实付金额</Text>
              <Text className={styles.infoValue} style={{ color: '#ef4444', fontWeight: 'bold' }}>
                ¥{order.payAmount.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {order.pickupPoint && (
          <View className={styles.pickupPointCard}>
            <Text className={styles.pointName}>
              <Text className={styles.pointIcon}>📍</Text>
              {order.pickupPoint.name}
            </Text>
            <Text className={styles.pointAddress}>{order.pickupPoint.address}</Text>
            <Text className={styles.pointHours}>🕐 营业时间：{order.pickupPoint.businessHours}</Text>
            <Text className={styles.pointHours}>📞 联系电话：{order.pickupPoint.phone}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default PickupCodePage;
