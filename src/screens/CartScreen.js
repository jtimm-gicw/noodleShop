// src/screens/CartScreen.jsx
import React, { useContext, useState } from 'react'; // ✅ Added useState
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from '../context/CartContext';
import { Ionicons } from '@expo/vector-icons';

import CheckoutModal from '../components/CheckoutModal';


// Small component for each item in the cart
const CartItem = ({ item, increment, decrement, remove }) => (
  <View style={styles.itemRow}>
    {item.image ? (
      <Image
        source={typeof item.image === 'string' ? { uri: item.image } : item.image}
        style={styles.thumb}
      />
    ) : null}

    <View style={{ flex: 1, paddingHorizontal: 8 }}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>
        ${(item.price * item.qty).toFixed(2)} • {item.qty} x ${item.price.toFixed(2)}
      </Text>

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

const CartScreen = () => {
  const navigation = useNavigation();
  const { cart, increment, decrement, removeItem, clearCart, subTotal } = useContext(CartContext);


  const [modalVisible, setModalVisible] = useState(false); // ✅ Hook moved inside component

  // ✅ Updated checkout handler to open modal
  const handleCheckout = () => setModalVisible(true);

  // Footer component for FlatList: Go back to Home
  const renderFooter = () => (
    <View style={styles.homeLinkContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Main', { screen: 'HomeTab' })}
        style={styles.homeButton}
      >
        <Text style={styles.homeButtonText}>🏠 Go back to Home</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty.</Text>
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
            contentContainerStyle={{ paddingBottom: 100 }}
            ListFooterComponent={renderFooter}
          />

          {/* Footer with subtotal, clear & checkout buttons */}
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

          {/* ✅ Checkout modal */}
          <CheckoutModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            orderItems={cart}
            onConfirm={() => {
              clearCart(true);
              setModalVisible(false);
              Alert.alert('Success', 'Order placed! (mock)');
            }}
          />
        </>
      )}
    </View>
  );
};

// --- Styles remain unchanged ---

// --- Styles ---
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
  qtyRow: { flexDirection: 'row', marginTop: 8, alignItems: 'center' },
  qtyBtn: { backgroundColor: '#00FFFF', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  qtyBtnText: { color: '#000', fontWeight: '700', fontSize: 16 },
  qtyText: { color: '#FFFFFF', marginHorizontal: 8 },
  removeBtn: { backgroundColor: '#FF1744', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6, marginLeft: 12 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#FFFFFF', fontSize: 18 },

  // Home button under last item
  homeLinkContainer: { alignItems: 'center', marginVertical: 20 },
  homeButton: {
    backgroundColor: '#FF8C00', // bright orange
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
  subtotalText: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
  footerButtons: { flexDirection: 'row' },
  clearBtn: { backgroundColor: '#FF1744', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 8, marginRight: 8 },
  checkoutBtn: { backgroundColor: '#39FF14', paddingHorizontal: 18, paddingVertical: 10, borderRadius: 8, shadowColor: '#39FF14', shadowOpacity: 0.6, shadowRadius: 10 },
  btnText: { color: '#000', fontWeight: '700' },
});

export default CartScreen;
