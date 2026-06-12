export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/category/index',
    'pages/cart/index',
    'pages/order/index',
    'pages/mine/index',
    'pages/product-detail/index',
    'pages/order-confirm/index',
    'pages/payment/index',
    'pages/pickup-code/index',
    'pages/address/index',
    'pages/address-edit/index',
    'pages/pickup-point/index',
    'pages/search-result/index',
    'pages/coupon/coupon-center/index',
    'pages/coupon/my-coupon/index',
    'pages/preorder/index',
    'pages/footprint/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTitleText: '鲜来鲜往',
    navigationBarTextStyle: 'black',
    backgroundColor: '#f8fafc'
  },
  tabBar: {
    color: '#94a3b8',
    selectedColor: '#22c55e',
    backgroundColor: '#ffffff',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页'
      },
      {
        pagePath: 'pages/category/index',
        text: '分类'
      },
      {
        pagePath: 'pages/cart/index',
        text: '购物车'
      },
      {
        pagePath: 'pages/order/index',
        text: '订单'
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的'
      }
    ]
  }
})
