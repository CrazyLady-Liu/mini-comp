import React, { useState, useEffect, useMemo, useRef } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import styles from './index.module.scss';
import { NavBar } from '@/components';
import { getProductById } from '@/data/products';
import { useCart } from '@/store/CartContext';
import { formatPrice, formatSales, getTagText } from '@/utils/format';
import classnames from 'classnames';
import type { Product } from '@/types';

const ProductDetailPage: React.FC = () => {
  const router = useRouter();
  const { dispatch } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSpecId, setSelectedSpecId] = useState<number | null>(null);
  const [quantity] = useState(1);
  const [isBuying, setIsBuying] = useState(false);
  const buyCoolDownRef = useRef<number | null>(null);

  useEffect(() => {
    const id = router.params.id ? Number(router.params.id) : 1;
    const p = getProductById(id);
    if (p) {
      setProduct(p);
    }
    console.log('[ProductDetail] 商品ID:', id);
    return () => {
      if (buyCoolDownRef.current) {
        clearTimeout(buyCoolDownRef.current);
      }
    };
  }, [router.params.id]);

  const selectedSpec = useMemo(() => {
    if (!product || !product.specs) return null;
    return product.specs.find(s => s.id === selectedSpecId) || null;
  }, [product, selectedSpecId]);

  const currentStock = useMemo(() => {
    return selectedSpec ? selectedSpec.stock : (product?.stock ?? 0);
  }, [selectedSpec, product]);

  const isSpecSelected = selectedSpecId !== null;
  const isSoldOut = isSpecSelected && currentStock <= 0;
  const isQuantityExceed = isSpecSelected && quantity > currentStock;
  const isBuyBtnDisabled = !isSpecSelected || isSoldOut || isBuying;

  const validateBeforeBuy = (): boolean => {
    if (!product) return false;

    if (product.specs && product.specs.length > 0 && !isSpecSelected) {
      Taro.showToast({ title: '请先选择商品规格', icon: 'none' });
      return false;
    }

    if (quantity < 1) {
      Taro.showToast({ title: '购买数量不能小于1', icon: 'none' });
      return false;
    }

    if (isSoldOut) {
      Taro.showToast({ title: '该规格已售罄，无法购买', icon: 'none' });
      return false;
    }

    if (isQuantityExceed) {
      Taro.showToast({ title: '购买数量超出剩余库存', icon: 'none' });
      return false;
    }

    return true;
  };

  const handleAddCart = () => {
    if (!validateBeforeBuy()) return;
    console.log('[ProductDetail] 加入购物车:', product!.id, quantity);
    dispatch({
      type: 'ADD_ITEM',
      payload: { product: product!, quantity, specId: selectedSpecId || undefined }
    });
    Taro.showToast({ title: '已加入购物车', icon: 'success' });
  };

  const handleBuyNow = () => {
    if (isBuying) return;
    if (!validateBeforeBuy()) return;

    setIsBuying(true);

    const params = new URLSearchParams();
    params.append('productId', String(product!.id));
    params.append('productName', product!.name);
    params.append('productImage', product!.image);
    params.append('quantity', String(quantity));
    params.append('price', String(selectedSpec ? selectedSpec.price : product!.price));
    if (selectedSpecId !== null && selectedSpec) {
      params.append('specId', String(selectedSpecId));
      params.append('specName', selectedSpec.name);
    }

    console.log('[ProductDetail] 立即购买，路由参数:', params.toString());

    buyCoolDownRef.current = setTimeout(() => {
      setIsBuying(false);
      buyCoolDownRef.current = null;
    }, 1500) as unknown as number;

    Taro.navigateTo({
      url: `/pages/order-confirm/index?${params.toString()}`
    });
  };

  const handleGoCart = () => {
    Taro.switchTab({
      url: '/pages/cart/index'
    });
  };

  const handleGoHome = () => {
    Taro.switchTab({
      url: '/pages/home/index'
    });
  };

  if (!product) {
    return (
      <View className={styles.container}>
        <Text>加载中...</Text>
      </View>
    );
  }

  const displayPrice = selectedSpec ? selectedSpec.price : product.price;
  const tagText = getTagText(product.tag);
  const displayStock = selectedSpec ? selectedSpec.stock : product.stock;

  return (
    <View className={styles.container}>
      <NavBar
        title="商品详情"
      />
      <ScrollView scrollY>
        <Image
          className={styles.productImage}
          src={product.image}
          mode="aspectFill"
        />

        <View className={styles.infoSection}>
          <View className={styles.priceRow}>
            <Text className={styles.priceSymbol}>¥</Text>
            <Text className={styles.price}>{formatPrice(displayPrice)}</Text>
            {product.originalPrice && (
              <Text className={styles.originalPrice}>
                ¥{formatPrice(product.originalPrice)}
              </Text>
            )}
          </View>

          {product.tag && (
            <View className={styles.tagRow}>
              <Text className={styles.tag}>{tagText}</Text>
            </View>
          )}

          <Text className={styles.productName}>{product.name}</Text>
          <Text className={styles.productDesc}>{product.description}</Text>

          <View className={styles.salesInfo}>
            <Text>已售{formatSales(product.sales)}</Text>
            <Text>库存{displayStock}{product.unit}</Text>
          </View>
        </View>

        {product.specs && product.specs.length > 0 && (
          <View className={styles.specSection}>
            <Text className={styles.sectionTitle}>规格选择</Text>
            <View className={styles.specList}>
              {product.specs.map(spec => {
                const specSoldOut = spec.stock <= 0;
                return (
                  <View
                    key={spec.id}
                    className={classnames(
                      styles.specItem,
                      selectedSpecId === spec.id && styles.active,
                      specSoldOut && styles.disabled
                    )}
                    onClick={() => {
                      if (!specSoldOut) {
                        setSelectedSpecId(spec.id);
                      }
                    }}
                  >
                    <Text>{spec.name}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        <View className={styles.detailSection}>
          <Text className={styles.sectionTitle}>商品详情</Text>
          <Image
            className={styles.detailImage}
            src={product.image}
            mode="aspectFill"
          />
          <Text className={styles.detailText}>
            {product.description}，精选优质好货，新鲜直达。
            产地直供，严格品控，为您和家人的健康保驾护航。
            冷链配送，锁鲜送达，保留食材原始风味。
          </Text>
        </View>
      </ScrollView>

      <View className={styles.footer}>
        <View className={styles.footerLeft}>
          <View className={styles.footerIconItem} onClick={handleGoHome}>
            <Text className={styles.footerIcon}>🏠</Text>
            <Text className={styles.footerIconLabel}>首页</Text>
          </View>
          <View className={styles.footerIconItem} onClick={handleGoCart}>
            <Text className={styles.footerIcon}>🛒</Text>
            <Text className={styles.footerIconLabel}>购物车</Text>
          </View>
        </View>
        <View className={styles.footerBtns}>
          <View
            className={classnames(
              styles.addCartBtn,
              isBuyBtnDisabled && styles.btnDisabled
            )}
            onClick={handleAddCart}
          >
            <Text className={styles.btnText}>
              {isSpecSelected && isSoldOut ? '已售罄' : '加入购物车'}
            </Text>
          </View>
          <View
            className={classnames(
              styles.buyNowBtn,
              isBuyBtnDisabled && styles.btnDisabled
            )}
            onClick={handleBuyNow}
          >
            {isBuying ? (
              <View className={styles.loadingWrapper}>
                <Text className={styles.loadingSpinner}></Text>
                <Text className={styles.btnText}>购买中...</Text>
              </View>
            ) : (
              <Text className={styles.btnText}>
                {isSpecSelected && isSoldOut ? '已售罄' : '立即购买'}
              </Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductDetailPage;
