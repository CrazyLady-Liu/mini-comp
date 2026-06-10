import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, Picker } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import { regionData, RegionOption } from '@/data/region';

interface RegionValue {
  province: string;
  city: string;
  district: string;
}

interface RegionPickerProps {
  value: RegionValue;
  onChange: (value: RegionValue) => void;
}

const RegionPicker: React.FC<RegionPickerProps> = ({ value, onChange }) => {
  const [locating, setLocating] = useState(false);

  const provinceIndex = useMemo(() => {
    const idx = regionData.findIndex(p => p.value === value.province);
    return idx >= 0 ? idx : 0;
  }, [value.province]);

  const cityList = useMemo(() => {
    return regionData[provinceIndex]?.children || [];
  }, [provinceIndex]);

  const cityIndex = useMemo(() => {
    const idx = cityList.findIndex(c => c.value === value.city);
    return idx >= 0 ? idx : 0;
  }, [value.city, cityList]);

  const districtList = useMemo(() => {
    return cityList[cityIndex]?.children || [];
  }, [cityList, cityIndex]);

  const districtIndex = useMemo(() => {
    const idx = districtList.findIndex(d => d.value === value.district);
    return idx >= 0 ? idx : 0;
  }, [value.district, districtList]);

  const handleProvinceChange = useCallback((e) => {
    const pIdx = e.detail.value;
    const province = regionData[pIdx];
    const firstCity = province?.children?.[0];
    const firstDistrict = firstCity?.children?.[0];
    onChange({
      province: province?.value || '',
      city: firstCity?.value || '',
      district: firstDistrict?.value || ''
    });
  }, [onChange]);

  const handleCityChange = useCallback((e) => {
    const cIdx = e.detail.value;
    const city = cityList[cIdx];
    const firstDistrict = city?.children?.[0];
    onChange({
      ...value,
      city: city?.value || '',
      district: firstDistrict?.value || ''
    });
  }, [cityList, value, onChange]);

  const handleDistrictChange = useCallback((e) => {
    const dIdx = e.detail.value;
    const district = districtList[dIdx];
    onChange({
      ...value,
      district: district?.value || ''
    });
  }, [districtList, value, onChange]);

  const findRegionMatch = useCallback((searchName: string, list: RegionOption[]): number => {
    const idx = list.findIndex(item => item.value === searchName || item.label === searchName);
    return idx >= 0 ? idx : -1;
  }, []);

  const handleLocation = useCallback(async () => {
    setLocating(true);
    try {
      const res = await Taro.getLocation({ type: 'gcj02' });
      const { latitude, longitude } = res;

      const reverseRes: any = await Taro.request({
        url: 'https://apis.map.qq.com/ws/geocoder/v1/',
        data: {
          location: `${latitude},${longitude}`,
          key: '',
          output: 'json'
        }
      });

      if (reverseRes?.data?.status === 0) {
        const addr = reverseRes.data.result.ad_info;
        const provinceName = addr.province || '';
        const cityName = addr.city || '';
        const districtName = addr.district || '';

        autoFillFromLocation(provinceName, cityName, districtName);
      } else {
        autoFillFromCoordinates(latitude, longitude);
      }
    } catch {
      autoFillFromCoordinates(0, 0);
    } finally {
      setLocating(false);
    }
  }, [onChange]);

  const autoFillFromLocation = useCallback((provinceName: string, cityName: string, districtName: string) => {
    const pIdx = findRegionMatch(provinceName, regionData);
    if (pIdx < 0) {
      Taro.showModal({
        title: '定位提示',
        content: '无法识别当前定位的城市信息，请手动选择地区',
        showCancel: false
      });
      return;
    }

    const cities = regionData[pIdx].children || [];
    const cIdx = findRegionMatch(cityName, cities);
    if (cIdx < 0) {
      onChange({
        province: regionData[pIdx].value,
        city: cities[0]?.value || '',
        district: cities[0]?.children?.[0]?.value || ''
      });
      return;
    }

    const districts = cities[cIdx].children || [];
    const dIdx = findRegionMatch(districtName, districts);
    onChange({
      province: regionData[pIdx].value,
      city: cities[cIdx].value,
      district: dIdx >= 0 ? districts[dIdx].value : (districts[0]?.value || '')
    });
  }, [findRegionMatch, onChange]);

  const autoFillFromCoordinates = useCallback((latitude: number, longitude: number) => {
    if (latitude && longitude) {
      Taro.showModal({
        title: '定位提示',
        content: '逆地理解析服务暂不可用，请手动选择地区',
        showCancel: false
      });
    } else {
      Taro.showModal({
        title: '定位提示',
        content: '无法获取当前位置，请检查定位权限或手动选择地区',
        showCancel: false
      });
    }
  }, []);

  const provinceRange = useMemo(() => regionData.map(p => p.label), []);
  const cityRange = useMemo(() => cityList.map(c => c.label), [cityList]);
  const districtRange = useMemo(() => districtList.map(d => d.label), [districtList]);

  return (
    <View className={styles.regionPicker}>
      <View className={styles.pickerRow}>
        <Picker mode="selector" range={provinceRange} value={provinceIndex} onChange={handleProvinceChange}>
          <View className={styles.pickerItem}>
            <Text className={`${styles.pickerText} ${!value.province ? styles.pickerPlaceholder : ''}`}>
              {value.province || '请选择省份'}
            </Text>
            <Text className={styles.pickerArrow}>▾</Text>
          </View>
        </Picker>

        <Picker mode="selector" range={cityRange} value={cityIndex} onChange={handleCityChange}>
          <View className={styles.pickerItem}>
            <Text className={`${styles.pickerText} ${!value.city ? styles.pickerPlaceholder : ''}`}>
              {value.city || '请选择城市'}
            </Text>
            <Text className={styles.pickerArrow}>▾</Text>
          </View>
        </Picker>

        <Picker mode="selector" range={districtRange} value={districtIndex} onChange={handleDistrictChange}>
          <View className={styles.pickerItem}>
            <Text className={`${styles.pickerText} ${!value.district ? styles.pickerPlaceholder : ''}`}>
              {value.district || '请选择区县'}
            </Text>
            <Text className={styles.pickerArrow}>▾</Text>
          </View>
        </Picker>
      </View>

      <View className={styles.locationBtn} onClick={handleLocation}>
        <Text className={styles.locationIcon}>📍</Text>
        <Text className={styles.locationText}>{locating ? '定位中...' : '获取当前位置'}</Text>
      </View>
    </View>
  );
};

export default RegionPicker;
