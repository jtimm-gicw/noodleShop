
 // src/context/CartContext.js

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

import { Alert } from 'react-native';
import Storage from '../utils/storage';

// NEW: Authentication context
import { AuthContext } from './AuthContext';

// EXISTING: Create shopping cart context
export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {

  // NEW: Get signed-in user safely
  const auth = useContext(AuthContext);
  const user = auth?.user ?? null;

  // FIXED: Do not access user.id when logged out
  const CART_KEY = user
    ? `TUKTUK_CART_v2_${user.id}`
    : null;

  // EXISTING: Cart items
  const [cart, setCart] = useState([]);

  // NEW: Track which account's cart has loaded
  const [loadedKey, setLoadedKey] = useState(null);

  // -----------------------------------------
  // UPDATED: Load saved cart for each user
  // -----------------------------------------
  useEffect(() => {
    let active = true;

    // Reset whenever the account changes
    setCart([]);
    setLoadedKey(null);

    // No signed-in user: no cart to load
    if (!CART_KEY) {
      return () => {
        active = false;
      };
    }

    const loadCart = async () => {
      try {
        const raw = await Storage.getItem(CART_KEY);

        if (active) {
          const savedCart = raw ? JSON.parse(raw) : [];
          setCart(Array.isArray(savedCart) ? savedCart : []);
        }
      } catch (error) {
        console.warn('Failed to load cart', error);

        if (active) {
          setCart([]);
        }
      } finally {
        if (active) {
          setLoadedKey(CART_KEY);
        }
      }
    };

    loadCart();

    return () => {
      active = false;
    };

  }, [CART_KEY]);

  // -----------------------------------------
  // UPDATED: Save cart for signed-in user
  // -----------------------------------------
  useEffect(() => {

    // Do not overwrite storage before loading finishes
    if (!CART_KEY || loadedKey !== CART_KEY) {
      return;
    }

    const saveCart = async () => {
      try {
        await Storage.setItem(
          CART_KEY,
          JSON.stringify(cart)
        );
      } catch (error) {
        console.warn('Failed to save cart', error);
      }
    };

    saveCart();

  }, [cart, CART_KEY, loadedKey]);

  // -----------------------------------------
  // EXISTING: Add item to cart
  // -----------------------------------------
  const addItem = (item, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);

      if (existing) {
        return prev.map(i =>
          i.id === item.id
            ? { ...i, qty: i.qty + qty }
            : i
        );
      }

      return [...prev, { ...item, qty }];
    });
  };

  // EXISTING: Remove an item completely
  const removeItem = (id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  // EXISTING: Set an item's quantity
  const setItemQty = (id, qty) => {
    if (qty <= 0) {
      removeItem(id);
      return;
    }

    setCart(prev =>
      prev.map(i =>
        i.id === id ? { ...i, qty } : i
      )
    );
  };

  // EXISTING: Increase quantity
  const increment = (id) => {
    setCart(prev =>
      prev.map(i =>
        i.id === id
          ? { ...i, qty: i.qty + 1 }
          : i
      )
    );
  };

  // EXISTING: Decrease quantity
  const decrement = (id) => {
    setCart(prev =>
      prev.map(i =>
        i.id === id
          ? { ...i, qty: Math.max(1, i.qty - 1) }
          : i
      )
    );
  };

  // EXISTING: Clear shopping cart
  const clearCart = (confirm = false) => {
    if (confirm) {
      Alert.alert(
        'Clear cart',
        'Are you sure you want to empty your cart?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Yes',
            style: 'destructive',
            onPress: () => setCart([]),
          },
        ]
      );
    } else {
      setCart([]);
    }
  };

  // EXISTING: Calculate item count
  const itemCount = cart.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  // EXISTING: Calculate subtotal
  const subTotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  // EXISTING: Provide cart functions to screens
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

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
