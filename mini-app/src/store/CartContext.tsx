import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import type { CartItem, Product } from '@/types';
import { products } from '@/data/products';

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number; specId?: number } }
  | { type: 'REMOVE_ITEM'; payload: { productId: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
  | { type: 'TOGGLE_SELECT'; payload: { productId: number } }
  | { type: 'TOGGLE_SELECT_ALL'; payload: { selected: boolean } }
  | { type: 'CLEAR_CART' };

const initialProducts = products.slice(0, 3);
const initialState: CartState = {
  items: initialProducts.map((p, idx) => ({
    productId: p.id,
    product: p,
    quantity: idx === 0 ? 2 : 1,
    selected: true
  }))
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity, specId } = action.payload;
      const existingIndex = state.items.findIndex(
        item => item.productId === product.id && item.specId === specId
      );
      if (existingIndex > -1) {
        const newItems = [...state.items];
        newItems[existingIndex].quantity += quantity;
        return { ...state, items: newItems };
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            productId: product.id,
            product,
            quantity,
            selected: true,
            specId
          }
        ]
      };
    }
    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter(item => item.productId !== action.payload.productId)
      };
    }
    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      return {
        ...state,
        items: state.items.map(item =>
          item.productId === productId ? { ...item, quantity } : item
        )
      };
    }
    case 'TOGGLE_SELECT': {
      const { productId } = action.payload;
      return {
        ...state,
        items: state.items.map(item =>
          item.productId === productId ? { ...item, selected: !item.selected } : item
        )
      };
    }
    case 'TOGGLE_SELECT_ALL': {
      return {
        ...state,
        items: state.items.map(item => ({ ...item, selected: action.payload.selected }))
      };
    }
    case 'CLEAR_CART': {
      return { ...state, items: [] };
    }
    default:
      return state;
  }
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const selectCartTotal = (items: CartItem[]) => {
  const selectedItems = items.filter(item => item.selected);
  const total = selectedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const count = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
  return { total, count, allSelected: items.length > 0 && items.every(item => item.selected) };
};
