/* (central cart state */

import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import Storage from '../utils/storage'; // ✅ Uses custom helper for cross-platform storage

// Create the context
export const CartContext = createContext(null);

// Provider component that wraps the app
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // array of { id, name, price, qty, image, ... }
  const CART_KEY = 'TUKTUK_CART_v1';

  // Load stored cart on mount
  useEffect(() => {
    (async () => {
      try {
        // 🔹 Changed AsyncStorage to Storage (our custom helper)
        // This ensures compatibility across Android, iOS, and Web.
        // On native, it uses @react-native-async-storage/async-storage.
        // On web, it automatically falls back to localStorage.
        const raw = await Storage.getItem(CART_KEY);

        // 🔹 If data exists, parse and set it into state
        if (raw) setCart(JSON.parse(raw));
      } catch (e) {
        // 🔹 Kept error handling as-is for debugging purposes
        console.warn('Failed to load cart from storage', e);
      }
    })();
  }, []);

  // Save cart to storage every time it changes
  useEffect(() => {
    (async () => {
      try {
        // 🔧 FIXED: replaced AsyncStorage with Storage
        // Previously this line caused warnings because AsyncStorage was not defined.
        // Storage uses native async-storage when available, otherwise it uses localStorage on web.
        await Storage.setItem(CART_KEY, JSON.stringify(cart));
      } catch (e) {
        console.warn('Failed to save cart to storage', e);
      }
    })();
  }, [cart]);

  // Add an item to cart. If exists, increase qty.
  const addItem = (item, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + qty } : i);
      } else {
        return [...prev, { ...item, qty }];
      }
    });
  };

  // Remove entire item from cart
  const removeItem = (id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  // Change quantity (sets absolute qty; if qty <= 0 removes item)
  const setItemQty = (id, qty) => {
    if (qty <= 0) {
      removeItem(id);
      return;
    }
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };

  // Increment / decrement helper
  const increment = (id) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i));
  };
  const decrement = (id) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i));
  };

  // Clear cart (with optional confirmation)
  const clearCart = (confirm = false) => {
    if (confirm) {
      Alert.alert('Clear cart', 'Are you sure you want to empty your cart?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', style: 'destructive', onPress: () => setCart([]) },
      ]);
    } else {
      setCart([]);
    }
  };

  // Compute totals
  const itemCount = cart.reduce((s, i) => s + i.qty, 0);
  const subTotal = cart.reduce((s, i) => s + (i.price * i.qty), 0);

  // Value provided to consumers
  const value = {
    cart,
    addItem,
    removeItem,
    setItemQty,
    increment,
    decrement,
    clearCart,
    itemCount,
    subTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
