"use client";

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';

// Inline Product type definition
type Product = {
  id: number;
  image: string;
  title: string;
  price: number;
  rating: number;
  category: string;
  description: string;
};

type CartItem = Product & { quantity: number };

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: 'ADD_TO_CART'; product: Product }
  | { type: 'REMOVE_FROM_CART'; productId: number }
  | { type: 'UPDATE_QUANTITY'; productId: number; quantity: number }
  | { type: 'SET_CART'; items: CartItem[] };

const CartContext = createContext<{
  cart: CartState;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
} | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.items.find(item => item.id === action.product.id);
      if (existing) {
        return {
          items: state.items.map(item =>
            item.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        items: [...state.items, { ...action.product, quantity: 1 }],
      };
    }
    case 'REMOVE_FROM_CART': {
      return {
        items: state.items.filter(item => item.id !== action.productId),
      };
    }
    case 'UPDATE_QUANTITY': {
      return {
        items: state.items.map(item =>
          item.id === action.productId ? { ...item, quantity: action.quantity } : item
        ),
      };
    }
    case 'SET_CART': {
      return { items: action.items };
    }
    default:
      return state;
  }
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) {
      try {
        const items = JSON.parse(stored);
        if (Array.isArray(items)) {
          dispatch({ type: 'SET_CART', items });
        }
      } catch {}
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart.items));
  }, [cart.items]);

  const addToCart = (product: Product) => dispatch({ type: 'ADD_TO_CART', product });
  const removeFromCart = (productId: number) => dispatch({ type: 'REMOVE_FROM_CART', productId });
  const updateQuantity = (productId: number, quantity: number) => dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
} 