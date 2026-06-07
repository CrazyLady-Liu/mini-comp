import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import OrderCard from '@/components/OrderCard';
import EmptyState from '@/components/EmptyState';
import { orders, getOrdersByStatus } from '@/data/orders';
import type { OrderStatus } from '@/types';
import classnames from 'classnames';

const tabs = [
  { key: 'all', label: '全部' },
  { key: 'pending', label: '待付款' },
  { key: 'ready', label: '待自提' },
  { key: 'completed', label: '已完成' }
];

const OrderPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredOrders = useMemo(() => {
    if (activeTab === 'all') return orders;
    return getOrdersByStatus(activeTab as OrderStatus);
  }, [activeTab]);

  const handleTabChange = (key: string) => {
    console.log('[Order] 切换Tab:', key);
    setActiveTab(key);
  };

  const handleOrderAction = (orderId: string, action: string) => {
    console.log('[Order] 订单操作:', orderId, action);
    if (action === 'pickup') {
      Taro.navigateTo({
        url: `/pages/pickup-code/index?id=${orderId}`
      });
    } else if (action === 'pay') {
      Taro.showToast({ title: '支付功能开发中', icon: 'none' });
    }
  };

  return (
    <View className={styles.container}>
      <View className={styles.tabs}>
        {tabs.map(tab => (
          <View
            key={tab.key}
            className={classnames(styles.tabItem, activeTab === tab.key && styles.active)}
            onClick={() => handleTabChange(tab.key)}
          >
            <Text>{tab.label}</Text>
          </View>
        ))}
      </View>

      <ScrollView scrollY className={styles.orderList}>
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => (
            <OrderCard
              key={order.id}
              order={order}
              onAction={(action) => handleOrderAction(order.id, action)}
            />
          ))
        ) : (
          <View className={styles.emptyWrap}>
            <EmptyState
              icon="📋"
              title="暂无订单"
              description="快去下单新鲜好货吧"
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default OrderPage;
