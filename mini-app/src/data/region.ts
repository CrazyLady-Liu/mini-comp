import { supplementRegionData } from './region-supplement';
import { extraRegionData } from './region-extra';

export interface RegionOption {
  label: string;
  value: string;
  children?: RegionOption[];
}

const baseRegionData: RegionOption[] = [
  {
    label: '北京市', value: '北京市', children: [
      { label: '北京市', value: '北京市', children: [
        { label: '东城区', value: '东城区' },
        { label: '西城区', value: '西城区' },
        { label: '朝阳区', value: '朝阳区' },
        { label: '丰台区', value: '丰台区' },
        { label: '石景山区', value: '石景山区' },
        { label: '海淀区', value: '海淀区' },
        { label: '门头沟区', value: '门头沟区' },
        { label: '房山区', value: '房山区' },
        { label: '通州区', value: '通州区' },
        { label: '顺义区', value: '顺义区' },
        { label: '昌平区', value: '昌平区' },
        { label: '大兴区', value: '大兴区' },
        { label: '怀柔区', value: '怀柔区' },
        { label: '平谷区', value: '平谷区' },
        { label: '密云区', value: '密云区' },
        { label: '延庆区', value: '延庆区' }
      ]}
    ]
  },
  {
    label: '天津市', value: '天津市', children: [
      { label: '天津市', value: '天津市', children: [
        { label: '和平区', value: '和平区' },
        { label: '河东区', value: '河东区' },
        { label: '河西区', value: '河西区' },
        { label: '南开区', value: '南开区' },
        { label: '河北区', value: '河北区' },
        { label: '红桥区', value: '红桥区' },
        { label: '东丽区', value: '东丽区' },
        { label: '西青区', value: '西青区' },
        { label: '津南区', value: '津南区' },
        { label: '北辰区', value: '北辰区' },
        { label: '武清区', value: '武清区' },
        { label: '宝坻区', value: '宝坻区' },
        { label: '滨海新区', value: '滨海新区' },
        { label: '宁河区', value: '宁河区' },
        { label: '静海区', value: '静海区' },
        { label: '蓟州区', value: '蓟州区' }
      ]}
    ]
  },
  {
    label: '上海市', value: '上海市', children: [
      { label: '上海市', value: '上海市', children: [
        { label: '黄浦区', value: '黄浦区' },
        { label: '徐汇区', value: '徐汇区' },
        { label: '长宁区', value: '长宁区' },
        { label: '静安区', value: '静安区' },
        { label: '普陀区', value: '普陀区' },
        { label: '虹口区', value: '虹口区' },
        { label: '杨浦区', value: '杨浦区' },
        { label: '闵行区', value: '闵行区' },
        { label: '宝山区', value: '宝山区' },
        { label: '嘉定区', value: '嘉定区' },
        { label: '浦东新区', value: '浦东新区' },
        { label: '金山区', value: '金山区' },
        { label: '松江区', value: '松江区' },
        { label: '青浦区', value: '青浦区' },
        { label: '奉贤区', value: '奉贤区' },
        { label: '崇明区', value: '崇明区' }
      ]}
    ]
  },
  {
    label: '重庆市', value: '重庆市', children: [
      { label: '重庆市', value: '重庆市', children: [
        { label: '万州区', value: '万州区' },
        { label: '涪陵区', value: '涪陵区' },
        { label: '渝中区', value: '渝中区' },
        { label: '大渡口区', value: '大渡口区' },
        { label: '江北区', value: '江北区' },
        { label: '沙坪坝区', value: '沙坪坝区' },
        { label: '九龙坡区', value: '九龙坡区' },
        { label: '南岸区', value: '南岸区' },
        { label: '北碚区', value: '北碚区' },
        { label: '渝北区', value: '渝北区' },
        { label: '巴南区', value: '巴南区' },
        { label: '黔江区', value: '黔江区' },
        { label: '长寿区', value: '长寿区' },
        { label: '江津区', value: '江津区' },
        { label: '合川区', value: '合川区' },
        { label: '永川区', value: '永川区' },
        { label: '南川区', value: '南川区' },
        { label: '璧山区', value: '璧山区' },
        { label: '铜梁区', value: '铜梁区' },
        { label: '潼南区', value: '潼南区' },
        { label: '荣昌区', value: '荣昌区' },
        { label: '开州区', value: '开州区' },
        { label: '梁平区', value: '梁平区' },
        { label: '武隆区', value: '武隆区' }
      ]}
    ]
  },
  {
    label: '河北省', value: '河北省', children: [
      { label: '石家庄市', value: '石家庄市', children: [
        { label: '长安区', value: '长安区' },
        { label: '桥西区', value: '桥西区' },
        { label: '新华区', value: '新华区' },
        { label: '井陉矿区', value: '井陉矿区' },
        { label: '裕华区', value: '裕华区' },
        { label: '藁城区', value: '藁城区' },
        { label: '鹿泉区', value: '鹿泉区' },
        { label: '栾城区', value: '栾城区' },
        { label: '井陉县', value: '井陉县' },
        { label: '正定县', value: '正定县' },
        { label: '行唐县', value: '行唐县' },
        { label: '灵寿县', value: '灵寿县' },
        { label: '高邑县', value: '高邑县' },
        { label: '深泽县', value: '深泽县' },
        { label: '赞皇县', value: '赞皇县' },
        { label: '无极县', value: '无极县' },
        { label: '平山县', value: '平山县' },
        { label: '元氏县', value: '元氏县' },
        { label: '赵县', value: '赵县' },
        { label: '辛集市', value: '辛集市' },
        { label: '晋州市', value: '晋州市' },
        { label: '新乐市', value: '新乐市' }
      ]},
      { label: '唐山市', value: '唐山市', children: [
        { label: '路南区', value: '路南区' },
        { label: '路北区', value: '路北区' },
        { label: '古冶区', value: '古冶区' },
        { label: '开平区', value: '开平区' },
        { label: '丰南区', value: '丰南区' },
        { label: '丰润区', value: '丰润区' },
        { label: '曹妃甸区', value: '曹妃甸区' },
        { label: '滦南县', value: '滦南县' },
        { label: '乐亭县', value: '乐亭县' },
        { label: '迁西县', value: '迁西县' },
        { label: '玉田县', value: '玉田县' },
        { label: '遵化市', value: '遵化市' },
        { label: '迁安市', value: '迁安市' },
        { label: '滦州市', value: '滦州市' }
      ]},
      { label: '秦皇岛市', value: '秦皇岛市', children: [
        { label: '海港区', value: '海港区' },
        { label: '山海关区', value: '山海关区' },
        { label: '北戴河区', value: '北戴河区' },
        { label: '抚宁区', value: '抚宁区' },
        { label: '青龙满族自治县', value: '青龙满族自治县' },
        { label: '昌黎县', value: '昌黎县' },
        { label: '卢龙县', value: '卢龙县' }
      ]},
      { label: '邯郸市', value: '邯郸市', children: [
        { label: '邯山区', value: '邯山区' },
        { label: '丛台区', value: '丛台区' },
        { label: '复兴区', value: '复兴区' },
        { label: '峰峰矿区', value: '峰峰矿区' },
        { label: '肥乡区', value: '肥乡区' },
        { label: '永年区', value: '永年区' },
        { label: '临漳县', value: '临漳县' },
        { label: '成安县', value: '成安县' },
        { label: '大名县', value: '大名县' },
        { label: '涉县', value: '涉县' },
        { label: '磁县', value: '磁县' },
        { label: '邱县', value: '邱县' },
        { label: '鸡泽县', value: '鸡泽县' },
        { label: '广平县', value: '广平县' },
        { label: '馆陶县', value: '馆陶县' },
        { label: '魏县', value: '魏县' },
        { label: '曲周县', value: '曲周县' },
        { label: '武安市', value: '武安市' }
      ]},
      { label: '邢台市', value: '邢台市', children: [
        { label: '襄都区', value: '襄都区' },
        { label: '信都区', value: '信都区' },
        { label: '任泽区', value: '任泽区' },
        { label: '南和区', value: '南和区' },
        { label: '临城县', value: '临城县' },
        { label: '内丘县', value: '内丘县' },
        { label: '柏乡县', value: '柏乡县' },
        { label: '隆尧县', value: '隆尧县' },
        { label: '宁晋县', value: '宁晋县' },
        { label: '巨鹿县', value: '巨鹿县' },
        { label: '新河县', value: '新河县' },
        { label: '广宗县', value: '广宗县' },
        { label: '平乡县', value: '平乡县' },
        { label: '威县', value: '威县' },
        { label: '清河县', value: '清河县' },
        { label: '临西县', value: '临西县' },
        { label: '南宫市', value: '南宫市' },
        { label: '沙河市', value: '沙河市' }
      ]},
      { label: '保定市', value: '保定市', children: [
        { label: '竞秀区', value: '竞秀区' },
        { label: '莲池区', value: '莲池区' },
        { label: '满城区', value: '满城区' },
        { label: '清苑区', value: '清苑区' },
        { label: '徐水区', value: '徐水区' },
        { label: '涞水县', value: '涞水县' },
        { label: '阜平县', value: '阜平县' },
        { label: '定兴县', value: '定兴县' },
        { label: '唐县', value: '唐县' },
        { label: '高阳县', value: '高阳县' },
        { label: '容城县', value: '容城县' },
        { label: '涞源县', value: '涞源县' },
        { label: '望都县', value: '望都县' },
        { label: '安新县', value: '安新县' },
        { label: '易县', value: '易县' },
        { label: '曲阳县', value: '曲阳县' },
        { label: '蠡县', value: '蠡县' },
        { label: '顺平县', value: '顺平县' },
        { label: '博野县', value: '博野县' },
        { label: '雄县', value: '雄县' },
        { label: '涿州市', value: '涿州市' },
        { label: '定州市', value: '定州市' },
        { label: '安国市', value: '安国市' },
        { label: '高碑店市', value: '高碑店市' }
      ]},
      { label: '张家口市', value: '张家口市', children: [
        { label: '桥东区', value: '桥东区' },
        { label: '桥西区', value: '桥西区' },
        { label: '宣化区', value: '宣化区' },
        { label: '下花园区', value: '下花园区' },
        { label: '万全区', value: '万全区' },
        { label: '崇礼区', value: '崇礼区' },
        { label: '张北县', value: '张北县' },
        { label: '康保县', value: '康保县' },
        { label: '沽源县', value: '沽源县' },
        { label: '尚义县', value: '尚义县' },
        { label: '蔚县', value: '蔚县' },
        { label: '阳原县', value: '阳原县' },
        { label: '怀安县', value: '怀安县' },
        { label: '怀来县', value: '怀来县' },
        { label: '涿鹿县', value: '涿鹿县' },
        { label: '赤城县', value: '赤城县' }
      ]},
      { label: '承德市', value: '承德市', children: [
        { label: '双桥区', value: '双桥区' },
        { label: '双滦区', value: '双滦区' },
        { label: '鹰手营子矿区', value: '鹰手营子矿区' },
        { label: '承德县', value: '承德县' },
        { label: '兴隆县', value: '兴隆县' },
        { label: '滦平县', value: '滦平县' },
        { label: '隆化县', value: '隆化县' },
        { label: '丰宁满族自治县', value: '丰宁满族自治县' },
        { label: '宽城满族自治县', value: '宽城满族自治县' },
        { label: '围场满族蒙古族自治县', value: '围场满族蒙古族自治县' },
        { label: '平泉市', value: '平泉市' }
      ]},
      { label: '沧州市', value: '沧州市', children: [
        { label: '新华区', value: '新华区' },
        { label: '运河区', value: '运河区' },
        { label: '沧县', value: '沧县' },
        { label: '青县', value: '青县' },
        { label: '东光县', value: '东光县' },
        { label: '海兴县', value: '海兴县' },
        { label: '盐山县', value: '盐山县' },
        { label: '肃宁县', value: '肃宁县' },
        { label: '南皮县', value: '南皮县' },
        { label: '吴桥县', value: '吴桥县' },
        { label: '献县', value: '献县' },
        { label: '孟村回族自治县', value: '孟村回族自治县' },
        { label: '泊头市', value: '泊头市' },
        { label: '任丘市', value: '任丘市' },
        { label: '黄骅市', value: '黄骅市' },
        { label: '河间市', value: '河间市' }
      ]},
      { label: '廊坊市', value: '廊坊市', children: [
        { label: '安次区', value: '安次区' },
        { label: '广阳区', value: '广阳区' },
        { label: '固安县', value: '固安县' },
        { label: '永清县', value: '永清县' },
        { label: '香河县', value: '香河县' },
        { label: '大城县', value: '大城县' },
        { label: '文安县', value: '文安县' },
        { label: '大厂回族自治县', value: '大厂回族自治县' },
        { label: '霸州市', value: '霸州市' },
        { label: '三河市', value: '三河市' }
      ]},
      { label: '衡水市', value: '衡水市', children: [
        { label: '桃城区', value: '桃城区' },
        { label: '冀州区', value: '冀州区' },
        { label: '枣强县', value: '枣强县' },
        { label: '武邑县', value: '武邑县' },
        { label: '武强县', value: '武强县' },
        { label: '饶阳县', value: '饶阳县' },
        { label: '安平县', value: '安平县' },
        { label: '故城县', value: '故城县' },
        { label: '景县', value: '景县' },
        { label: '阜城县', value: '阜城县' },
        { label: '深州市', value: '深州市' }
      ]}
    ]
  },
  {
    label: '山西省', value: '山西省', children: [
      { label: '太原市', value: '太原市', children: [
        { label: '小店区', value: '小店区' },
        { label: '迎泽区', value: '迎泽区' },
        { label: '杏花岭区', value: '杏花岭区' },
        { label: '尖草坪区', value: '尖草坪区' },
        { label: '万柏林区', value: '万柏林区' },
        { label: '晋源区', value: '晋源区' },
        { label: '清徐县', value: '清徐县' },
        { label: '阳曲县', value: '阳曲县' },
        { label: '娄烦县', value: '娄烦县' },
        { label: '古交市', value: '古交市' }
      ]},
      { label: '大同市', value: '大同市', children: [
        { label: '新荣区', value: '新荣区' },
        { label: '平城区', value: '平城区' },
        { label: '云冈区', value: '云冈区' },
        { label: '云州区', value: '云州区' },
        { label: '阳高县', value: '阳高县' },
        { label: '天镇县', value: '天镇县' },
        { label: '广灵县', value: '广灵县' },
        { label: '灵丘县', value: '灵丘县' },
        { label: '浑源县', value: '浑源县' },
        { label: '左云县', value: '左云县' }
      ]},
      { label: '阳泉市', value: '阳泉市', children: [
        { label: '城区', value: '城区' },
        { label: '矿区', value: '矿区' },
        { label: '郊区', value: '郊区' },
        { label: '平定县', value: '平定县' },
        { label: '盂县', value: '盂县' }
      ]},
      { label: '长治市', value: '长治市', children: [
        { label: '潞州区', value: '潞州区' },
        { label: '上党区', value: '上党区' },
        { label: '屯留区', value: '屯留区' },
        { label: '潞城区', value: '潞城区' },
        { label: '襄垣县', value: '襄垣县' },
        { label: '平顺县', value: '平顺县' },
        { label: '黎城县', value: '黎城县' },
        { label: '壶关县', value: '壶关县' },
        { label: '长子县', value: '长子县' },
        { label: '武乡县', value: '武乡县' },
        { label: '沁县', value: '沁县' },
        { label: '沁源县', value: '沁源县' }
      ]},
      { label: '晋城市', value: '晋城市', children: [
        { label: '城区', value: '城区' },
        { label: '沁水县', value: '沁水县' },
        { label: '阳城县', value: '阳城县' },
        { label: '陵川县', value: '陵川县' },
        { label: '泽州县', value: '泽州县' },
        { label: '高平市', value: '高平市' }
      ]},
      { label: '朔州市', value: '朔州市', children: [
        { label: '朔城区', value: '朔城区' },
        { label: '平鲁区', value: '平鲁区' },
        { label: '山阴县', value: '山阴县' },
        { label: '应县', value: '应县' },
        { label: '右玉县', value: '右玉县' },
        { label: '怀仁市', value: '怀仁市' }
      ]},
      { label: '晋中市', value: '晋中市', children: [
        { label: '榆次区', value: '榆次区' },
        { label: '太谷区', value: '太谷区' },
        { label: '榆社县', value: '榆社县' },
        { label: '左权县', value: '左权县' },
        { label: '和顺县', value: '和顺县' },
        { label: '昔阳县', value: '昔阳县' },
        { label: '寿阳县', value: '寿阳县' },
        { label: '祁县', value: '祁县' },
        { label: '平遥县', value: '平遥县' },
        { label: '灵石县', value: '灵石县' },
        { label: '介休市', value: '介休市' }
      ]},
      { label: '运城市', value: '运城市', children: [
        { label: '盐湖区', value: '盐湖区' },
        { label: '临猗县', value: '临猗县' },
        { label: '万荣县', value: '万荣县' },
        { label: '闻喜县', value: '闻喜县' },
        { label: '稷山县', value: '稷山县' },
        { label: '新绛县', value: '新绛县' },
        { label: '绛县', value: '绛县' },
        { label: '垣曲县', value: '垣曲县' },
        { label: '夏县', value: '夏县' },
        { label: '平陆县', value: '平陆县' },
        { label: '芮城县', value: '芮城县' },
        { label: '永济市', value: '永济市' },
        { label: '河津市', value: '河津市' }
      ]},
      { label: '忻州市', value: '忻州市', children: [
        { label: '忻府区', value: '忻府区' },
        { label: '定襄县', value: '定襄县' },
        { label: '五台县', value: '五台县' },
        { label: '代县', value: '代县' },
        { label: '繁峙县', value: '繁峙县' },
        { label: '宁武县', value: '宁武县' },
        { label: '静乐县', value: '静乐县' },
        { label: '神池县', value: '神池县' },
        { label: '五寨县', value: '五寨县' },
        { label: '岢岚县', value: '岢岚县' },
        { label: '河曲县', value: '河曲县' },
        { label: '保德县', value: '保德县' },
        { label: '偏关县', value: '偏关县' },
        { label: '原平市', value: '原平市' }
      ]},
      { label: '临汾市', value: '临汾市', children: [
        { label: '尧都区', value: '尧都区' },
        { label: '曲沃县', value: '曲沃县' },
        { label: '翼城县', value: '翼城县' },
        { label: '襄汾县', value: '襄汾县' },
        { label: '洪洞县', value: '洪洞县' },
        { label: '古县', value: '古县' },
        { label: '安泽县', value: '安泽县' },
        { label: '浮山县', value: '浮山县' },
        { label: '吉县', value: '吉县' },
        { label: '乡宁县', value: '乡宁县' },
        { label: '大宁县', value: '大宁县' },
        { label: '隰县', value: '隰县' },
        { label: '永和县', value: '永和县' },
        { label: '蒲县', value: '蒲县' },
        { label: '汾西县', value: '汾西县' },
        { label: '侯马市', value: '侯马市' },
        { label: '霍州市', value: '霍州市' }
      ]},
      { label: '吕梁市', value: '吕梁市', children: [
        { label: '离石区', value: '离石区' },
        { label: '文水县', value: '文水县' },
        { label: '交城县', value: '交城县' },
        { label: '兴县', value: '兴县' },
        { label: '临县', value: '临县' },
        { label: '柳林县', value: '柳林县' },
        { label: '石楼县', value: '石楼县' },
        { label: '岚县', value: '岚县' },
        { label: '方山县', value: '方山县' },
        { label: '中阳县', value: '中阳县' },
        { label: '交口县', value: '交口县' },
        { label: '孝义市', value: '孝义市' },
        { label: '汾阳市', value: '汾阳市' }
      ]}
    ]
  },
  {
    label: '辽宁省', value: '辽宁省', children: [
      { label: '沈阳市', value: '沈阳市', children: [
        { label: '和平区', value: '和平区' },
        { label: '沈河区', value: '沈河区' },
        { label: '大东区', value: '大东区' },
        { label: '皇姑区', value: '皇姑区' },
        { label: '铁西区', value: '铁西区' },
        { label: '苏家屯区', value: '苏家屯区' },
        { label: '浑南区', value: '浑南区' },
        { label: '沈北新区', value: '沈北新区' },
        { label: '于洪区', value: '于洪区' },
        { label: '辽中区', value: '辽中区' },
        { label: '康平县', value: '康平县' },
        { label: '法库县', value: '法库县' },
        { label: '新民市', value: '新民市' }
      ]},
      { label: '大连市', value: '大连市', children: [
        { label: '中山区', value: '中山区' },
        { label: '西岗区', value: '西岗区' },
        { label: '沙河口区', value: '沙河口区' },
        { label: '甘井子区', value: '甘井子区' },
        { label: '旅顺口区', value: '旅顺口区' },
        { label: '金州区', value: '金州区' },
        { label: '普兰店区', value: '普兰店区' },
        { label: '长海县', value: '长海县' },
        { label: '瓦房店市', value: '瓦房店市' },
        { label: '庄河市', value: '庄河市' }
      ]},
      { label: '鞍山市', value: '鞍山市', children: [
        { label: '铁东区', value: '铁东区' },
        { label: '铁西区', value: '铁西区' },
        { label: '立山区', value: '立山区' },
        { label: '千山区', value: '千山区' },
        { label: '台安县', value: '台安县' },
        { label: '岫岩满族自治县', value: '岫岩满族自治县' },
        { label: '海城市', value: '海城市' }
      ]},
      { label: '抚顺市', value: '抚顺市', children: [
        { label: '新抚区', value: '新抚区' },
        { label: '东洲区', value: '东洲区' },
        { label: '望花区', value: '望花区' },
        { label: '顺城区', value: '顺城区' },
        { label: '抚顺县', value: '抚顺县' },
        { label: '新宾满族自治县', value: '新宾满族自治县' },
        { label: '清原满族自治县', value: '清原满族自治县' }
      ]},
      { label: '本溪市', value: '本溪市', children: [
        { label: '平山区', value: '平山区' },
        { label: '溪湖区', value: '溪湖区' },
        { label: '明山区', value: '明山区' },
        { label: '南芬区', value: '南芬区' },
        { label: '本溪满族自治县', value: '本溪满族自治县' },
        { label: '桓仁满族自治县', value: '桓仁满族自治县' }
      ]},
      { label: '丹东市', value: '丹东市', children: [
        { label: '元宝区', value: '元宝区' },
        { label: '振兴区', value: '振兴区' },
        { label: '振安区', value: '振安区' },
        { label: '宽甸满族自治县', value: '宽甸满族自治县' },
        { label: '东港市', value: '东港市' },
        { label: '凤城市', value: '凤城市' }
      ]},
      { label: '锦州市', value: '锦州市', children: [
        { label: '古塔区', value: '古塔区' },
        { label: '凌河区', value: '凌河区' },
        { label: '太和区', value: '太和区' },
        { label: '黑山县', value: '黑山县' },
        { label: '义县', value: '义县' },
        { label: '凌海市', value: '凌海市' },
        { label: '北镇市', value: '北镇市' }
      ]},
      { label: '营口市', value: '营口市', children: [
        { label: '站前区', value: '站前区' },
        { label: '西市区', value: '西市区' },
        { label: '鲅鱼圈区', value: '鲅鱼圈区' },
        { label: '老边区', value: '老边区' },
        { label: '盖州市', value: '盖州市' },
        { label: '大石桥市', value: '大石桥市' }
      ]},
      { label: '阜新市', value: '阜新市', children: [
        { label: '海州区', value: '海州区' },
        { label: '新邱区', value: '新邱区' },
        { label: '太平区', value: '太平区' },
        { label: '清河门区', value: '清河门区' },
        { label: '细河区', value: '细河区' },
        { label: '阜新蒙古族自治县', value: '阜新蒙古族自治县' },
        { label: '彰武县', value: '彰武县' }
      ]},
      { label: '辽阳市', value: '辽阳市', children: [
        { label: '白塔区', value: '白塔区' },
        { label: '文圣区', value: '文圣区' },
        { label: '宏伟区', value: '宏伟区' },
        { label: '弓长岭区', value: '弓长岭区' },
        { label: '太子河区', value: '太子河区' },
        { label: '辽阳县', value: '辽阳县' },
        { label: '灯塔市', value: '灯塔市' }
      ]},
      { label: '盘锦市', value: '盘锦市', children: [
        { label: '双台子区', value: '双台子区' },
        { label: '兴隆台区', value: '兴隆台区' },
        { label: '大洼区', value: '大洼区' },
        { label: '盘山县', value: '盘山县' }
      ]},
      { label: '铁岭市', value: '铁岭市', children: [
        { label: '银州区', value: '银州区' },
        { label: '清河区', value: '清河区' },
        { label: '铁岭县', value: '铁岭县' },
        { label: '西丰县', value: '西丰县' },
        { label: '昌图县', value: '昌图县' },
        { label: '调兵山市', value: '调兵山市' },
        { label: '开原市', value: '开原市' }
      ]},
      { label: '朝阳市', value: '朝阳市', children: [
        { label: '双塔区', value: '双塔区' },
        { label: '龙城区', value: '龙城区' },
        { label: '朝阳县', value: '朝阳县' },
        { label: '建平县', value: '建平县' },
        { label: '喀喇沁左翼蒙古族自治县', value: '喀喇沁左翼蒙古族自治县' },
        { label: '北票市', value: '北票市' },
        { label: '凌源市', value: '凌源市' }
      ]},
      { label: '葫芦岛市', value: '葫芦岛市', children: [
        { label: '连山区', value: '连山区' },
        { label: '龙港区', value: '龙港区' },
        { label: '南票区', value: '南票区' },
        { label: '绥中县', value: '绥中县' },
        { label: '建昌县', value: '建昌县' },
        { label: '兴城市', value: '兴城市' }
      ]}
    ]
  },
  {
    label: '吉林省', value: '吉林省', children: [
      { label: '长春市', value: '长春市', children: [
        { label: '南关区', value: '南关区' },
        { label: '宽城区', value: '宽城区' },
        { label: '朝阳区', value: '朝阳区' },
        { label: '二道区', value: '二道区' },
        { label: '绿园区', value: '绿园区' },
        { label: '双阳区', value: '双阳区' },
        { label: '九台区', value: '九台区' },
        { label: '农安县', value: '农安县' },
        { label: '榆树市', value: '榆树市' },
        { label: '德惠市', value: '德惠市' },
        { label: '公主岭市', value: '公主岭市' }
      ]},
      { label: '吉林市', value: '吉林市', children: [
        { label: '昌邑区', value: '昌邑区' },
        { label: '龙潭区', value: '龙潭区' },
        { label: '船营区', value: '船营区' },
        { label: '丰满区', value: '丰满区' },
        { label: '永吉县', value: '永吉县' },
        { label: '蛟河市', value: '蛟河市' },
        { label: '桦甸市', value: '桦甸市' },
        { label: '舒兰市', value: '舒兰市' },
        { label: '磐石市', value: '磐石市' }
      ]},
      { label: '四平市', value: '四平市', children: [
        { label: '铁西区', value: '铁西区' },
        { label: '铁东区', value: '铁东区' },
        { label: '梨树县', value: '梨树县' },
        { label: '伊通满族自治县', value: '伊通满族自治县' },
        { label: '双辽市', value: '双辽市' }
      ]},
      { label: '辽源市', value: '辽源市', children: [
        { label: '龙山区', value: '龙山区' },
        { label: '西安区', value: '西安区' },
        { label: '东丰县', value: '东丰县' },
        { label: '东辽县', value: '东辽县' }
      ]},
      { label: '通化市', value: '通化市', children: [
        { label: '东昌区', value: '东昌区' },
        { label: '二道江区', value: '二道江区' },
        { label: '通化县', value: '通化县' },
        { label: '辉南县', value: '辉南县' },
        { label: '柳河县', value: '柳河县' },
        { label: '梅河口市', value: '梅河口市' },
        { label: '集安市', value: '集安市' }
      ]},
      { label: '白山市', value: '白山市', children: [
        { label: '浑江区', value: '浑江区' },
        { label: '江源区', value: '江源区' },
        { label: '抚松县', value: '抚松县' },
        { label: '靖宇县', value: '靖宇县' },
        { label: '长白朝鲜族自治县', value: '长白朝鲜族自治县' },
        { label: '临江市', value: '临江市' }
      ]},
      { label: '松原市', value: '松原市', children: [
        { label: '宁江区', value: '宁江区' },
        { label: '前郭尔罗斯蒙古族自治县', value: '前郭尔罗斯蒙古族自治县' },
        { label: '长岭县', value: '长岭县' },
        { label: '乾安县', value: '乾安县' },
        { label: '扶余市', value: '扶余市' }
      ]},
      { label: '白城市', value: '白城市', children: [
        { label: '洮北区', value: '洮北区' },
        { label: '镇赉县', value: '镇赉县' },
        { label: '通榆县', value: '通榆县' },
        { label: '洮南市', value: '洮南市' },
        { label: '大安市', value: '大安市' }
      ]},
      { label: '延边朝鲜族自治州', value: '延边朝鲜族自治州', children: [
        { label: '延吉市', value: '延吉市' },
        { label: '图们市', value: '图们市' },
        { label: '敦化市', value: '敦化市' },
        { label: '珲春市', value: '珲春市' },
        { label: '龙井市', value: '龙井市' },
        { label: '和龙市', value: '和龙市' },
        { label: '汪清县', value: '汪清县' },
        { label: '安图县', value: '安图县' }
      ]}
    ]
  },
  {
    label: '黑龙江省', value: '黑龙江省', children: [
      { label: '哈尔滨市', value: '哈尔滨市', children: [
        { label: '道里区', value: '道里区' },
        { label: '南岗区', value: '南岗区' },
        { label: '道外区', value: '道外区' },
        { label: '平房区', value: '平房区' },
        { label: '松北区', value: '松北区' },
        { label: '香坊区', value: '香坊区' },
        { label: '呼兰区', value: '呼兰区' },
        { label: '阿城区', value: '阿城区' },
        { label: '双城区', value: '双城区' },
        { label: '依兰县', value: '依兰县' },
        { label: '方正县', value: '方正县' },
        { label: '宾县', value: '宾县' },
        { label: '巴彦县', value: '巴彦县' },
        { label: '木兰县', value: '木兰县' },
        { label: '通河县', value: '通河县' },
        { label: '延寿县', value: '延寿县' },
        { label: '尚志市', value: '尚志市' },
        { label: '五常市', value: '五常市' }
      ]},
      { label: '齐齐哈尔市', value: '齐齐哈尔市', children: [
        { label: '龙沙区', value: '龙沙区' },
        { label: '建华区', value: '建华区' },
        { label: '铁锋区', value: '铁锋区' },
        { label: '昂昂溪区', value: '昂昂溪区' },
        { label: '富拉尔基区', value: '富拉尔基区' },
        { label: '碾子山区', value: '碾子山区' },
        { label: '梅里斯达斡尔族区', value: '梅里斯达斡尔族区' },
        { label: '龙江县', value: '龙江县' },
        { label: '依安县', value: '依安县' },
        { label: '泰来县', value: '泰来县' },
        { label: '甘南县', value: '甘南县' },
        { label: '富裕县', value: '富裕县' },
        { label: '克山县', value: '克山县' },
        { label: '克东县', value: '克东县' },
        { label: '拜泉县', value: '拜泉县' },
        { label: '讷河市', value: '讷河市' }
      ]},
      { label: '鸡西市', value: '鸡西市', children: [
        { label: '鸡冠区', value: '鸡冠区' },
        { label: '恒山区', value: '恒山区' },
        { label: '滴道区', value: '滴道区' },
        { label: '梨树区', value: '梨树区' },
        { label: '城子河区', value: '城子河区' },
        { label: '麻山区', value: '麻山区' },
        { label: '鸡东县', value: '鸡东县' },
        { label: '虎林市', value: '虎林市' },
        { label: '密山市', value: '密山市' }
      ]},
      { label: '鹤岗市', value: '鹤岗市', children: [
        { label: '向阳区', value: '向阳区' },
        { label: '工农区', value: '工农区' },
        { label: '南山区', value: '南山区' },
        { label: '兴安区', value: '兴安区' },
        { label: '东山区', value: '东山区' },
        { label: '兴山区', value: '兴山区' },
        { label: '萝北县', value: '萝北县' },
        { label: '绥滨县', value: '绥滨县' }
      ]},
      { label: '双鸭山市', value: '双鸭山市', children: [
        { label: '尖山区', value: '尖山区' },
        { label: '岭东区', value: '岭东区' },
        { label: '四方台区', value: '四方台区' },
        { label: '宝山区', value: '宝山区' },
        { label: '集贤县', value: '集贤县' },
        { label: '友谊县', value: '友谊县' },
        { label: '宝清县', value: '宝清县' },
        { label: '饶河县', value: '饶河县' }
      ]},
      { label: '大庆市', value: '大庆市', children: [
        { label: '萨尔图区', value: '萨尔图区' },
        { label: '龙凤区', value: '龙凤区' },
        { label: '让胡路区', value: '让胡路区' },
        { label: '红岗区', value: '红岗区' },
        { label: '大同区', value: '大同区' },
        { label: '肇州县', value: '肇州县' },
        { label: '肇源县', value: '肇源县' },
        { label: '林甸县', value: '林甸县' },
        { label: '杜尔伯特蒙古族自治县', value: '杜尔伯特蒙古族自治县' }
      ]},
      { label: '伊春市', value: '伊春市', children: [
        { label: '伊美区', value: '伊美区' },
        { label: '乌翠区', value: '乌翠区' },
        { label: '友好区', value: '友好区' },
        { label: '嘉荫县', value: '嘉荫县' },
        { label: '汤旺县', value: '汤旺县' },
        { label: '丰林县', value: '丰林县' },
        { label: '大箐山县', value: '大箐山县' },
        { label: '南岔县', value: '南岔县' },
        { label: '金林区', value: '金林区' },
        { label: '铁力市', value: '铁力市' }
      ]},
      { label: '佳木斯市', value: '佳木斯市', children: [
        { label: '向阳区', value: '向阳区' },
        { label: '前进区', value: '前进区' },
        { label: '东风区', value: '东风区' },
        { label: '郊区', value: '郊区' },
        { label: '桦南县', value: '桦南县' },
        { label: '桦川县', value: '桦川县' },
        { label: '汤原县', value: '汤原县' },
        { label: '同江市', value: '同江市' },
        { label: '富锦市', value: '富锦市' },
        { label: '抚远市', value: '抚远市' }
      ]},
      { label: '七台河市', value: '七台河市', children: [
        { label: '新兴区', value: '新兴区' },
        { label: '桃山区', value: '桃山区' },
        { label: '茄子河区', value: '茄子河区' },
        { label: '勃利县', value: '勃利县' }
      ]},
      { label: '牡丹江市', value: '牡丹江市', children: [
        { label: '东安区', value: '东安区' },
        { label: '阳明区', value: '阳明区' },
        { label: '爱民区', value: '爱民区' },
        { label: '西安区', value: '西安区' },
        { label: '林口县', value: '林口县' },
        { label: '绥芬河市', value: '绥芬河市' },
        { label: '海林市', value: '海林市' },
        { label: '宁安市', value: '宁安市' },
        { label: '穆棱市', value: '穆棱市' },
        { label: '东宁市', value: '东宁市' }
      ]},
      { label: '黑河市', value: '黑河市', children: [
        { label: '爱辉区', value: '爱辉区' },
        { label: '嫩江市', value: '嫩江市' },
        { label: '逊克县', value: '逊克县' },
        { label: '孙吴县', value: '孙吴县' },
        { label: '北安市', value: '北安市' },
        { label: '五大连池市', value: '五大连池市' }
      ]},
      { label: '绥化市', value: '绥化市', children: [
        { label: '北林区', value: '北林区' },
        { label: '望奎县', value: '望奎县' },
        { label: '兰西县', value: '兰西县' },
        { label: '青冈县', value: '青冈县' },
        { label: '庆安县', value: '庆安县' },
        { label: '明水县', value: '明水县' },
        { label: '绥棱县', value: '绥棱县' },
        { label: '安达市', value: '安达市' },
        { label: '肇东市', value: '肇东市' },
        { label: '海伦市', value: '海伦市' }
      ]},
      { label: '大兴安岭地区', value: '大兴安岭地区', children: [
        { label: '加格达奇区', value: '加格达奇区' },
        { label: '松岭区', value: '松岭区' },
        { label: '新林区', value: '新林区' },
        { label: '呼中区', value: '呼中区' },
        { label: '呼玛县', value: '呼玛县' },
        { label: '塔河县', value: '塔河县' },
        { label: '漠河市', value: '漠河市' }
      ]}
    ]
  },
  {
    label: '江苏省', value: '江苏省', children: [
      { label: '南京市', value: '南京市', children: [
        { label: '玄武区', value: '玄武区' },
        { label: '秦淮区', value: '秦淮区' },
        { label: '建邺区', value: '建邺区' },
        { label: '鼓楼区', value: '鼓楼区' },
        { label: '浦口区', value: '浦口区' },
        { label: '栖霞区', value: '栖霞区' },
        { label: '雨花台区', value: '雨花台区' },
        { label: '江宁区', value: '江宁区' },
        { label: '六合区', value: '六合区' },
        { label: '溧水区', value: '溧水区' },
        { label: '高淳区', value: '高淳区' }
      ]},
      { label: '无锡市', value: '无锡市', children: [
        { label: '锡山区', value: '锡山区' },
        { label: '惠山区', value: '惠山区' },
        { label: '滨湖区', value: '滨湖区' },
        { label: '梁溪区', value: '梁溪区' },
        { label: '新吴区', value: '新吴区' },
        { label: '江阴市', value: '江阴市' },
        { label: '宜兴市', value: '宜兴市' }
      ]},
      { label: '徐州市', value: '徐州市', children: [
        { label: '鼓楼区', value: '鼓楼区' },
        { label: '云龙区', value: '云龙区' },
        { label: '贾汪区', value: '贾汪区' },
        { label: '泉山区', value: '泉山区' },
        { label: '铜山区', value: '铜山区' },
        { label: '丰县', value: '丰县' },
        { label: '沛县', value: '沛县' },
        { label: '睢宁县', value: '睢宁县' },
        { label: '新沂市', value: '新沂市' },
        { label: '邳州市', value: '邳州市' }
      ]},
      { label: '常州市', value: '常州市', children: [
        { label: '天宁区', value: '天宁区' },
        { label: '钟楼区', value: '钟楼区' },
        { label: '新北区', value: '新北区' },
        { label: '武进区', value: '武进区' },
        { label: '金坛区', value: '金坛区' },
        { label: '溧阳市', value: '溧阳市' }
      ]},
      { label: '苏州市', value: '苏州市', children: [
        { label: '虎丘区', value: '虎丘区' },
        { label: '吴中区', value: '吴中区' },
        { label: '相城区', value: '相城区' },
        { label: '姑苏区', value: '姑苏区' },
        { label: '吴江区', value: '吴江区' },
        { label: '昆山市', value: '昆山市' },
        { label: '常熟市', value: '常熟市' },
        { label: '张家港市', value: '张家港市' },
        { label: '太仓市', value: '太仓市' }
      ]},
      { label: '南通市', value: '南通市', children: [
        { label: '崇川区', value: '崇川区' },
        { label: '港闸区', value: '港闸区' },
        { label: '通州区', value: '通州区' },
        { label: '海安市', value: '海安市' },
        { label: '如东县', value: '如东县' },
        { label: '启东市', value: '启东市' },
        { label: '如皋市', value: '如皋市' },
        { label: '海门市', value: '海门市' }
      ]},
      { label: '连云港市', value: '连云港市', children: [
        { label: '连云区', value: '连云区' },
        { label: '海州区', value: '海州区' },
        { label: '赣榆区', value: '赣榆区' },
        { label: '东海县', value: '东海县' },
        { label: '灌云县', value: '灌云县' },
        { label: '灌南县', value: '灌南县' }
      ]},
      { label: '淮安市', value: '淮安市', children: [
        { label: '淮安区', value: '淮安区' },
        { label: '淮阴区', value: '淮阴区' },
        { label: '清江浦区', value: '清江浦区' },
        { label: '洪泽区', value: '洪泽区' },
        { label: '涟水县', value: '涟水县' },
        { label: '盱眙县', value: '盱眙县' },
        { label: '金湖县', value: '金湖县' }
      ]},
      { label: '盐城市', value: '盐城市', children: [
        { label: '亭湖区', value: '亭湖区' },
        { label: '盐都区', value: '盐都区' },
        { label: '大丰区', value: '大丰区' },
        { label: '响水县', value: '响水县' },
        { label: '滨海县', value: '滨海县' },
        { label: '阜宁县', value: '阜宁县' },
        { label: '射阳县', value: '射阳县' },
        { label: '建湖县', value: '建湖县' },
        { label: '东台市', value: '东台市' }
      ]},
      { label: '扬州市', value: '扬州市', children: [
        { label: '广陵区', value: '广陵区' },
        { label: '邗江区', value: '邗江区' },
        { label: '江都区', value: '江都区' },
        { label: '宝应县', value: '宝应县' },
        { label: '仪征市', value: '仪征市' },
        { label: '高邮市', value: '高邮市' }
      ]},
      { label: '镇江市', value: '镇江市', children: [
        { label: '京口区', value: '京口区' },
        { label: '润州区', value: '润州区' },
        { label: '丹徒区', value: '丹徒区' },
        { label: '丹阳市', value: '丹阳市' },
        { label: '扬中市', value: '扬中市' },
        { label: '句容市', value: '句容市' }
      ]},
      { label: '泰州市', value: '泰州市', children: [
        { label: '海陵区', value: '海陵区' },
        { label: '高港区', value: '高港区' },
        { label: '姜堰区', value: '姜堰区' },
        { label: '兴化市', value: '兴化市' },
        { label: '靖江市', value: '靖江市' },
        { label: '泰兴市', value: '泰兴市' }
      ]},
      { label: '宿迁市', value: '宿迁市', children: [
        { label: '宿城区', value: '宿城区' },
        { label: '宿豫区', value: '宿豫区' },
        { label: '沭阳县', value: '沭阳县' },
        { label: '泗阳县', value: '泗阳县' },
        { label: '泗洪县', value: '泗洪县' }
      ]}
    ]
  },
  {
    label: '浙江省', value: '浙江省', children: [
      { label: '杭州市', value: '杭州市', children: [
        { label: '上城区', value: '上城区' },
        { label: '拱墅区', value: '拱墅区' },
        { label: '西湖区', value: '西湖区' },
        { label: '滨江区', value: '滨江区' },
        { label: '萧山区', value: '萧山区' },
        { label: '余杭区', value: '余杭区' },
        { label: '临平区', value: '临平区' },
        { label: '钱塘区', value: '钱塘区' },
        { label: '富阳区', value: '富阳区' },
        { label: '临安区', value: '临安区' },
        { label: '桐庐县', value: '桐庐县' },
        { label: '淳安县', value: '淳安县' },
        { label: '建德市', value: '建德市' }
      ]},
      { label: '宁波市', value: '宁波市', children: [
        { label: '海曙区', value: '海曙区' },
        { label: '江北区', value: '江北区' },
        { label: '北仑区', value: '北仑区' },
        { label: '镇海区', value: '镇海区' },
        { label: '鄞州区', value: '鄞州区' },
        { label: '奉化区', value: '奉化区' },
        { label: '象山县', value: '象山县' },
        { label: '宁海县', value: '宁海县' },
        { label: '余姚市', value: '余姚市' },
        { label: '慈溪市', value: '慈溪市' }
      ]},
      { label: '温州市', value: '温州市', children: [
        { label: '鹿城区', value: '鹿城区' },
        { label: '龙湾区', value: '龙湾区' },
        { label: '瓯海区', value: '瓯海区' },
        { label: '洞头区', value: '洞头区' },
        { label: '永嘉县', value: '永嘉县' },
        { label: '平阳县', value: '平阳县' },
        { label: '苍南县', value: '苍南县' },
        { label: '文成县', value: '文成县' },
        { label: '泰顺县', value: '泰顺县' },
        { label: '瑞安市', value: '瑞安市' },
        { label: '乐清市', value: '乐清市' },
        { label: '龙港市', value: '龙港市' }
      ]},
      { label: '嘉兴市', value: '嘉兴市', children: [
        { label: '南湖区', value: '南湖区' },
        { label: '秀洲区', value: '秀洲区' },
        { label: '嘉善县', value: '嘉善县' },
        { label: '海盐县', value: '海盐县' },
        { label: '海宁市', value: '海宁市' },
        { label: '平湖市', value: '平湖市' },
        { label: '桐乡市', value: '桐乡市' }
      ]},
      { label: '湖州市', value: '湖州市', children: [
        { label: '吴兴区', value: '吴兴区' },
        { label: '南浔区', value: '南浔区' },
        { label: '德清县', value: '德清县' },
        { label: '长兴县', value: '长兴县' },
        { label: '安吉县', value: '安吉县' }
      ]},
      { label: '绍兴市', value: '绍兴市', children: [
        { label: '越城区', value: '越城区' },
        { label: '柯桥区', value: '柯桥区' },
        { label: '上虞区', value: '上虞区' },
        { label: '新昌县', value: '新昌县' },
        { label: '诸暨市', value: '诸暨市' },
        { label: '嵊州市', value: '嵊州市' }
      ]},
      { label: '金华市', value: '金华市', children: [
        { label: '婺城区', value: '婺城区' },
        { label: '金东区', value: '金东区' },
        { label: '武义县', value: '武义县' },
        { label: '浦江县', value: '浦江县' },
        { label: '磐安县', value: '磐安县' },
        { label: '兰溪市', value: '兰溪市' },
        { label: '义乌市', value: '义乌市' },
        { label: '东阳市', value: '东阳市' },
        { label: '永康市', value: '永康市' }
      ]},
      { label: '衢州市', value: '衢州市', children: [
        { label: '柯城区', value: '柯城区' },
        { label: '衢江区', value: '衢江区' },
        { label: '常山县', value: '常山县' },
        { label: '开化县', value: '开化县' },
        { label: '龙游县', value: '龙游县' },
        { label: '江山市', value: '江山市' }
      ]},
      { label: '舟山市', value: '舟山市', children: [
        { label: '定海区', value: '定海区' },
        { label: '普陀区', value: '普陀区' },
        { label: '岱山县', value: '岱山县' },
        { label: '嵊泗县', value: '嵊泗县' }
      ]},
      { label: '台州市', value: '台州市', children: [
        { label: '椒江区', value: '椒江区' },
        { label: '黄岩区', value: '黄岩区' },
        { label: '路桥区', value: '路桥区' },
        { label: '三门县', value: '三门县' },
        { label: '天台县', value: '天台县' },
        { label: '仙居县', value: '仙居县' },
        { label: '温岭市', value: '温岭市' },
        { label: '临海市', value: '临海市' },
        { label: '玉环市', value: '玉环市' }
      ]},
      { label: '丽水市', value: '丽水市', children: [
        { label: '莲都区', value: '莲都区' },
        { label: '青田县', value: '青田县' },
        { label: '缙云县', value: '缙云县' },
        { label: '遂昌县', value: '遂昌县' },
        { label: '松阳县', value: '松阳县' },
        { label: '云和县', value: '云和县' },
        { label: '庆元县', value: '庆元县' },
        { label: '景宁畲族自治县', value: '景宁畲族自治县' },
        { label: '龙泉市', value: '龙泉市' }
      ]}
    ]
  },
  {
    label: '湖南省', value: '湖南省', children: [
      { label: '长沙市', value: '长沙市', children: [
        { label: '芙蓉区', value: '芙蓉区' },
        { label: '天心区', value: '天心区' },
        { label: '岳麓区', value: '岳麓区' },
        { label: '开福区', value: '开福区' },
        { label: '雨花区', value: '雨花区' },
        { label: '望城区', value: '望城区' },
        { label: '长沙县', value: '长沙县' },
        { label: '浏阳市', value: '浏阳市' },
        { label: '宁乡市', value: '宁乡市' }
      ]},
      { label: '株洲市', value: '株洲市', children: [
        { label: '荷塘区', value: '荷塘区' },
        { label: '芦淞区', value: '芦淞区' },
        { label: '石峰区', value: '石峰区' },
        { label: '天元区', value: '天元区' },
        { label: '渌口区', value: '渌口区' },
        { label: '攸县', value: '攸县' },
        { label: '茶陵县', value: '茶陵县' },
        { label: '炎陵县', value: '炎陵县' },
        { label: '醴陵市', value: '醴陵市' }
      ]},
      { label: '湘潭市', value: '湘潭市', children: [
        { label: '雨湖区', value: '雨湖区' },
        { label: '岳塘区', value: '岳塘区' },
        { label: '湘潭县', value: '湘潭县' },
        { label: '湘乡市', value: '湘乡市' },
        { label: '韶山市', value: '韶山市' }
      ]},
      { label: '衡阳市', value: '衡阳市', children: [
        { label: '珠晖区', value: '珠晖区' },
        { label: '雁峰区', value: '雁峰区' },
        { label: '石鼓区', value: '石鼓区' },
        { label: '蒸湘区', value: '蒸湘区' },
        { label: '南岳区', value: '南岳区' },
        { label: '衡阳县', value: '衡阳县' },
        { label: '衡南县', value: '衡南县' },
        { label: '衡山县', value: '衡山县' },
        { label: '衡东县', value: '衡东县' },
        { label: '祁东县', value: '祁东县' },
        { label: '耒阳市', value: '耒阳市' },
        { label: '常宁市', value: '常宁市' }
      ]},
      { label: '邵阳市', value: '邵阳市', children: [
        { label: '双清区', value: '双清区' },
        { label: '大祥区', value: '大祥区' },
        { label: '北塔区', value: '北塔区' },
        { label: '邵东市', value: '邵东市' },
        { label: '新邵县', value: '新邵县' },
        { label: '邵阳县', value: '邵阳县' },
        { label: '隆回县', value: '隆回县' },
        { label: '洞口县', value: '洞口县' },
        { label: '绥宁县', value: '绥宁县' },
        { label: '新宁县', value: '新宁县' },
        { label: '城步苗族自治县', value: '城步苗族自治县' },
        { label: '武冈市', value: '武冈市' }
      ]},
      { label: '岳阳市', value: '岳阳市', children: [
        { label: '岳阳楼区', value: '岳阳楼区' },
        { label: '云溪区', value: '云溪区' },
        { label: '君山区', value: '君山区' },
        { label: '岳阳县', value: '岳阳县' },
        { label: '华容县', value: '华容县' },
        { label: '湘阴县', value: '湘阴县' },
        { label: '平江县', value: '平江县' },
        { label: '汨罗市', value: '汨罗市' },
        { label: '临湘市', value: '临湘市' }
      ]},
      { label: '常德市', value: '常德市', children: [
        { label: '武陵区', value: '武陵区' },
        { label: '鼎城区', value: '鼎城区' },
        { label: '安乡县', value: '安乡县' },
        { label: '汉寿县', value: '汉寿县' },
        { label: '澧县', value: '澧县' },
        { label: '临澧县', value: '临澧县' },
        { label: '桃源县', value: '桃源县' },
        { label: '石门县', value: '石门县' },
        { label: '津市市', value: '津市市' }
      ]},
      { label: '张家界市', value: '张家界市', children: [
        { label: '永定区', value: '永定区' },
        { label: '武陵源区', value: '武陵源区' },
        { label: '慈利县', value: '慈利县' },
        { label: '桑植县', value: '桑植县' }
      ]},
      { label: '益阳市', value: '益阳市', children: [
        { label: '资阳区', value: '资阳区' },
        { label: '赫山区', value: '赫山区' },
        { label: '南县', value: '南县' },
        { label: '桃江县', value: '桃江县' },
        { label: '安化县', value: '安化县' },
        { label: '沅江市', value: '沅江市' }
      ]},
      { label: '郴州市', value: '郴州市', children: [
        { label: '北湖区', value: '北湖区' },
        { label: '苏仙区', value: '苏仙区' },
        { label: '桂阳县', value: '桂阳县' },
        { label: '宜章县', value: '宜章县' },
        { label: '永兴县', value: '永兴县' },
        { label: '嘉禾县', value: '嘉禾县' },
        { label: '临武县', value: '临武县' },
        { label: '汝城县', value: '汝城县' },
        { label: '桂东县', value: '桂东县' },
        { label: '安仁县', value: '安仁县' },
        { label: '资兴市', value: '资兴市' }
      ]},
      { label: '永州市', value: '永州市', children: [
        { label: '零陵区', value: '零陵区' },
        { label: '冷水滩区', value: '冷水滩区' },
        { label: '祁阳市', value: '祁阳市' },
        { label: '东安县', value: '东安县' },
        { label: '双牌县', value: '双牌县' },
        { label: '道县', value: '道县' },
        { label: '江永县', value: '江永县' },
        { label: '宁远县', value: '宁远县' },
        { label: '蓝山县', value: '蓝山县' },
        { label: '新田县', value: '新田县' },
        { label: '江华瑶族自治县', value: '江华瑶族自治县' }
      ]},
      { label: '怀化市', value: '怀化市', children: [
        { label: '鹤城区', value: '鹤城区' },
        { label: '中方县', value: '中方县' },
        { label: '沅陵县', value: '沅陵县' },
        { label: '辰溪县', value: '辰溪县' },
        { label: '溆浦县', value: '溆浦县' },
        { label: '会同县', value: '会同县' },
        { label: '麻阳苗族自治县', value: '麻阳苗族自治县' },
        { label: '新晃侗族自治县', value: '新晃侗族自治县' },
        { label: '芷江侗族自治县', value: '芷江侗族自治县' },
        { label: '靖州苗族侗族自治县', value: '靖州苗族侗族自治县' },
        { label: '通道侗族自治县', value: '通道侗族自治县' },
        { label: '洪江市', value: '洪江市' }
      ]},
      { label: '娄底市', value: '娄底市', children: [
        { label: '娄星区', value: '娄星区' },
        { label: '双峰县', value: '双峰县' },
        { label: '新化县', value: '新化县' },
        { label: '冷水江市', value: '冷水江市' },
        { label: '涟源市', value: '涟源市' }
      ]},
      { label: '湘西土家族苗族自治州', value: '湘西土家族苗族自治州', children: [
        { label: '吉首市', value: '吉首市' },
        { label: '泸溪县', value: '泸溪县' },
        { label: '凤凰县', value: '凤凰县' },
        { label: '花垣县', value: '花垣县' },
        { label: '保靖县', value: '保靖县' },
        { label: '古丈县', value: '古丈县' },
        { label: '永顺县', value: '永顺县' },
        { label: '龙山县', value: '龙山县' }
      ]}
    ]
  },
  {
    label: '广东省', value: '广东省', children: [
      { label: '广州市', value: '广州市', children: [
        { label: '越秀区', value: '越秀区' },
        { label: '海珠区', value: '海珠区' },
        { label: '荔湾区', value: '荔湾区' },
        { label: '天河区', value: '天河区' },
        { label: '白云区', value: '白云区' },
        { label: '黄埔区', value: '黄埔区' },
        { label: '花都区', value: '花都区' },
        { label: '番禺区', value: '番禺区' },
        { label: '南沙区', value: '南沙区' },
        { label: '从化区', value: '从化区' },
        { label: '增城区', value: '增城区' }
      ]},
      { label: '韶关市', value: '韶关市', children: [
        { label: '浈江区', value: '浈江区' },
        { label: '武江区', value: '武江区' },
        { label: '曲江区', value: '曲江区' },
        { label: '乐昌市', value: '乐昌市' },
        { label: '南雄市', value: '南雄市' },
        { label: '始兴县', value: '始兴县' },
        { label: '仁化县', value: '仁化县' },
        { label: '翁源县', value: '翁源县' },
        { label: '乳源瑶族自治县', value: '乳源瑶族自治县' },
        { label: '新丰县', value: '新丰县' }
      ]},
      { label: '深圳市', value: '深圳市', children: [
        { label: '福田区', value: '福田区' },
        { label: '罗湖区', value: '罗湖区' },
        { label: '盐田区', value: '盐田区' },
        { label: '南山区', value: '南山区' },
        { label: '宝安区', value: '宝安区' },
        { label: '龙岗区', value: '龙岗区' },
        { label: '龙华区', value: '龙华区' },
        { label: '坪山区', value: '坪山区' },
        { label: '光明区', value: '光明区' }
      ]},
      { label: '珠海市', value: '珠海市', children: [
        { label: '香洲区', value: '香洲区' },
        { label: '斗门区', value: '斗门区' },
        { label: '金湾区', value: '金湾区' }
      ]},
      { label: '汕头市', value: '汕头市', children: [
        { label: '龙湖区', value: '龙湖区' },
        { label: '金平区', value: '金平区' },
        { label: '濠江区', value: '濠江区' },
        { label: '潮阳区', value: '潮阳区' },
        { label: '潮南区', value: '潮南区' },
        { label: '澄海区', value: '澄海区' },
        { label: '南澳县', value: '南澳县' }
      ]},
      { label: '佛山市', value: '佛山市', children: [
        { label: '禅城区', value: '禅城区' },
        { label: '南海区', value: '南海区' },
        { label: '顺德区', value: '顺德区' },
        { label: '三水区', value: '三水区' },
        { label: '高明区', value: '高明区' }
      ]},
      { label: '江门市', value: '江门市', children: [
        { label: '蓬江区', value: '蓬江区' },
        { label: '江海区', value: '江海区' },
        { label: '新会区', value: '新会区' },
        { label: '台山市', value: '台山市' },
        { label: '开平市', value: '开平市' },
        { label: '鹤山市', value: '鹤山市' },
        { label: '恩平市', value: '恩平市' }
      ]},
      { label: '湛江市', value: '湛江市', children: [
        { label: '赤坎区', value: '赤坎区' },
        { label: '霞山区', value: '霞山区' },
        { label: '坡头区', value: '坡头区' },
        { label: '麻章区', value: '麻章区' },
        { label: '廉江市', value: '廉江市' },
        { label: '雷州市', value: '雷州市' },
        { label: '吴川市', value: '吴川市' },
        { label: '遂溪县', value: '遂溪县' },
        { label: '徐闻县', value: '徐闻县' }
      ]},
      { label: '茂名市', value: '茂名市', children: [
        { label: '茂南区', value: '茂南区' },
        { label: '电白区', value: '电白区' },
        { label: '高州市', value: '高州市' },
        { label: '化州市', value: '化州市' },
        { label: '信宜市', value: '信宜市' }
      ]},
      { label: '肇庆市', value: '肇庆市', children: [
        { label: '端州区', value: '端州区' },
        { label: '鼎湖区', value: '鼎湖区' },
        { label: '高要区', value: '高要区' },
        { label: '四会市', value: '四会市' },
        { label: '广宁县', value: '广宁县' },
        { label: '怀集县', value: '怀集县' },
        { label: '封开县', value: '封开县' },
        { label: '德庆县', value: '德庆县' }
      ]},
      { label: '惠州市', value: '惠州市', children: [
        { label: '惠城区', value: '惠城区' },
        { label: '惠阳区', value: '惠阳区' },
        { label: '博罗县', value: '博罗县' },
        { label: '惠东县', value: '惠东县' },
        { label: '龙门县', value: '龙门县' }
      ]},
      { label: '梅州市', value: '梅州市', children: [
        { label: '梅江区', value: '梅江区' },
        { label: '梅县区', value: '梅县区' },
        { label: '兴宁市', value: '兴宁市' },
        { label: '大埔县', value: '大埔县' },
        { label: '丰顺县', value: '丰顺县' },
        { label: '五华县', value: '五华县' },
        { label: '平远县', value: '平远县' },
        { label: '蕉岭县', value: '蕉岭县' }
      ]},
      { label: '汕尾市', value: '汕尾市', children: [
        { label: '城区', value: '城区' },
        { label: '陆丰市', value: '陆丰市' },
        { label: '海丰县', value: '海丰县' },
        { label: '陆河县', value: '陆河县' }
      ]},
      { label: '河源市', value: '河源市', children: [
        { label: '源城区', value: '源城区' },
        { label: '紫金县', value: '紫金县' },
        { label: '龙川县', value: '龙川县' },
        { label: '连平县', value: '连平县' },
        { label: '和平县', value: '和平县' },
        { label: '东源县', value: '东源县' }
      ]},
      { label: '阳江市', value: '阳江市', children: [
        { label: '江城区', value: '江城区' },
        { label: '阳东区', value: '阳东区' },
        { label: '阳春市', value: '阳春市' },
        { label: '阳西县', value: '阳西县' }
      ]},
      { label: '清远市', value: '清远市', children: [
        { label: '清城区', value: '清城区' },
        { label: '清新区', value: '清新区' },
        { label: '英德市', value: '英德市' },
        { label: '连州市', value: '连州市' },
        { label: '佛冈县', value: '佛冈县' },
        { label: '阳山县', value: '阳山县' },
        { label: '连山壮族瑶族自治县', value: '连山壮族瑶族自治县' },
        { label: '连南瑶族自治县', value: '连南瑶族自治县' }
      ]},
      { label: '东莞市', value: '东莞市', children: [
        { label: '东莞市', value: '东莞市' }
      ]},
      { label: '中山市', value: '中山市', children: [
        { label: '中山市', value: '中山市' }
      ]},
      { label: '潮州市', value: '潮州市', children: [
        { label: '湘桥区', value: '湘桥区' },
        { label: '潮安区', value: '潮安区' },
        { label: '饶平县', value: '饶平县' }
      ]},
      { label: '揭阳市', value: '揭阳市', children: [
        { label: '榕城区', value: '榕城区' },
        { label: '揭东区', value: '揭东区' },
        { label: '揭西县', value: '揭西县' },
        { label: '惠来县', value: '惠来县' },
        { label: '普宁市', value: '普宁市' }
      ]},
      { label: '云浮市', value: '云浮市', children: [
        { label: '云城区', value: '云城区' },
        { label: '云安区', value: '云安区' },
        { label: '罗定市', value: '罗定市' },
        { label: '新兴县', value: '新兴县' },
        { label: '郁南县', value: '郁南县' }
      ]}
    ]
  },
  {
    label: '海南省', value: '海南省', children: [
      { label: '海口市', value: '海口市', children: [
        { label: '秀英区', value: '秀英区' },
        { label: '龙华区', value: '龙华区' },
        { label: '琼山区', value: '琼山区' },
        { label: '美兰区', value: '美兰区' }
      ]},
      { label: '三亚市', value: '三亚市', children: [
        { label: '海棠区', value: '海棠区' },
        { label: '吉阳区', value: '吉阳区' },
        { label: '天涯区', value: '天涯区' },
        { label: '崖州区', value: '崖州区' }
      ]},
      { label: '三沙市', value: '三沙市', children: [
        { label: '西沙区', value: '西沙区' },
        { label: '南沙区', value: '南沙区' }
      ]},
      { label: '儋州市', value: '儋州市', children: [
        { label: '儋州市', value: '儋州市' }
      ]},
      { label: '省直辖县级行政区划', value: '省直辖县级行政区划', children: [
        { label: '五指山市', value: '五指山市' },
        { label: '琼海市', value: '琼海市' },
        { label: '文昌市', value: '文昌市' },
        { label: '万宁市', value: '万宁市' },
        { label: '东方市', value: '东方市' },
        { label: '定安县', value: '定安县' },
        { label: '屯昌县', value: '屯昌县' },
        { label: '澄迈县', value: '澄迈县' },
        { label: '临高县', value: '临高县' },
        { label: '白沙黎族自治县', value: '白沙黎族自治县' },
        { label: '昌江黎族自治县', value: '昌江黎族自治县' },
        { label: '乐东黎族自治县', value: '乐东黎族自治县' },
        { label: '陵水黎族自治县', value: '陵水黎族自治县' },
        { label: '保亭黎族苗族自治县', value: '保亭黎族苗族自治县' },
        { label: '琼中黎族苗族自治县', value: '琼中黎族苗族自治县' }
      ]}
    ]
  },
  {
    label: '四川省', value: '四川省', children: [
      { label: '成都市', value: '成都市', children: [
        { label: '锦江区', value: '锦江区' },
        { label: '青羊区', value: '青羊区' },
        { label: '金牛区', value: '金牛区' },
        { label: '武侯区', value: '武侯区' },
        { label: '成华区', value: '成华区' },
        { label: '龙泉驿区', value: '龙泉驿区' },
        { label: '青白江区', value: '青白江区' },
        { label: '新都区', value: '新都区' },
        { label: '温江区', value: '温江区' },
        { label: '双流区', value: '双流区' },
        { label: '郫都区', value: '郫都区' },
        { label: '新津区', value: '新津区' },
        { label: '简阳市', value: '简阳市' },
        { label: '都江堰市', value: '都江堰市' },
        { label: '彭州市', value: '彭州市' },
        { label: '邛崃市', value: '邛崃市' },
        { label: '崇州市', value: '崇州市' },
        { label: '金堂县', value: '金堂县' },
        { label: '大邑县', value: '大邑县' },
        { label: '蒲江县', value: '蒲江县' }
      ]},
      { label: '自贡市', value: '自贡市', children: [
        { label: '自流井区', value: '自流井区' },
        { label: '贡井区', value: '贡井区' },
        { label: '大安区', value: '大安区' },
        { label: '沿滩区', value: '沿滩区' },
        { label: '荣县', value: '荣县' },
        { label: '富顺县', value: '富顺县' }
      ]},
      { label: '攀枝花市', value: '攀枝花市', children: [
        { label: '东区', value: '东区' },
        { label: '西区', value: '西区' },
        { label: '仁和区', value: '仁和区' },
        { label: '米易县', value: '米易县' },
        { label: '盐边县', value: '盐边县' }
      ]},
      { label: '泸州市', value: '泸州市', children: [
        { label: '江阳区', value: '江阳区' },
        { label: '纳溪区', value: '纳溪区' },
        { label: '龙马潭区', value: '龙马潭区' },
        { label: '泸县', value: '泸县' },
        { label: '合江县', value: '合江县' },
        { label: '叙永县', value: '叙永县' },
        { label: '古蔺县', value: '古蔺县' }
      ]},
      { label: '德阳市', value: '德阳市', children: [
        { label: '旌阳区', value: '旌阳区' },
        { label: '罗江区', value: '罗江区' },
        { label: '广汉市', value: '广汉市' },
        { label: '什邡市', value: '什邡市' },
        { label: '绵竹市', value: '绵竹市' },
        { label: '中江县', value: '中江县' }
      ]},
      { label: '绵阳市', value: '绵阳市', children: [
        { label: '涪城区', value: '涪城区' },
        { label: '游仙区', value: '游仙区' },
        { label: '安州区', value: '安州区' },
        { label: '江油市', value: '江油市' },
        { label: '三台县', value: '三台县' },
        { label: '盐亭县', value: '盐亭县' },
        { label: '梓潼县', value: '梓潼县' },
        { label: '平武县', value: '平武县' },
        { label: '北川羌族自治县', value: '北川羌族自治县' }
      ]},
      { label: '广元市', value: '广元市', children: [
        { label: '利州区', value: '利州区' },
        { label: '昭化区', value: '昭化区' },
        { label: '朝天区', value: '朝天区' },
        { label: '旺苍县', value: '旺苍县' },
        { label: '青川县', value: '青川县' },
        { label: '剑阁县', value: '剑阁县' },
        { label: '苍溪县', value: '苍溪县' }
      ]},
      { label: '遂宁市', value: '遂宁市', children: [
        { label: '船山区', value: '船山区' },
        { label: '安居区', value: '安居区' },
        { label: '射洪市', value: '射洪市' },
        { label: '蓬溪县', value: '蓬溪县' },
        { label: '大英县', value: '大英县' }
      ]},
      { label: '内江市', value: '内江市', children: [
        { label: '市中区', value: '市中区' },
        { label: '东兴区', value: '东兴区' },
        { label: '隆昌市', value: '隆昌市' },
        { label: '资中县', value: '资中县' },
        { label: '威远县', value: '威远县' }
      ]},
      { label: '乐山市', value: '乐山市', children: [
        { label: '市中区', value: '市中区' },
        { label: '沙湾区', value: '沙湾区' },
        { label: '五通桥区', value: '五通桥区' },
        { label: '金口河区', value: '金口河区' },
        { label: '峨眉山市', value: '峨眉山市' },
        { label: '犍为县', value: '犍为县' },
        { label: '井研县', value: '井研县' },
        { label: '夹江县', value: '夹江县' },
        { label: '沐川县', value: '沐川县' },
        { label: '峨边彝族自治县', value: '峨边彝族自治县' },
        { label: '马边彝族自治县', value: '马边彝族自治县' }
      ]},
      { label: '南充市', value: '南充市', children: [
        { label: '顺庆区', value: '顺庆区' },
        { label: '高坪区', value: '高坪区' },
        { label: '嘉陵区', value: '嘉陵区' },
        { label: '阆中市', value: '阆中市' },
        { label: '南部县', value: '南部县' },
        { label: '营山县', value: '营山县' },
        { label: '蓬安县', value: '蓬安县' },
        { label: '仪陇县', value: '仪陇县' },
        { label: '西充县', value: '西充县' }
      ]},
      { label: '眉山市', value: '眉山市', children: [
        { label: '东坡区', value: '东坡区' },
        { label: '彭山区', value: '彭山区' },
        { label: '仁寿县', value: '仁寿县' },
        { label: '洪雅县', value: '洪雅县' },
        { label: '丹棱县', value: '丹棱县' },
        { label: '青神县', value: '青神县' }
      ]},
      { label: '宜宾市', value: '宜宾市', children: [
        { label: '翠屏区', value: '翠屏区' },
        { label: '南溪区', value: '南溪区' },
        { label: '叙州区', value: '叙州区' },
        { label: '江安县', value: '江安县' },
        { label: '长宁县', value: '长宁县' },
        { label: '高县', value: '高县' },
        { label: '珙县', value: '珙县' },
        { label: '筠连县', value: '筠连县' },
        { label: '兴文县', value: '兴文县' },
        { label: '屏山县', value: '屏山县' }
      ]},
      { label: '广安市', value: '广安市', children: [
        { label: '广安区', value: '广安区' },
        { label: '前锋区', value: '前锋区' },
        { label: '岳池县', value: '岳池县' },
        { label: '武胜县', value: '武胜县' },
        { label: '邻水县', value: '邻水县' },
        { label: '华蓥市', value: '华蓥市' }
      ]},
      { label: '达州市', value: '达州市', children: [
        { label: '通川区', value: '通川区' },
        { label: '达川区', value: '达川区' },
        { label: '万源市', value: '万源市' },
        { label: '宣汉县', value: '宣汉县' },
        { label: '开江县', value: '开江县' },
        { label: '大竹县', value: '大竹县' },
        { label: '渠县', value: '渠县' }
      ]},
      { label: '雅安市', value: '雅安市', children: [
        { label: '雨城区', value: '雨城区' },
        { label: '名山区', value: '名山区' },
        { label: '荥经县', value: '荥经县' },
        { label: '汉源县', value: '汉源县' },
        { label: '石棉县', value: '石棉县' },
        { label: '天全县', value: '天全县' },
        { label: '芦山县', value: '芦山县' },
        { label: '宝兴县', value: '宝兴县' }
      ]},
      { label: '巴中市', value: '巴中市', children: [
        { label: '巴州区', value: '巴州区' },
        { label: '恩阳区', value: '恩阳区' },
        { label: '通江县', value: '通江县' },
        { label: '南江县', value: '南江县' },
        { label: '平昌县', value: '平昌县' }
      ]},
      { label: '资阳市', value: '资阳市', children: [
        { label: '雁江区', value: '雁江区' },
        { label: '安岳县', value: '安岳县' },
        { label: '乐至县', value: '乐至县' }
      ]},
      { label: '阿坝藏族羌族自治州', value: '阿坝藏族羌族自治州', children: [
        { label: '马尔康市', value: '马尔康市' },
        { label: '汶川县', value: '汶川县' },
        { label: '理县', value: '理县' },
        { label: '茂县', value: '茂县' },
        { label: '松潘县', value: '松潘县' },
        { label: '九寨沟县', value: '九寨沟县' },
        { label: '金川县', value: '金川县' },
        { label: '小金县', value: '小金县' },
        { label: '黑水县', value: '黑水县' },
        { label: '壤塘县', value: '壤塘县' },
        { label: '阿坝县', value: '阿坝县' },
        { label: '若尔盖县', value: '若尔盖县' },
        { label: '红原县', value: '红原县' }
      ]},
      { label: '甘孜藏族自治州', value: '甘孜藏族自治州', children: [
        { label: '康定市', value: '康定市' },
        { label: '泸定县', value: '泸定县' },
        { label: '丹巴县', value: '丹巴县' },
        { label: '九龙县', value: '九龙县' },
        { label: '雅江县', value: '雅江县' },
        { label: '道孚县', value: '道孚县' },
        { label: '炉霍县', value: '炉霍县' },
        { label: '甘孜县', value: '甘孜县' },
        { label: '新龙县', value: '新龙县' },
        { label: '德格县', value: '德格县' },
        { label: '白玉县', value: '白玉县' },
        { label: '石渠县', value: '石渠县' },
        { label: '色达县', value: '色达县' },
        { label: '理塘县', value: '理塘县' },
        { label: '巴塘县', value: '巴塘县' },
        { label: '乡城县', value: '乡城县' },
        { label: '稻城县', value: '稻城县' },
        { label: '得荣县', value: '得荣县' }
      ]},
      { label: '凉山彝族自治州', value: '凉山彝族自治州', children: [
        { label: '西昌市', value: '西昌市' },
        { label: '会理市', value: '会理市' },
        { label: '木里藏族自治县', value: '木里藏族自治县' },
        { label: '盐源县', value: '盐源县' },
        { label: '德昌县', value: '德昌县' },
        { label: '会东县', value: '会东县' },
        { label: '宁南县', value: '宁南县' },
        { label: '普格县', value: '普格县' },
        { label: '布拖县', value: '布拖县' },
        { label: '金阳县', value: '金阳县' },
        { label: '昭觉县', value: '昭觉县' },
        { label: '喜德县', value: '喜德县' },
        { label: '冕宁县', value: '冕宁县' },
        { label: '越西县', value: '越西县' },
        { label: '甘洛县', value: '甘洛县' },
        { label: '美姑县', value: '美姑县' },
        { label: '雷波县', value: '雷波县' }
      ]}
    ]
  },
  {
    label: '贵州省', value: '贵州省', children: [
      { label: '贵阳市', value: '贵阳市', children: [
        { label: '南明区', value: '南明区' },
        { label: '云岩区', value: '云岩区' },
        { label: '花溪区', value: '花溪区' },
        { label: '乌当区', value: '乌当区' },
        { label: '白云区', value: '白云区' },
        { label: '观山湖区', value: '观山湖区' },
        { label: '清镇市', value: '清镇市' },
        { label: '开阳县', value: '开阳县' },
        { label: '息烽县', value: '息烽县' },
        { label: '修文县', value: '修文县' }
      ]},
      { label: '六盘水市', value: '六盘水市', children: [
        { label: '钟山区', value: '钟山区' },
        { label: '六枝特区', value: '六枝特区' },
        { label: '水城区', value: '水城区' },
        { label: '盘州市', value: '盘州市' }
      ]},
      { label: '遵义市', value: '遵义市', children: [
        { label: '红花岗区', value: '红花岗区' },
        { label: '汇川区', value: '汇川区' },
        { label: '播州区', value: '播州区' },
        { label: '赤水市', value: '赤水市' },
        { label: '仁怀市', value: '仁怀市' },
        { label: '桐梓县', value: '桐梓县' },
        { label: '绥阳县', value: '绥阳县' },
        { label: '正安县', value: '正安县' },
        { label: '道真仡佬族苗族自治县', value: '道真仡佬族苗族自治县' },
        { label: '务川仡佬族苗族自治县', value: '务川仡佬族苗族自治县' },
        { label: '凤冈县', value: '凤冈县' },
        { label: '湄潭县', value: '湄潭县' },
        { label: '余庆县', value: '余庆县' },
        { label: '习水县', value: '习水县' }
      ]},
      { label: '安顺市', value: '安顺市', children: [
        { label: '西秀区', value: '西秀区' },
        { label: '平坝区', value: '平坝区' },
        { label: '普定县', value: '普定县' },
        { label: '镇宁布依族苗族自治县', value: '镇宁布依族苗族自治县' },
        { label: '关岭布依族苗族自治县', value: '关岭布依族苗族自治县' },
        { label: '紫云苗族布依族自治县', value: '紫云苗族布依族自治县' }
      ]},
      { label: '毕节市', value: '毕节市', children: [
        { label: '七星关区', value: '七星关区' },
        { label: '黔西市', value: '黔西市' },
        { label: '大方县', value: '大方县' },
        { label: '金沙县', value: '金沙县' },
        { label: '织金县', value: '织金县' },
        { label: '纳雍县', value: '纳雍县' },
        { label: '威宁彝族回族苗族自治县', value: '威宁彝族回族苗族自治县' },
        { label: '赫章县', value: '赫章县' }
      ]},
      { label: '铜仁市', value: '铜仁市', children: [
        { label: '碧江区', value: '碧江区' },
        { label: '万山区', value: '万山区' },
        { label: '江口县', value: '江口县' },
        { label: '玉屏侗族自治县', value: '玉屏侗族自治县' },
        { label: '石阡县', value: '石阡县' },
        { label: '思南县', value: '思南县' },
        { label: '印江土家族苗族自治县', value: '印江土家族苗族自治县' },
        { label: '德江县', value: '德江县' },
        { label: '沿河土家族自治县', value: '沿河土家族自治县' },
        { label: '松桃苗族自治县', value: '松桃苗族自治县' }
      ]},
      { label: '黔西南布依族苗族自治州', value: '黔西南布依族苗族自治州', children: [
        { label: '兴义市', value: '兴义市' },
        { label: '兴仁市', value: '兴仁市' },
        { label: '普安县', value: '普安县' },
        { label: '晴隆县', value: '晴隆县' },
        { label: '贞丰县', value: '贞丰县' },
        { label: '望谟县', value: '望谟县' },
        { label: '册亨县', value: '册亨县' },
        { label: '安龙县', value: '安龙县' }
      ]},
      { label: '黔东南苗族侗族自治州', value: '黔东南苗族侗族自治州', children: [
        { label: '凯里市', value: '凯里市' },
        { label: '黄平县', value: '黄平县' },
        { label: '施秉县', value: '施秉县' },
        { label: '三穗县', value: '三穗县' },
        { label: '镇远县', value: '镇远县' },
        { label: '岑巩县', value: '岑巩县' },
        { label: '天柱县', value: '天柱县' },
        { label: '锦屏县', value: '锦屏县' },
        { label: '剑河县', value: '剑河县' },
        { label: '台江县', value: '台江县' },
        { label: '黎平县', value: '黎平县' },
        { label: '榕江县', value: '榕江县' },
        { label: '从江县', value: '从江县' },
        { label: '雷山县', value: '雷山县' },
        { label: '麻江县', value: '麻江县' },
        { label: '丹寨县', value: '丹寨县' }
      ]},
      { label: '黔南布依族苗族自治州', value: '黔南布依族苗族自治州', children: [
        { label: '都匀市', value: '都匀市' },
        { label: '福泉市', value: '福泉市' },
        { label: '荔波县', value: '荔波县' },
        { label: '贵定县', value: '贵定县' },
        { label: '瓮安县', value: '瓮安县' },
        { label: '独山县', value: '独山县' },
        { label: '平塘县', value: '平塘县' },
        { label: '罗甸县', value: '罗甸县' },
        { label: '长顺县', value: '长顺县' },
        { label: '龙里县', value: '龙里县' },
        { label: '惠水县', value: '惠水县' },
        { label: '三都水族自治县', value: '三都水族自治县' }
      ]}
    ]
  },
  {
    label: '云南省', value: '云南省', children: [
      { label: '昆明市', value: '昆明市', children: [
        { label: '五华区', value: '五华区' },
        { label: '盘龙区', value: '盘龙区' },
        { label: '官渡区', value: '官渡区' },
        { label: '西山区', value: '西山区' },
        { label: '东川区', value: '东川区' },
        { label: '呈贡区', value: '呈贡区' },
        { label: '晋宁区', value: '晋宁区' },
        { label: '安宁市', value: '安宁市' },
        { label: '富民县', value: '富民县' },
        { label: '宜良县', value: '宜良县' },
        { label: '石林彝族自治县', value: '石林彝族自治县' },
        { label: '嵩明县', value: '嵩明县' },
        { label: '禄劝彝族苗族自治县', value: '禄劝彝族苗族自治县' },
        { label: '寻甸回族彝族自治县', value: '寻甸回族彝族自治县' }
      ]},
      { label: '曲靖市', value: '曲靖市', children: [
        { label: '麒麟区', value: '麒麟区' },
        { label: '沾益区', value: '沾益区' },
        { label: '马龙区', value: '马龙区' },
        { label: '宣威市', value: '宣威市' },
        { label: '陆良县', value: '陆良县' },
        { label: '师宗县', value: '师宗县' },
        { label: '罗平县', value: '罗平县' },
        { label: '富源县', value: '富源县' },
        { label: '会泽县', value: '会泽县' }
      ]},
      { label: '玉溪市', value: '玉溪市', children: [
        { label: '红塔区', value: '红塔区' },
        { label: '江川区', value: '江川区' },
        { label: '澄江市', value: '澄江市' },
        { label: '通海县', value: '通海县' },
        { label: '华宁县', value: '华宁县' },
        { label: '易门县', value: '易门县' },
        { label: '峨山彝族自治县', value: '峨山彝族自治县' },
        { label: '新平彝族傣族自治县', value: '新平彝族傣族自治县' },
        { label: '元江哈尼族彝族傣族自治县', value: '元江哈尼族彝族傣族自治县' }
      ]},
      { label: '保山市', value: '保山市', children: [
        { label: '隆阳区', value: '隆阳区' },
        { label: '腾冲市', value: '腾冲市' },
        { label: '施甸县', value: '施甸县' },
        { label: '龙陵县', value: '龙陵县' },
        { label: '昌宁县', value: '昌宁县' }
      ]},
      { label: '昭通市', value: '昭通市', children: [
        { label: '昭阳区', value: '昭阳区' },
        { label: '水富市', value: '水富市' },
        { label: '鲁甸县', value: '鲁甸县' },
        { label: '巧家县', value: '巧家县' },
        { label: '盐津县', value: '盐津县' },
        { label: '大关县', value: '大关县' },
        { label: '永善县', value: '永善县' },
        { label: '绥江县', value: '绥江县' },
        { label: '镇雄县', value: '镇雄县' },
        { label: '彝良县', value: '彝良县' },
        { label: '威信县', value: '威信县' }
      ]},
      { label: '丽江市', value: '丽江市', children: [
        { label: '古城区', value: '古城区' },
        { label: '玉龙纳西族自治县', value: '玉龙纳西族自治县' },
        { label: '永胜县', value: '永胜县' },
        { label: '华坪县', value: '华坪县' },
        { label: '宁蒗彝族自治县', value: '宁蒗彝族自治县' }
      ]},
      { label: '普洱市', value: '普洱市', children: [
        { label: '思茅区', value: '思茅区' },
        { label: '宁洱哈尼族彝族自治县', value: '宁洱哈尼族彝族自治县' },
        { label: '墨江哈尼族自治县', value: '墨江哈尼族自治县' },
        { label: '景东彝族自治县', value: '景东彝族自治县' },
        { label: '景谷彝族傣族自治县', value: '景谷彝族傣族自治县' },
        { label: '镇沅彝族哈尼族拉祜族自治县', value: '镇沅彝族哈尼族拉祜族自治县' },
        { label: '江城哈尼族彝族自治县', value: '江城哈尼族彝族自治县' },
        { label: '孟连傣族拉祜族佤族自治县', value: '孟连傣族拉祜族佤族自治县' },
        { label: '澜沧拉祜族自治县', value: '澜沧拉祜族自治县' },
        { label: '西盟佤族自治县', value: '西盟佤族自治县' }
      ]},
      { label: '临沧市', value: '临沧市', children: [
        { label: '临翔区', value: '临翔区' },
        { label: '凤庆县', value: '凤庆县' },
        { label: '云县', value: '云县' },
        { label: '永德县', value: '永德县' },
        { label: '镇康县', value: '镇康县' },
        { label: '双江拉祜族佤族布朗族傣族自治县', value: '双江拉祜族佤族布朗族傣族自治县' },
        { label: '耿马傣族佤族自治县', value: '耿马傣族佤族自治县' },
        { label: '沧源佤族自治县', value: '沧源佤族自治县' }
      ]},
      { label: '楚雄彝族自治州', value: '楚雄彝族自治州', children: [
        { label: '楚雄市', value: '楚雄市' },
        { label: '禄丰市', value: '禄丰市' },
        { label: '双柏县', value: '双柏县' },
        { label: '牟定县', value: '牟定县' },
        { label: '南华县', value: '南华县' },
        { label: '姚安县', value: '姚安县' },
        { label: '大姚县', value: '大姚县' },
        { label: '永仁县', value: '永仁县' },
        { label: '元谋县', value: '元谋县' },
        { label: '武定县', value: '武定县' }
      ]},
      { label: '红河哈尼族彝族自治州', value: '红河哈尼族彝族自治州', children: [
        { label: '个旧市', value: '个旧市' },
        { label: '开远市', value: '开远市' },
        { label: '蒙自市', value: '蒙自市' },
        { label: '弥勒市', value: '弥勒市' },
        { label: '建水县', value: '建水县' },
        { label: '石屏县', value: '石屏县' },
        { label: '泸西县', value: '泸西县' },
        { label: '元阳县', value: '元阳县' },
        { label: '红河县', value: '红河县' },
        { label: '金平苗族瑶族傣族自治县', value: '金平苗族瑶族傣族自治县' },
        { label: '绿春县', value: '绿春县' },
        { label: '河口瑶族自治县', value: '河口瑶族自治县' },
        { label: '屏边苗族自治县', value: '屏边苗族自治县' }
      ]},
      { label: '文山壮族苗族自治州', value: '文山壮族苗族自治州', children: [
        { label: '文山市', value: '文山市' },
        { label: '砚山县', value: '砚山县' },
        { label: '西畴县', value: '西畴县' },
        { label: '麻栗坡县', value: '麻栗坡县' },
        { label: '马关县', value: '马关县' },
        { label: '丘北县', value: '丘北县' },
        { label: '广南县', value: '广南县' },
        { label: '富宁县', value: '富宁县' }
      ]},
      { label: '西双版纳傣族自治州', value: '西双版纳傣族自治州', children: [
        { label: '景洪市', value: '景洪市' },
        { label: '勐海县', value: '勐海县' },
        { label: '勐腊县', value: '勐腊县' }
      ]},
      { label: '大理白族自治州', value: '大理白族自治州', children: [
        { label: '大理市', value: '大理市' },
        { label: '漾濞彝族自治县', value: '漾濞彝族自治县' },
        { label: '祥云县', value: '祥云县' },
        { label: '宾川县', value: '宾川县' },
        { label: '弥渡县', value: '弥渡县' },
        { label: '南涧彝族自治县', value: '南涧彝族自治县' },
        { label: '巍山彝族回族自治县', value: '巍山彝族回族自治县' },
        { label: '永平县', value: '永平县' },
        { label: '云龙县', value: '云龙县' },
        { label: '洱源县', value: '洱源县' },
        { label: '剑川县', value: '剑川县' },
        { label: '鹤庆县', value: '鹤庆县' }
      ]},
      { label: '德宏傣族景颇族自治州', value: '德宏傣族景颇族自治州', children: [
        { label: '芒市', value: '芒市' },
        { label: '瑞丽市', value: '瑞丽市' },
        { label: '梁河县', value: '梁河县' },
        { label: '盈江县', value: '盈江县' },
        { label: '陇川县', value: '陇川县' }
      ]},
      { label: '怒江傈僳族自治州', value: '怒江傈僳族自治州', children: [
        { label: '泸水市', value: '泸水市' },
        { label: '福贡县', value: '福贡县' },
        { label: '兰坪白族普米族自治县', value: '兰坪白族普米族自治县' },
        { label: '贡山独龙族怒族自治县', value: '贡山独龙族怒族自治县' }
      ]},
      { label: '迪庆藏族自治州', value: '迪庆藏族自治州', children: [
        { label: '香格里拉市', value: '香格里拉市' },
        { label: '德钦县', value: '德钦县' },
        { label: '维西傈僳族自治县', value: '维西傈僳族自治县' }
      ]}
    ]
  }
];

export const regionData: RegionOption[] = [...baseRegionData, ...extraRegionData, ...supplementRegionData];
