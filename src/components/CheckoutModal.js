import React, { useContext, useMemo } from 'react';
import { Modal, View, Text, Button, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { ProfileContext } from '../context/ProfileContext';

/*
  CheckoutModal
  - Displays delivery info, payment info, order summary
  - Added "Edit Profile" button to navigate to Settings
*/

export default function CheckoutModal({ visible, onClose, orderItems = [], onConfirm, navigation }) {
  const { profile } = useContext(ProfileContext);

  // ✅ Memoize subtotal calculation for performance
  const subtotal = useMemo(
    () => orderItems.reduce((s, it) => s + (it.price * (it.qty || 1)), 0),
    [orderItems]
  );

  const handleConfirm = () => {
    // ✅ Validate profile info before checkout
    if (!profile.address || !profile.name) {
      Alert.alert('Missing profile info', 'Please fill name & address in Settings before checking out.');
      return;
    }
    if (!profile.cardNumberMasked) {
      Alert.alert('No payment method', 'Please add a payment method in Settings or use another payment flow.');
      return;
    }

    // ✅ Mock confirmation action
    Alert.alert('Order placed', `Order totaling $${subtotal.toFixed(2)} placed (mock).`);
    onConfirm && onConfirm();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.backdrop}>
        <View style={styles.modal}>
          <ScrollView>
            <Text style={styles.title}>Checkout</Text>

            {/* ---------- ADDED: Edit Profile button ---------- */}
            <TouchableOpacity
              style={styles.editProfileBtn}
              onPress={() => {
                onClose(); // Close modal
                navigation?.navigate('Settings'); // Navigate to Settings/Profile page
              }}
            >
              <Text style={styles.editProfileText}>✏️ Edit Profile</Text>
            </TouchableOpacity>

            {/* Delivery info */}
            <Text style={styles.sectionTitle}>Delivery</Text>
            <Text style={styles.text}>{profile.name || 'No name set'}</Text>
            <Text style={styles.text}>{profile.address || 'No address set'}</Text>
            <Text style={styles.text}>{profile.phone || 'No phone set'}</Text>

            {/* Payment info */}
            <Text style={styles.sectionTitle}>Payment</Text>
            <Text style={styles.text}>{profile.cardNumberMasked || 'No card saved'}</Text>
            <Text style={styles.text}>Expiry: {profile.cardExpiry || '—'}</Text>

            {/* Order summary */}
            <Text style={styles.sectionTitle}>Order summary</Text>
            {orderItems.map((it, i) => (
              <View key={i} style={styles.row}>
                <Text>{it.name} x{it.qty || 1}</Text>
                <Text>${(it.price * (it.qty || 1)).toFixed(2)}</Text>
              </View>
            ))}

            <View style={styles.row}>
              <Text style={{ fontWeight: '700' }}>Subtotal</Text>
              <Text style={{ fontWeight: '700' }}>${subtotal.toFixed(2)}</Text>
            </View>

            {/* Buttons */}
            <View style={{ marginTop: 12 }}>
              <Button title="Confirm & Pay (mock)" onPress={handleConfirm} />
            </View>

            <View style={{ marginTop: 8 }}>
              <Button title="Close" onPress={onClose} />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 16 },
  modal: { backgroundColor: '#fff', borderRadius: 8, padding: 16, maxHeight: '80%' },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  sectionTitle: { marginTop: 12, fontWeight: '600' },
  text: { marginTop: 4, color: '#333' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },

  // ---------- Styles for Edit Profile button ----------
  editProfileBtn: {
    backgroundColor: '#FFA500', // bright orange for visibility
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center', // center text horizontally
  },
  editProfileText: {
    color: '#000',
    fontWeight: '700',
    textAlign: 'center',
  },
});
