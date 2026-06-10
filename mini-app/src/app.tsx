import React, { useEffect } from 'react';
import { useDidShow, useDidHide } from '@tarojs/taro';
import { CartProvider } from './store/CartContext';
import { AddressProvider } from './store/AddressContext';
import './app.scss';

function App(props) {
  useEffect(() => {});

  useDidShow(() => {});

  useDidHide(() => {});

  return (
    <CartProvider>
      <AddressProvider>
        {props.children}
      </AddressProvider>
    </CartProvider>
  );
}

export default App;
