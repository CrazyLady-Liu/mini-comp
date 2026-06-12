import React, { useState, useMemo } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import styles from './index.module.scss';
import { useFootprint, selectAllSelected, selectSelectedFootprints, sortFootprintsByTime } from '@/store/FootprintContext';
import { useCart } from '@/store/CartContext';
import { formatPrice, formatBrowseTime } from '@/utils/format';
import EmptyState from '@/components/EmptyState';
import classnames from 'classnames';

const FootprintPage: React.FC = () => {
  const { state: footprintState, dispatch: footprintDispatch } = useFootprint();
  const { dispatch: cartDispatch } = useCart();
  const [isEdit, setIsEdit] = useState(false);

  useDidShow(() => {
    footprintDispatch({ type: 'TOGGLE_SELECT_ALL', payload: { selected: false } });
  });

  const sortedItems = useMemo(() => {
    return sortFootprintsByTime(footprintState.items);
  }, [footprintState.items]);

  const allSelected = useMemo(() => {
    return selectAllSelected(footprintState.items);
  }, [footprintState.items]);

  const selectedItems = useMemo(() => {
    return selectSelectedFootprints(footprintState.items);
  }, [footprintState.items]);

  const selectedCount = selectedItems.length;

  const handleToggleSelect = (productId: number) => {
    console.log('[Footprint] 切换选中:', productId);
    footprintDispatch({ type: 'TOGGLE_SELECT', payload: { productId } });
  };

  const handleToggleSelectAll = () => {
    console.log('[Footprint] 全选/取消全选');
    footprintDispatch({ type: 'TOGGLE_SELECT_ALL', payload: { selected: !allSelected } });
  };

  const handleProductClick = (productId: number) => {
    console.log('[Footprint] 点击商品:', productId);
    Taro.navigateTo({
      url: `/pages/product-detail/index?id=${productId}`
    });
  };

  const handleAddCart = (productId: number, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    const item = footprintState.items.find(i => i.productId === productId);
    if (!item) return;

    console.log('[Footprint] 加入购物车:', productId);
    cartDispatch({
      type: 'ADD_ITEM',
      payload: { product: item.product, quantity: 1 }
    });
    Taro.showToast({ title: '已加入购物车', icon: 'success' });
  };

  const handleDelete = (productId: number, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    console.log('[Footprint] 删除单条:', productId);
    Taro.showModal({
      title: '提示',
      content: '确定要删除这条足迹吗？',
      success: (res) => {
        if (res.confirm) {
          footprintDispatch({ type: 'REMOVE_FOOTPRINT', payload: { productId } });
          Taro.showToast({ title: '已删除', icon: 'success' });
        }
      }
    });
  };

  const handleBatchDelete = () => {
    if (selectedCount === 0) {
      Taro.showToast({ title: '请选择要删除的足迹', icon: 'none' });
      return;
    }
    console.log('[Footprint] 批量删除:', selectedCount);
    Taro.showModal({
      title: '提示',
      content: `确定要删除选中的${selectedCount}条足迹吗？`,
      success: (res) => {
        if (res.confirm) {
          const productIds = selectedItems.map(item => item.productId);
          footprintDispatch({ type: 'BATCH_REMOVE', payload: { productIds } });
          Taro.showToast({ title: '已删除', icon: 'success' });
          if (footprintState.items.length - selectedCount === 0) {
            setIsEdit(false);
          }
        }
      }
    });
  };

  const handleBatchAddCart = () => {
    if (selectedCount === 0) {
      Taro.showToast({ title: '请选择要加入购物车的商品', icon: 'none' });
      return;
    }
    console.log('[Footprint] 批量加入购物车:', selectedCount);
    selectedItems.forEach(item => {
      cartDispatch({
        type: 'ADD_ITEM',
        payload: { product: item.product, quantity: 1 }
      });
    });
    Taro.showToast({ title: `已加入${selectedCount}件商品`, icon: 'success' });
  };

  const handleClearAll = () => {
    console.log('[Footprint] 一键清空');
    Taro.showModal({
      title: '提示',
      content: '确定要清空全部浏览足迹吗？此操作不可恢复。',
      confirmText: '清空',
      confirmColor: '#ef4444',
      success: (res) => {
        if (res.confirm) {
          footprintDispatch({ type: 'CLEAR_ALL' });
          setIsEdit(false);
          Taro.showToast({ title: '已清空', icon: 'success' });
        }
      }
    });
  };

  const handleGoShopping = () => {
    Taro.switchTab({
      url: '/pages/home/index'
    });
  };

  const handleEditToggle = () => {
    if (isEdit) {
      footprintDispatch({ type: 'TOGGLE_SELECT_ALL', payload: { selected: false } });
    }
    setIsEdit(!isEdit);
  };

  return (
    <View className={styles.container}>
      <View className={styles.header}>
        <Text className={styles.headerTitle}>浏览足迹</Text>
        {footprintState.items.length > 0 && (
          <View style={{ display: 'flex', alignItems: 'center', gap: '24rpx' }}>
            <Text className={styles.clearBtn} onClick={handleClearAll}>
              清空
            </Text>
            <Text
              className={styles.editBtn}
              onClick={handleEditToggle}
            >
              {isEdit ? '完成' : '管理'}
            </Text>
          </View>
        )}
      </View>

      {sortedItems.length > 0 ? (
        <ScrollView scrollY className={styles.footprintList}>
          {sortedItems.map(item => (
            <View
              key={item.productId}
              className={styles.footprintItem}
              onClick={() => handleProductClick(item.productId)}
            >
              {isEdit && (
                <View
                  className={classnames(styles.checkbox, item.selected && styles.checked)}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleSelect(item.productId);
                  }}
                >
                  <Text className={styles.checkboxIcon}>✓</Text>
                </View>
              )}

              <Image
                className={styles.itemImage}
                src={item.product.image}
                mode="aspectFill"
              />

              <View className={styles.itemInfo}>
                <Text className={styles.itemName}>{item.product.name}</Text>
                <Text className={styles.itemTime}>
                  浏览时间：{formatBrowseTime(item.browseTime)}
                </Text>
                <View className={styles.itemBottom}>
                  <Text className={styles.itemPrice}>
                    <Text className={styles.itemPriceSymbol}>¥</Text>
                    {formatPrice(item.product.price)}
                  </Text>
                  <View
                    className={styles.addCartBtn}
                    onClick={(e) => handleAddCart(item.productId, e)}
                  >
                    <Text>加入购物车</Text>
                  </View>
                </View>
              </View>

              {!isEdit && (
                <View
                  className={styles.deleteBtn}
                  onClick={(e) => handleDelete(item.productId, e)}
                >
                  <Text>×</Text>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      ) : (
        <View className={styles.emptyWrap}>
          <EmptyState
            icon="👣"
            title="暂无浏览足迹"
            description="快去逛逛发现新鲜好货吧"
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

      {isEdit && sortedItems.length > 0 && (
        <View className={styles.footer}>
          <View className={styles.selectAll} onClick={handleToggleSelectAll}>
            <View className={classnames(styles.checkbox, allSelected && styles.checked)}>
              <Text className={styles.checkboxIcon}>✓</Text>
            </View>
            <Text className={styles.selectAllText}>全选</Text>
          </View>

          <View className={styles.footerActions}>
            <View
              className={classnames(
                styles.batchBtn,
                styles.delete,
                selectedCount === 0 && styles.disabled
              )}
              onClick={handleBatchDelete}
            >
              <Text>删除</Text>
            </View>
            <View
              className={classnames(
                styles.batchBtn,
                styles.addCart,
                selectedCount === 0 && styles.disabled
              )}
              onClick={handleBatchAddCart}
            >
              <Text>加入购物车</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default FootprintPage;
