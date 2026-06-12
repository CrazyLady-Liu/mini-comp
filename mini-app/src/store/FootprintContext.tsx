import React, { createContext, useContext, useReducer, useEffect, ReactNode, useCallback } from 'react';
import Taro from '@tarojs/taro';
import type { FootprintItem, Product } from '@/types';
import { getProductById } from '@/data/products';

const FOOTPRINT_STORAGE_KEY = 'footprint';

interface FootprintState {
  items: FootprintItem[];
}

type FootprintAction =
  | { type: 'ADD_FOOTPRINT'; payload: { product: Product } }
  | { type: 'REMOVE_FOOTPRINT'; payload: { productId: number } }
  | { type: 'BATCH_REMOVE'; payload: { productIds: number[] } }
  | { type: 'TOGGLE_SELECT'; payload: { productId: number } }
  | { type: 'TOGGLE_SELECT_ALL'; payload: { selected: boolean } }
  | { type: 'CLEAR_ALL' }
  | { type: 'SET_ITEMS'; payload: FootprintItem[] };

const initialState: FootprintState = {
  items: []
};

const loadFootprintFromStorage = (): FootprintItem[] => {
  try {
    const data = Taro.getStorageSync(FOOTPRINT_STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data) as FootprintItem[];
      return parsed.map(item => {
        const product = getProductById(item.productId);
        if (product) {
          return { ...item, product, selected: false };
        }
        return null;
      }).filter(Boolean) as FootprintItem[];
    }
  } catch (e) {
    console.error('加载足迹数据失败', e);
  }
  return [];
};

const saveFootprintToStorage = (items: FootprintItem[]) => {
  try {
    const dataToSave = items.map(item => ({
      productId: item.productId,
      browseTime: item.browseTime
    }));
    Taro.setStorageSync(FOOTPRINT_STORAGE_KEY, JSON.stringify(dataToSave));
  } catch (e) {
    console.error('保存足迹数据失败', e);
  }
};

const footprintReducer = (state: FootprintState, action: FootprintAction): FootprintState => {
  switch (action.type) {
    case 'SET_ITEMS': {
      return { ...state, items: action.payload };
    }
    case 'ADD_FOOTPRINT': {
      const { product } = action.payload;
      const existingIndex = state.items.findIndex(item => item.productId === product.id);
      if (existingIndex > -1) {
        const newItems = [...state.items];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          browseTime: Date.now()
        };
        return { ...state, items: newItems };
      }
      const newItem: FootprintItem = {
        productId: product.id,
        product,
        browseTime: Date.now(),
        selected: false
      };
      return {
        ...state,
        items: [newItem, ...state.items]
      };
    }
    case 'REMOVE_FOOTPRINT': {
      return {
        ...state,
        items: state.items.filter(item => item.productId !== action.payload.productId)
      };
    }
    case 'BATCH_REMOVE': {
      const { productIds } = action.payload;
      return {
        ...state,
        items: state.items.filter(item => !productIds.includes(item.productId))
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
    case 'CLEAR_ALL': {
      return { ...state, items: [] };
    }
    default:
      return state;
  }
};

interface FootprintContextValue {
  state: FootprintState;
  dispatch: React.Dispatch<FootprintAction>;
  refreshFootprints: () => void;
}

const FootprintContext = createContext<FootprintContextValue | null>(null);

export const FootprintProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(footprintReducer, initialState);

  const refreshFootprints = useCallback(() => {
    const items = loadFootprintFromStorage();
    dispatch({ type: 'SET_ITEMS', payload: items });
  }, []);

  useEffect(() => {
    refreshFootprints();
  }, [refreshFootprints]);

  useEffect(() => {
    saveFootprintToStorage(state.items);
  }, [state.items]);

  const contextValue: FootprintContextValue = {
    state,
    dispatch,
    refreshFootprints
  };

  return (
    <FootprintContext.Provider value={contextValue}>
      {children}
    </FootprintContext.Provider>
  );
};

export const useFootprint = () => {
  const context = useContext(FootprintContext);
  if (!context) {
    throw new Error('useFootprint must be used within a FootprintProvider');
  }
  return context;
};

export const selectFootprintCount = (items: FootprintItem[]): number => {
  return items.length;
};

export const selectSelectedFootprints = (items: FootprintItem[]): FootprintItem[] => {
  return items.filter(item => item.selected);
};

export const selectAllSelected = (items: FootprintItem[]): boolean => {
  return items.length > 0 && items.every(item => item.selected);
};

export const sortFootprintsByTime = (items: FootprintItem[]): FootprintItem[] => {
  return [...items].sort((a, b) => b.browseTime - a.browseTime);
};
