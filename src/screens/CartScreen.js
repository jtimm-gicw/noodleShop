// src/screens/CartScreen.jsx
import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { CartContext } from '../context/CartContext'; // access shared cart data and functions

// 🧩 Small component for each item in the cart
const CartItem = ({ item, increment, decrement, remove }) => (
  <View style={styles.itemRow}>
    {/* Show product image if available */}
    {item.image ? (
      <Image
        source={typeof item.image === 'string' ? { uri: item.image } : item.image}
        style={styles.thumb}
      />
    ) : null}

    {/* Item details: name, price, quantity controls */}
    <View style={{ flex: 1, paddingHorizontal: 8 }}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>
        ${(item.price * item.qty).toFixed(2)} • {item.qty} x ${item.price.toFixed(2)}
      </Text>

      {/* Quantity buttons and remove button */}
      <View style={styles.qtyRow}>
        <TouchableOpacity onPress={() => decrement(item.id)} style={styles.qtyBtn}>
          <Text style={styles.qtyBtnText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.qtyText}>{item.qty}</Text>

        <TouchableOpacity onPress={() => increment(item.id)} style={styles.qtyBtn}>
          <Text style={styles.qtyBtnText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => remove(item.id)} style={styles.removeBtn}>
          <Text style={{ color: 'white', fontWeight: '600' }}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

// 🛒 Main Cart screen component
const CartScreen = ({ navigation }) => {
  // Get cart items and functions from context
  const { cart, increment, decrement, removeItem, clearCart, subTotal } = useContext(CartContext);

  // Placeholder for checkout button
  const handleCheckout = () => {
    Alert.alert('Checkout', 'This is a placeholder for your checkout flow.');
  };

  return (
    <View style={styles.container}>
      {/* If cart is empty, show a message */}
      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty.</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.backToHome}>Go back to Home</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {/* List of cart items */}
          <FlatList
            data={cart}
            keyExtractor={(i) => i.id.toString()}
            renderItem={({ item }) => (
              <CartItem
                item={item}
                increment={increment}
                decrement={decrement}
                remove={(id) => removeItem(id)}
              />
            )}
            contentContainerStyle={{ paddingBottom: 100 }}
          />

          {/* Bottom section: subtotal, clear & checkout buttons */}
          <View style={styles.footer}>
            <View>
              <Text style={styles.subtotalLabel}>Subtotal</Text>
              <Text style={styles.subtotalText}>${subTotal.toFixed(2)}</Text>
            </View>

            <View style={styles.footerButtons}>
              <TouchableOpacity style={styles.clearBtn} onPress={() => clearCart(true)}>
                <Text style={styles.btnText}>Clear</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
                <Text style={styles.btnText}>Checkout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

// 🎨 Styles for the Cart screen (dark theme)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A', // dark background for contrast
    padding: 16,
  },
  itemRow: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: '#2A2A2A', // lighter gray box for each item
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#00FFFF', // subtle neon glow
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  thumb: { width: 80, height: 60, borderRadius: 6 },
  itemName: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  itemPrice: { color: '#CCCCCC', marginTop: 4 },
  qtyRow: { flexDirection: 'row', marginTop: 8, alignItems: 'center' },

  // Buttons for +/- quantity
  qtyBtn: {
    backgroundColor: '#00FFFF', // neon blue
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  qtyBtnText: { color: '#000', fontWeight: '700', fontSize: 16 },
  qtyText: { color: '#FFFFFF', marginHorizontal: 8 },

  // Remove button for an item
  removeBtn: {
    backgroundColor: '#FF1744', // red delete button
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 12,
  },

  // Empty cart message styles
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#FFFFFF', fontSize: 18 },
  backToHome: { color: '#39FF14', marginTop: 12, fontWeight: 'bold' },

  // Bottom subtotal section
  footer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: '#2A2A2A',
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtotalLabel: { color: '#BBBBBB', fontSize: 16 },
  subtotalText: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },

  footerButtons: { flexDirection: 'row' },

  // Clear cart button
  clearBtn: {
    backgroundColor: '#FF1744',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 8,
  },

  // Checkout button
  checkoutBtn: {
    backgroundColor: '#39FF14', // neon green
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
    shadowColor: '#39FF14', // subtle neon glow
    shadowOpacity: 0.6,
    shadowRadius: 10,
  },
  btnText: { color: '#000', fontWeight: '700' },
});

export default CartScreen;
