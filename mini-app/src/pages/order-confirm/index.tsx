import React, { useState, useMemo } from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import styles from './index.module.scss';
import NavBar from '@/components/NavBar';
import { formatPrice } from '@/utils/format';
import classnames from 'classnames';

interface OrderItem {
  productId: number;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  specId?: number;
  specName?: string;
}

const OrderConfirmPage: React.FC = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const orderItem = useMemo<OrderItem | null>(() => {
    const { productId, productName, productImage, price, quantity, specId, specName } = router.params;
    if (!productId || !productName || !price || !quantity) {
      return null;
    }
    return {
      productId: Number(productId),
      productName,
      productImage: productImage || '',
      price: Number(price),
      quantity: Number(quantity),
      specId: specId ? Number(specId) : undefined,
      specName: specName || undefined
    };
  }, [router.params]);

  const totalAmount = useMemo(() => {
    if (!orderItem) return 0;
    return orderItem.price * orderItem.quantity;
  }, [orderItem]);

  const handleSubmit = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    console.log('[OrderConfirm] 提交订单:', orderItem);

    setTimeout(() => {
      Taro.showToast({ title: '订单提交成功', icon: 'success' });
      setTimeout(() => {
        setIsSubmitting(false);
        Taro.switchTab({ url: '/pages/order/index' });
      }, 1500);
    }, 800);
  };

  if (!orderItem) {
    return (
      <View className={styles.container}>
        <NavBar title="确认订单" />
        <View className={styles.emptyState}>
          <Text className={styles.emptyIcon}>📭</Text>
          <Text className={styles.emptyText}>暂无订单信息</Text>
        </View>
      </View>
    );
  }

  return (
    <View className={styles.container}>
      <NavBar title="确认订单" />

      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>商品信息</Text>
        </View>
        <View className={styles.productCard}>
          <Image
            className={styles.productImage}
            src={orderItem.productImage}
            mode="aspectFill"
          />
          <View className={styles.productInfo}>
            <Text className={styles.productName}>{orderItem.productName}</Text>
            {orderItem.specName && (
              <Text className={styles.productSpec}>规格：{orderItem.specName}</Text>
            )}
            <View className={styles.productBottom}>
              <Text className={styles.productPrice}>¥{formatPrice(orderItem.price)}</Text>
              <Text className={styles.productQuantity}>x{orderItem.quantity}</Text>
            </View>
          </View>
        </View>
      </View>

      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>配送方式</Text>
        </View>
        <View className={styles.deliveryCard}>
          <Text className={styles.deliveryIcon}>📍</Text>
          <View className={styles.deliveryInfo}>
            <Text className={styles.deliveryTitle}>到店自提</Text>
            <Text className={styles.deliveryDesc}>下单后到门店自提，新鲜直达</Text>
          </View>
          <Text className={styles.deliveryArrow}>›</Text>
        </View>
      </View>

      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>费用明细</Text>
        </View>
        <View className={styles.feeCard}>
          <View className={styles.feeRow}>
            <Text className={styles.feeLabel}>商品金额</Text>
            <Text className={styles.feeValue}>¥{formatPrice(totalAmount)}</Text>
          </View>
          <View className={styles.feeRow}>
            <Text className={styles.feeLabel}>配送费</Text>
            <Text className={styles.feeValue}>¥0.00</Text>
          </View>
          <View className={styles.feeRow}>
            <Text className={styles.feeLabel}>优惠</Text>
            <Text className={classnames(styles.feeValue, styles.feeDiscount)}>-¥0.00</Text>
          </View>
          <View className={styles.feeDivider}></View>
          <View className={styles.feeRow}>
            <Text className={styles.feeTotalLabel}>实付金额</Text>
            <Text className={styles.feeTotalValue}>¥{formatPrice(totalAmount)}</Text>
          </View>
        </View>
      </View>

      <View className={styles.footer}>
        <View className={styles.footerLeft}>
          <Text className={styles.footerLabel}>实付：</Text>
          <Text className={styles.footerPrice}>¥{formatPrice(totalAmount)}</Text>
        </View>
        <View
          className={classnames(
            styles.submitBtn,
            isSubmitting && styles.submitBtnDisabled
          )}
          onClick={handleSubmit}
        >
          {isSubmitting ? (
            <View className={styles.submitLoading}>
              <Text className={styles.submitSpinner}></Text>
              <Text className={styles.submitText}>提交中...</Text>
            </View>
          ) : (
            <Text className={styles.submitText}>提交订单</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default OrderConfirmPage;
