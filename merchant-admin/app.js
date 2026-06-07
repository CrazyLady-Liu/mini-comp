document.addEventListener('DOMContentLoaded', function() {
  const menuItems = document.querySelectorAll('.menu-item');
  const pages = document.querySelectorAll('.page');
  const pageTitle = document.getElementById('pageTitle');
  const productTableBody = document.getElementById('productTableBody');

  const titleMap = {
    dashboard: '工作台',
    products: '商品管理',
    orders: '订单管理',
    purchase: '采购管理',
    pickup: '自提点管理'
  };

  menuItems.forEach(item => {
    item.addEventListener('click', function() {
      const page = this.dataset.page;

      menuItems.forEach(m => m.classList.remove('active'));
      this.classList.add('active');

      pages.forEach(p => p.classList.remove('active'));
      const targetPage = document.getElementById('page-' + page);
      if (targetPage) {
        targetPage.classList.add('active');
      }

      if (pageTitle && titleMap[page]) {
        pageTitle.textContent = titleMap[page];
      }
    });
  });

  const products = [
    { id: 1, name: '有机西红柿', category: '时令蔬菜', price: 5.99, stock: 100, sales: 1234, status: 'on', image: 'https://picsum.photos/id/292/80/80' },
    { id: 2, name: '新鲜黄瓜', category: '时令蔬菜', price: 3.99, stock: 200, sales: 856, status: 'on', image: 'https://picsum.photos/id/312/80/80' },
    { id: 3, name: '红富士苹果', category: '新鲜水果', price: 6.99, stock: 0, sales: 2341, status: 'out', image: 'https://picsum.photos/id/431/80/80' },
    { id: 4, name: '土鸡蛋', category: '蛋奶豆品', price: 19.9, stock: 50, sales: 567, status: 'on', image: 'https://picsum.photos/id/326/80/80' },
    { id: 5, name: '新鲜牛奶', category: '蛋奶豆品', price: 12.9, stock: 80, sales: 789, status: 'on', image: 'https://picsum.photos/id/401/80/80' },
    { id: 6, name: '精选五花肉', category: '肉禽蛋品', price: 28.9, stock: 30, sales: 432, status: 'on', image: 'https://picsum.photos/id/570/80/80' },
    { id: 7, name: '新鲜草莓', category: '新鲜水果', price: 25.9, stock: 0, sales: 1024, status: 'out', image: 'https://picsum.photos/id/580/80/80' },
    { id: 8, name: '有机西兰花', category: '时令蔬菜', price: 8.99, stock: 60, sales: 567, status: 'on', image: 'https://picsum.photos/id/625/80/80' },
    { id: 9, name: '进口香蕉', category: '新鲜水果', price: 4.99, stock: 150, sales: 1567, status: 'on', image: 'https://picsum.photos/id/1080/80/80' },
    { id: 10, name: '新鲜胡萝卜', category: '时令蔬菜', price: 2.99, stock: 200, sales: 678, status: 'on', image: 'https://picsum.photos/id/835/80/80' },
    { id: 11, name: '三文鱼', category: '海鲜水产', price: 89.9, stock: 20, sales: 234, status: 'on', image: 'https://picsum.photos/id/1080/80/80' },
    { id: 12, name: '原味酸奶', category: '蛋奶豆品', price: 8.99, stock: 100, sales: 1234, status: 'on', image: 'https://picsum.photos/id/401/80/80' }
  ];

  const statusMap = {
    on: { text: '在售', class: 'ready' },
    off: { text: '下架', class: 'completed' },
    out: { text: '售罄', class: 'pending' }
  };

  if (productTableBody) {
    products.forEach(product => {
      const status = statusMap[product.status];
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>
          <div class="product-cell">
            <img src="${product.image}" class="product-img">
            <span>${product.name}</span>
          </div>
        </td>
        <td>${product.category}</td>
        <td class="price">¥${product.price.toFixed(2)}</td>
        <td>${product.stock}</td>
        <td>${product.sales}</td>
        <td><span class="status-badge ${status.class}">${status.text}</span></td>
        <td>
          <button class="btn btn-outline btn-sm">编辑</button>
          <button class="btn btn-outline btn-sm">${product.status === 'on' ? '下架' : '上架'}</button>
        </td>
      `;
      productTableBody.appendChild(row);
    });
  }

  console.log('[Merchant Admin] 商家管理后台已加载');
});
