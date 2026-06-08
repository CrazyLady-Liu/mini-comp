import React from 'react';
import { View, Text, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import type { Coupon } from '@/types';
import classnames from 'classnames';

export interface CouponCardProps {
  coupon: Coupon;
  size?: 'normal' | 'small';
  layout?: 'horizontal' | 'vertical';
  showAction?: boolean;
  actionText?: string;
  received?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  onReceive?: () => void;
}

const CouponCard: React.FC<CouponCardProps> = ({
  coupon,
  size = 'normal',
  layout = 'horizontal',
  showAction = true,
  actionText = '立即领取',
  received = false,
  disabled = false,
  onClick,
  onReceive
}) => {
  const isOutOfStock = coupon.stock <= 0;
  const isDisabled = disabled || isOutOfStock;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleReceive = (e) => {
    e.stopPropagation();
    if (isDisabled || received) return;
    if (onReceive) {
      onReceive();
    } else {
      Taro.showToast({
        title: '领取成功',
        icon: 'success'
      });
    }
  };

  const formatDiscount = () => {
    if (coupon.discountType === 'amount') {
      return (
        <View className={styles.amount}>
          <Text className={styles.symbol}>¥</Text>
          <Text className={styles.value}>{coupon.discountValue}</Text>
        </View>
      );
    } else {
      return (
        <View className={styles.amount}>
          <View className={styles.percent}>
            {coupon.discountValue}
            <Text className={styles.unit}>折</Text>
          </View>
        </View>
      );
    }
  };

  const formatCondition = () => {
    if (coupon.minAmount === 0) {
      return '无门槛使用';
    }
    return `满${coupon.minAmount}元可用`;
  };

  const getTypeClass = () => {
    const typeMap = {
      full: 'typeFull',
      category: 'typeCategory',
      threshold: 'typeThreshold',
      preorder: 'typePreorder',
      pickup: 'typePickup'
    };
    return typeMap[coupon.type] || 'typeFull';
  };

  return (
    <View
      className={classnames(
        styles.couponCard,
        styles[getTypeClass()],
        size === 'small' && styles.small,
        layout === 'horizontal' && styles.horizontal,
        isDisabled && styles.disabled,
        received && styles.received
      )}
      onClick={handleClick}
    >
      <View className={styles.leftArea}>
        {formatDiscount()}
        <Text className={styles.condition}>{formatCondition()}</Text>
        <View className={styles.couponType}>
          <Text>{coupon.typeText}</Text>
        </View>
      </View>

      <View className={styles.rightArea}>
        <View className={styles.couponInfo}>
          <Text className={styles.name}>{coupon.name}</Text>
          <Text className={styles.desc}>{coupon.description}</Text>
          <Text className={styles.validity}>
            有效期：{coupon.validFrom} 至 {coupon.validTo}
          </Text>
        </View>

        <View className={styles.couponFooter}>
          <Text className={styles.stockInfo}>
            剩余 {coupon.stock} 张 / 已领 {coupon.receivedCount}
          </Text>
          {showAction && (
            <Button
              className={classnames(
                styles.actionBtn,
                isDisabled && styles.disabled,
                received && styles.received
              )}
              onClick={handleReceive}
            >
              {received ? '已领取' : isOutOfStock ? '已抢光' : actionText}
            </Button>
          )}
        </View>
      </View>
    </View>
  );
};

export default CouponCard;
