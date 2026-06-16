(function () {
  'use strict';

  const Utils = {
    formatDate(date, format = 'YYYY-MM-DD HH:mm') {
      const d = date instanceof Date ? date : new Date(date);
      const pad = n => String(n).padStart(2, '0');
      const map = {
        YYYY: d.getFullYear(),
        MM: pad(d.getMonth() + 1),
        DD: pad(d.getDate()),
        HH: pad(d.getHours()),
        mm: pad(d.getMinutes()),
        ss: pad(d.getSeconds())
      };
      return format.replace(/YYYY|MM|DD|HH|mm|ss/g, m => map[m]);
    },
    formatMoney(n) {
      return '¥' + Number(n).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    showToast(msg, type = 'success', duration = 2000) {
      const toast = document.getElementById('toast');
      if (!toast) return;
      toast.textContent = msg;
      toast.className = 'toast show ' + type;
      setTimeout(() => {
        toast.className = 'toast ' + type;
      }, duration);
    },
    openModal(id) {
      const m = document.getElementById(id);
      if (m) m.classList.add('active');
    },
    closeModal(id) {
      const m = document.getElementById(id);
      if (m) m.classList.remove('active');
    },
    renderPagination(containerId, total, current, onChange) {
      const c = document.getElementById(containerId);
      if (!c) return;
      const size = 10;
      const totalPage = Math.max(1, Math.ceil(total / size));
      let html = `<span>共 ${total} 条记录</span><div class="page-nums">`;
      if (totalPage <= 7) {
        for (let i = 1; i <= totalPage; i++) {
          html += `<span class="page-num ${i === current ? 'active' : ''}" data-page="${i}">${i}</span>`;
        }
      } else {
        html += `<span class="page-num" data-page="${current - 1 < 1 ? 1 : current - 1}">‹</span>`;
        const pages = [1];
        if (current > 4) pages.push('...');
        for (let i = Math.max(2, current - 2); i <= Math.min(totalPage - 1, current + 2); i++) pages.push(i);
        if (current < totalPage - 3) pages.push('...');
        pages.push(totalPage);
        pages.forEach(p => {
          if (p === '...') html += `<span class="page-num">...</span>`;
          else html += `<span class="page-num ${p === current ? 'active' : ''}" data-page="${p}">${p}</span>`;
        });
        html += `<span class="page-num" data-page="${current + 1 > totalPage ? totalPage : current + 1}">›</span>`;
      }
      html += '</div>';
      c.innerHTML = html;
      c.querySelectorAll('.page-num[data-page]').forEach(el => {
        el.addEventListener('click', () => {
          const p = parseInt(el.dataset.page);
          if (p !== current) onChange(p);
        });
      });
    }
  };

  const MockData = {
    products: [
      { id: 1, name: '有机西红柿', category: '时令蔬菜', costPrice: 3.2, salePrice: 5.99, stock: 28, warnStock: 30, sales: 1234, status: 'on', unit: '斤', createdAt: '2024-05-10 09:00', image: 'https://picsum.photos/id/292/80/80', images: ['https://picsum.photos/id/292/400/400', 'https://picsum.photos/id/293/400/400'] },
      { id: 2, name: '新鲜黄瓜', category: '时令蔬菜', costPrice: 1.8, salePrice: 3.99, stock: 200, warnStock: 50, sales: 856, status: 'on', unit: '斤', createdAt: '2024-05-10 09:10', image: 'https://picsum.photos/id/312/80/80', images: ['https://picsum.photos/id/312/400/400'] },
      { id: 3, name: '红富士苹果', category: '新鲜水果', costPrice: 4.5, salePrice: 6.99, stock: 0, warnStock: 40, sales: 2341, status: 'out', unit: '斤', createdAt: '2024-05-10 09:20', image: 'https://picsum.photos/id/431/80/80', images: ['https://picsum.photos/id/431/400/400', 'https://picsum.photos/id/432/400/400', 'https://picsum.photos/id/433/400/400'] },
      { id: 4, name: '土鸡蛋', category: '蛋奶豆品', costPrice: 13.0, salePrice: 19.9, stock: 8, warnStock: 20, sales: 567, status: 'on', unit: '盒', createdAt: '2024-05-10 09:30', image: 'https://picsum.photos/id/326/80/80', images: ['https://picsum.photos/id/326/400/400'] },
      { id: 5, name: '新鲜牛奶', category: '蛋奶豆品', costPrice: 8.5, salePrice: 12.9, stock: 80, warnStock: 30, sales: 789, status: 'on', unit: '瓶', createdAt: '2024-05-10 09:40', image: 'https://picsum.photos/id/401/80/80', images: ['https://picsum.photos/id/401/400/400'] },
      { id: 6, name: '精选五花肉', category: '肉禽蛋品', costPrice: 21.0, salePrice: 28.9, stock: 30, warnStock: 25, sales: 432, status: 'on', unit: '斤', createdAt: '2024-05-10 09:50', image: 'https://picsum.photos/id/570/80/80', images: ['https://picsum.photos/id/570/400/400'] },
      { id: 7, name: '新鲜草莓', category: '新鲜水果', costPrice: 18.0, salePrice: 25.9, stock: 0, warnStock: 15, sales: 1024, status: 'out', unit: '斤', createdAt: '2024-05-10 10:00', image: 'https://picsum.photos/id/580/80/80', images: ['https://picsum.photos/id/580/400/400'] },
      { id: 8, name: '有机西兰花', category: '时令蔬菜', costPrice: 5.5, salePrice: 8.99, stock: 60, warnStock: 20, sales: 567, status: 'on', unit: '个', createdAt: '2024-05-10 10:10', image: 'https://picsum.photos/id/625/80/80', images: ['https://picsum.photos/id/625/400/400'] },
      { id: 9, name: '进口香蕉', category: '新鲜水果', costPrice: 2.8, salePrice: 4.99, stock: 150, warnStock: 40, sales: 1567, status: 'on', unit: '斤', createdAt: '2024-05-10 10:20', image: 'https://picsum.photos/id/1080/80/80', images: ['https://picsum.photos/id/1080/400/400'] },
      { id: 10, name: '新鲜胡萝卜', category: '时令蔬菜', costPrice: 1.2, salePrice: 2.99, stock: 5, warnStock: 50, sales: 678, status: 'on', unit: '斤', createdAt: '2024-05-10 10:30', image: 'https://picsum.photos/id/835/80/80', images: ['https://picsum.photos/id/835/400/400'] },
      { id: 11, name: '三文鱼', category: '海鲜水产', costPrice: 65.0, salePrice: 89.9, stock: 20, warnStock: 10, sales: 234, status: 'on', unit: '斤', createdAt: '2024-05-10 10:40', image: 'https://picsum.photos/id/505/80/80', images: ['https://picsum.photos/id/505/400/400'] },
      { id: 12, name: '原味酸奶', category: '蛋奶豆品', costPrice: 5.5, salePrice: 8.99, stock: 100, warnStock: 40, sales: 1234, status: 'on', unit: '杯', createdAt: '2024-05-10 10:50', image: 'https://picsum.photos/id/401/80/80', images: ['https://picsum.photos/id/401/400/400'] },
      { id: 13, name: '东北大米', category: '粮油调味', costPrice: 3.8, salePrice: 5.99, stock: 500, warnStock: 100, sales: 890, status: 'on', unit: '斤', createdAt: '2024-05-12 08:00', image: 'https://picsum.photos/id/292/80/80', images: ['https://picsum.photos/id/292/400/400'] },
      { id: 14, name: '菜籽油', category: '粮油调味', costPrice: 62.0, salePrice: 88.0, stock: 45, warnStock: 30, sales: 186, status: 'on', unit: '桶', createdAt: '2024-05-12 08:10', image: 'https://picsum.photos/id/312/80/80', images: ['https://picsum.photos/id/312/400/400'] },
      { id: 15, name: '紫皮洋葱', category: '时令蔬菜', costPrice: 1.5, salePrice: 2.59, stock: 0, warnStock: 40, sales: 412, status: 'off', unit: '斤', createdAt: '2024-05-12 08:20', image: 'https://picsum.photos/id/312/80/80', images: ['https://picsum.photos/id/312/400/400'] }
    ],
    preorders: [
      { id: 'PO20240607001', user: '张**', phone: '138****1234', items: [{ name: '有机西红柿', qty: 2, price: 5.99, image: 'https://picsum.photos/id/292/80/80' }, { name: '新鲜黄瓜', qty: 1, price: 3.99, image: 'https://picsum.photos/id/312/80/80' }], qty: 3, amount: 15.97, pickup: '阳光社区店', pickupTime: '2024-06-08 08:00-10:00', status: 'pending', createdAt: '2024-06-07 09:30' },
      { id: 'PO20240607002', user: '李**', phone: '139****5678', items: [{ name: '土鸡蛋', qty: 1, price: 19.9, image: 'https://picsum.photos/id/326/80/80' }, { name: '新鲜牛奶', qty: 2, price: 12.9, image: 'https://picsum.photos/id/401/80/80' }], qty: 3, amount: 45.7, pickup: '绿园小区店', pickupTime: '2024-06-08 09:00-11:00', status: 'picking', createdAt: '2024-06-07 09:15' },
      { id: 'PO20240607003', user: '王**', phone: '137****9012', items: [{ name: '精选五花肉', qty: 1, price: 28.9, image: 'https://picsum.photos/id/570/80/80' }], qty: 1, amount: 28.9, pickup: '阳光社区店', pickupTime: '2024-06-08 10:00-12:00', status: 'ready', createdAt: '2024-06-07 08:50' },
      { id: 'PO20240607004', user: '赵**', phone: '136****3456', items: [{ name: '新鲜草莓', qty: 2, price: 25.9, image: 'https://picsum.photos/id/580/80/80' }, { name: '进口香蕉', qty: 2, price: 4.99, image: 'https://picsum.photos/id/1080/80/80' }], qty: 4, amount: 61.78, pickup: '幸福家园店', pickupTime: '2024-06-07 15:00-17:00', status: 'completed', createdAt: '2024-06-07 08:30' },
      { id: 'PO20240607005', user: '孙**', phone: '135****7890', items: [{ name: '原味酸奶', qty: 4, price: 8.99, image: 'https://picsum.photos/id/401/80/80' }], qty: 4, amount: 35.96, pickup: '阳光社区店', pickupTime: '2024-06-07 14:00-16:00', status: 'completed', createdAt: '2024-06-07 08:00' },
      { id: 'PO20240607006', user: '周**', phone: '134****2345', items: [{ name: '有机西兰花', qty: 3, price: 8.99, image: 'https://picsum.photos/id/625/80/80' }, { name: '新鲜胡萝卜', qty: 2, price: 2.99, image: 'https://picsum.photos/id/835/80/80' }], qty: 5, amount: 32.95, pickup: '绿园小区店', pickupTime: '2024-06-08 08:00-10:00', status: 'pending', createdAt: '2024-06-07 07:45' },
      { id: 'PO20240606012', user: '吴**', phone: '133****6789', items: [{ name: '红富士苹果', qty: 3, price: 6.99, image: 'https://picsum.photos/id/431/80/80' }], qty: 3, amount: 20.97, pickup: '幸福家园店', pickupTime: '2024-06-07 10:00-12:00', status: 'cancelled', createdAt: '2024-06-06 20:30' },
      { id: 'PO20240606011', user: '郑**', phone: '132****0123', items: [{ name: '三文鱼', qty: 0.5, price: 89.9, image: 'https://picsum.photos/id/505/80/80' }, { name: '新鲜牛奶', qty: 3, price: 12.9, image: 'https://picsum.photos/id/401/80/80' }], qty: 4, amount: 83.65, pickup: '阳光社区店', pickupTime: '2024-06-07 09:00-11:00', status: 'ready', createdAt: '2024-06-06 19:15' },
      { id: 'PO20240606010', user: '钱**', phone: '131****4567', items: [{ name: '东北大米', qty: 10, price: 5.99, image: 'https://picsum.photos/id/292/80/80' }], qty: 10, amount: 59.9, pickup: '绿园小区店', pickupTime: '2024-06-07 09:00-11:00', status: 'picking', createdAt: '2024-06-06 18:00' },
      { id: 'PO20240606009', user: '冯**', phone: '130****8901', items: [{ name: '菜籽油', qty: 1, price: 88.0, image: 'https://picsum.photos/id/312/80/80' }, { name: '土鸡蛋', qty: 2, price: 19.9, image: 'https://picsum.photos/id/326/80/80' }], qty: 3, amount: 127.8, pickup: '阳光社区店', pickupTime: '2024-06-07 10:00-12:00', status: 'completed', createdAt: '2024-06-06 16:30' }
    ],
    pickups: [
      { id: 1, name: '阳光社区自提点', region: '北京市朝阳区', address: '阳光小区1号楼1单元101室', hours: '08:00-20:00', phone: '138****8001', manager: '刘大姐', status: 'active', todayOrders: 56, completed: 38, pending: 12 },
      { id: 2, name: '绿园小区自提点', region: '北京市海淀区', address: '绿园小区东门便利店', hours: '07:00-22:00', phone: '139****9002', manager: '王大哥', status: 'active', todayOrders: 42, completed: 30, pending: 8 },
      { id: 3, name: '幸福家园自提点', region: '北京市丰台区', address: '幸福家园小区南门旁', hours: '08:30-21:00', phone: '137****7003', manager: '张阿姨', status: 'active', todayOrders: 35, completed: 28, pending: 5 },
      { id: 4, name: '春风里社区店', region: '北京市西城区', address: '春风里社区服务中心', hours: '09:00-20:00', phone: '136****6004', manager: '李先生', status: 'active', todayOrders: 0, completed: 0, pending: 0 },
      { id: 5, name: '东城驿站', region: '北京市东城区', address: '东城老街区88号', hours: '08:00-18:00', phone: '135****5005', manager: '赵老板', status: 'inactive', todayOrders: 0, completed: 0, pending: 0 }
    ],
    verifyRecords: [
      { id: 'HX20240607001', orderNo: 'PO20240607004', operator: '刘大姐', pickup: '幸福家园店', goodsCount: 2, amount: 61.78, method: '扫码', time: '2024-06-07 15:42' },
      { id: 'HX20240607002', orderNo: 'PO20240607005', operator: '刘大姐', pickup: '阳光社区店', goodsCount: 1, amount: 35.96, method: '扫码', time: '2024-06-07 14:28' },
      { id: 'HX20240607003', orderNo: 'PO20240606009', operator: '张阿姨', pickup: '阳光社区店', goodsCount: 2, amount: 127.8, method: '手动', time: '2024-06-07 11:05' },
      { id: 'HX20240607004', orderNo: 'PO20240606008', operator: '王大哥', pickup: '绿园小区店', goodsCount: 3, amount: 89.5, method: '扫码', time: '2024-06-07 10:32' },
      { id: 'HX20240607005', orderNo: 'PO20240606007', operator: '刘大姐', pickup: '阳光社区店', goodsCount: 1, amount: 28.9, method: '扫码', time: '2024-06-07 09:18' },
      { id: 'HX20240607006', orderNo: 'PO20240606006', operator: '王大哥', pickup: '绿园小区店', goodsCount: 4, amount: 52.6, method: '手动', time: '2024-06-07 09:05' },
      { id: 'HX20240606012', orderNo: 'PO20240606005', operator: '张阿姨', pickup: '幸福家园店', goodsCount: 2, amount: 36.8, method: '扫码', time: '2024-06-06 19:45' },
      { id: 'HX20240606011', orderNo: 'PO20240606004', operator: '刘大姐', pickup: '阳光社区店', goodsCount: 5, amount: 128.5, method: '扫码', time: '2024-06-06 18:22' }
    ],
    coupons: [
      { id: 1, name: '新人专享10元券', type: '新人券', face: '¥10', threshold: '满0可用', used: 1280, total: 2000, start: '2024-06-01', end: '2024-12-31', status: 'active' },
      { id: 2, name: '满50减8通用券', type: '满减券', face: '¥8', threshold: '满50可用', used: 856, total: 1500, start: '2024-06-01', end: '2024-06-30', status: 'active' },
      { id: 3, name: '蔬菜8.5折券', type: '折扣券', face: '8.5折', threshold: '时令蔬菜', used: 432, total: 800, start: '2024-06-05', end: '2024-06-20', status: 'active' },
      { id: 4, name: '水果满100减20', type: '满减券', face: '¥20', threshold: '满100可用', used: 218, total: 500, start: '2024-06-01', end: '2024-06-15', status: 'active' },
      { id: 5, name: '端午节5元券', type: '无门槛券', face: '¥5', threshold: '全场通用', used: 312, total: 1000, start: '2024-06-10', end: '2024-06-12', status: 'not-started' },
      { id: 6, name: '老客回馈券', type: '满减券', face: '¥15', threshold: '满80可用', used: 99, total: 200, start: '2024-05-20', end: '2024-06-05', status: 'ended' }
    ],
    seckills: [
      { id: 1, name: '新鲜草莓特惠', image: 'https://picsum.photos/id/580/100/100', seckillPrice: 15.9, oldPrice: 25.9, stock: 100, sold: 68, end: '2024-06-08 22:00', status: 'active' },
      { id: 2, name: '红富士苹果限时抢', image: 'https://picsum.photos/id/431/100/100', seckillPrice: 3.99, oldPrice: 6.99, stock: 500, sold: 425, end: '2024-06-07 20:00', status: 'active' },
      { id: 3, name: '土鸡蛋秒杀', image: 'https://picsum.photos/id/326/100/100', seckillPrice: 14.9, oldPrice: 19.9, stock: 200, sold: 189, end: '2024-06-07 23:59', status: 'active' },
      { id: 4, name: '东北大米10斤装', image: 'https://picsum.photos/id/292/100/100', seckillPrice: 49.9, oldPrice: 59.9, stock: 300, sold: 156, end: '2024-06-10 20:00', status: 'not-started' }
    ],
    discounts: [
      { id: 1, name: '周末满减惠', rule: '满50减5,满100减12,满200减30', scope: '全场通用', start: '2024-06-08 00:00', end: '2024-06-09 23:59', orders: 0, status: 'not-started' },
      { id: 2, name: '生鲜夏日狂享', rule: '满80减10,满150减25', scope: '时令蔬菜/新鲜水果', start: '2024-06-01 00:00', end: '2024-06-30 23:59', orders: 682, status: 'active' },
      { id: 3, name: '520甜蜜回馈', rule: '满99减20', scope: '指定商品', start: '2024-05-18 00:00', end: '2024-05-20 23:59', orders: 356, status: 'ended' }
    ],
    groups: [
      { id: 1, product: '进口香蕉 5斤装', image: 'https://picsum.photos/id/1080/80/80', groupPrice: 19.9, oldPrice: 24.95, need: 3, active: 28, done: 86, end: '2024-06-10 22:00', status: 'active' },
      { id: 2, product: '有机西红柿 3斤', image: 'https://picsum.photos/id/292/80/80', groupPrice: 14.9, oldPrice: 17.97, need: 5, active: 15, done: 42, end: '2024-06-09 20:00', status: 'active' },
      { id: 3, product: '原味酸奶 8杯', image: 'https://picsum.photos/id/401/80/80', groupPrice: 59.9, oldPrice: 71.92, need: 2, active: 56, done: 168, end: '2024-06-12 22:00', status: 'active' }
    ],
    aftersales: [
      { id: 'AS20240607001', orderNo: 'PO20240607001', type: 'refund', typeText: '仅退款', product: '有机西红柿', user: '张**', phone: '138****1234', amount: 11.98, reason: '商品品质问题，有腐烂', status: 'pending', statusText: '待处理', createdAt: '2024-06-07 10:15', evidence: ['https://picsum.photos/id/1025/200/200', 'https://picsum.photos/id/1025/200/200'], desc: '收到的西红柿有2个已经软了，有异味，申请退款。' },
      { id: 'AS20240607002', orderNo: 'PO20240607002', type: 'return', typeText: '退货退款', product: '新鲜牛奶', user: '李**', phone: '139****5678', amount: 25.8, reason: '收到商品日期不新鲜', status: 'processing', statusText: '处理中', createdAt: '2024-06-07 09:50', evidence: ['https://picsum.photos/id/401/200/200'], desc: '牛奶离生产日期已经15天了，总共才21天保质期。' },
      { id: 'AS20240607003', orderNo: 'PO20240606012', type: 'refund', typeText: '仅退款', product: '红富士苹果', user: '吴**', phone: '133****6789', amount: 20.97, reason: '订单取消', status: 'agreed', statusText: '已同意', createdAt: '2024-06-07 08:30', evidence: [], desc: '临时有事，取消订单。' },
      { id: 'AS20240606018', orderNo: 'PO20240606005', type: 'exchange', typeText: '换货', product: '菜籽油', user: '孙**', phone: '132****1234', amount: 88, reason: '商品破损漏液', status: 'completed', statusText: '已完成', createdAt: '2024-06-06 21:20', evidence: ['https://picsum.photos/id/312/200/200'], desc: '油桶有裂缝，漏油了，希望换一桶。' },
      { id: 'AS20240606017', orderNo: 'PO20240606003', type: 'refund', typeText: '仅退款', product: '新鲜草莓', user: '郑**', phone: '130****5678', amount: 51.8, reason: '商品重量不足', status: 'rejected', statusText: '已拒绝', createdAt: '2024-06-06 17:00', evidence: ['https://picsum.photos/id/580/200/200'], desc: '2斤草莓连盒子才1.8斤。' },
      { id: 'AS20240606016', orderNo: 'PO20240606002', type: 'refund', typeText: '仅退款', product: '有机西兰花', user: '王**', phone: '138****9090', amount: 17.98, reason: '配送超时', status: 'pending', statusText: '待处理', createdAt: '2024-06-06 15:30', evidence: [], desc: '预约时间是上午，下午才送到，已经不需要了。' }
    ],
    dashboardMetrics: {
      todayRevenue: 12580,
      yesterdayRevenue: 11180,
      todayOrders: 156,
      yesterdayOrders: 144,
      todayPreorderCount: 48,
      yesterdayPreorderCount: 40,
      todayPendingVerify: 23,
      yesterdayPendingVerify: 27,
      todayGrossProfit: 5032,
      yesterdayGrossProfit: 4650,
      todayLossAmount: 201.38,
      lossThreshold: 200,
      todayNewCustomers: 23,
      yesterdayNewCustomers: 20
    },
    dailyStats: [
      { date: '2026-06-10', revenue: 5800, orders: 72, loss: 156.8, newCust: 12 },
      { date: '2026-06-11', revenue: 6120, orders: 76, loss: 178.2, newCust: 15 },
      { date: '2026-06-12', revenue: 6340, orders: 79, loss: 145.5, newCust: 18 },
      { date: '2026-06-13', revenue: 7200, orders: 88, loss: 198.6, newCust: 22 },
      { date: '2026-06-14', revenue: 7860, orders: 96, loss: 167.3, newCust: 25 },
      { date: '2026-06-15', revenue: 11180, orders: 144, loss: 189.4, newCust: 20 },
      { date: '2026-06-16', revenue: 12580, orders: 156, loss: 201.38, newCust: 23 }
    ],
    lastWeekDailyStats: [
      { date: '2026-06-03', revenue: 4980, orders: 62, loss: 134.2, newCust: 10 },
      { date: '2026-06-04', revenue: 5120, orders: 64, loss: 145.8, newCust: 12 },
      { date: '2026-06-05', revenue: 5340, orders: 67, loss: 125.5, newCust: 14 },
      { date: '2026-06-06', revenue: 6080, orders: 75, loss: 168.3, newCust: 17 },
      { date: '2026-06-07', revenue: 6560, orders: 81, loss: 142.1, newCust: 20 },
      { date: '2026-06-08', revenue: 9120, orders: 118, loss: 156.7, newCust: 16 },
      { date: '2026-06-09', revenue: 9900, orders: 124, loss: 172.5, newCust: 19 }
    ],
    categorySales: [
      { category: '水果类', revenue: 18102, pct: 42, orders: 268, icon: '🍎' },
      { category: '蔬菜类', revenue: 11186, pct: 26, orders: 312, icon: '🥬' },
      { category: '肉禽蛋', revenue: 7758, pct: 18, orders: 156, icon: '🥩' },
      { category: '乳制品', revenue: 4310, pct: 10, orders: 124, icon: '🥛' },
      { category: '粮油调味', revenue: 1724, pct: 4, orders: 68, icon: '🧂' }
    ],
    hourlyStats: [
      { hour: '00-06', orders: 12, pct: 2 },
      { hour: '06-08', orders: 48, pct: 7 },
      { hour: '08-10', orders: 86, pct: 13 },
      { hour: '10-12', orders: 72, pct: 11 },
      { hour: '12-14', orders: 58, pct: 9 },
      { hour: '14-16', orders: 64, pct: 10 },
      { hour: '16-18', orders: 78, pct: 12 },
      { hour: '18-20', orders: 108, pct: 17 },
      { hour: '20-22', orders: 112, pct: 18 },
      { hour: '22-24', orders: 12, pct: 1 }
    ],
    lossRecords: [
      { id: 'BS20240607001', product: '有机西红柿', qty: 12, amount: 71.88, reason: '自然腐烂', reporter: '刘大姐', time: '2024-06-07 19:30' },
      { id: 'BS20240607002', product: '新鲜草莓', qty: 5, amount: 129.5, reason: '顾客损坏', reporter: '王大哥', time: '2024-06-07 15:20' },
      { id: 'BS20240606008', product: '新鲜牛奶', qty: 8, amount: 103.2, reason: '过期变质', reporter: '张阿姨', time: '2024-06-06 20:00' },
      { id: 'BS20240606007', product: '精选五花肉', qty: 3, amount: 86.7, reason: '冷链异常', reporter: '刘大姐', time: '2024-06-06 10:30' },
      { id: 'BS20240606006', product: '红富士苹果', qty: 20, amount: 139.8, reason: '自然腐烂', reporter: '王大哥', time: '2024-06-06 09:15' },
      { id: 'BS20240605012', product: '新鲜黄瓜', qty: 30, amount: 119.7, reason: '运输损耗', reporter: '张阿姨', time: '2024-06-05 20:45' }
    ],
    _generateThirtyDayStats: function() {
      var stats = [];
      var baseDate = new Date('2026-06-16');
      for (var i = 29; i >= 0; i--) {
        var d = new Date(baseDate);
        d.setDate(d.getDate() - i);
        var dateStr = d.toISOString().slice(0, 10);
        var dayOfWeek = d.getDay();
        var isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        var baseRevenue = 5000 + Math.random() * 4000;
        if (isWeekend) baseRevenue *= 1.3;
        var revenue = Math.round(baseRevenue + Math.sin(i / 3) * 1500);
        var orders = Math.round(revenue / 75 + Math.random() * 20);
        var loss = parseFloat((revenue * 0.02 + Math.random() * 50).toFixed(2));
        var newCust = Math.round(8 + Math.random() * 20);
        stats.push({ date: dateStr, revenue: revenue, orders: orders, loss: loss, newCust: newCust });
      }
      return stats;
    },
    _thirtyDayStats: null,
    getThirtyDayStats: function() {
      if (!this._thirtyDayStats) {
        this._thirtyDayStats = this._generateThirtyDayStats();
      }
      return this._thirtyDayStats;
    },
    getPeriodStats: function(days) {
      if (days > 30) {
        var baseDate = new Date('2026-06-16');
        var stats = [];
        for (var i = days - 1; i >= 0; i--) {
          var d = new Date(baseDate);
          d.setDate(d.getDate() - i);
          var dateStr = d.toISOString().slice(0, 10);
          stats.push({ date: dateStr, revenue: 0, orders: 0, loss: 0, newCust: 0 });
        }
        return stats;
      }
      if (days <= 7) return this.dailyStats.slice(-days);
      var thirty = this.getThirtyDayStats();
      return thirty.slice(-days);
    },
    getPrevPeriodStats: function(days) {
      if (days > 30) {
        var baseDate = new Date('2026-06-16');
        var stats = [];
        for (var i = days * 2 - 1; i >= days; i--) {
          var d = new Date(baseDate);
          d.setDate(d.getDate() - i);
          var dateStr = d.toISOString().slice(0, 10);
          stats.push({ date: dateStr, revenue: 0, orders: 0, loss: 0, newCust: 0 });
        }
        return stats;
      }
      if (days <= 7) {
        var lw = this.lastWeekDailyStats.slice(-days);
        return lw;
      }
      var thirty = this.getThirtyDayStats();
      var start = Math.max(0, thirty.length - days * 2);
      var end = Math.max(0, thirty.length - days);
      return thirty.slice(start, end);
    }
  };

  const AppState = {
    loggedIn: false,
    userName: '张老板',
    productPage: 1,
    preorderPage: 1,
    verifyPage: 1,
    aftersalePage: 1,
    couponPage: 1,
    productTab: 'all',
    preorderTab: 'all',
    editingProductId: null,
    editingPickupId: null,
    verifiedOrder: null,
    productImages: []
  };

  const Auth = {
    init() {
      const saved = localStorage.getItem('ma_user');
      if (saved) {
        try {
          const u = JSON.parse(saved);
          AppState.userName = u.name;
          this.enterApp();
        } catch (e) {}
      }
      document.getElementById('loginForm').addEventListener('submit', e => {
        e.preventDefault();
        const acc = document.getElementById('loginAccount').value.trim();
        const pwd = document.getElementById('loginPassword').value;
        const errEl = document.getElementById('loginError');
        if (!acc || !pwd) {
          errEl.textContent = '请输入账号和密码';
          errEl.classList.add('show');
          return;
        }
        if (acc === 'admin' && pwd === '123456') {
          errEl.classList.remove('show');
          AppState.userName = '张老板';
          if (document.getElementById('rememberMe').checked) {
            localStorage.setItem('ma_user', JSON.stringify({ name: AppState.userName, time: Date.now() }));
          }
          Utils.showToast('登录成功');
          setTimeout(() => this.enterApp(), 400);
        } else {
          errEl.textContent = '账号或密码错误';
          errEl.classList.add('show');
        }
      });
      document.getElementById('logoutBtn').addEventListener('click', () => {
        if (confirm('确定要退出登录吗?')) {
          localStorage.removeItem('ma_user');
          AppState.loggedIn = false;
          document.getElementById('mainApp').style.display = 'none';
          document.getElementById('loginPage').style.display = 'flex';
          Utils.showToast('已退出', 'info');
        }
      });
    },
    enterApp() {
      AppState.loggedIn = true;
      document.getElementById('loginPage').style.display = 'none';
      document.getElementById('mainApp').style.display = 'flex';
      document.getElementById('currentUser').textContent = AppState.userName;
      document.getElementById('currentDate').textContent = Utils.formatDate(new Date(), 'YYYY-MM-DD dddd').replace('dddd', ['日','一','二','三','四','五','六'][new Date().getDay()]);
      Dashboard.init();
    }
  };

  const Navigation = {
    init() {
      const titleMap = {
        dashboard: '工作台',
        preorder: '预售订单管理',
        products: '商品管理',
        pickup: '自提点管理',
        verify: '核销管理',
        marketing: '活动营销管理',
        aftersale: '售后订单管理',
        statistics: '数据统计与损耗'
      };
      document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', () => {
          const page = item.dataset.page;
          document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active'));
          item.classList.add('active');
          document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
          const target = document.getElementById('page-' + page);
          if (target) target.classList.add('active');
          const title = document.getElementById('pageTitle');
          if (title && titleMap[page]) title.textContent = titleMap[page];
        });
      });
      document.querySelectorAll('.more[data-nav]').forEach(a => {
        a.addEventListener('click', e => {
          e.preventDefault();
          const nav = a.dataset.nav;
          const item = document.querySelector(`.menu-item[data-page="${nav}"]`);
          if (item) item.click();
        });
      });
      document.querySelectorAll('[data-close]').forEach(btn => {
        btn.addEventListener('click', () => Utils.closeModal(btn.dataset.close));
      });
      document.querySelectorAll('.modal-mask').forEach(m => {
        m.addEventListener('click', e => {
          const modal = e.target.closest('.modal');
          if (modal) modal.classList.remove('active');
        });
      });
    }
  };

  const Dashboard = {
    currentPeriod: 7,
    isLoading: false,
    init() {
      this.bindTrendEvents();
      this.refreshAll(this.currentPeriod);
      this.renderPendingOrders();
      this.bindCardEvents();
      this.bindBriefingEvents();
      this.renderBusinessBriefing(7);
    },
    bindTrendEvents() {
      var self = this;
      var trendSel = document.getElementById('trendSelect');
      if (trendSel) {
        trendSel.addEventListener('change', function() {
          if (self.isLoading) return;
          var period = parseInt(trendSel.value, 10);
          if (period !== self.currentPeriod) {
            self.refreshAll(period);
          }
        });
      }
    },
    setLoadingState(loading) {
      this.isLoading = loading;
      var trendSel = document.getElementById('trendSelect');
      if (trendSel) trendSel.disabled = loading;

      var statCards = document.querySelectorAll('.stats-grid .stat-card');
      statCards.forEach(function(c) {
        c.classList.toggle('skeleton-loading', loading);
      });
      var metricCards = document.querySelectorAll('.metric-cards .metric-card');
      metricCards.forEach(function(c) {
        c.classList.toggle('skeleton-loading', loading);
      });
      var topProductsEl = document.getElementById('topProducts');
      if (topProductsEl) {
        topProductsEl.parentElement.classList.toggle('skeleton-loading', loading);
        topProductsEl.classList.toggle('skeleton-loading', loading);
      }
      var stockWarnEl = document.getElementById('stockWarnList');
      if (stockWarnEl) {
        stockWarnEl.parentElement.classList.toggle('skeleton-loading', loading);
        stockWarnEl.classList.toggle('skeleton-loading', loading);
      }
    },
    refreshAll(period) {
      var self = this;
      this.currentPeriod = period;
      this.setLoadingState(true);
      this.renderTrendSkeleton(period);

      setTimeout(function() {
        self.renderMetricCards(period);
        self.renderTrend(period);
        self.renderTopProducts(period);
        self.renderStockWarn(period);
        self.setLoadingState(false);
      }, 600);
    },
    renderTrendSkeleton(period) {
      var chart = document.getElementById('trendChart');
      if (!chart) return;
      var count = period;
      var heights = [];
      for (var i = 0; i < count; i++) {
        heights.push(30 + Math.random() * 60);
      }
      chart.innerHTML = '<div class="chart-skeleton">' + heights.map(function(h) {
        return '<div class="skeleton-bar" style="height:' + h + '%"></div>';
      }).join('') + '</div>';
    },
    bindBriefingEvents() {
      var self = this;
      var periodSel = document.getElementById('briefingPeriod');
      var refreshBtn = document.getElementById('btnRefreshBriefing');
      var exportBtn = document.getElementById('btnExportExcel');
      if (periodSel) {
        periodSel.addEventListener('change', function() {
          var period = parseInt(periodSel.value, 10);
          self.renderBusinessBriefing(period);
        });
      }
      if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
          var period = parseInt((periodSel ? periodSel.value : '7'), 10);
          self.renderBusinessBriefing(period);
        });
      }
      if (exportBtn) {
        exportBtn.addEventListener('click', function() {
          var period = parseInt((periodSel ? periodSel.value : '7'), 10);
          self.exportExcel(period);
        });
      }
    },
    renderBusinessBriefing(period) {
      var self = this;
      var contentEl = document.getElementById('briefingContent');
      if (!contentEl) return;
      contentEl.innerHTML = '<div class="briefing-loading">正在生成经营简报...</div>';
      setTimeout(function() {
        var data = self._generateBriefingData(period);
        var upCls = data.revenueChange >= 0 ? 'highlight-up' : 'highlight-down';
        var upArr = data.revenueChange >= 0 ? '↑' : '↓';
        var stockWarnCount = MockData.products.filter(function(p) {
          return p.status !== 'off' && (p.stock === 0 || p.stock <= p.warnStock);
        }).length;
        var periodText = '近 ' + period + ' 日';
        var html = '<div class="briefing-summary">';
        html += periodText + '总营收 <span class="highlight-revenue">' + Utils.formatMoney(data.totalRevenue) + '</span>，';
        html += '环比上周' + (data.revenueChange >= 0 ? '上涨' : '下跌') + ' <span class="' + upCls + '">' + upArr + ' ' + Math.abs(data.revenueChange).toFixed(1) + '%</span>；';
        html += '<br><span class="highlight-category">' + data.topCategory.category + '</span> 营收占比最高 <span class="highlight-category">' + data.topCategory.pct + '%</span>；';
        html += '<br>每日 <span class="highlight-peak">' + data.peakHour + '</span> 为下单高峰；';
        html += '<br>当前共有 <span class="highlight-warn">' + stockWarnCount + '</span> 款商品库存低于预警值，建议及时补货。';
        html += '</div>';
        html += '<div class="briefing-meta">';
        html += '<span>📊 统计周期：' + data.startDate + ' 至 ' + data.endDate + '</span>';
        html += '<span class="badge">AI 智能分析</span>';
        html += '</div>';
        contentEl.innerHTML = html;
      }, 400);
    },
    _generateBriefingData(period) {
      var days = MockData.getPeriodStats(period);
      var lastDays = MockData.getPrevPeriodStats(period);
      var categorySales = MockData.categorySales;
      var hourlyStats = MockData.hourlyStats;
      var totalRevenue = days.reduce(function(s, d) { return s + d.revenue; }, 0);
      var lastTotalRevenue = lastDays.reduce(function(s, d) { return s + d.revenue; }, 0);
      var revenueChange = lastTotalRevenue > 0 ? ((totalRevenue - lastTotalRevenue) / lastTotalRevenue * 100) : 0;
      var topCategory = categorySales.reduce(function(prev, curr) {
        return (prev.pct || 0) > (curr.pct || 0) ? prev : curr;
      }, { category: '水果类', pct: 42 });
      var peakHour = hourlyStats.reduce(function(prev, curr) {
        return (prev.orders || 0) > (curr.orders || 0) ? prev : curr;
      }, { hour: '18-22', orders: 220 }).hour;
      return {
        totalRevenue: totalRevenue,
        lastTotalRevenue: lastTotalRevenue,
        revenueChange: revenueChange,
        topCategory: topCategory,
        peakHour: peakHour,
        startDate: days[0].date,
        endDate: days[days.length - 1].date
      };
    },
    exportExcel(period) {
      var self = this;
      var loading = document.getElementById('exportLoading');
      if (loading) loading.classList.add('show');
      setTimeout(function() {
        try {
          self._doExportExcel(period);
        } catch (e) {
          console.error('导出失败:', e);
          Utils.showToast('导出失败，请重试');
        } finally {
          if (loading) loading.classList.remove('show');
        }
      }, 600);
    },
    _doExportExcel(period) {
      if (typeof XLSX === 'undefined') {
        Utils.showToast('Excel 导出库未加载，请刷新页面');
        return;
      }
      var dailyStats = MockData.getPeriodStats(period);
      var categorySales = JSON.parse(JSON.stringify(MockData.categorySales));
      var hourlyStats = JSON.parse(JSON.stringify(MockData.hourlyStats));
      var lossRecords = MockData.lossRecords.slice().sort(function(a, b) {
        return new Date(b.time) - new Date(a.time);
      }).slice(0, Math.min(20, MockData.lossRecords.length));
      var topProducts = JSON.parse(JSON.stringify(MockData.products))
        .filter(function(p) { return p.status === 'on'; })
        .sort(function(a, b) { return b.sold - a.sold; })
        .slice(0, 10);
      var wb = XLSX.utils.book_new();
      var dailyData = [['日期', '营业额(元)', '订单数', '损耗金额(元)', '新增客户']];
      var totalRev = 0, totalOrders = 0, totalLoss = 0, totalNew = 0;
      dailyStats.forEach(function(d) {
        var r = parseFloat(d.revenue);
        if (isNaN(r) || !isFinite(r) || r < 0) r = 0;
        var o = parseInt(d.orders, 10);
        if (isNaN(o) || !isFinite(o) || o < 0) o = 0;
        var l = parseFloat(d.loss);
        if (isNaN(l) || !isFinite(l) || l < 0) l = 0;
        var n = parseInt(d.newCust, 10);
        if (isNaN(n) || !isFinite(n) || n < 0) n = 0;
        dailyData.push([d.date, r, o, l.toFixed(2), n]);
        totalRev += r; totalOrders += o; totalLoss += l; totalNew += n;
      });
      dailyData.push(['合计', totalRev, totalOrders, totalLoss.toFixed(2), totalNew]);
      var ws1 = XLSX.utils.aoa_to_sheet(dailyData);
      ws1['!cols'] = [{ wch: 12 }, { wch: 14 }, { wch: 10 }, { wch: 15 }, { wch: 12 }];
      XLSX.utils.book_append_sheet(wb, ws1, '每日营收');
      var catData = [['分类', '营收(元)', '占比(%)', '订单数', '代表商品']];
      categorySales.forEach(function(c) {
        var cr = parseFloat(c.revenue);
        if (isNaN(cr) || !isFinite(cr) || cr < 0) cr = 0;
        var cp = parseFloat(c.pct);
        if (isNaN(cp) || !isFinite(cp) || cp < 0) cp = 0;
        var co = parseInt(c.orders, 10);
        if (isNaN(co) || !isFinite(co) || co < 0) co = 0;
        catData.push([c.category, cr, cp, co, c.icon || '']);
      });
      var ws2 = XLSX.utils.aoa_to_sheet(catData);
      ws2['!cols'] = [{ wch: 12 }, { wch: 14 }, { wch: 10 }, { wch: 10 }, { wch: 12 }];
      XLSX.utils.book_append_sheet(wb, ws2, '分类销量');
      var hourData = [['时段', '订单数', '占比(%)']];
      hourlyStats.forEach(function(h) {
        var ho = parseInt(h.orders, 10);
        if (isNaN(ho) || !isFinite(ho) || ho < 0) ho = 0;
        var hp = parseFloat(h.pct);
        if (isNaN(hp) || !isFinite(hp) || hp < 0) hp = 0;
        hourData.push([h.hour, ho, hp]);
      });
      var ws3 = XLSX.utils.aoa_to_sheet(hourData);
      ws3['!cols'] = [{ wch: 10 }, { wch: 10 }, { wch: 10 }];
      XLSX.utils.book_append_sheet(wb, ws3, '时段销量');
      var lossData = [['损耗单号', '商品', '数量', '金额(元)', '原因', '上报人', '上报时间']];
      lossRecords.forEach(function(l) {
        var lq = parseInt(l.qty, 10);
        if (isNaN(lq) || !isFinite(lq) || lq < 0) lq = 0;
        var la = parseFloat(l.amount);
        if (isNaN(la) || !isFinite(la) || la < 0) la = 0;
        lossData.push([l.id, l.product, lq, la.toFixed(2), l.reason, l.reporter, l.time]);
      });
      var ws4 = XLSX.utils.aoa_to_sheet(lossData);
      ws4['!cols'] = [{ wch: 18 }, { wch: 14 }, { wch: 8 }, { wch: 12 }, { wch: 14 }, { wch: 10 }, { wch: 20 }];
      XLSX.utils.book_append_sheet(wb, ws4, '损耗记录');
      var topData = [['排名', '商品名称', '分类', '售价(元)', '销量', '销售额(元)', '库存']];
      topProducts.forEach(function(p, i) {
        var price = parseFloat(p.price);
        if (isNaN(price) || typeof price !== 'number' || !isFinite(price) || price < 0) price = 0;
        var sold = parseInt(p.sold, 10);
        if (isNaN(sold) || typeof sold !== 'number' || !isFinite(sold) || sold < 0) sold = 0;
        var saleAmount = (price * sold).toFixed(2);
        topData.push([i + 1, p.name, p.category, price, sold, saleAmount, p.stock + p.unit]);
      });
      var ws5 = XLSX.utils.aoa_to_sheet(topData);
      ws5['!cols'] = [{ wch: 8 }, { wch: 18 }, { wch: 10 }, { wch: 10 }, { wch: 8 }, { wch: 14 }, { wch: 10 }];
      XLSX.utils.book_append_sheet(wb, ws5, '热销商品TOP10');
      var today = new Date();
      var y = today.getFullYear();
      var m = String(today.getMonth() + 1).padStart(2, '0');
      var d = String(today.getDate()).padStart(2, '0');
      var fileName = '经营报表_' + y + m + d + '_近' + period + '日.xlsx';
      XLSX.writeFile(wb, fileName);
      Utils.showToast('导出成功：' + fileName);
    },
    bindCardEvents() {
      var self = this;
      var _isNavigating = false;
      var tooltip = document.getElementById('cardTooltip');
      if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'cardTooltip';
        tooltip.className = 'card-tooltip';
        tooltip.innerHTML = '<div class="card-tooltip-title" id="ctTitle"></div><div class="card-tooltip-desc" id="ctDesc"></div>';
        document.body.appendChild(tooltip);
      }
      var navLoader = document.getElementById('cardNavLoader');
      if (!navLoader) {
        navLoader = document.createElement('div');
        navLoader.id = 'cardNavLoader';
        navLoader.className = 'card-nav-loader';
        navLoader.innerHTML = '<div class="loader-spinner"></div><div class="loader-text">加载中...</div>';
        document.body.appendChild(navLoader);
      }
      var cards = document.querySelectorAll('.card-clickable');
      cards.forEach(function(card) {
        card.addEventListener('click', function() {
          if (_isNavigating) return;
          var nav = card.getAttribute('data-nav');
          if (!nav) return;
          var item = document.querySelector('.menu-item[data-page="' + nav + '"]');
          if (!item) return;
          _isNavigating = true;
          card.classList.add('card-navigating');
          navLoader.classList.add('show');
          tooltip.classList.remove('show');
          setTimeout(function() {
            item.click();
            setTimeout(function() {
              card.classList.remove('card-navigating');
              navLoader.classList.remove('show');
              _isNavigating = false;
            }, 350);
          }, 120);
        });
        card.addEventListener('mouseenter', function(e) {
          if (_isNavigating) return;
          var tooltipText = card.getAttribute('data-tooltip');
          var statLabel = card.querySelector('.stat-label');
          var metricTitle = card.querySelector('.metric-title');
          var title = statLabel ? statLabel.textContent : (metricTitle ? metricTitle.textContent : '');
          if (tooltipText) {
            document.getElementById('ctTitle').textContent = title;
            document.getElementById('ctDesc').textContent = tooltipText;
            tooltip.classList.add('show');
            self.positionTooltip(e, card, tooltip);
          }
        });
        card.addEventListener('mousemove', function(e) {
          if (tooltip.classList.contains('show')) {
            self.positionTooltip(e, card, tooltip);
          }
        });
        card.addEventListener('mouseleave', function() {
          tooltip.classList.remove('show');
        });
      });
    },
    positionTooltip(e, card, tooltip) {
      var rect = card.getBoundingClientRect();
      var tooltipRect = tooltip.getBoundingClientRect();
      var top = rect.bottom + 12;
      var left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
      if (left < 10) left = 10;
      if (left + tooltipRect.width > window.innerWidth - 10) {
        left = window.innerWidth - tooltipRect.width - 10;
      }
      if (top + tooltipRect.height > window.innerHeight - 10) {
        top = rect.top - tooltipRect.height - 12;
        tooltip.classList.add('tooltip-bottom');
        tooltip.style.top = top + 'px';
        tooltip.style.left = left + 'px';
      } else {
        tooltip.classList.remove('tooltip-bottom');
        tooltip.style.top = top + 'px';
        tooltip.style.left = left + 'px';
      }
    },
    _computePeriodMetrics(period) {
      var days = MockData.getPeriodStats(period);
      var prevDays = MockData.getPrevPeriodStats(period);
      var sum = function(arr, key) { return arr.reduce(function(s, d) { return s + (d[key] || 0); }, 0); };
      var totalRevenue = sum(days, 'revenue');
      var prevRevenue = sum(prevDays, 'revenue');
      var totalOrders = sum(days, 'orders');
      var prevOrders = sum(prevDays, 'orders');
      var totalLoss = sum(days, 'loss');
      var totalNewCust = sum(days, 'newCust');
      var prevNewCust = sum(prevDays, 'newCust');
      var avgOrder = totalOrders > 0 ? totalRevenue / totalOrders : 0;
      var prevAvgOrder = prevOrders > 0 ? prevRevenue / prevOrders : 0;
      var grossProfitRate = 0.4;
      var grossProfit = totalRevenue * grossProfitRate;
      var prevGrossProfit = prevRevenue * grossProfitRate;
      return {
        totalRevenue: totalRevenue,
        prevRevenue: prevRevenue,
        totalOrders: totalOrders,
        prevOrders: prevOrders,
        totalLoss: totalLoss,
        totalNewCust: totalNewCust,
        prevNewCust: prevNewCust,
        avgOrder: avgOrder,
        prevAvgOrder: prevAvgOrder,
        grossProfit: grossProfit,
        prevGrossProfit: prevGrossProfit,
        hasData: totalOrders > 0,
        lossThreshold: MockData.dashboardMetrics.lossThreshold * (period / 7),
        pendingVerify: Math.round(MockData.dashboardMetrics.todayPendingVerify * (period / 7 * 0.3 + 0.7)),
        prevPendingVerify: Math.round(MockData.dashboardMetrics.yesterdayPendingVerify * (period / 7 * 0.3 + 0.7)),
        preorderCount: Math.round(MockData.dashboardMetrics.todayPreorderCount * (period / 7 * 0.3 + 0.7)),
        prevPreorderCount: Math.round(MockData.dashboardMetrics.yesterdayPreorderCount * (period / 7 * 0.3 + 0.7))
      };
    },
    _renderTrend(el, periodLabel, cur, prev, up, hasData) {
      var trendEl = el.parentElement.querySelector('.stat-trend') || el.parentElement.querySelector('.metric-trend');
      if (!trendEl) return;
      if (hasData === false) {
        trendEl.textContent = '暂无数据';
        trendEl.className = (trendEl.classList.contains('metric-trend') ? 'metric-trend ' : 'stat-trend ') + '';
        trendEl.style.color = '#94a3b8';
        return;
      }
      trendEl.style.color = '';
      var pct = prev > 0 ? ((cur - prev) / prev * 100) : 0;
      var isUp = pct >= 0;
      if (up !== undefined) isUp = up;
      trendEl.textContent = (isUp ? '↑ ' : '↓ ') + Math.abs(pct).toFixed(1) + '% 较上周期';
      trendEl.className = (trendEl.classList.contains('metric-trend') ? 'metric-trend ' : 'stat-trend ') + (isUp ? 'up' : 'down');
    },
    renderMetricCards(period) {
      var m = this._computePeriodMetrics(period);
      var self = this;
      var periodLabel = period + '日';
      var hasData = m.hasData;

      var revEl = document.getElementById('statTodayRevenue');
      if (revEl) {
        revEl.textContent = hasData ? Utils.formatMoney(m.totalRevenue) : '¥0';
        revEl.parentElement.querySelector('.stat-label').textContent = periodLabel + '营业额';
      }
      self._renderTrend(revEl, periodLabel, m.totalRevenue, m.prevRevenue, undefined, hasData);

      var ordersEl = document.getElementById('statTodayOrders');
      if (ordersEl) {
        ordersEl.textContent = hasData ? m.totalOrders : '0';
        ordersEl.parentElement.querySelector('.stat-label').textContent = periodLabel + '订单数';
      }
      self._renderTrend(ordersEl, periodLabel, m.totalOrders, m.prevOrders, undefined, hasData);

      var preEl = document.getElementById('statPreorderCount');
      if (preEl) {
        preEl.textContent = hasData ? m.preorderCount : '0';
        preEl.parentElement.querySelector('.stat-label').textContent = periodLabel + '预售订单';
      }
      self._renderTrend(preEl, periodLabel, m.preorderCount, m.prevPreorderCount, undefined, hasData);

      var verifyEl = document.getElementById('statPendingVerify');
      if (verifyEl) {
        verifyEl.textContent = hasData ? m.pendingVerify : '0';
        verifyEl.parentElement.querySelector('.stat-label').textContent = periodLabel + '待核销';
      }
      self._renderTrend(verifyEl, periodLabel, m.pendingVerify, m.prevPendingVerify, m.pendingVerify <= m.prevPendingVerify, hasData);

      var onSaleProducts = MockData.products.filter(function(p) { return p.status === 'on'; });
      var onSaleCount = onSaleProducts.length;
      var stockWarnCount = onSaleProducts.filter(function(p) { return p.stock <= p.warnStock; }).length;
      var pendingAftersale = MockData.aftersales.filter(function(a) { return a.status === 'pending'; }).length;

      var gpEl = document.getElementById('mcGrossProfit');
      var gpTrendEl = document.getElementById('mcGrossProfitTrend');
      var gpCardHeader = gpEl ? gpEl.closest('.metric-card').querySelector('.metric-title') : null;
      if (gpCardHeader) gpCardHeader.textContent = periodLabel + '毛利';
      if (gpEl) gpEl.textContent = hasData ? Utils.formatMoney(m.grossProfit) : '¥0';
      if (gpTrendEl) {
        if (!hasData) {
          gpTrendEl.textContent = '暂无数据';
          gpTrendEl.className = 'metric-trend';
          gpTrendEl.style.color = '#94a3b8';
        } else {
          gpTrendEl.style.color = '';
          var gpPct = m.prevGrossProfit > 0 ? ((m.grossProfit - m.prevGrossProfit) / m.prevGrossProfit * 100) : 0;
          var gpUp = gpPct >= 0;
          gpTrendEl.textContent = (gpUp ? '↑ ' : '↓ ') + Math.abs(gpPct).toFixed(1) + '% 较上周期';
          gpTrendEl.className = 'metric-trend ' + (gpUp ? 'up' : 'down');
        }
      }

      var avgEl = document.getElementById('mcAvgOrder');
      var avgTrendEl = document.getElementById('mcAvgOrderTrend');
      var avgCardHeader = avgEl ? avgEl.closest('.metric-card').querySelector('.metric-title') : null;
      if (avgCardHeader) avgCardHeader.textContent = periodLabel + '客单价';
      if (avgEl) avgEl.textContent = hasData ? Utils.formatMoney(m.avgOrder) : '¥0';
      if (avgTrendEl) {
        if (!hasData) {
          avgTrendEl.textContent = '暂无数据';
          avgTrendEl.className = 'metric-trend';
          avgTrendEl.style.color = '#94a3b8';
        } else {
          avgTrendEl.style.color = '';
          var avgPct = m.prevAvgOrder > 0 ? ((m.avgOrder - m.prevAvgOrder) / m.prevAvgOrder * 100) : 0;
          var avgUp = avgPct >= 0;
          avgTrendEl.textContent = (avgUp ? '↑ ' : '↓ ') + Math.abs(avgPct).toFixed(1) + '% 较上周期';
          avgTrendEl.className = 'metric-trend ' + (avgUp ? 'up' : 'down');
        }
      }

      var lossEl = document.getElementById('mcLossAmount');
      var lossCard = document.getElementById('metricLossAmount');
      var lossThresholdEl = document.getElementById('mcLossThreshold');
      var lossCardHeader = lossEl ? lossEl.closest('.metric-card').querySelector('.metric-title') : null;
      if (lossCardHeader) lossCardHeader.textContent = periodLabel + '损耗金额';
      if (lossEl) lossEl.textContent = hasData ? Utils.formatMoney(m.totalLoss) : '¥0.00';
      if (lossCard) {
        lossCard.classList.toggle('threshold-alert', m.totalLoss > m.lossThreshold);
      }
      if (lossThresholdEl) {
        if (!hasData) {
          lossThresholdEl.textContent = '当前周期暂无损耗数据';
          lossThresholdEl.className = 'metric-sub-text';
        } else if (m.totalLoss > m.lossThreshold) {
          lossThresholdEl.textContent = '超出预警阈值 ¥' + m.lossThreshold.toFixed(0);
          lossThresholdEl.className = 'metric-sub-text danger';
        } else {
          lossThresholdEl.textContent = '预警阈值 ¥' + m.lossThreshold.toFixed(0);
          lossThresholdEl.className = 'metric-sub-text';
        }
      }

      var onSaleEl = document.getElementById('mcOnSaleCount');
      var stockWarnEl = document.getElementById('mcStockWarnCount');
      if (onSaleEl) onSaleEl.textContent = onSaleCount;
      if (stockWarnEl) {
        stockWarnEl.textContent = '库存预警商品 ' + stockWarnCount + ' 件';
        stockWarnEl.className = stockWarnCount > 0 ? 'metric-sub-text warn' : 'metric-sub-text';
      }

      var newCustEl = document.getElementById('mcNewCustomers');
      var newCustTrendEl = document.getElementById('mcNewCustomersTrend');
      var newCustCardHeader = newCustEl ? newCustEl.closest('.metric-card').querySelector('.metric-title') : null;
      if (newCustCardHeader) newCustCardHeader.textContent = periodLabel + '新增客户';
      if (newCustEl) newCustEl.textContent = hasData ? m.totalNewCust : '0';
      if (newCustTrendEl) {
        if (!hasData) {
          newCustTrendEl.textContent = '暂无数据';
          newCustTrendEl.className = 'metric-trend';
          newCustTrendEl.style.color = '#94a3b8';
        } else {
          newCustTrendEl.style.color = '';
          var ncPct = m.prevNewCust > 0 ? ((m.totalNewCust - m.prevNewCust) / m.prevNewCust * 100) : 0;
          var ncUp = ncPct >= 0;
          newCustTrendEl.textContent = (ncUp ? '↑ ' : '↓ ') + Math.abs(ncPct).toFixed(1) + '% 较上周期';
          newCustTrendEl.className = 'metric-trend ' + (ncUp ? 'up' : 'down');
        }
      }

      var pendingEl = document.getElementById('mcPendingAftersale');
      if (pendingEl) pendingEl.textContent = pendingAftersale;
    },
    renderTrend(period) {
      var chart = document.getElementById('trendChart');
      if (!chart) return;
      var days = MockData.getPeriodStats(period);
      var data = days.map(function(d) { return d.revenue; });
      var hasData = data.some(function(v) { return v > 0; });

      if (!hasData) {
        chart.innerHTML = '<div class="chart-empty-state"><div class="empty-icon">📊</div><div class="empty-text">当前周期暂无销售数据</div></div>';
        return;
      }

      var labels = days.map(function(d) {
        var dt = new Date(d.date);
        return (dt.getMonth() + 1) + '/' + dt.getDate();
      });
      var max = Math.max.apply(null, data);
      if (max === 0) max = 1;

      var step = 1;
      if (period > 15) step = Math.ceil(period / 10);

      chart.innerHTML = data.map(function(v, i) {
        var h = (v / max) * 100;
        var showLabel = (i % step === 0) || (i === data.length - 1);
        return '<div class="bar" style="height:' + h + '%">' +
               '<span class="bar-value">¥' + v.toLocaleString() + '</span>' +
               (showLabel ? '<span class="bar-label">' + labels[i] + '</span>' : '<span class="bar-label" style="opacity:0;">' + labels[i] + '</span>') +
               '</div>';
      }).join('');
    },
    renderTopProducts(period) {
      var el = document.getElementById('topProducts');
      if (!el) return;
      var factor = period / 7;
      var sorted = MockData.products
        .filter(function(p) { return p.status === 'on'; })
        .map(function(p) {
          var sales = Math.round((p.sales || 0) * factor * (0.8 + Math.random() * 0.4));
          return Object.assign({}, p, { periodSales: sales });
        })
        .sort(function(a, b) { return b.periodSales - a.periodSales; })
        .slice(0, 5);

      var hasData = sorted.some(function(p) { return p.periodSales > 0; });
      if (!hasData) {
        el.innerHTML = '<div class="chart-empty-state" style="padding:32px 24px;"><div class="empty-icon" style="font-size:48px;">🏆</div><div class="empty-text">当前周期暂无热销数据</div></div>';
        return;
      }

      var rankClass = ['first', 'second', 'third', '', ''];
      el.innerHTML = sorted.map(function(p, i) {
        var amount = (p.periodSales * (p.salePrice || p.price || 0)).toFixed(0);
        return '<div class="rank-item">' +
               '<span class="rank-num ' + rankClass[i] + '">' + (i + 1) + '</span>' +
               '<img src="' + p.image + '" class="rank-img">' +
               '<div class="rank-info">' +
               '<div class="rank-name">' + p.name + '</div>' +
               '<div class="rank-sales">销量：' + p.periodSales + p.unit + '</div>' +
               '</div>' +
               '<div class="rank-amount">¥' + amount + '</div>' +
               '</div>';
      }).join('');
    },
    renderPendingOrders() {
      var el = document.getElementById('pendingOrders');
      if (!el) return;
      var statusMap = { pending: { t: '待备货', c: 'pending' }, picking: { t: '分拣中', c: 'picking' }, ready: { t: '待自提', c: 'ready' } };
      var list = MockData.preorders.filter(function(o) { return ['pending','picking','ready'].indexOf(o.status) >= 0; }).slice(0, 3);
      el.innerHTML = list.length ? list.map(function(o) {
        var s = statusMap[o.status];
        return '<tr>' +
          '<td>' + o.id + '</td>' +
          '<td>' + o.items.map(function(i) { return i.name; }).join('、') + '</td>' +
          '<td>' + o.pickup + '</td>' +
          '<td class="price">' + Utils.formatMoney(o.amount) + '</td>' +
          '<td><span class="status-badge ' + s.c + '">' + s.t + '</span></td>' +
          '<td>' + o.createdAt + '</td>' +
          '<td><button class="btn btn-outline btn-sm" onclick="App.showOrderDetail(\'' + o.id + '\')">查看详情</button></td>' +
        '</tr>';
      }).join('') : '<tr><td colspan="7" style="text-align:center;color:#94a3b8;padding:32px;">暂无待处理订单</td></tr>';
    },
    renderStockWarn(period) {
      var el = document.getElementById('stockWarnList');
      if (!el) return;
      var factor = period / 7;
      var warn = MockData.products
        .filter(function(p) { return p.status !== 'off'; })
        .map(function(p) {
          var sales7 = (p.sales || 0);
          var salesPeriod = Math.round(sales7 * factor);
          var dynamicStock = Math.max(0, (p.stock || 0) - salesPeriod + sales7);
          return Object.assign({}, p, { dynamicStock: dynamicStock });
        })
        .filter(function(p) {
          return p.dynamicStock === 0 || p.dynamicStock <= (p.warnStock || 0);
        })
        .sort(function(a, b) { return a.dynamicStock - b.dynamicStock; });

      var hasWarn = warn.length > 0;
      if (!hasWarn) {
        el.innerHTML = '<div class="chart-empty-state" style="padding:32px 24px;"><div class="empty-icon" style="font-size:48px;">✅</div><div class="empty-text">当前周期库存状态良好</div></div>';
        return;
      }

      el.innerHTML = warn.slice(0, 5).map(function(p) {
        var danger = p.dynamicStock === 0 || p.dynamicStock <= (p.warnStock || 0) / 2;
        return '<div class="stock-warn-item ' + (danger ? 'danger' : '') + '">' +
               '<img src="' + p.image + '" class="warn-img">' +
               '<div class="warn-info">' +
               '<div class="warn-name">' + p.name + '</div>' +
               '<div class="warn-detail">预估库存: ' + p.dynamicStock + p.unit + ' / 预警: ' + p.warnStock + p.unit + '</div>' +
               '</div>' +
               '</div>';
      }).join('');
    }
  };

  const ImageUploader = {
    MAX_IMAGES: 6,
    MAX_SIZE: 5 * 1024 * 1024,
    ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    ALLOWED_EXT: ['.jpg', '.jpeg', '.png', '.webp'],
    UPLOAD_URL: '/api/upload',

    _uid: 0,

    genId() {
      return 'img_' + (++this._uid) + '_' + Date.now().toString(36);
    },

    createItem(file, previewUrl) {
      const signature = file ? {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        lastModified: file.lastModified || Date.now()
      } : null;
      return {
        uid: this.genId(),
        file: file || null,
        fileSignature: signature,
        localPreview: previewUrl || '',
        remoteUrl: '',
        fileName: file ? file.name : '',
        fileSize: file ? file.size : 0,
        fileType: file ? file.type : '',
        status: 'uploading',
        errorMsg: ''
      };
    },

    createExistingItem(url, index) {
      return {
        uid: this.genId(),
        file: null,
        localPreview: '',
        remoteUrl: url,
        fileName: '图片' + (index + 1),
        fileSize: 0,
        fileType: '',
        status: 'success',
        errorMsg: ''
      };
    },

    findById(uid) {
      return AppState.productImages.find(img => img.uid === uid) || null;
    },

    findIndexByUid(uid) {
      return AppState.productImages.findIndex(img => img.uid === uid);
    },

    getDisplayUrl(img) {
      if (img.status === 'success' && img.remoteUrl) return img.remoteUrl;
      if (img.localPreview) return img.localPreview;
      return img.remoteUrl || '';
    },

    validateFileIntegrity(img) {
      if (!img) return { valid: false, reason: '图片记录不存在' };
      if (!img.file) return { valid: false, reason: '文件引用已丢失' };
      if (!(img.file instanceof File) && !(img.file instanceof Blob)) {
        return { valid: false, reason: '文件对象类型异常' };
      }
      if (img.fileSignature) {
        const sig = img.fileSignature;
        if (img.file.name !== sig.fileName) return { valid: false, reason: '文件名与原始记录不一致' };
        if (img.file.size !== sig.fileSize) return { valid: false, reason: '文件大小与原始记录不一致，文件可能已损坏' };
        if (sig.fileType && img.file.type !== sig.fileType) return { valid: false, reason: '文件类型与原始记录不一致' };
        if (sig.lastModified && img.file.lastModified && img.file.lastModified !== sig.lastModified) {
          return { valid: false, reason: '文件修改时间不一致，文件可能已被替换' };
        }
      }
      if (img.file.size <= 0) return { valid: false, reason: '文件大小为 0，可能已失效' };
      return { valid: true };
    },

    markFileLost(img) {
      img.file = null;
      img.status = 'error';
      img.errorMsg = '原始文件已失效，请删除后重新选择';
    },

    init() {
      this.fileInput = document.getElementById('productImageInput');
      this.listEl = document.getElementById('productImageList');
      this.addBtn = document.getElementById('addImageBtn');

      if (!this.fileInput || !this.listEl || !this.addBtn) return;

      this.addBtn.addEventListener('click', () => this.fileInput.click());
      this.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));

      this.listEl.addEventListener('click', (e) => {
        const delBtn = e.target.closest('.delete-btn');
        if (delBtn) {
          this.removeImage(delBtn.dataset.uid);
          return;
        }
        const retryBtn = e.target.closest('.retry-btn');
        if (retryBtn) {
          this.retryUpload(retryBtn.dataset.uid);
        }
      });

      this.listEl.addEventListener('dragstart', (e) => this.handleDragStart(e));
      this.listEl.addEventListener('dragend', (e) => this.handleDragEnd(e));
      this.listEl.addEventListener('dragover', (e) => this.handleDragOver(e));
      this.listEl.addEventListener('dragleave', (e) => this.handleDragLeave(e));
      this.listEl.addEventListener('drop', (e) => this.handleDrop(e));
    },

    validateFile(file) {
      if (!this.ALLOWED_TYPES.includes(file.type)) {
        const ext = '.' + file.name.split('.').pop().toLowerCase();
        if (!this.ALLOWED_EXT.includes(ext)) {
          return { valid: false, message: '图片格式不支持，请上传 jpg、png 或 webp 格式' };
        }
      }
      if (file.size > this.MAX_SIZE) {
        return { valid: false, message: `图片「${file.name}」大小不能超过 5M` };
      }
      return { valid: true };
    },

    handleFileSelect(e) {
      const files = Array.from(e.target.files);
      if (!files.length) return;

      const nonUploading = AppState.productImages.filter(img => img.status !== 'uploading').length;
      const remaining = this.MAX_IMAGES - nonUploading;
      if (remaining <= 0) {
        Utils.showToast(`最多只能上传 ${this.MAX_IMAGES} 张图片`, 'error');
        e.target.value = '';
        return;
      }

      const toProcess = files.slice(0, remaining);
      toProcess.forEach(file => {
        const v = this.validateFile(file);
        if (!v.valid) {
          Utils.showToast(v.message, 'error');
          return;
        }
        this.startUpload(file);
      });

      e.target.value = '';
      if (files.length > remaining) {
        Utils.showToast(`已超过 ${this.MAX_IMAGES} 张，只处理前 ${remaining} 张`, 'info');
      }
    },

    startUpload(file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const item = this.createItem(file, ev.target.result);
        AppState.productImages.push(item);
        this.render();
        this.updateAddBtnVisibility();
        this.doUpload(item.uid);
      };
      reader.readAsDataURL(file);
    },

    doUpload(uid) {
      const item = this.findById(uid);
      if (!item) return;

      const integrity = this.validateFileIntegrity(item);
      if (!integrity.valid) {
        this.markFileLost(item);
        Utils.showToast(`图片「${item.fileName || '未命名'}」${integrity.reason}，请删除后重新选择`, 'error');
        this.render();
        this.updateAddBtnVisibility();
        return;
      }

      item.status = 'uploading';
      item.errorMsg = '';
      this.render();

      this.mockUpload(item.file).then(result => {
        const current = this.findById(uid);
        if (!current) return;

        if (result.success) {
          current.status = 'success';
          current.remoteUrl = result.url;
        } else {
          current.status = 'error';
          current.errorMsg = result.message;
          Utils.showToast(`图片「${current.fileName}」上传失败：${result.message}`, 'error');
        }
        this.render();
        this.updateAddBtnVisibility();
      });
    },

    retryUpload(uid) {
      const item = this.findById(uid);
      if (!item) return;

      const integrity = this.validateFileIntegrity(item);
      if (!integrity.valid) {
        this.markFileLost(item);
        Utils.showToast(`${integrity.reason}，请删除后重新选择图片`, 'error');
        this.render();
        this.updateAddBtnVisibility();
        return;
      }

      item.status = 'uploading';
      item.errorMsg = '';
      this.render();

      this.mockUpload(item.file).then(result => {
        const current = this.findById(uid);
        if (!current) return;

        if (result.success) {
          current.status = 'success';
          current.remoteUrl = result.url;
          Utils.showToast('图片重新上传成功', 'success');
        } else {
          current.status = 'error';
          current.errorMsg = result.message;
          Utils.showToast(`重新上传失败：${result.message}`, 'error');
        }
        this.render();
        this.updateAddBtnVisibility();
      });
    },

    mockUpload(file) {
      return new Promise((resolve) => {
        const delay = 1000 + Math.random() * 1500;
        setTimeout(() => {
          const success = Math.random() > 0.2;
          if (success) {
            const id = Math.floor(Math.random() * 1000);
            resolve({ success: true, url: `https://picsum.photos/id/${id}/400/400`, message: '上传成功' });
          } else {
            const msgs = ['服务器连接超时，请重试', '图片上传接口异常', '网络波动，请稍后再试', '图片格式校验失败'];
            resolve({ success: false, url: '', message: msgs[Math.floor(Math.random() * msgs.length)] });
          }
        }, delay);
      });
    },

    removeImage(uid) {
      const idx = this.findIndexByUid(uid);
      if (idx === -1) return;
      AppState.productImages.splice(idx, 1);
      this.render();
      this.updateAddBtnVisibility();
    },

    handleDragStart(e) {
      const el = e.target.closest('.image-item');
      if (!el) return;

      const uid = el.dataset.uid;
      const item = this.findById(uid);
      if (!item || item.status !== 'success') {
        e.preventDefault();
        return;
      }

      this._dragUid = uid;
      el.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', uid);
    },

    handleDragEnd(e) {
      const el = e.target.closest('.image-item');
      if (el) el.classList.remove('dragging');
      this.listEl.querySelectorAll('.image-item').forEach(n => n.classList.remove('drag-over'));
      this._dragUid = undefined;
    },

    handleDragOver(e) {
      e.preventDefault();
      const el = e.target.closest('.image-item');
      const item = el ? this.findById(el.dataset.uid) : null;

      if (!item || item.status !== 'success') {
        e.dataTransfer.dropEffect = 'none';
        return;
      }

      e.dataTransfer.dropEffect = 'move';
      this.listEl.querySelectorAll('.image-item').forEach(n => n.classList.remove('drag-over'));
      if (el) el.classList.add('drag-over');
    },

    handleDragLeave(e) {
      const el = e.target.closest('.image-item');
      if (el && !el.contains(e.relatedTarget)) {
        el.classList.remove('drag-over');
      }
    },

    handleDrop(e) {
      e.preventDefault();
      const targetEl = e.target.closest('.image-item');
      if (!targetEl || this._dragUid === undefined) return;

      const targetUid = targetEl.dataset.uid;
      const targetItem = this.findById(targetUid);
      if (!targetItem || targetItem.status !== 'success') return;

      if (this._dragUid === targetUid) return;

      const fromIdx = this.findIndexByUid(this._dragUid);
      const toIdx = this.findIndexByUid(targetUid);
      if (fromIdx === -1 || toIdx === -1) return;

      const [moved] = AppState.productImages.splice(fromIdx, 1);
      AppState.productImages.splice(toIdx, 0, moved);

      this.render();
      this._dragUid = undefined;
    },

    updateAddBtnVisibility() {
      const count = AppState.productImages.filter(img => img.status === 'success').length;
      this.addBtn.classList.toggle('hidden', count >= this.MAX_IMAGES);
    },

    render() {
      const list = AppState.productImages;
      this.listEl.innerHTML = list.map((img, index) => {
        const isUploading = img.status === 'uploading';
        const isSuccess = img.status === 'success';
        const isError = img.status === 'error';
        const src = this.getDisplayUrl(img);
        const isMain = isSuccess && this.findIndexByUid(img.uid) === 0;

        let cls = 'image-item';
        let overlay = '';

        if (isUploading) {
          cls += ' uploading';
          overlay = `<div class="uploading-mask"><div class="spinner"></div><span class="uploading-text">上传中...</span></div>`;
        } else if (isError) {
          cls += ' error';
          overlay = `<div class="error-mask"><span class="error-icon">!</span><span class="error-text">上传失败</span><button class="retry-btn" data-uid="${img.uid}">重新上传</button></div>`;
        }

        if (isSuccess) cls += ' uploaded';

        return `<div class="${cls}" draggable="${isSuccess}" data-uid="${img.uid}" data-index="${index}" title="${img.errorMsg || ''}">
          ${isMain ? '<span class="main-tag">主图</span>' : ''}
          ${isSuccess ? '<span class="success-tag">✓</span>' : ''}
          <img src="${src}" alt="${img.fileName || '商品图片'}">
          <button class="delete-btn" data-uid="${img.uid}" title="删除">×</button>
          ${isSuccess ? '<span class="drag-handle">拖动排序</span>' : ''}
          ${overlay}
        </div>`;
      }).join('');
    },

    reset() {
      AppState.productImages = [];
      this.render();
      this.updateAddBtnVisibility();
    },

    setImages(urls) {
      AppState.productImages = urls.map((url, i) => this.createExistingItem(url, i));
      this.render();
      this.updateAddBtnVisibility();
    },

    getMainImage() {
      const first = AppState.productImages.find(img => img.status === 'success');
      return first ? first.remoteUrl : '';
    },

    getAllImages() {
      return AppState.productImages.filter(img => img.status === 'success').map(img => img.remoteUrl);
    },

    validate() {
      const success = AppState.productImages.filter(img => img.status === 'success').length;
      const uploading = AppState.productImages.filter(img => img.status === 'uploading').length;
      const errors = AppState.productImages.filter(img => img.status === 'error').length;

      if (success === 0 && errors === 0 && uploading === 0) {
        return { valid: false, message: '请至少上传 1 张商品主图' };
      }
      if (success === 0 && errors > 0) {
        return { valid: false, message: '请至少上传 1 张商品主图' };
      }
      if (uploading > 0) {
        return { valid: false, message: '图片正在上传中，请稍候再试' };
      }
      if (errors > 0) {
        return { valid: false, message: `有 ${errors} 张图片上传失败，请删除或重新上传` };
      }
      return { valid: true };
    }
  };

  const Products = {
    isExporting: false,

    init() {
      this.initTabs();
      this.initFilters();
      this.initModal();
      this.initExport();
      this.render();
    },

    initExport() {
      const btn = document.getElementById('exportProductBtn');
      if (!btn) return;
      btn.addEventListener('click', () => this.exportExcel());
    },

    getExportFileName() {
      const now = new Date();
      const y = now.getFullYear();
      const m = String(now.getMonth() + 1).padStart(2, '0');
      const d = String(now.getDate()).padStart(2, '0');
      const dateStr = `${y}${m}${d}`;

      const filters = [];
      const tab = AppState.productTab;
      const tabMap = { all: '全部', on: '在售', off: '下架', out: '售罄', low: '库存预警' };
      if (tab && tab !== 'all' && tabMap[tab]) filters.push(tabMap[tab]);

      const cat = document.getElementById('productCategoryFilter')?.value;
      if (cat) filters.push(cat);

      const kw = document.getElementById('productSearch')?.value.trim();
      if (kw) filters.push(`搜索_${kw}`);

      const filterStr = filters.length ? '_' + filters.join('_') : '';
      return `商品数据_${dateStr}${filterStr}.xlsx`;
    },

    showExportLoading(show) {
      const el = document.getElementById('exportLoading');
      if (!el) return;
      if (show) {
        el.classList.add('show');
      } else {
        el.classList.remove('show');
      }
    },

    exportExcel() {
      if (this.isExporting) {
        Utils.showToast('正在生成文件，请稍候...', 'info');
        return;
      }

      const data = this.getFiltered();
      if (!data.length) {
        Utils.showToast('没有可导出的商品数据', 'error');
        return;
      }

      this.isExporting = true;
      const exportBtn = document.getElementById('exportProductBtn');
      if (exportBtn) {
        exportBtn.disabled = true;
        exportBtn.style.opacity = '0.6';
        exportBtn.style.cursor = 'not-allowed';
      }
      this.showExportLoading(true);

      const fileName = this.getExportFileName();

      setTimeout(() => {
        try {
          this._doExport(data, fileName);
          Utils.showToast('导出成功，文件已开始下载', 'success');
        } catch (e) {
          Utils.showToast('导出失败：' + e.message, 'error');
        } finally {
          this.isExporting = false;
          if (exportBtn) {
            exportBtn.disabled = false;
            exportBtn.style.opacity = '';
            exportBtn.style.cursor = '';
          }
          this.showExportLoading(false);
        }
      }, 1200 + Math.random() * 800);
    },

    _doExport(data, fileName) {
      const headers = ['商品名称', '分类', '进价(元)', '售价(元)', '库存', '单位', '销量', '状态', '库存预警值', '创建时间'];
      const statusMap = { on: '在售', off: '下架', out: '售罄' };

      const rows = data.map(p => [
        p.name,
        p.category,
        p.costPrice.toFixed(2),
        p.salePrice.toFixed(2),
        p.stock,
        p.unit,
        p.sales,
        statusMap[p.status] || p.status,
        p.warnStock,
        p.createdAt
      ]);

      let html = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">';
      html += '<head><meta charset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>商品数据</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head>';
      html += '<body><table border="1" cellspacing="0" cellpadding="2" style="border-collapse:collapse;">';

      html += '<tr style="background:#f1f5f9;font-weight:bold;">';
      headers.forEach(h => {
        html += `<td style="padding:6px 10px;font-size:12px;">${h}</td>`;
      });
      html += '</tr>';

      rows.forEach(row => {
        html += '<tr>';
        row.forEach(cell => {
          const val = (cell === null || cell === undefined) ? '' : String(cell);
          html += `<td style="padding:4px 10px;font-size:12px;mso-number-format:'\@';">${val}</td>`;
        });
        html += '</tr>';
      });

      html += '</table></body></html>';

      const blob = new Blob(['\ufeff' + html], { type: 'application/vnd.ms-excel' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },

    initTabs() {
      document.querySelectorAll('#productTabs .tab').forEach(t => {
        t.addEventListener('click', () => {
          document.querySelectorAll('#productTabs .tab').forEach(x => x.classList.remove('active'));
          t.classList.add('active');
          AppState.productTab = t.dataset.status;
          AppState.productPage = 1;
          this.render();
        });
      });
    },
    initFilters() {
      document.getElementById('productCategoryFilter').addEventListener('change', () => {
        AppState.productPage = 1;
        this.render();
      });
      document.getElementById('productSearch').addEventListener('input', () => {
        AppState.productPage = 1;
        this.render();
      });
    },
    initModal() {
      ImageUploader.init();
      document.getElementById('addProductBtn').addEventListener('click', () => {
        AppState.editingProductId = null;
        document.getElementById('productModalTitle').textContent = '新增商品';
        ['pName','pCategory','pCostPrice','pSalePrice','pStock','pUnit','pStatus','pWarnStock','pDesc'].forEach(f => {
          const el = document.getElementById(f);
          if (el) el.value = '';
        });
        document.getElementById('pStatus').value = 'on';
        ImageUploader.reset();
        Utils.openModal('productModal');
      });
      document.getElementById('saveProductBtn').addEventListener('click', () => {
        const name = document.getElementById('pName').value.trim();
        const category = document.getElementById('pCategory').value;
        const costPrice = parseFloat(document.getElementById('pCostPrice').value);
        const salePrice = parseFloat(document.getElementById('pSalePrice').value);
        const stock = parseInt(document.getElementById('pStock').value);
        if (!name || !category || isNaN(costPrice) || isNaN(salePrice) || isNaN(stock)) {
          Utils.showToast('请填写完整的必填项', 'error');
          return;
        }
        const imgValidation = ImageUploader.validate();
        if (!imgValidation.valid) {
          Utils.showToast(imgValidation.message, 'error');
          return;
        }
        const data = {
          name, category, costPrice, salePrice, stock,
          unit: document.getElementById('pUnit').value || '斤',
          status: document.getElementById('pStatus').value,
          warnStock: parseInt(document.getElementById('pWarnStock').value) || Math.floor(stock * 0.2),
          createdAt: Utils.formatDate(new Date()),
          image: ImageUploader.getMainImage(),
          images: ImageUploader.getAllImages(),
          sales: 0
        };
        if (AppState.editingProductId) {
          const i = MockData.products.findIndex(p => p.id === AppState.editingProductId);
          if (i > -1) MockData.products[i] = { ...MockData.products[i], ...data };
          Utils.showToast('商品已更新');
        } else {
          data.id = Date.now();
          MockData.products.unshift(data);
          Utils.showToast('商品已新增');
        }
        Utils.closeModal('productModal');
        this.render();
        Dashboard.renderStockWarn();
      });
    },
    getFiltered() {
      const kw = document.getElementById('productSearch').value.trim();
      const cat = document.getElementById('productCategoryFilter').value;
      return MockData.products.filter(p => {
        if (kw && !p.name.includes(kw)) return false;
        if (cat && p.category !== cat) return false;
        if (AppState.productTab === 'on') return p.status === 'on';
        if (AppState.productTab === 'off') return p.status === 'off';
        if (AppState.productTab === 'out') return p.status === 'out';
        if (AppState.productTab === 'low') return p.stock <= p.warnStock;
        return true;
      });
    },
    render() {
      const tbody = document.getElementById('productTableBody');
      if (!tbody) return;
      const statusMap = { on: { t: '在售', c: 'ready' }, off: { t: '下架', c: 'completed' }, out: { t: '售罄', c: 'pending' } };
      const filtered = this.getFiltered();
      const size = 10;
      const start = (AppState.productPage - 1) * size;
      const pageData = filtered.slice(start, start + size);
      tbody.innerHTML = pageData.length ? pageData.map(p => {
        const s = statusMap[p.status];
        return `<tr>
          <td><div class="product-cell"><img src="${p.image}" class="product-img"><span>${p.name}</span></div></td>
          <td>${p.category}</td>
          <td style="color:#64748b;">¥${p.costPrice.toFixed(2)}</td>
          <td class="price">¥${p.salePrice.toFixed(2)}</td>
          <td><span class="${p.stock <= p.warnStock ? 'status-badge pending' : ''}">${p.stock}${p.unit}</span></td>
          <td>${p.sales}</td>
          <td><span class="status-badge ${s.c}">${s.t}</span></td>
          <td style="color:#94a3b8;font-size:12px;">${p.createdAt}</td>
          <td>
            <button class="btn btn-outline btn-sm" onclick="App.editProduct(${p.id})">编辑</button>
            <button class="btn btn-outline btn-sm" onclick="App.toggleProduct(${p.id})">${p.status === 'on' ? '下架' : '上架'}</button>
          </td>
        </tr>`;
      }).join('') : `<tr><td colspan="9" style="text-align:center;color:#94a3b8;padding:40px;">暂无商品数据</td></tr>`;
      Utils.renderPagination('productPagination', filtered.length, AppState.productPage, p => {
        AppState.productPage = p;
        this.render();
      });
    }
  };

  const Preorders = {
    init() {
      this.initTabs();
      this.render();
    },
    initTabs() {
      document.querySelectorAll('#preorderTabs .tab').forEach(t => {
        t.addEventListener('click', () => {
          document.querySelectorAll('#preorderTabs .tab').forEach(x => x.classList.remove('active'));
          t.classList.add('active');
          AppState.preorderTab = t.dataset.status;
          AppState.preorderPage = 1;
          this.render();
        });
      });
      document.getElementById('checkAllPreorders').addEventListener('change', e => {
        document.querySelectorAll('.preorder-check').forEach(c => c.checked = e.target.checked);
      });
    },
    getFiltered() {
      const kw = document.getElementById('preorderSearch')?.value?.trim() || '';
      const pickupId = document.getElementById('preorderPickupFilter')?.value || '';
      const pickupMap = { '1': '阳光社区店', '2': '绿园小区店', '3': '幸福家园店' };
      return MockData.preorders.filter(o => {
        if (kw && !o.id.includes(kw) && !o.user.includes(kw)) return false;
        if (pickupId && o.pickup !== pickupMap[pickupId]) return false;
        if (AppState.preorderTab !== 'all' && o.status !== AppState.preorderTab) return false;
        return true;
      });
    },
    render() {
      const tbody = document.getElementById('preorderTableBody');
      if (!tbody) return;
      const statusMap = { pending: { t: '待备货', c: 'pending' }, picking: { t: '分拣中', c: 'picking' }, ready: { t: '待自提', c: 'ready' }, completed: { t: '已完成', c: 'completed' }, cancelled: { t: '已取消', c: 'cancelled' } };
      const filtered = this.getFiltered();
      const size = 10;
      const start = (AppState.preorderPage - 1) * size;
      const pageData = filtered.slice(start, start + size);
      tbody.innerHTML = pageData.length ? pageData.map(o => {
        const s = statusMap[o.status];
        const itemsPreview = o.items.slice(0, 2).map(i => i.name + ' x' + i.qty).join('，') + (o.items.length > 2 ? '...' : '');
        let actionBtn = '';
        if (o.status === 'pending') actionBtn = `<button class="btn btn-primary btn-sm" onclick="App.updatePreorder('${o.id}','picking')">开始分拣</button>`;
        else if (o.status === 'picking') actionBtn = `<button class="btn btn-success btn-sm" onclick="App.updatePreorder('${o.id}','ready')">完成分拣</button>`;
        else if (o.status === 'ready') actionBtn = `<button class="btn btn-outline btn-sm" onclick="App.navigateToVerify('${o.id}')">去核销</button>`;
        else actionBtn = `<button class="btn btn-outline btn-sm" onclick="App.showOrderDetail('${o.id}')">查看详情</button>`;
        return `<tr>
          <td><input type="checkbox" class="preorder-check"></td>
          <td style="font-family:monospace;font-size:12px;color:#2563eb;">${o.id}</td>
          <td>${o.user}</td>
          <td style="color:#475569;">${itemsPreview}<br><span style="color:#94a3b8;font-size:12px;">共${o.items.length}种商品</span></td>
          <td><span class="goods-count-badge">${o.qty}</span></td>
          <td class="price">${Utils.formatMoney(o.amount)}</td>
          <td>${o.pickup}</td>
          <td style="font-size:12px;color:#64748b;">${o.pickupTime}</td>
          <td><span class="status-badge ${s.c}">${s.t}</span></td>
          <td style="font-size:12px;color:#94a3b8;">${o.createdAt}</td>
          <td>${actionBtn}</td>
        </tr>`;
      }).join('') : `<tr><td colspan="11" style="text-align:center;color:#94a3b8;padding:40px;">暂无订单数据</td></tr>`;
      Utils.renderPagination('preorderPagination', filtered.length, AppState.preorderPage, p => {
        AppState.preorderPage = p;
        this.render();
      });
    }
  };

  const Pickups = {
    init() {
      this.initFilters();
      this.initModal();
      this.render();
      this.renderStats();
    },
    initFilters() {
      document.getElementById('pickupSearch').addEventListener('input', () => this.render());
      document.getElementById('pickupStatusFilter').addEventListener('change', () => this.render());
    },
    initModal() {
      document.getElementById('addPickupBtn').addEventListener('click', () => {
        AppState.editingPickupId = null;
        document.getElementById('pickupModalTitle').textContent = '新增自提点';
        ['pkName','pkRegion','pkAddress','pkHours','pkPhone','pkManager','pkStatus'].forEach(f => {
          const el = document.getElementById(f);
          if (el) el.value = '';
        });
        document.getElementById('pkStatus').value = 'active';
        Utils.openModal('pickupModal');
      });
      document.getElementById('savePickupBtn').addEventListener('click', () => {
        const name = document.getElementById('pkName').value.trim();
        const region = document.getElementById('pkRegion').value.trim();
        const address = document.getElementById('pkAddress').value.trim();
        const phone = document.getElementById('pkPhone').value.trim();
        if (!name || !region || !address || !phone) {
          Utils.showToast('请填写完整的必填项', 'error');
          return;
        }
        const data = {
          name, region, address, phone,
          hours: document.getElementById('pkHours').value || '08:00-20:00',
          manager: document.getElementById('pkManager').value || '未指定',
          status: document.getElementById('pkStatus').value || 'active',
          todayOrders: 0, completed: 0, pending: 0
        };
        if (AppState.editingPickupId) {
          const i = MockData.pickups.findIndex(p => p.id === AppState.editingPickupId);
          if (i > -1) MockData.pickups[i] = { ...MockData.pickups[i], ...data };
          Utils.showToast('自提点已更新');
        } else {
          data.id = Date.now();
          MockData.pickups.unshift(data);
          Utils.showToast('自提点已新增');
        }
        Utils.closeModal('pickupModal');
        this.render();
        this.renderStats();
      });
    },
    renderStats() {
      const total = MockData.pickups.length;
      const active = MockData.pickups.filter(p => p.status === 'active').length;
      const orders = MockData.pickups.reduce((s, p) => s + p.todayOrders, 0);
      document.getElementById('totalPickups').textContent = total;
      document.getElementById('activePickups').textContent = active;
      document.getElementById('todayPickupOrders').textContent = orders;
      document.getElementById('pickupCapacity').textContent = '85%';
    },
    getFiltered() {
      const kw = document.getElementById('pickupSearch').value.trim();
      const st = document.getElementById('pickupStatusFilter').value;
      return MockData.pickups.filter(p => {
        if (kw && !p.name.includes(kw) && !p.address.includes(kw)) return false;
        if (st && p.status !== st) return false;
        return true;
      });
    },
    render() {
      const grid = document.getElementById('pickupGrid');
      if (!grid) return;
      const list = this.getFiltered();
      grid.innerHTML = list.length ? list.map(p => `
        <div class="pickup-card">
          <div class="pickup-header">
            <span class="pickup-status ${p.status}">${p.status === 'active' ? '营业中' : '已停业'}</span>
            <span class="pickup-actions">
              <button class="icon-btn" onclick="App.editPickup(${p.id})" title="编辑">✏️</button>
              <button class="icon-btn" onclick="App.deletePickup(${p.id})" title="删除">🗑️</button>
            </span>
          </div>
          <h3 class="pickup-name">${p.name}</h3>
          <p class="pickup-address">📍 ${p.region} ${p.address}</p>
          <div class="pickup-meta">
            <span>🕐 ${p.hours}</span>
            <span>📞 ${p.phone}</span>
          </div>
          <div class="pickup-meta">
            <span>👤 负责人：${p.manager}</span>
          </div>
          <div class="pickup-stats">
            <div><div class="stat-num">${p.todayOrders}</div><div class="stat-label">今日订单</div></div>
            <div><div class="stat-num">${p.completed}</div><div class="stat-label">已完成</div></div>
            <div><div class="stat-num">${p.pending}</div><div class="stat-label">待自提</div></div>
          </div>
        </div>
      `).join('') : '<div style="grid-column:1/-1;padding:60px;text-align:center;color:#94a3b8;">暂无自提点数据</div>';
    }
  };

  const Verify = {
    init() {
      this.initTabs();
      this.initScan();
      this.renderRecords();
    },
    initTabs() {
      document.querySelectorAll('#verifyTabs .tab').forEach(t => {
        t.addEventListener('click', () => {
          document.querySelectorAll('#verifyTabs .tab').forEach(x => x.classList.remove('active'));
          t.classList.add('active');
          const type = t.dataset.type;
          ['scan','manual','record'].forEach(k => {
            const el = document.getElementById('verify-' + k);
            if (el) el.style.display = k === type ? 'block' : 'none';
          });
        });
      });
    },
    initScan() {
      document.getElementById('scanConfirmBtn').addEventListener('click', () => {
        const code = document.getElementById('scanCodeInput').value.trim();
        if (!code || code.length < 6) {
          Utils.showToast('请输入有效的自提码', 'error');
          return;
        }
        const order = MockData.preorders.find(o => o.status === 'ready' || o.id.includes(code.substring(2)));
        if (!order) {
          Utils.showToast('未找到对应订单', 'error');
          return;
        }
        AppState.verifiedOrder = order;
        this.showPreview(order);
      });
      document.getElementById('vpConfirmBtn').addEventListener('click', () => {
        if (!AppState.verifiedOrder) return;
        const order = AppState.verifiedOrder;
        order.status = 'completed';
        MockData.verifyRecords.unshift({
          id: 'HX' + Date.now(),
          orderNo: order.id,
          operator: AppState.userName,
          pickup: order.pickup,
          goodsCount: order.items.length,
          amount: order.amount,
          method: '扫码',
          time: Utils.formatDate(new Date())
        });
        const pickup = MockData.pickups.find(p => p.name === order.pickup);
        if (pickup) { pickup.pending = Math.max(0, pickup.pending - 1); pickup.completed++; }
        Utils.showToast('核销成功');
        document.getElementById('verifyPreview').style.display = 'none';
        document.getElementById('scanCodeInput').value = '';
        AppState.verifiedOrder = null;
        this.renderRecords();
        Preorders.render();
      });
    },
    showPreview(o) {
      document.getElementById('vpOrderNo').textContent = o.id;
      document.getElementById('vpUser').textContent = o.user + ' ' + o.phone;
      document.getElementById('vpPickup').textContent = o.pickup;
      document.getElementById('vpTime').textContent = o.createdAt;
      document.getElementById('vpItems').innerHTML = o.items.map(i => `
        <div class="verify-item-row">
          <img src="${i.image}">
          <span class="verify-item-name">${i.name}</span>
          <span class="verify-item-price">¥${i.price.toFixed(2)}</span>
          <span class="verify-item-qty">x${i.qty}</span>
        </div>
      `).join('');
      document.getElementById('vpAmount').textContent = Utils.formatMoney(o.amount);
      document.getElementById('verifyPreview').style.display = 'block';
    },
    renderRecords() {
      const tbody = document.getElementById('verifyRecordBody');
      if (!tbody) return;
      const size = 10;
      const start = (AppState.verifyPage - 1) * size;
      const data = MockData.verifyRecords.slice(start, start + size);
      tbody.innerHTML = data.length ? data.map(r => `
        <tr>
          <td style="font-family:monospace;font-size:12px;color:#2563eb;">${r.id}</td>
          <td style="font-family:monospace;font-size:12px;">${r.orderNo}</td>
          <td>${r.operator}</td>
          <td>${r.pickup}</td>
          <td>${r.goodsCount}</td>
          <td class="price">${Utils.formatMoney(r.amount)}</td>
          <td><span class="status-badge ${r.method === '扫码' ? 'ready' : 'picking'}">${r.method}</span></td>
          <td style="font-size:12px;color:#94a3b8;">${r.time}</td>
          <td><button class="btn btn-outline btn-sm" onclick="App.showOrderDetail('${r.orderNo}')">查看</button></td>
        </tr>
      `).join('') : `<tr><td colspan="9" style="text-align:center;color:#94a3b8;padding:40px;">暂无核销记录</td></tr>`;
      Utils.renderPagination('verifyPagination', MockData.verifyRecords.length, AppState.verifyPage, p => {
        AppState.verifyPage = p;
        this.renderRecords();
      });
    }
  };

  const Marketing = {
    init() {
      this.initTabs();
      this.initCouponModal();
      this.renderCoupons();
      this.renderSeckills();
      this.renderDiscounts();
      this.renderGroups();
    },
    initTabs() {
      document.querySelectorAll('#marketingTabs .tab').forEach(t => {
        t.addEventListener('click', () => {
          document.querySelectorAll('#marketingTabs .tab').forEach(x => x.classList.remove('active'));
          t.classList.add('active');
          const type = t.dataset.type;
          ['coupon','seckill','discount','group'].forEach(k => {
            const el = document.getElementById('marketing-' + k);
            if (el) el.style.display = k === type ? 'block' : 'none';
          });
        });
      });
      document.getElementById('addCouponBtn').addEventListener('click', () => Utils.openModal('couponModal'));
    },
    initCouponModal() {},
    renderCoupons() {
      const tbody = document.getElementById('couponTableBody');
      if (!tbody) return;
      const statusMap = { active: { t: '进行中', c: 'active-status' }, 'not-started': { t: '未开始', c: 'not-started' }, ended: { t: '已结束', c: 'ended' } };
      tbody.innerHTML = MockData.coupons.map(c => {
        const s = statusMap[c.status];
        const pct = Math.round((c.used / c.total) * 100);
        return `<tr>
          <td style="font-weight:500;">${c.name}</td>
          <td><span class="status-badge picking">${c.type}</span></td>
          <td style="color:#dc2626;font-weight:600;">${c.face}</td>
          <td style="color:#64748b;">${c.threshold}</td>
          <td style="min-width:140px;">
            <div style="position:relative;">
              <div style="background:#f1f5f9;border-radius:8px;height:8px;overflow:hidden;">
                <div style="background:linear-gradient(90deg,#065f46,#16a34a);height:100%;width:${pct}%;"></div>
              </div>
              <span style="position:absolute;right:0;top:-18px;font-size:12px;color:#64748b;">${c.used}/${c.total}</span>
            </div>
          </td>
          <td style="font-size:12px;color:#64748b;">${c.start} ~ ${c.end}</td>
          <td><span class="status-badge ${s.c}">${s.t}</span></td>
          <td>
            ${c.status === 'active' ? '<button class="btn btn-outline btn-sm">编辑</button> <button class="btn btn-outline btn-sm danger">结束</button>' : '<button class="btn btn-outline btn-sm">查看</button>'}
          </td>
        </tr>`;
      }).join('');
    },
    renderSeckills() {
      const grid = document.getElementById('seckillGrid');
      if (!grid) return;
      const statusMap = { active: { t: '抢购中', c: 'ready' }, 'not-started': { t: '未开始', c: 'not-started' }, ended: { t: '已结束', c: 'ended' } };
      grid.innerHTML = MockData.seckills.map(s => {
        const pct = Math.round((s.sold / s.stock) * 100);
        const st = statusMap[s.status];
        return `<div class="seckill-card">
          <div class="seckill-img-wrap">
            <img src="${s.image}" class="seckill-img">
            <span class="status-badge ${st.c}" style="position:absolute;top:8px;left:8px;">${st.t}</span>
          </div>
          <div class="seckill-info">
            <h4 class="seckill-name">${s.name}</h4>
            <div class="seckill-price-row">
              <span class="seckill-price">¥${s.seckillPrice}</span>
              <span class="seckill-old">¥${s.oldPrice}</span>
            </div>
            <div class="seckill-progress">
              <div class="seckill-bar"><div style="width:${pct}%;"></div></div>
              <span>已抢${pct}%</span>
            </div>
            <div style="color:#64748b;font-size:12px;margin:8px 0;">⏰ 截止：${s.end}</div>
            <div class="seckill-actions">
              <button class="btn btn-outline btn-sm">编辑</button>
              <button class="btn btn-primary btn-sm">${s.status === 'active' ? '查看详情' : '开启活动'}</button>
            </div>
          </div>
        </div>`;
      }).join('');
    },
    renderDiscounts() {
      const tbody = document.getElementById('discountTableBody');
      if (!tbody) return;
      const statusMap = { active: { t: '进行中', c: 'active-status' }, 'not-started': { t: '未开始', c: 'not-started' }, ended: { t: '已结束', c: 'ended' } };
      tbody.innerHTML = MockData.discounts.map(d => {
        const s = statusMap[d.status];
        return `<tr>
          <td style="font-weight:500;">${d.name}</td>
          <td style="color:#dc2626;">${d.rule}</td>
          <td style="color:#64748b;">${d.scope}</td>
          <td>${d.orders}</td>
          <td style="font-size:12px;color:#64748b;">${d.start}<br>${d.end}</td>
          <td><span class="status-badge ${s.c}">${s.t}</span></td>
          <td>
            ${d.status === 'active' ? '<button class="btn btn-outline btn-sm">编辑</button> <button class="btn btn-outline btn-sm danger">结束</button>' : '<button class="btn btn-outline btn-sm">查看</button>'}
          </td>
        </tr>`;
      }).join('');
    },
    renderGroups() {
      const tbody = document.getElementById('groupTableBody');
      if (!tbody) return;
      tbody.innerHTML = MockData.groups.map(g => `
        <tr>
          <td><div class="product-cell"><img src="${g.image}" class="product-img"><span>${g.product}</span></div></td>
          <td style="color:#dc2626;font-weight:600;">¥${g.groupPrice}</td>
          <td style="color:#94a3b8;text-decoration:line-through;">¥${g.oldPrice}</td>
          <td>${g.need}人团</td>
          <td><span style="color:#16a34a;">${g.active}</span> / ${g.done}</td>
          <td style="font-size:12px;color:#64748b;">${g.end}</td>
          <td><span class="status-badge ready">进行中</span></td>
          <td>
            <button class="btn btn-outline btn-sm">编辑</button>
            <button class="btn btn-outline btn-sm">数据</button>
          </td>
        </tr>
      `).join('');
    }
  };

  const Aftersale = {
    init() {
      this.initTabs();
      this.render();
    },
    initTabs() {
      document.querySelectorAll('#aftersaleTabs .tab').forEach(t => {
        t.addEventListener('click', () => {
          document.querySelectorAll('#aftersaleTabs .tab').forEach(x => x.classList.remove('active'));
          t.classList.add('active');
          AppState.aftersaleTab = t.dataset.status;
          AppState.aftersalePage = 1;
          this.render();
          this.renderStats();
        });
      });
      const btnIds = ['asdAgreeBtn', 'asdRejectBtn', 'asdCompleteBtn'];
      btnIds.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.addEventListener('click', () => {
          const asId = document.getElementById('asdCurrentId').value;
          const a = MockData.aftersales.find(x => x.id === asId);
          if (!a) return;
          if (id === 'asdAgreeBtn') { a.status = 'agreed'; a.statusText = '已同意'; Utils.showToast('已同意售后申请'); }
          if (id === 'asdRejectBtn') { a.status = 'rejected'; a.statusText = '已拒绝'; Utils.showToast('已拒绝售后申请', 'error'); }
          if (id === 'asdCompleteBtn') { a.status = 'completed'; a.statusText = '已完成'; Utils.showToast('售后已完成'); }
          Utils.closeModal('aftersaleDetailModal');
          this.render();
          this.renderStats();
        });
      });
    },
    renderStats() {
      const total = MockData.aftersales.length;
      const pending = MockData.aftersales.filter(a => a.status === 'pending').length;
      const processing = MockData.aftersales.filter(a => a.status === 'processing').length;
      const amount = MockData.aftersales.filter(a => ['agreed','completed'].includes(a.status)).reduce((s, a) => s + a.amount, 0);
      document.getElementById('asTotal').textContent = total;
      document.getElementById('asPending').textContent = pending;
      document.getElementById('asProcessing').textContent = processing;
      document.getElementById('asRefund').textContent = '¥' + amount.toFixed(2);
    },
    getFiltered() {
      const kw = document.getElementById('aftersaleSearch')?.value?.trim() || '';
      const tab = AppState.aftersaleTab || 'all';
      return MockData.aftersales.filter(a => {
        if (kw && !a.id.includes(kw) && !a.orderNo.includes(kw) && !a.user.includes(kw)) return false;
        if (tab !== 'all' && a.status !== tab) return false;
        return true;
      });
    },
    render() {
      const tbody = document.getElementById('aftersaleTableBody');
      if (!tbody) return;
      const statusColor = { pending: 'pending', processing: 'picking', agreed: 'ready', completed: 'completed', rejected: 'cancelled' };
      const filtered = this.getFiltered();
      const size = 10;
      const start = (AppState.aftersalePage - 1) * size;
      const data = filtered.slice(start, start + size);
      tbody.innerHTML = data.length ? data.map(a => `
        <tr>
          <td style="font-family:monospace;font-size:12px;color:#2563eb;">${a.id}</td>
          <td style="font-family:monospace;font-size:12px;">${a.orderNo}</td>
          <td><span class="status-badge picking">${a.typeText}</span></td>
          <td style="font-weight:500;">${a.product}</td>
          <td>${a.user}<br><span style="color:#94a3b8;font-size:12px;">${a.phone}</span></td>
          <td class="price">${Utils.formatMoney(a.amount)}</td>
          <td style="color:#64748b;max-width:180px;">${a.reason}</td>
          <td><span class="status-badge ${statusColor[a.status]}">${a.statusText}</span></td>
          <td style="font-size:12px;color:#94a3b8;">${a.createdAt}</td>
          <td><button class="btn btn-primary btn-sm" onclick="App.showAftersaleDetail('${a.id}')">处理</button></td>
        </tr>
      `).join('') : `<tr><td colspan="10" style="text-align:center;color:#94a3b8;padding:40px;">暂无售后数据</td></tr>`;
      Utils.renderPagination('aftersalePagination', filtered.length, AppState.aftersalePage, p => {
        AppState.aftersalePage = p;
        this.render();
      });
    }
  };

  const Statistics = {
    init() {
      this.initTabs();
      this.renderOverview();
      this.renderRank();
      this.renderLoss();
      this.renderUser();
    },
    initTabs() {
      document.querySelectorAll('#statisticsTabs .tab').forEach(t => {
        t.addEventListener('click', () => {
          document.querySelectorAll('#statisticsTabs .tab').forEach(x => x.classList.remove('active'));
          t.classList.add('active');
          const type = t.dataset.type;
          ['overview', 'rank', 'loss', 'user'].forEach(k => {
            const el = document.getElementById('stats-' + k);
            if (el) el.style.display = k === type ? 'block' : 'none';
          });
        });
      });
    },
    renderOverview() {
      document.getElementById('ovSales').textContent = '¥40,580';
      document.getElementById('ovOrders').textContent = '1,286';
      document.getElementById('ovUsers').textContent = '892';
      document.getElementById('ovLoss').textContent = '¥651.63';
      const svg = document.getElementById('monthlyChart');
      if (svg) {
        const data = [28000, 32500, 36800, 34200, 38900, 42100, 40580];
        const labels = ['1月','2月','3月','4月','5月','6月','7月'];
        const w = 600, h = 200, pad = 30;
        const max = Math.max(...data) * 1.1;
        const min = Math.min(...data) * 0.9;
        const range = max - min;
        const stepX = (w - pad * 2) / (data.length - 1);
        const pts = data.map((v, i) => {
          const x = pad + i * stepX;
          const y = h - pad - ((v - min) / range) * (h - pad * 2);
          return [x, y];
        });
        let polyline = pts.map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
        const areaPoly = polyline + ' L' + pts[pts.length - 1][0] + ',' + (h - pad) + ' L' + pts[0][0] + ',' + (h - pad) + ' Z';
        svg.innerHTML = `<defs><linearGradient id="gArea" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#16a34a" stop-opacity="0.3"/><stop offset="100%" stop-color="#16a34a" stop-opacity="0"/></linearGradient></defs>
          ${labels.map((l, i) => `<text x="${(pad + i * stepX)}" y="${h - 10}" text-anchor="middle" fill="#94a3b8" font-size="11">${l}</text>`).join('')}
          ${[0, 0.25, 0.5, 0.75, 1].map((r, i) => {
            const y = h - pad - r * (h - pad * 2);
            const val = Math.round((min + r * range));
            return `<line x1="${pad}" y1="${y}" x2="${w - pad}" y2="${y}" stroke="#f1f5f9"/><text x="${pad - 6}" y="${y + 4}" text-anchor="end" fill="#94a3b8" font-size="10">${val >= 1000 ? (val/1000).toFixed(1)+'k' : val}</text>`;
          }).join('')}
          <path d="${areaPoly}" fill="url(#gArea)"/>
          <path d="${polyline}" fill="none" stroke="#16a34a" stroke-width="2"/>
          ${pts.map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="4" fill="#fff" stroke="#16a34a" stroke-width="2"/>`).join('')}
        `;
      }
      const pie = document.getElementById('categoryPie');
      if (pie) {
        const cats = [
          { name: '时令蔬菜', val: 35, color: '#16a34a' },
          { name: '新鲜水果', val: 28, color: '#f59e0b' },
          { name: '肉禽蛋品', val: 18, color: '#ef4444' },
          { name: '蛋奶豆品', val: 12, color: '#8b5cf6' },
          { name: '粮油调味', val: 7, color: '#06b6d4' }
        ];
        let acc = 0;
        const gradient = cats.map(c => {
          const s = (acc / 100) * 360;
          acc += c.val;
          const e = (acc / 100) * 360;
          return `${c.color} ${s}deg ${e}deg`;
        }).join(',');
        pie.innerHTML = `<div class="pie" style="background:conic-gradient(${gradient})"></div>
          <div class="pie-legend">${cats.map(c => `<div class="legend-item"><span class="legend-dot" style="background:${c.color}"></span>${c.name}<span style="margin-left:auto;font-weight:600;">${c.val}%</span></div>`).join('')}</div>`;
      }
    },
    renderRank() {
      const tbody = document.getElementById('rankTableBody');
      if (!tbody) return;
      const sorted = [...MockData.products].sort((a, b) => b.sales * b.salePrice - a.sales * a.salePrice);
      tbody.innerHTML = sorted.slice(0, 10).map((p, i) => {
        const rankCls = ['first', 'second', 'third', '', '', '', '', '', '', ''];
        const amt = p.sales * p.salePrice;
        const profit = (p.salePrice - p.costPrice) * p.sales;
        return `<tr>
          <td><span class="rank-num ${rankCls[i]}" style="display:inline-flex;">${i + 1}</span></td>
          <td><div class="product-cell"><img src="${p.image}" class="product-img"><span>${p.name}</span></div></td>
          <td>${p.category}</td>
          <td>${p.sales}${p.unit}</td>
          <td class="price">${Utils.formatMoney(amt)}</td>
          <td style="color:#16a34a;">${Utils.formatMoney(profit)}</td>
          <td>${((profit / amt) * 100).toFixed(1)}%</td>
        </tr>`;
      }).join('');
    },
    renderLoss() {
      const reasons = [
        { name: '自然腐烂', val: 42, color: '#ef4444' },
        { name: '运输损耗', val: 23, color: '#f59e0b' },
        { name: '过期变质', val: 18, color: '#8b5cf6' },
        { name: '顾客损坏', val: 10, color: '#06b6d4' },
        { name: '冷链异常', val: 7, color: '#2563eb' }
      ];
      const box = document.getElementById('lossReasonBars');
      if (box) {
        box.innerHTML = reasons.map(r => `
          <div class="loss-row">
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span style="font-size:13px;">${r.name}</span><span style="font-weight:600;color:${r.color};">${r.val}%</span></div>
            <div class="loss-bar"><div style="width:${r.val}%;background:${r.color};"></div></div>
          </div>
        `).join('');
      }
      const tbody = document.getElementById('lossTableBody');
      if (!tbody) return;
      tbody.innerHTML = MockData.lossRecords.map(r => `<tr>
        <td style="font-family:monospace;font-size:12px;color:#2563eb;">${r.id}</td>
        <td style="font-weight:500;">${r.product}</td>
        <td style="color:#dc2626;">${r.qty}</td>
        <td class="price">${Utils.formatMoney(r.amount)}</td>
        <td><span class="status-badge picking">${r.reason}</span></td>
        <td>${r.reporter}</td>
        <td style="font-size:12px;color:#94a3b8;">${r.time}</td>
      </tr>`).join('');
      const totalLoss = MockData.lossRecords.reduce((s, r) => s + r.amount, 0);
      const totalQty = MockData.lossRecords.reduce((s, r) => s + r.qty, 0);
      document.getElementById('lossTotalAmount').textContent = Utils.formatMoney(totalLoss);
      document.getElementById('lossTotalQty').textContent = totalQty;
      document.getElementById('lossRate').textContent = '1.6%';
      document.getElementById('lossTarget').textContent = '≤2%';
    },
    renderUser() {
      document.getElementById('userTotal').textContent = '2,456';
      document.getElementById('userNew').textContent = '186';
      document.getElementById('userActive').textContent = '1,208';
      document.getElementById('userAvg').textContent = '¥165';
      const tbody = document.getElementById('userRankBody');
      if (!tbody) return;
      const users = [
        { rank: 1, name: '张**', phone: '138****1234', orders: 58, amount: 2856, last: '2024-06-07' },
        { rank: 2, name: '李**', phone: '139****5678', orders: 46, amount: 2341, last: '2024-06-07' },
        { rank: 3, name: '王**', phone: '137****9012', orders: 42, amount: 1985, last: '2024-06-06' },
        { rank: 4, name: '赵**', phone: '136****3456', orders: 38, amount: 1820, last: '2024-06-06' },
        { rank: 5, name: '孙**', phone: '135****7890', orders: 35, amount: 1680, last: '2024-06-05' }
      ];
      tbody.innerHTML = users.map(u => {
        const rc = ['first', 'second', 'third', '', ''];
        return `<tr>
          <td><span class="rank-num ${rc[u.rank - 1]}" style="display:inline-flex;">${u.rank}</span></td>
          <td>${u.name}</td>
          <td style="color:#64748b;">${u.phone}</td>
          <td>${u.orders}</td>
          <td class="price">${Utils.formatMoney(u.amount)}</td>
          <td style="font-size:12px;color:#94a3b8;">${u.last}</td>
        </tr>`;
      }).join('');
    }
  };

  window.App = {
    editProduct(id) {
      const p = MockData.products.find(x => x.id === id);
      if (!p) return;
      AppState.editingProductId = id;
      document.getElementById('productModalTitle').textContent = '编辑商品';
      document.getElementById('pName').value = p.name;
      document.getElementById('pCategory').value = p.category;
      document.getElementById('pCostPrice').value = p.costPrice;
      document.getElementById('pSalePrice').value = p.salePrice;
      document.getElementById('pStock').value = p.stock;
      document.getElementById('pUnit').value = p.unit;
      document.getElementById('pStatus').value = p.status;
      document.getElementById('pWarnStock').value = p.warnStock;
      const existingImages = p.images && p.images.length ? p.images : [p.image];
      ImageUploader.setImages(existingImages);
      Utils.openModal('productModal');
    },
    toggleProduct(id) {
      const p = MockData.products.find(x => x.id === id);
      if (!p) return;
      p.status = p.status === 'on' ? 'off' : 'on';
      Utils.showToast(p.status === 'on' ? '已上架' : '已下架');
      Products.render();
      Dashboard.renderStockWarn();
    },
    updatePreorder(id, status) {
      const o = MockData.preorders.find(x => x.id === id);
      if (!o) return;
      o.status = status;
      const statusText = { picking: '已开始分拣', ready: '分拣完成，待自提' };
      Utils.showToast(statusText[status] || '状态已更新');
      Preorders.render();
      Dashboard.renderPendingOrders();
    },
    navigateToVerify(orderId) {
      const item = document.querySelector('.menu-item[data-page="verify"]');
      if (item) item.click();
      setTimeout(() => {
        const manualTab = document.querySelector('#verifyTabs .tab[data-type="manual"]');
        if (manualTab) manualTab.click();
        document.getElementById('manualOrderInput').value = orderId;
      }, 100);
    },
    showOrderDetail(id) {
      const o = MockData.preorders.find(x => x.id === id);
      if (!o) return;
      const statusMap = { pending: '待备货', picking: '分拣中', ready: '待自提', completed: '已完成', cancelled: '已取消' };
      document.getElementById('odOrderNo').textContent = o.id;
      document.getElementById('odStatus').textContent = statusMap[o.status];
      document.getElementById('odStatus').className = 'status-badge ' + o.status;
      document.getElementById('odUser').textContent = o.user;
      document.getElementById('odPhone').textContent = o.phone;
      document.getElementById('odPickup').textContent = o.pickup;
      document.getElementById('odTime').textContent = o.pickupTime;
      document.getElementById('odCreated').textContent = o.createdAt;
      document.getElementById('odItems').innerHTML = o.items.map(i => `
        <div class="order-detail-row">
          <img src="${i.image}">
          <span class="od-name">${i.name}</span>
          <span class="od-price">¥${i.price.toFixed(2)}</span>
          <span class="od-qty">x${i.qty}</span>
          <span class="od-sub">¥${(i.price * i.qty).toFixed(2)}</span>
        </div>
      `).join('');
      document.getElementById('odQty').textContent = o.qty;
      document.getElementById('odAmount').textContent = Utils.formatMoney(o.amount);
      Utils.openModal('orderDetailModal');
    },
    editPickup(id) {
      const p = MockData.pickups.find(x => x.id === id);
      if (!p) return;
      AppState.editingPickupId = id;
      document.getElementById('pickupModalTitle').textContent = '编辑自提点';
      document.getElementById('pkName').value = p.name;
      document.getElementById('pkRegion').value = p.region;
      document.getElementById('pkAddress').value = p.address;
      document.getElementById('pkHours').value = p.hours;
      document.getElementById('pkPhone').value = p.phone;
      document.getElementById('pkManager').value = p.manager;
      document.getElementById('pkStatus').value = p.status;
      Utils.openModal('pickupModal');
    },
    deletePickup(id) {
      if (!confirm('确定删除此自提点吗？')) return;
      const i = MockData.pickups.findIndex(x => x.id === id);
      if (i > -1) MockData.pickups.splice(i, 1);
      Utils.showToast('已删除');
      Pickups.render();
      Pickups.renderStats();
    },
    showAftersaleDetail(id) {
      const a = MockData.aftersales.find(x => x.id === id);
      if (!a) return;
      document.getElementById('asdCurrentId').value = id;
      document.getElementById('asdId').textContent = a.id;
      document.getElementById('asdType').textContent = a.typeText;
      document.getElementById('asdStatus').textContent = a.statusText;
      document.getElementById('asdStatus').className = 'status-badge ' + a.status;
      document.getElementById('asdOrderNo').textContent = a.orderNo;
      document.getElementById('asdProduct').textContent = a.product;
      document.getElementById('asdUser').textContent = a.user + ' ' + a.phone;
      document.getElementById('asdAmount').textContent = Utils.formatMoney(a.amount);
      document.getElementById('asdReason').textContent = a.reason;
      document.getElementById('asdDesc').textContent = a.desc || '无';
      document.getElementById('asdEvidence').innerHTML = a.evidence.length ? a.evidence.map(e => `<img src="${e}" class="evidence-img">`).join('') : '<span style="color:#94a3b8;">无凭证图片</span>';
      const btnBox = document.getElementById('asdActionBtns');
      if (btnBox) {
        if (a.status === 'pending') {
          btnBox.innerHTML = `<button class="btn btn-success" id="_agree">同意申请</button><button class="btn btn-danger" id="_reject">拒绝申请</button>`;
          document.getElementById('_agree').onclick = () => document.getElementById('asdAgreeBtn').click();
          document.getElementById('_reject').onclick = () => document.getElementById('asdRejectBtn').click();
        } else if (a.status === 'processing') {
          btnBox.innerHTML = `<button class="btn btn-success" id="_complete">完成处理</button>`;
          document.getElementById('_complete').onclick = () => document.getElementById('asdCompleteBtn').click();
        } else {
          btnBox.innerHTML = '';
        }
      }
      document.getElementById('asdTimeline').innerHTML = `
        <div class="timeline-item"><div class="tl-time">${a.createdAt}</div><div class="tl-content">用户提交${a.typeText}申请，原因：${a.reason}</div></div>
        ${a.status !== 'pending' ? `<div class="timeline-item"><div class="tl-time">${a.createdAt}</div><div class="tl-content">${a.status === 'rejected' ? '商家已拒绝申请' : '商家已受理申请'}</div></div>` : ''}
        ${['agreed','completed'].includes(a.status) ? `<div class="timeline-item"><div class="tl-time">${a.createdAt}</div><div class="tl-content">${a.status === 'completed' ? '售后已完成，退款将原路返回' : '已同意售后申请'}</div></div>` : ''}
      `;
      Utils.openModal('aftersaleDetailModal');
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    Navigation.init();
    Auth.init();
    Products.init();
    Preorders.init();
    Pickups.init();
    Verify.init();
    Marketing.init();
    Aftersale.init();
    Statistics.init();
    document.getElementById('manualVerifyBtn').addEventListener('click', () => {
      const code = document.getElementById('manualOrderInput').value.trim();
      if (!code) { Utils.showToast('请输入订单号', 'error'); return; }
      const order = MockData.preorders.find(o => o.id === code || o.id.includes(code));
      if (!order) { Utils.showToast('未找到订单', 'error'); return; }
      order.status = 'completed';
      MockData.verifyRecords.unshift({
        id: 'HX' + Date.now(),
        orderNo: order.id,
        operator: AppState.userName,
        pickup: order.pickup,
        goodsCount: order.items.length,
        amount: order.amount,
        method: '手动',
        time: Utils.formatDate(new Date())
      });
      const pickup = MockData.pickups.find(p => p.name === order.pickup);
      if (pickup) { pickup.pending = Math.max(0, pickup.pending - 1); pickup.completed++; }
      Utils.showToast('手动核销成功');
      document.getElementById('manualOrderInput').value = '';
      Verify.renderRecords();
      Preorders.render();
    });
  });

})();