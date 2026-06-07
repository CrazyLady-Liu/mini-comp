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
  onBack?: () => void;
  rightContent?: React.ReactNode;
}

const NavBar: React.FC<NavBarProps> = ({
  title,
  showBack = true,
  backText = '',
  backgroundColor = '#ffffff',
  titleColor = '#1e293b',
  onBack,
  rightContent
}) => {
  const [statusBarHeight, setStatusBarHeight] = useState(20);
  const navBarHeight = 44;

  useEffect(() => {
    const systemInfo = Taro.getSystemInfoSync();
    if (systemInfo.statusBarHeight) {
      setStatusBarHeight(systemInfo.statusBarHeight);
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

  return (
    <View
      className={styles.navBar}
      style={{
        backgroundColor,
        paddingTop: `${statusBarHeight}px`,
        height: `${totalHeight}px`
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
              <Text className={styles.backIcon} style={{ color: titleColor }}>
                ‹
              </Text>
              {backText && (
                <Text className={styles.backText} style={{ color: titleColor }}>
                  {backText}
                </Text>
              )}
            </View>
          )}
        </View>

        <View className={styles.navBarTitle}>
          <Text className={styles.title} style={{ color: titleColor }}>
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
