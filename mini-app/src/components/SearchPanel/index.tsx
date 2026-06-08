import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, Input, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import { hotSearches, searchSuggestions } from '@/data/search';
import { getSearchHistory, addSearchHistory, clearSearchHistory, getHighlightSegments } from '@/utils/format';
import classnames from 'classnames';

export interface SearchPanelProps {
  visible: boolean;
  onClose: () => void;
  onSearch?: (keyword: string) => void;
}

const SearchPanel: React.FC<SearchPanelProps> = ({ visible, onClose, onSearch }) => {
  const [keyword, setKeyword] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (visible) {
      loadHistory();
      setTimeout(() => {
        inputRef.current?.focus?.();
      }, 300);
    } else {
      setKeyword('');
      setSuggestions([]);
    }
  }, [visible]);

  const loadHistory = () => {
    setHistory(getSearchHistory());
  };

  const handleInput = useCallback((e: any) => {
    const value = e.detail.value;
    setKeyword(value);
    
    if (value.trim()) {
      const filtered = searchSuggestions.filter(item => 
        item.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 10);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, []);

  const handleSearch = useCallback((searchKeyword: string) => {
    const kw = searchKeyword || keyword;
    if (!kw.trim()) return;
    
    addSearchHistory(kw);
    setHistory(getSearchHistory());
    
    if (onSearch) {
      onSearch(kw);
    } else {
      Taro.navigateTo({
        url: `/pages/search-result/index?keyword=${encodeURIComponent(kw)}`
      });
    }
    onClose();
  }, [keyword, onSearch, onClose]);

  const handleClearHistory = () => {
    Taro.showModal({
      title: '提示',
      content: '确定要清空搜索历史吗？',
      success: (res) => {
        if (res.confirm) {
          clearSearchHistory();
          setHistory([]);
        }
      }
    });
  };

  const handleClear = () => {
    setKeyword('');
    setSuggestions([]);
    inputRef.current?.focus?.();
  };

  if (!visible) return null;

  const showSuggestions = keyword.trim() && suggestions.length > 0;
  const showHistoryAndHot = !keyword.trim();

  return (
    <View className={styles.searchPanel}>
      <View className={styles.searchHeader}>
        <View className={styles.searchInputWrap}>
          <Text className={styles.searchIcon}>🔍</Text>
          <Input
            ref={inputRef}
            className={styles.searchInput}
            value={keyword}
            placeholder="搜索新鲜好货"
            placeholderClass="searchPlaceholder"
            confirmType="search"
            onInput={handleInput}
            onConfirm={() => handleSearch(keyword)}
          />
          {keyword && (
            <Text className={styles.searchIcon} onClick={handleClear}>✕</Text>
          )}
        </View>
        <Text className={styles.searchCancel} onClick={onClose}>取消</Text>
      </View>

      <ScrollView scrollY className={styles.searchContent}>
        {showSuggestions && (
          <View className={styles.suggestionList}>
            {suggestions.map((item, index) => (
              <View
                key={index}
                className={styles.suggestionItem}
                onClick={() => handleSearch(item)}
              >
                <Text className={styles.suggestionIcon}>🔍</Text>
                <Text className={styles.suggestionText}>
                  {getHighlightSegments(item, keyword).map((seg, i) => (
                    <Text
                      key={i}
                      className={seg.isHighlight ? styles.highlight : ''}
                    >
                      {seg.text}
                    </Text>
                  ))}
                </Text>
              </View>
            ))}
          </View>
        )}

        {showHistoryAndHot && (
          <>
            {history.length > 0 && (
              <View className={styles.section}>
                <View className={styles.sectionHeader}>
                  <Text className={styles.sectionTitle}>搜索历史</Text>
                  <Text className={styles.clearBtn} onClick={handleClearHistory}>清空</Text>
                </View>
                {history.map((item, index) => (
                  <View
                    key={index}
                    className={styles.historyItem}
                    onClick={() => handleSearch(item)}
                  >
                    <Text className={styles.historyIcon}>🕐</Text>
                    <Text className={styles.historyText}>{item}</Text>
                  </View>
                ))}
              </View>
            )}

            <View className={styles.section}>
              <View className={styles.sectionHeader}>
                <Text className={styles.sectionTitle}>热门搜索</Text>
              </View>
              <View className={styles.hotTags}>
                {hotSearches.map((item, index) => (
                  <View
                    key={index}
                    className={classnames(
                      styles.hotTag,
                      index < 3 && styles.hotTagHot
                    )}
                    onClick={() => handleSearch(item)}
                  >
                    {item}
                  </View>
                ))}
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default SearchPanel;
