import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import styles from './index.module.scss';
import NavBar from '@/components/NavBar';
import { getOrderById } from '@/data/orders';
import { formatPrice } from '@/utils/format';
import { checkOrderTimeout, ORDER_TIMEOUT_MINUTES } from '@/utils/order';
import type { Order } from '@/types';
import classnames from 'classnames';

interface PayMethod {
  id: string;
  name: string;
  desc: string;
  icon: string;
  iconClass: string;
}

const payMethods: PayMethod[] = [
  {
    id: 'wechat',
    name: '微信支付',
    desc: '推荐使用微信支付',
    icon: '💬',
    iconClass: 'payMethodIcon-wechat'
  },
  {
    id: 'alipay',
    name: '支付宝',
    desc: '数亿用户的选择',
    icon: '💰',
    iconClass: 'payMethodIcon-alipay'
  }
];

const PaymentPage: React.FC = () => {
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [selectedPayMethod, setSelectedPayMethod] = useState<string>('wechat');
  const [isPaying, setIsPaying] = useState(false);
  const [countdown, setCountdown] = useState<string>('');

  useEffect(() => {
    const id = router.params.id || '1';
    const o = getOrderById(id);
    if (o) {
      setOrder(o);
    }
    console.log('[Payment] 订单ID:', id);
  }, [router.params.id]);

  useEffect(() => {
    if (!order) return;

    const updateCountdown = () => {
      const result = checkOrderTimeout(order.createTime);
      if (result.isTimeout) {
        setCountdown('订单已超时');
        return;
      }
      const mins = Math.floor(result.remainingSeconds / 60);
      const secs = result.remainingSeconds % 60;
      setCountdown(`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [order]);

  const isOrderValid = useMemo(() => {
    if (!order) return false;
    if (order.status !== 'pending') return false;
    const result = checkOrderTimeout(order.createTime);
    return !result.isTimeout;
  }, [order, countdown]);

  const handlePay = () => {
    if (!order || !isOrderValid) return;
    if (isPaying) return;

    setIsPaying(true);
    console.log('[Payment] 开始支付:', order.id, '支付方式:', selectedPayMethod);

    setTimeout(() => {
      Taro.showToast({ title: '支付成功', icon: 'success' });
      setTimeout(() => {
        setIsPaying(false);
        Taro.redirectTo({
          url: `/pages/pickup-code/index?id=${order.id}`
        });
      }, 1500);
    }, 1500);
  };

  if (!order) {
    return (
      <View className={styles.container}>
        <NavBar title="收银台" />
        <View style={{ padding: 200, textAlign: 'center' }}>
          <Text style={{ color: '#94a3b8', fontSize: 28 }}>加载中...</Text>
        </View>
      </View>
    );
  }

  return (
    <View className={styles.container}>
      <NavBar title="收银台" />
      <ScrollView scrollY className={styles.content}>
        <View className={styles.orderCard}>
          <View className={styles.orderHeader}>
            <Text className={styles.orderNo}>订单号: {order.orderNo}</Text>
            <Text className={styles.orderStatus}>
              {isOrderValid ? '待付款' : '已超时'}
            </Text>
          </View>

          <View className={styles.amountSection}>
            <Text className={styles.amountLabel}>实付金额</Text>
            <View className={styles.amountValue}>
              <Text className={styles.amountValueSymbol}>¥</Text>
              {formatPrice(order.payAmount)}
            </View>
            <View className={styles.countdown}>
              {isOrderValid ? (
                <>
                  请在 <Text className={styles.countdownValue}>{countdown}</Text> 内完成支付
                  （超时自动取消）
                </>
              ) : (
                <Text style={{ color: '#ef4444' }}>订单已超时，请重新下单</Text>
              )}
            </View>
          </View>
        </View>

        <View className={styles.sectionCard}>
          <View className={styles.sectionHeader}>
            <Text className={styles.sectionTitle}>支付方式</Text>
          </View>
          <View className={styles.payMethodList}>
            {payMethods.map(method => (
              <View
                key={method.id}
                className={styles.payMethodItem}
                onClick={() => setSelectedPayMethod(method.id)}
              >
                <View className={classnames(styles.payMethodIcon, styles[method.iconClass])}>
                  <Text>{method.icon}</Text>
                </View>
                <View className={styles.payMethodInfo}>
                  <Text className={styles.payMethodName}>{method.name}</Text>
                  <Text className={styles.payMethodDesc}>{method.desc}</Text>
                </View>
                <View className={classnames(
                  styles.payMethodCheck,
                  selectedPayMethod === method.id && styles['payMethodCheck-active']
                )}>
                  <Text className={styles.payMethodCheckIcon}>✓</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View className={styles.sectionCard}>
          <View className={styles.sectionHeader}>
            <Text className={styles.sectionTitle}>商品清单</Text>
          </View>
          <View className={styles.orderItems}>
            {order.items.map((item, index) => (
              <View key={index} className={styles.orderItem}>
                <Image
                  className={styles.orderItemImage}
                  src={item.productImage}
                  mode="aspectFill"
                />
                <View className={styles.orderItemInfo}>
                  <Text className={styles.orderItemName}>{item.productName}</Text>
                  {item.specName && (
                    <Text className={styles.orderItemSpec}>{item.specName}</Text>
                  )}
                </View>
                <View className={styles.orderItemRight}>
                  <Text className={styles.orderItemPrice}>¥{formatPrice(item.price)}</Text>
                  <Text className={styles.orderItemQty}>x{item.quantity}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View className={styles.footer}>
        <View className={styles.footerLeft}>
          <Text className={styles.footerLabel}>实付：</Text>
          <Text className={styles.footerPrice}>¥{formatPrice(order.payAmount)}</Text>
        </View>
        <View
          className={classnames(
            styles.payBtn,
            (!isOrderValid || isPaying) && styles.payBtnDisabled
          )}
          onClick={handlePay}
        >
          {isPaying ? (
            <View className={styles.payLoading}>
              <Text className={styles.paySpinner}></Text>
              <Text className={styles.payBtnText}>支付中...</Text>
            </View>
          ) : (
            <Text className={styles.payBtnText}>
              {isOrderValid ? '立即支付' : '订单已超时'}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default PaymentPage;
