import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import type { Product } from '@/types';
import { formatPrice, formatSales, getTagText, getHighlightSegments } from '@/utils/format';
import classnames from 'classnames';

export interface ProductCardProps {
  product: Product;
  layout?: 'vertical' | 'horizontal';
  onClick?: () => void;
  highlightKeyword?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, layout = 'vertical', onClick, highlightKeyword }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      Taro.navigateTo({
        url: `/pages/product-detail/index?id=${product.id}`
      });
    }
  };

  const tagText = getTagText(product.tag);

  const renderHighlightedText = (text: string) => {
    if (!highlightKeyword) return text;
    const segments = getHighlightSegments(text, highlightKeyword);
    return segments.map((seg, index) => (
      <Text
        key={index}
        className={seg.isHighlight ? styles.highlight : ''}
      >
        {seg.text}
      </Text>
    ));
  };

  return (
    <View
      className={classnames(styles.card, layout === 'horizontal' && styles.horizontal)}
      onClick={handleClick}
    >
      <View className={styles.imageWrap}>
        <Image
          className={styles.image}
          src={product.image}
          mode="aspectFill"
        />
        {product.tag && (
          <View className={classnames(styles.tag, styles[`tag-${product.tag}`])}>
            <Text className={styles.tagText}>{tagText}</Text>
          </View>
        )}
      </View>
      <View className={styles.info}>
        <Text className={styles.name}>{renderHighlightedText(product.name)}</Text>
        <Text className={styles.desc}>{renderHighlightedText(product.description || '')}</Text>
        <View className={styles.bottom}>
          <View className={styles.priceWrap}>
            <Text className={styles.priceSymbol}>¥</Text>
            <Text className={styles.price}>{formatPrice(product.price)}</Text>
            {product.originalPrice && (
              <Text className={styles.originalPrice}>¥{formatPrice(product.originalPrice)}</Text>
            )}
          </View>
          <Text className={styles.sales}>已售{formatSales(product.sales)}</Text>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;
