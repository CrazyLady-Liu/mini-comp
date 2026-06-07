document.addEventListener('DOMContentLoaded', function() {
  const menuItems = document.querySelectorAll('.menu-item');
  const pages = document.querySelectorAll('.page');
  const pageTitle = document.getElementById('pageTitle');

  const titleMap = {
    overview: '销售概览',
    products: '商品分析',
    users: '用户分析',
    operation: '运营分析',
    pickup: '自提点分析'
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

      console.log('[Data Admin] 切换页面:', page);
    });
  });

  console.log('[Data Admin] 数据统计后台已加载');
});
