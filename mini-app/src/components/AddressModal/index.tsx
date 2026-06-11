import React, { useState, useEffect } from 'react';
import { View, Text, Input, ScrollView, Switch } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import { useAddress } from '@/store/AddressContext';
import RegionPicker from '@/components/RegionPicker';
import type { Address } from '@/types';

interface AddressModalProps {
  visible: boolean;
  onClose: () => void;
  editAddress?: Address | null;
}

const AddressModal: React.FC<AddressModalProps> = ({ visible, onClose, editAddress }) => {
  const { dispatch } = useAddress();
  const isEdit = !!editAddress;

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
      if (editAddress) {
        setForm({
          name: editAddress.name,
          phone: editAddress.phone,
          province: editAddress.province,
          city: editAddress.city,
          district: editAddress.district,
          detail: editAddress.detail,
          isDefault: editAddress.isDefault
        });
      } else {
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
    }
  }, [visible, editAddress]);

  const handleInputChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleRegionChange = (region: { province: string; city: string; district: string }) => {
    setForm(prev => ({
      ...prev,
      province: region.province,
      city: region.city,
      district: region.district
    }));
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
    if (!form.province) {
      Taro.showToast({ title: '请选择省份', icon: 'none' });
      return false;
    }
    if (!form.city) {
      Taro.showToast({ title: '请选择城市', icon: 'none' });
      return false;
    }
    if (!form.district) {
      Taro.showToast({ title: '请选择区/县', icon: 'none' });
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

    if (isEdit && editAddress) {
      dispatch({
        type: 'UPDATE_ADDRESS',
        payload: {
          id: editAddress.id,
          name: form.name.trim(),
          phone: form.phone.trim(),
          province: form.province,
          city: form.city,
          district: form.district,
          detail: form.detail.trim(),
          isDefault: form.isDefault
        }
      });
      Taro.showToast({ title: '地址修改成功', icon: 'success' });
    } else {
      dispatch({
        type: 'ADD_ADDRESS',
        payload: {
          name: form.name.trim(),
          phone: form.phone.trim(),
          province: form.province,
          city: form.city,
          district: form.district,
          detail: form.detail.trim(),
          isDefault: form.isDefault
        }
      });
      Taro.showToast({ title: '地址添加成功', icon: 'success' });
    }

    onClose();
  };

  if (!visible) return null;

  return (
    <View className={styles.mask} onClick={onClose}>
      <View className={styles.modal} onClick={e => e.stopPropagation()}>
        <View className={styles.header}>
          <Text className={styles.title}>{isEdit ? '编辑收货地址' : '新增收货地址'}</Text>
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
            <RegionPicker
              value={{ province: form.province, city: form.city, district: form.district }}
              onChange={handleRegionChange}
            />
          </View>

          <View className={styles.formItem}>
            <Text className={styles.label}>详细地址</Text>
            <Input
              className={styles.input}
              placeholder="街道、楼栋、门牌号等"
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
