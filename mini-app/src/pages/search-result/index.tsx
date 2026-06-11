import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, Input, ScrollView } from '@tarojs/components';
import Taro, { useDidShow, useReachBottom } from '@tarojs/taro';
import styles from './index.module.scss';
import ProductCard from '@/components/ProductCard';
import EmptyState from '@/components/EmptyState';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { addSearchHistory, getHighlightSegments } from '@/utils/format';
import type { Product } from '@/types';
import classnames from 'classnames';

const PAGE_SIZE = 10;

type SortType = 'default' | 'sales' | 'price-asc' | 'price-desc';

const SearchResultPage: React.FC = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [inputKeyword, setInputKeyword] = useState<string>('');
  const [sortType, setSortType] = useState<SortType>('default');
  const [categoryId, setCategoryId] = useState<number>(0);
  const [productList, setProductList] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [showCategoryFilter, setShowCategoryFilter] = useState<boolean>(false);

  const initKeyword = useCallback(() => {
    const params = Taro.getCurrentInstance().router?.params || {};
    const kw = decodeURIComponent(params.keyword || '');
    setKeyword(kw);
    setInputKeyword(kw);
    if (kw) {
      addSearchHistory(kw);
    }
  }, []);

  useEffect(() => {
    initKeyword();
  }, [initKeyword]);

  const searchProducts = useCallback((kw: string, sort: SortType, catId: number, pageNum: number, isRefresh: boolean) => {
    if (!kw.trim()) {
      setProductList([]);
      setHasMore(false);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      let result = products.filter(p => 
        p.name.toLowerCase().includes(kw.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(kw.toLowerCase()))
      );

      if (catId !== 0) {
        result = result.filter(p => p.categoryId === catId);
      }

      switch (sort) {
        case 'sales':
          result.sort((a, b) => b.sales - a.sales);
          break;
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        default:
          break;
      }

      const start = 0;
      const end = pageNum * PAGE_SIZE;
      const pageData = result.slice(start, end);

      if (isRefresh) {
        setProductList(pageData);
      } else {
        setProductList(prev => [...prev, ...pageData]);
      }

      setHasMore(end < result.length);
      setLoading(false);
    }, 300);
  }, []);

  useEffect(() => {
    if (keyword) {
      setPage(1);
      searchProducts(keyword, sortType, categoryId, 1, true);
    }
  }, [keyword, sortType, categoryId, searchProducts]);

  useReachBottom(() => {
    if (hasMore && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      searchProducts(keyword, sortType, categoryId, nextPage, false);
    }
  });

  const handleBack = () => {
    Taro.navigateBack();
  };

  const handleSearch = () => {
    if (!inputKeyword.trim()) return;
    setKeyword(inputKeyword);
    addSearchHistory(inputKeyword);
  };

  const handleSortChange = (type: SortType) => {
    if (type === sortType && type !== 'default') {
      if (type === 'price-asc') {
        setSortType('price-desc');
      } else if (type === 'price-desc') {
        setSortType('price-asc');
      }
    } else {
      setSortType(type);
    }
    setPage(1);
  };

  const handleCategoryChange = (id: number) => {
    setCategoryId(id);
    setPage(1);
  };

  const getSortArrow = (type: SortType, current: SortType) => {
    if (type !== current) return '↓';
    if (type === 'price-asc') return '↑';
    if (type === 'price-desc') return '↓';
    return '↓';
  };

  const availableCategories = categories.filter(cat => 
    cat.id === 0 || products.some(p => 
      p.categoryId === cat.id && 
      (p.name.toLowerCase().includes(keyword.toLowerCase()) ||
       (p.description && p.description.toLowerCase().includes(keyword.toLowerCase())))
    )
  );

  return (
    <View className={styles.container}>
      <View className={styles.searchHeader}>
        <Text className={styles.backBtn} onClick={handleBack}>←</Text>
        <View className={styles.searchInputWrap}>
          <Text className={styles.searchIcon}>🔍</Text>
          <Input
            className={styles.searchInput}
            value={inputKeyword}
            placeholder="搜索新鲜好货"
            placeholderClass="searchPlaceholder"
            confirmType="search"
            onInput={(e) => setInputKeyword(e.detail.value)}
            onConfirm={handleSearch}
          />
        </View>
      </View>

      <ScrollView
        scrollX
        className={styles.categoryScroll}
      >
        <View
          className={classnames(styles.categoryTag, categoryId === 0 && styles.active)}
          onClick={() => handleCategoryChange(0)}
        >
          全部
        </View>
        {availableCategories.filter(c => c.id !== 0).map(cat => (
          <View
            key={cat.id}
            className={classnames(styles.categoryTag, categoryId === cat.id && styles.active)}
            onClick={() => handleCategoryChange(cat.id)}
          >
            {cat.name}
          </View>
        ))}
      </ScrollView>

      <View className={styles.filterBar}>
        <View
          className={classnames(styles.filterItem, sortType === 'default' && styles.active)}
          onClick={() => handleSortChange('default')}
        >
          综合
        </View>
        <View
          className={classnames(styles.filterItem, sortType === 'sales' && styles.active)}
          onClick={() => handleSortChange('sales')}
        >
          销量
        </View>
        <View
          className={classnames(styles.filterItem, (sortType === 'price-asc' || sortType === 'price-desc') && styles.active)}
          onClick={() => handleSortChange('price-asc')}
        >
          价格
          <Text className={styles.filterArrow}>
            {sortType === 'price-asc' ? '↑' : sortType === 'price-desc' ? '↓' : '↓'}
          </Text>
        </View>
      </View>

      {productList.length > 0 ? (
        <ScrollView scrollY className={styles.productList}>
          {productList.map(product => (
            <View key={product.id} className={styles.productItem}>
              <ProductCard product={product} layout="horizontal" highlightKeyword={keyword} />
            </View>
          ))}
          {loading && (
            <View className={styles.loading}>
              <Text>加载中...</Text>
            </View>
          )}
          {!loading && !hasMore && productList.length > 0 && (
            <View className={styles.loadMore}>
              <Text>— 没有更多了 —</Text>
            </View>
          )}
        </ScrollView>
      ) : (
        <View className={styles.emptyWrap}>
          {loading ? (
            <EmptyState icon="🔍" title="搜索中..." description="正在为您寻找商品" />
          ) : (
            <EmptyState icon="🔍" title="暂无相关商品" description="换个关键词试试吧" />
          )}
        </View>
      )}
    </View>
  );
};

export default SearchResultPage;
