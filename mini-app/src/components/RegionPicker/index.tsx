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

const findIndexByValue = (list: RegionOption[], val: string): number => {
  const idx = list.findIndex(item => item.value === val || item.label === val);
  return idx >= 0 ? idx : 0;
};

const RegionPicker: React.FC<RegionPickerProps> = ({ value, onChange }) => {
  const [locating, setLocating] = useState(false);

  const provinceIndex = useMemo(() => {
    return findIndexByValue(regionData, value.province);
  }, [value.province]);

  const cityList = useMemo(() => {
    return regionData[provinceIndex]?.children || [];
  }, [provinceIndex]);

  const cityIndex = useMemo(() => {
    return findIndexByValue(cityList, value.city);
  }, [value.city, cityList]);

  const districtList = useMemo(() => {
    return cityList[cityIndex]?.children || [];
  }, [cityList, cityIndex]);

  const districtIndex = useMemo(() => {
    return findIndexByValue(districtList, value.district);
  }, [value.district, districtList]);

  const range: any[][] = useMemo(() => {
    const provinces = regionData.map(p => p.label);
    const cities = cityList.map(c => c.label);
    const districts = districtList.map(d => d.label);
    return [provinces, cities, districts];
  }, [cityList, districtList]);

  const valueArr = useMemo(() => {
    return [provinceIndex, cityIndex, districtIndex];
  }, [provinceIndex, cityIndex, districtIndex]);

  const handleColumnChange = useCallback((e) => {
    const { column, value: newIndex } = e.detail;

    if (column === 0) {
      const province = regionData[newIndex];
      const firstCity = province?.children?.[0];
      const firstDistrict = firstCity?.children?.[0];
      onChange({
        province: province?.value || '',
        city: firstCity?.value || '',
        district: firstDistrict?.value || ''
      });
    } else if (column === 1) {
      const city = cityList[newIndex];
      const firstDistrict = city?.children?.[0];
      onChange({
        ...value,
        city: city?.value || '',
        district: firstDistrict?.value || ''
      });
    } else if (column === 2) {
      const district = districtList[newIndex];
      onChange({
        ...value,
        district: district?.value || ''
      });
    }
  }, [cityList, districtList, value, onChange]);

  const handleChange = useCallback((e) => {
    const [pIdx, cIdx, dIdx] = e.detail.value;
    const province = regionData[pIdx];
    const cities = province?.children || [];
    const city = cities[cIdx];
    const districts = city?.children || [];
    const district = districts[dIdx];
    onChange({
      province: province?.value || '',
      city: city?.value || '',
      district: district?.value || ''
    });
  }, [onChange]);

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

  return (
    <View className={styles.regionPicker}>
      <Picker
        mode="multiSelector"
        range={range}
        value={valueArr}
        onColumnChange={handleColumnChange}
        onChange={handleChange}
      >
        <View className={styles.pickerRow}>
          <View className={styles.pickerItem}>
            <Text className={`${styles.pickerText} ${!value.province ? styles.pickerPlaceholder : ''}`}>
              {value.province || '请选择省份'}
            </Text>
            <Text className={styles.pickerArrow}>▾</Text>
          </View>
          <View className={styles.pickerItem}>
            <Text className={`${styles.pickerText} ${!value.city ? styles.pickerPlaceholder : ''}`}>
              {value.city || '请选择城市'}
            </Text>
            <Text className={styles.pickerArrow}>▾</Text>
          </View>
          <View className={styles.pickerItem}>
            <Text className={`${styles.pickerText} ${!value.district ? styles.pickerPlaceholder : ''}`}>
              {value.district || '请选择区县'}
            </Text>
            <Text className={styles.pickerArrow}>▾</Text>
          </View>
        </View>
      </Picker>

      <View className={styles.locationBtn} onClick={handleLocation}>
        <Text className={styles.locationIcon}>📍</Text>
        <Text className={styles.locationText}>{locating ? '定位中...' : '获取当前位置'}</Text>
      </View>
    </View>
  );
};

export default RegionPicker;
