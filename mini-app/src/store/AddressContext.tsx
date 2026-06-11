import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import type { Address } from '@/types';
import { addresses as initialAddresses } from '@/data/user';

interface AddressState {
  list: Address[];
}

type AddressAction =
  | { type: 'ADD_ADDRESS'; payload: Omit<Address, 'id'> }
  | { type: 'UPDATE_ADDRESS'; payload: Address }
  | { type: 'SET_DEFAULT'; payload: { id: number } }
  | { type: 'DELETE_ADDRESS'; payload: { id: number } };

const initialState: AddressState = {
  list: initialAddresses
};

const addressReducer = (state: AddressState, action: AddressAction): AddressState => {
  switch (action.type) {
    case 'ADD_ADDRESS': {
      const newId = state.list.length > 0 ? Math.max(...state.list.map(a => a.id)) + 1 : 1;
      const newAddress: Address = { ...action.payload, id: newId };

      let newList = [...state.list];
      if (newAddress.isDefault) {
        newList = newList.map(addr => ({ ...addr, isDefault: false }));
      }
      if (newList.length === 0) {
        newAddress.isDefault = true;
      }

      return {
        ...state,
        list: [...newList, newAddress]
      };
    }
    case 'UPDATE_ADDRESS': {
      const updated = action.payload;
      let newList = state.list.map(addr => {
        if (addr.id === updated.id) {
          return updated;
        }
        if (updated.isDefault) {
          return { ...addr, isDefault: false };
        }
        return addr;
      });

      const hasDefault = newList.some(addr => addr.isDefault);
      if (!hasDefault && newList.length > 0) {
        newList[0].isDefault = true;
      }

      return {
        ...state,
        list: newList
      };
    }
    case 'SET_DEFAULT': {
      const { id } = action.payload;
      return {
        ...state,
        list: state.list.map(addr => ({
          ...addr,
          isDefault: addr.id === id
        }))
      };
    }
    case 'DELETE_ADDRESS': {
      const { id } = action.payload;
      const remaining = state.list.filter(addr => addr.id !== id);
      const hasDefault = remaining.some(addr => addr.isDefault);
      if (!hasDefault && remaining.length > 0) {
        remaining[0].isDefault = true;
      }
      return {
        ...state,
        list: remaining
      };
    }
    default:
      return state;
  }
};

const AddressContext = createContext<{
  state: AddressState;
  dispatch: React.Dispatch<AddressAction>;
} | null>(null);

export const AddressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(addressReducer, initialState);

  return (
    <AddressContext.Provider value={{ state, dispatch }}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error('useAddress must be used within an AddressProvider');
  }
  return context;
};
