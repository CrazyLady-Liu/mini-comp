import React from 'react';
import { View, Text, StatusBar } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';

interface NavBarProps {
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

  const statusBarHeight = Taro.getSystemInfoSync().statusBarHeight || 20;
  const navBarHeight = 44;
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
      <StatusBar />
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
              <Text className={styles.backIcon}>‹</Text>
              {backText && (
                <Text className={styles.backText}>
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
