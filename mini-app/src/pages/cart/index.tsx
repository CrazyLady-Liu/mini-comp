import React, { useState, useMemo } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import { useCart, selectCartTotal } from '@/store/CartContext';
import { formatPrice } from '@/utils/format';
import { getHotProducts } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import EmptyState from '@/components/EmptyState';
import classnames from 'classnames';

const CartPage: React.FC = () => {
  const { state, dispatch } = useCart();
  const [isEdit, setIsEdit] = useState(false);

  const { total, count, allSelected } = useMemo(() => {
    return selectCartTotal(state.items);
  }, [state.items]);

  const recommendProducts = getHotProducts().slice(0, 4);

  const handleToggleSelect = (productId: number) => {
    console.log('[Cart] 切换选中:', productId);
    dispatch({ type: 'TOGGLE_SELECT', payload: { productId } });
  };

  const handleToggleSelectAll = () => {
    console.log('[Cart] 全选/取消全选');
    dispatch({ type: 'TOGGLE_SELECT_ALL', payload: { selected: !allSelected } });
  };

  const handleQuantityChange = (productId: number, delta: number) => {
    const item = state.items.find(i => i.productId === productId);
    if (!item) return;

    const newQuantity = item.quantity + delta;
    if (newQuantity < 1) {
      if (delta < 0) {
        handleRemoveItem(productId);
        return;
      }
      return;
    }

    console.log('[Cart] 数量变化:', productId, newQuantity);
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity: newQuantity } });
  };

  const handleRemoveItem = (productId: number) => {
    console.log('[Cart] 删除商品:', productId);
    Taro.showModal({
      title: '提示',
      content: '确定要删除该商品吗？',
      success: (res) => {
        if (res.confirm) {
          dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
        }
      }
    });
  };

  const handleCheckout = () => {
    if (count === 0) {
      Taro.showToast({ title: '请选择商品', icon: 'none' });
      return;
    }
    console.log('[Cart] 去结算');
    Taro.navigateTo({
      url: '/pages/order-confirm/index'
    });
  };

  const handleGoShopping = () => {
    Taro.switchTab({
      url: '/pages/home/index'
    });
  };

  return (
    <View className={styles.container}>
      <View className={styles.header}>
        <Text className={styles.headerTitle}>购物车</Text>
        <Text
          className={styles.editBtn}
          onClick={() => setIsEdit(!isEdit)}
        >
          {isEdit ? '完成' : '编辑'}
        </Text>
      </View>

      {state.items.length > 0 ? (
        <>
          <ScrollView scrollY className={styles.cartList}>
            {state.items.map(item => (
              <View key={item.productId} className={styles.cartItem}>
                <View
                  className={classnames(styles.checkbox, item.selected && styles.checked)}
                  onClick={() => handleToggleSelect(item.productId)}
                >
                  <Text className={styles.checkboxIcon}>✓</Text>
                </View>

                <Image
                  className={styles.itemImage}
                  src={item.product.image}
                  mode="aspectFill"
                />

                <View className={styles.itemInfo}>
                  <Text className={styles.itemName}>{item.product.name}</Text>
                  <Text className={styles.itemSpec}>
                    {item.product.specs?.[0]?.name || item.product.unit}
                  </Text>
                  <View className={styles.itemBottom}>
                    <Text className={styles.itemPrice}>
                      <Text className={styles.itemPriceSymbol}>¥</Text>
                      {formatPrice(item.product.price)}
                    </Text>
                    <View className={styles.quantityControl}>
                      <View
                        className={classnames(
                          styles.quantityBtn,
                          item.quantity <= 1 && styles.disabled
                        )}
                        onClick={() => handleQuantityChange(item.productId, -1)}
                      >
                        <Text>−</Text>
                      </View>
                      <Text className={styles.quantityValue}>{item.quantity}</Text>
                      <View
                        className={styles.quantityBtn}
                        onClick={() => handleQuantityChange(item.productId, 1)}
                      >
                        <Text>+</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>

          <View className={styles.recommendSection}>
            <Text className={styles.recommendTitle}>猜你喜欢</Text>
            <View className={styles.recommendGrid}>
              {recommendProducts.map(product => (
                <View key={product.id} className={styles.recommendItem}>
                  <ProductCard product={product} />
                </View>
              ))}
            </View>
          </View>
        </>
      ) : (
        <View className={styles.emptyWrap}>
          <EmptyState
            icon="🛒"
            title="购物车是空的"
            description="去挑选新鲜好货吧"
          />
          <View
            style={{ textAlign: 'center', marginTop: '32rpx' }}
            onClick={handleGoShopping}
          >
            <Text style={{
              padding: '16rpx 48rpx',
              background: 'linear-gradient(135deg, #22c55e 0%, #4ade80 100%)',
              color: '#fff',
              borderRadius: '48rpx',
              fontSize: '28rpx'
            }}>
              去逛逛
            </Text>
          </View>
        </View>
      )}

      {state.items.length > 0 && (
        <View className={styles.footer}>
          <View className={styles.selectAll} onClick={handleToggleSelectAll}>
            <View className={classnames(styles.checkbox, allSelected && styles.checked)}>
              <Text className={styles.checkboxIcon}>✓</Text>
            </View>
            <Text className={styles.selectAllText}>全选</Text>
          </View>

          <View className={styles.totalSection}>
            <Text className={styles.totalLabel}>合计：</Text>
            <Text className={styles.totalPrice}>
              <Text className={styles.totalPriceSymbol}>¥</Text>
              {formatPrice(total)}
            </Text>
          </View>

          <View
            className={classnames(styles.checkoutBtn, count === 0 && styles.disabled)}
            onClick={handleCheckout}
          >
            <Text className={styles.checkoutBtnText}>
              去结算
            </Text>
            {count > 0 && (
              <Text className={styles.checkoutCount}>({count})</Text>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default CartPage;
