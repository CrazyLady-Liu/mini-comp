import React, { useState, useEffect } from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import type { Order } from '@/types';
import { formatPrice } from '@/utils/format';
import { isOrderPayable } from '@/utils/order';
import classnames from 'classnames';

export interface OrderCardProps {
  order: Order;
  onClick?: () => void;
  onAction?: (action: string) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onClick, onAction }) => {
  const [canPay, setCanPay] = useState(false);

  useEffect(() => {
    const updatePayStatus = () => {
      setCanPay(isOrderPayable(order.status, order.createTime));
    };
    updatePayStatus();
    const timer = setInterval(updatePayStatus, 1000);
    return () => clearInterval(timer);
  }, [order.status, order.createTime]);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      if (order.status === 'ready') {
        Taro.navigateTo({
          url: `/pages/pickup-code/index?id=${order.id}`
        });
      }
    }
  };

  const showActionBtn = order.status === 'pending' || order.status === 'ready';
  const isPayBtnDisabled = order.status === 'pending' && !canPay;

  const handleActionClick = (e: any) => {
    e.stopPropagation();
    if (order.status === 'pending') {
      if (!canPay) return;
      onAction?.('pay');
    } else if (order.status === 'ready') {
      onAction?.('pickup');
    }
  };

  return (
    <View className={styles.card} onClick={handleClick}>
      <View className={styles.header}>
        <Text className={styles.orderNo}>订单号: {order.orderNo}</Text>
        <Text className={classnames(styles.status, styles[`status-${order.status}`])}>
          {order.status === 'pending' && !canPay ? '已超时' : order.statusText}
        </Text>
      </View>

      <View className={styles.items}>
        {order.items.slice(0, 2).map((item, index) => (
          <View key={index} className={styles.item}>
            <Image className={styles.itemImage} src={item.productImage} mode="aspectFill" />
            <View className={styles.itemInfo}>
              <Text className={styles.itemName}>{item.productName}</Text>
              {item.specName && (
                <Text className={styles.itemSpec}>{item.specName}</Text>
              )}
              <Text className={styles.itemPrice}>¥{formatPrice(item.price)}</Text>
            </View>
            <Text className={styles.itemQty}>x{item.quantity}</Text>
          </View>
        ))}
        {order.items.length > 2 && (
          <Text className={styles.more}>共{order.items.length}件商品</Text>
        )}
      </View>

      <View className={styles.footer}>
        <Text className={styles.total}>
          实付 <Text className={styles.totalPrice}>¥{formatPrice(order.payAmount)}</Text>
        </Text>
        {showActionBtn && (
          <View
            className={classnames(
              styles.actionBtn,
              isPayBtnDisabled && styles.actionBtnDisabled
            )}
            onClick={handleActionClick}
          >
            <Text className={styles.actionBtnText}>
              {order.status === 'pending'
                ? (canPay ? '去付款' : '已超时')
                : '去自提'}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default OrderCard;
