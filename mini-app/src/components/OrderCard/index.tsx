import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import type { Order } from '@/types';
import { formatPrice } from '@/utils/format';
import classnames from 'classnames';

interface OrderCardProps {
  order: Order;
  onClick?: () => void;
  onAction?: (action: string) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onClick, onAction }) => {
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

  return (
    <View className={styles.card} onClick={handleClick}>
      <View className={styles.header}>
        <Text className={styles.orderNo}>订单号: {order.orderNo}</Text>
        <Text className={classnames(styles.status, styles[`status-${order.status}`])}>
          {order.statusText}
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
          <View className={styles.actionBtn} onClick={(e) => {
            e.stopPropagation();
            if (order.status === 'pending') {
              onAction?.('pay');
            } else if (order.status === 'ready') {
              onAction?.('pickup');
            }
          }}>
            <Text className={styles.actionBtnText}>
              {order.status === 'pending' ? '去付款' : '去自提'}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default OrderCard;
