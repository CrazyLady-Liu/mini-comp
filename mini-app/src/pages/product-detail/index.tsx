import React, { useState, useEffect } from 'react';
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
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const id = router.params.id ? Number(router.params.id) : 1;
    const p = getProductById(id);
    if (p) {
      setProduct(p);
      if (p.specs && p.specs.length > 0) {
        setSelectedSpecId(p.specs[0].id);
      }
    }
    console.log('[ProductDetail] 商品ID:', id);
  }, [router.params.id]);

  const handleAddCart = () => {
    if (!product) return;
    console.log('[ProductDetail] 加入购物车:', product.id, quantity);
    dispatch({
      type: 'ADD_ITEM',
      payload: { product, quantity, specId: selectedSpecId || undefined }
    });
    Taro.showToast({ title: '已加入购物车', icon: 'success' });
  };

  const handleBuyNow = () => {
    if (!product) return;
    console.log('[ProductDetail] 立即购买:', product.id, quantity);
    dispatch({
      type: 'ADD_ITEM',
      payload: { product, quantity, specId: selectedSpecId || undefined }
    });
    Taro.navigateTo({
      url: '/pages/order-confirm/index'
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

  const selectedSpec = product.specs?.find(s => s.id === selectedSpecId);
  const displayPrice = selectedSpec ? selectedSpec.price : product.price;
  const tagText = getTagText(product.tag);

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
            <Text>库存{product.stock}{product.unit}</Text>
          </View>
        </View>

        {product.specs && product.specs.length > 0 && (
          <View className={styles.specSection}>
            <Text className={styles.sectionTitle}>规格选择</Text>
            <View className={styles.specList}>
              {product.specs.map(spec => (
                <View
                  key={spec.id}
                  className={classnames(
                    styles.specItem,
                    selectedSpecId === spec.id && styles.active
                  )}
                  onClick={() => setSelectedSpecId(spec.id)}
                >
                  <Text>{spec.name}</Text>
                </View>
              ))}
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
          <View className={styles.addCartBtn} onClick={handleAddCart}>
            <Text className={styles.btnText}>加入购物车</Text>
          </View>
          <View className={styles.buyNowBtn} onClick={handleBuyNow}>
            <Text className={styles.btnText}>立即购买</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductDetailPage;
