import React, { useState, useEffect } from 'react';
import { View, Text, Input, ScrollView, Switch } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import { useAddress } from '@/store/AddressContext';

interface AddressModalProps {
  visible: boolean;
  onClose: () => void;
}

const AddressModal: React.FC<AddressModalProps> = ({ visible, onClose }) => {
  const { dispatch } = useAddress();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    province: '',
    city: '',
    district: '',
    detail: '',
    isDefault: false
  });

  useEffect(() => {
    if (visible) {
      setForm({
        name: '',
        phone: '',
        province: '',
        city: '',
        district: '',
        detail: '',
        isDefault: false
      });
    }
  }, [visible]);

  const handleInputChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setForm(prev => ({ ...prev, isDefault: checked }));
  };

  const validateForm = (): boolean => {
    if (!form.name.trim()) {
      Taro.showToast({ title: '请输入收货人姓名', icon: 'none' });
      return false;
    }
    if (!form.phone.trim()) {
      Taro.showToast({ title: '请输入手机号码', icon: 'none' });
      return false;
    }
    if (!/^1[3-9]\d{9}$/.test(form.phone)) {
      Taro.showToast({ title: '请输入正确的手机号码', icon: 'none' });
      return false;
    }
    if (!form.province.trim()) {
      Taro.showToast({ title: '请输入省份', icon: 'none' });
      return false;
    }
    if (!form.city.trim()) {
      Taro.showToast({ title: '请输入城市', icon: 'none' });
      return false;
    }
    if (!form.district.trim()) {
      Taro.showToast({ title: '请输入区/县', icon: 'none' });
      return false;
    }
    if (!form.detail.trim()) {
      Taro.showToast({ title: '请输入详细地址', icon: 'none' });
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    dispatch({
      type: 'ADD_ADDRESS',
      payload: {
        name: form.name.trim(),
        phone: form.phone.trim(),
        province: form.province.trim(),
        city: form.city.trim(),
        district: form.district.trim(),
        detail: form.detail.trim(),
        isDefault: form.isDefault
      }
    });

    Taro.showToast({ title: '地址添加成功', icon: 'success' });
    onClose();
  };

  if (!visible) return null;

  return (
    <View className={styles.mask} onClick={onClose}>
      <View className={styles.modal} onClick={e => e.stopPropagation()}>
        <View className={styles.header}>
          <Text className={styles.title}>新增收货地址</Text>
          <View className={styles.closeBtn} onClick={onClose}>
            <Text className={styles.closeIcon}>×</Text>
          </View>
        </View>

        <ScrollView scrollY className={styles.formScroll}>
          <View className={styles.formItem}>
            <Text className={styles.label}>收货人</Text>
            <Input
              className={styles.input}
              placeholder="请输入收货人姓名"
              value={form.name}
              onInput={e => handleInputChange('name', e.detail.value)}
            />
          </View>

          <View className={styles.formItem}>
            <Text className={styles.label}>手机号码</Text>
            <Input
              className={styles.input}
              type="number"
              maxLength={11}
              placeholder="请输入手机号码"
              value={form.phone}
              onInput={e => handleInputChange('phone', e.detail.value)}
            />
          </View>

          <View className={styles.formItem}>
            <Text className={styles.label}>所在地区</Text>
            <View className={styles.regionRow}>
              <Input
                className={styles.regionInput}
                placeholder="省份"
                value={form.province}
                onInput={e => handleInputChange('province', e.detail.value)}
              />
              <Input
                className={styles.regionInput}
                placeholder="城市"
                value={form.city}
                onInput={e => handleInputChange('city', e.detail.value)}
              />
              <Input
                className={styles.regionInput}
                placeholder="区/县"
                value={form.district}
                onInput={e => handleInputChange('district', e.detail.value)}
              />
            </View>
          </View>

          <View className={styles.formItem}>
            <Text className={styles.label}>详细地址</Text>
            <Input
              className={styles.input}
              placeholder="街道、楼牌号等"
              value={form.detail}
              onInput={e => handleInputChange('detail', e.detail.value)}
            />
          </View>

          <View className={styles.formItemRow}>
            <Text className={styles.label}>设为默认地址</Text>
            <Switch
              checked={form.isDefault}
              color="#22c55e"
              onChange={e => handleSwitchChange(e.detail.value)}
            />
          </View>
        </ScrollView>

        <View className={styles.footer}>
          <View className={styles.cancelBtn} onClick={onClose}>
            <Text className={styles.cancelText}>取消</Text>
          </View>
          <View className={styles.submitBtn} onClick={handleSubmit}>
            <Text className={styles.submitText}>保存</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddressModal;
