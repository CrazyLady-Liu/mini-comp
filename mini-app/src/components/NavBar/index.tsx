import React, { useState, useEffect } from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';

export interface NavBarProps {
  title: string;
  showBack?: boolean;
  backText?: string;
  backgroundColor?: string;
  titleColor?: string;
  backIconColor?: string;
  onBack?: () => void;
  rightContent?: React.ReactNode;
  fixed?: boolean;
  borderBottom?: boolean;
}

const NavBar: React.FC<NavBarProps> = ({
  title,
  showBack = true,
  backText = '',
  backgroundColor = '#ffffff',
  titleColor = '#1e293b',
  backIconColor,
  onBack,
  rightContent,
  fixed = false,
  borderBottom = false
}) => {
  const [statusBarHeight, setStatusBarHeight] = useState(20);
  const navBarHeight = 44;

  useEffect(() => {
    try {
      const systemInfo = Taro.getSystemInfoSync();
      if (systemInfo.statusBarHeight) {
        setStatusBarHeight(systemInfo.statusBarHeight);
      }
    } catch (e) {
      console.warn('[NavBar] 获取系统信息失败，使用默认值', e);
    }
  }, []);

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    const pages = Taro.getCurrentPages();
    if (pages.length > 1) {
      Taro.navigateBack();
    } else {
      Taro.showToast({
        title: '已经是第一页了',
        icon: 'none'
      });
    }
  };

  const totalHeight = statusBarHeight + navBarHeight;
  const iconColor = backIconColor || titleColor;

  return (
    <View
      className={styles.navBar}
      style={{
        backgroundColor,
        paddingTop: `${statusBarHeight}px`,
        height: `${totalHeight}px`,
        position: fixed ? 'fixed' : 'sticky',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        borderBottom: borderBottom ? '1rpx solid #f1f5f9' : 'none'
      }}
    >
      <View
        className={styles.navBarContent}
        style={{ height: `${navBarHeight}px` }}
      >
        <View className={styles.navBarLeft}>
          {showBack && (
            <View
              className={styles.backBtn}
              onClick={handleBack}
            >
              <Text
                className={styles.backIcon}
                style={{ color: iconColor }}
              >
                ‹
              </Text>
              {backText && (
                <Text
                  className={styles.backText}
                  style={{ color: iconColor }}
                >
                  {backText}
                </Text>
              )}
            </View>
          )}
        </View>

        <View className={styles.navBarTitle}>
          <Text
            className={styles.title}
            style={{ color: titleColor }}
            numberOfLines={1}
          >
            {title}
          </Text>
        </View>

        <View className={styles.navBarRight}>
          {rightContent}
        </View>
      </View>
    </View>
  );
};

export default NavBar;
