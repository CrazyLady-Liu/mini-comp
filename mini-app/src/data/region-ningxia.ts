import { RegionOption } from './region';

export const ningxiaData: RegionOption = {
  label: '宁夏回族自治区', value: '宁夏回族自治区', children: [
    { label: '银川市', value: '银川市', children: [
      { label: '兴庆区', value: '兴庆区' },
      { label: '西夏区', value: '西夏区' },
      { label: '金凤区', value: '金凤区' },
      { label: '永宁县', value: '永宁县' },
      { label: '贺兰县', value: '贺兰县' },
      { label: '灵武市', value: '灵武市' }
    ]},
    { label: '石嘴山市', value: '石嘴山市', children: [
      { label: '大武口区', value: '大武口区' },
      { label: '惠农区', value: '惠农区' },
      { label: '平罗县', value: '平罗县' }
    ]},
    { label: '吴忠市', value: '吴忠市', children: [
      { label: '利通区', value: '利通区' },
      { label: '红寺堡区', value: '红寺堡区' },
      { label: '盐池县', value: '盐池县' },
      { label: '同心县', value: '同心县' },
      { label: '青铜峡市', value: '青铜峡市' }
    ]},
    { label: '固原市', value: '固原市', children: [
      { label: '原州区', value: '原州区' },
      { label: '西吉县', value: '西吉县' },
      { label: '隆德县', value: '隆德县' },
      { label: '泾源县', value: '泾源县' },
      { label: '彭阳县', value: '彭阳县' }
    ]},
    { label: '中卫市', value: '中卫市', children: [
      { label: '沙坡头区', value: '沙坡头区' },
      { label: '中宁县', value: '中宁县' },
      { label: '海原县', value: '海原县' }
    ]}
  ]
};
