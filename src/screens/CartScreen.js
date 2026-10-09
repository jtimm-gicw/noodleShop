
// src/screens/CartScreen.js

import React, { useContext, useState } from 'react';

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

// EXISTING: Shopping cart context
import { CartContext } from '../context/CartContext';

// NEW: User authentication context
import { AuthContext } from '../context/AuthContext';

// NEW: User profile context
import { ProfileContext } from '../context/ProfileContext';

// NEW: API helper for communicating with Express
import { api } from '../api/client';

// EXISTING: Checkout modal
import CheckoutModal from '../components/CheckoutModal';

/*
  CartScreen

  EXISTING:
  - Displays dishes in the shopping cart
  - Allows users to increase or decrease quantities
  - Removes items
  - Calculates subtotal
  - Opens checkout modal

  NEW:
  - Gets authentication token from AuthContext
  - Gets delivery information from ProfileContext
  - Sends orders to Express backend
  - Navigates to Orders screen after checkout

  FIXED:
  - All React hooks are inside CartScreen.
*/

// --------------------------------------------------
// EXISTING: Component displaying individual cart items
// --------------------------------------------------

const CartItem = ({ item, increment, decrement, remove }) => (
  <View style={styles.itemRow}>

    {item.image ? (
      <Image
        source={
          typeof item.image === 'string'
            ? { uri: item.image }
            : item.image
        }
        style={styles.thumb}
      />
    ) : null}

    <View style={{ flex: 1, paddingHorizontal: 8 }}>

      <Text style={styles.itemName}>
        {item.name}
      </Text>

      <Text style={styles.itemPrice}>
        ${(item.price * item.qty).toFixed(2)}
        {' • '}
        {item.qty} x ${item.price.toFixed(2)}
      </Text>

      <View style={styles.qtyRow}>

        <TouchableOpacity
          onPress={() => decrement(item.id)}
          style={styles.qtyBtn}
        >
          <Text style={styles.qtyBtnText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.qtyText}>
          {item.qty}
        </Text>

        <TouchableOpacity
          onPress={() => increment(item.id)}
          style={styles.qtyBtn}
        >
          <Text style={styles.qtyBtnText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => remove(item.id)}
          style={styles.removeBtn}
        >
          <Text style={{ color: 'white', fontWeight: '600' }}>
            Remove
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  </View>
);

// --------------------------------------------------
// MAIN CART SCREEN
// --------------------------------------------------

const CartScreen = () => {

  // EXISTING: React Navigation
  const navigation = useNavigation();

  // EXISTING: Access the shopping cart
  const {
    cart,
    increment,
    decrement,
    removeItem,
    clearCart,
    subTotal,
  } = useContext(CartContext);

  // ✅ FIXED: Hooks moved INSIDE CartScreen

  // NEW: Get the signed-in user's authentication token
  const { token } = useContext(AuthContext);

  // NEW: Get the user's saved delivery information
  const { profile } = useContext(ProfileContext);

  // EXISTING: Controls whether checkout modal is open
  const [modalVisible, setModalVisible] = useState(false);

  // NEW: Prevent duplicate order submissions
  const [submitting, setSubmitting] = useState(false);

  // --------------------------------------------------
  // EXISTING: Open checkout modal
  // --------------------------------------------------

  const handleCheckout = () => {
    setModalVisible(true);
  };

  // --------------------------------------------------
  // EXISTING: Return to Home button
  // --------------------------------------------------

  const renderFooter = () => (
    <View style={styles.homeLinkContainer}>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Main', {
            screen: 'HomeTab',
          })
        }
        style={styles.homeButton}
      >
        <Text style={styles.homeButtonText}>
          🏠 Go back to Home
        </Text>
      </TouchableOpacity>

    </View>
  );

  // --------------------------------------------------
  // NEW: Send order to Express backend
  // --------------------------------------------------

  const placeOrder = async () => {

    // Prevent multiple simultaneous checkout requests
    if (submitting) return;

    setSubmitting(true);

    try {

      // Send order to backend API
      // Backend checks actual dish prices.
      const created = await api('/orders', {
        method: 'POST',
        token,
        body: {
          deliveryAddress: profile.address,
          items: cart.map(item => ({
            id: item.id,
            qty: item.qty,
          })),
        },
      });

      // NEW: Clear cart after successful order
      // false = do not ask for another confirmation
      clearCart(false);

      // EXISTING: Close checkout modal
      setModalVisible(false);

      // NEW: Inform customer
      Alert.alert(
        'Simulated order placed',
        `Order #${created.id} is on its way! Watch progress under Orders.`
      );

      // NEW: Navigate to Orders tab
      navigation.navigate('Main', {
        screen: 'OrdersTab',
      });

    } catch (error) {

      // Show an error if backend request fails
      Alert.alert(
        'Could not place order',
        error.message
      );

    } finally {

      // Allow user to submit another order
      setSubmitting(false);
    }
  };

  // --------------------------------------------------
  // EXISTING: Render CartScreen
  // --------------------------------------------------

  return (
    <View style={styles.container}>

      {cart.length === 0 ? (

        <View style={styles.emptyContainer}>

          <Text style={styles.emptyText}>
            Your cart is empty.
          </Text>

          {renderFooter()}

        </View>

      ) : (

        <>
          <FlatList
            data={cart}
            keyExtractor={(i) => i.id.toString()}
            renderItem={({ item }) => (
              <CartItem
                item={item}
                increment={increment}
                decrement={decrement}
                remove={removeItem}
              />
            )}
            contentContainerStyle={{
              paddingBottom: 100,
            }}
            ListFooterComponent={renderFooter}
          />

          {/* EXISTING: Cart subtotal and buttons */}
          <View style={styles.footer}>

            <View>
              <Text style={styles.subtotalLabel}>
                Subtotal
              </Text>

              <Text style={styles.subtotalText}>
                ${subTotal.toFixed(2)}
              </Text>
            </View>

            <View style={styles.footerButtons}>

              <TouchableOpacity
                style={styles.clearBtn}
                onPress={() => clearCart(true)}
              >
                <Text style={styles.btnText}>
                  Clear
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.checkoutBtn}
                onPress={handleCheckout}
                disabled={submitting}
              >
                <Text style={styles.btnText}>
                  {submitting ? 'Placing...' : 'Checkout'}
                </Text>
              </TouchableOpacity>

            </View>
          </View>

          {/* UPDATED: Checkout sends order to backend */}
          <CheckoutModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            orderItems={cart}
            navigation={navigation}
            onConfirm={placeOrder}
          />
        </>

      )}
    </View>
  );
};

// --------------------------------------------------
// EXISTING STYLES — ALL ORIGINAL VALUES PRESERVED
// --------------------------------------------------

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1A1A', padding: 16 },
  itemRow: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: '#2A2A2A',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#00FFFF',
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  thumb: { width: 80, height: 60, borderRadius: 6 },
  itemName: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  itemPrice: { color: '#CCCCCC', marginTop: 4 },
  qtyRow: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
  qtyBtn: {
    backgroundColor: '#00FFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  qtyBtnText: { color: '#000', fontWeight: '700', fontSize: 16 },
  qtyText: { color: '#FFFFFF', marginHorizontal: 8 },
  removeBtn: {
    backgroundColor: '#FF1744',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: { color: '#FFFFFF', fontSize: 18 },

  homeLinkContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  homeButton: {
    backgroundColor: '#FF8C00',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: '#FFA500',
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 6,
  },
  homeButtonText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 16,
  },

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
  subtotalText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  footerButtons: { flexDirection: 'row' },
  clearBtn: {
    backgroundColor: '#FF1744',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  checkoutBtn: {
    backgroundColor: '#39FF14',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
    shadowColor: '#39FF14',
    shadowOpacity: 0.6,
    shadowRadius: 10,
  },
  btnText: {
    color: '#000',
    fontWeight: '700',
  },
});

export default CartScreen;
