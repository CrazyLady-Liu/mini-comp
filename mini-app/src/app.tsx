import React, { useEffect } from 'react';
import { useDidShow, useDidHide } from '@tarojs/taro';
import { CartProvider } from './store/CartContext';
import { AddressProvider } from './store/AddressContext';
import { FootprintProvider } from './store/FootprintContext';
import './app.scss';

function App(props) {
  useEffect(() => {});

  useDidShow(() => {});

  useDidHide(() => {});

  return (
    <CartProvider>
      <AddressProvider>
        <FootprintProvider>
          {props.children}
        </FootprintProvider>
      </AddressProvider>
    </CartProvider>
  );
}

export default App;
