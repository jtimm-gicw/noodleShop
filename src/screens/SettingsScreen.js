import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ProfileContext } from '../context/ProfileContext';

/*
  SettingsScreen
  - Form UI for users to edit profile: name, address, phone, credit card (edit only).
  - Uses ProfileContext to load + save profile.
  - Masks card number for local display; stores only masked/last4 for demo.
  - Basic validation included for phone and expiry.
*/

// Helper: returns masked card string and last 4 digits from raw input
const maskCard = (num) => {
  const digits = (num || '').replace(/\D/g, ''); // remove non-digits
  const last4 = digits.slice(-4);
  const masked = last4 ? '**** **** **** ' + last4 : '';
  return { masked, last4 };
};

export default function SettingsScreen() {
  // Pull profile and save function from context
  const { profile, saveProfile } = useContext(ProfileContext);

  // Local form state (we keep raw card input only while editing)
  const [name, setName] = useState(profile.name || '');
  const [address, setAddress] = useState(profile.address || '');
  const [phone, setPhone] = useState(profile.phone || '');
  const [cardNumber, setCardNumber] = useState(''); // raw while editing (do not persist raw)
  const [cardMasked, setCardMasked] = useState(profile.cardNumberMasked || '');
  const [cardExpiry, setCardExpiry] = useState(profile.cardExpiry || '');

  // ---------- MINIMAL ADDITION: simulated demo cards ----------
  // This is the only new piece: sample (fake) cards for demo purposes.
  // They are NOT used for real payments and are clearly marked as demo.
  const [savedCards] = useState([
    { id: 'demo-1', type: 'Visa', numberMasked: '**** **** **** 4242', holder: profile.name || 'Demo User', expiry: '12/27' },
    { id: 'demo-2', type: 'MasterCard', numberMasked: '**** **** **** 5588', holder: profile.name || 'Demo User', expiry: '08/28' },
  ]);
  // ----------------------------------------------------------

  // Sync local form with profile when profile changes externally
  useEffect(() => {
    setName(profile.name || '');
    setAddress(profile.address || '');
    setPhone(profile.phone || '');
    setCardMasked(profile.cardNumberMasked || '');
    setCardExpiry(profile.cardExpiry || '');
  }, [profile]);

  // Simple validators
  const validatePhone = (p) => /^[0-9\-\+\s\(\)]{7,20}$/.test(p); // loose check
  const validateExpiry = (e) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(e); // MM/YY

  // onSave: validate important fields, mask card if provided, save via context
  const onSave = () => {
    if (!name.trim() || !address.trim()) {
      Alert.alert('Missing info', 'Please provide name and address.');
      return;
    }
    if (phone && !validatePhone(phone)) {
      Alert.alert('Bad phone', 'Please enter a valid phone number.');
      return;
    }
    if (cardExpiry && !validateExpiry(cardExpiry)) {
      Alert.alert('Bad expiry', 'Enter expiry as MM/YY.');
      return;
    }

    // If user typed a new card number, mask and get last4
    let masked = cardMasked;
    let last4 = profile.cardLast4;
    if (cardNumber.trim()) {
      const { masked: m, last4: l } = maskCard(cardNumber);
      masked = m;
      last4 = l;
      // NOTE: we do NOT save the raw card number. In production, tokenize via payment provider.
    }

    // Build new profile object and persist it
    const newProfile = {
      name: name.trim(),
      address: address.trim(),
      phone: phone.trim(),
      cardNumberMasked: masked,
      cardLast4: last4,
      cardExpiry: cardExpiry.trim(),
    };
    saveProfile(newProfile);
    Alert.alert('Saved', 'Profile saved locally.');

    // Clear raw card input from state for safety
    setCardNumber('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Name input */}
      <Text style={styles.label}>Full name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Jane Doe" />

      {/* Address input (multiline) */}
      <Text style={styles.label}>Delivery address</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        value={address}
        onChangeText={setAddress}
        multiline
        placeholder="123 Main St, Apt 4"
      />

      {/* Phone input */}
      <Text style={styles.label}>Phone</Text>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholder="+1 (555) 555-5555" />

      {/* Card input (raw only while editing) */}
      <Text style={styles.label}>Credit card (enter full number to update)</Text>
      <TextInput
        style={styles.input}
        value={cardNumber}
        onChangeText={(text) => setCardNumber(text)}
        keyboardType="number-pad"
        placeholder="4111 1111 1111 1111"
      />

      {/* Expiry input */}
      <Text style={styles.label}>Expiry (MM/YY)</Text>
      <TextInput style={styles.input} value={cardExpiry} onChangeText={setCardExpiry} placeholder="MM/YY" maxLength={5} />

      {/* Display stored masked card info */}
      <Text style={styles.info}>Stored card: {cardMasked || 'none'}</Text>

      {/* Save button */}
      <View style={{ marginTop: 16 }}>
        <Button title="Save profile" onPress={onSave} />
      </View>

      {/* Small security note */}
      <Text style={styles.note}>
        Note: For production, integrate a payment provider (Stripe, Braintree). Do not store raw card numbers.
      </Text>

      {/* ---------- MINIMAL ADDITION: Render demo saved cards (non-functional) ---------- */}
      <View style={{ marginTop: 24 }}>
        <Text style={[styles.label, { marginBottom: 8 }]}>Saved Payment Methods (Demo Only)</Text>
        {savedCards.map((c) => (
          <View key={c.id} style={styles.cardDemo}>
            <Text style={{ fontWeight: '700', marginBottom: 4 }}>{c.type}</Text>
            <Text>{c.numberMasked}</Text>
            <Text style={{ color: '#666', marginTop: 4 }}>{c.holder} • Expires {c.expiry}</Text>
            {/* Optional: a demo "use this" button that populates masked fields (does not store raw) */}
            <TouchableOpacity
              style={styles.useButton}
              onPress={() => {
                // Populate the masked card fields from the demo card (no raw stored)
                setCardMasked(c.numberMasked);
                // Extract last4 from masked (safe demo only)
                const last4 = c.numberMasked.slice(-4);
                // Update expiry to match demo card
                setCardExpiry(c.expiry);
                Alert.alert('Demo card loaded', 'Demo card details populated in the form (not saved).');
              }}
            >
              <Text style={{ fontWeight: '700' }}>Use (Demo)</Text>
            </TouchableOpacity>
          </View>
        ))}
        <Text style={{ color: '#888', marginTop: 10 }}>
          ⚠️ These are simulated cards for demo purposes only. No real payments are processed.
        </Text>
      </View>
      {/* ------------------------------------------------------------------------------------ */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { fontWeight: '600', marginTop: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 8, marginTop: 6 },
  info: { marginTop: 8, color: '#444' },
  note: { marginTop: 12, color: '#aa0000', fontSize: 12 },

  /* styles for demo cards */
  cardDemo: {
    backgroundColor: '#f3f3f3',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  useButton: {
    marginTop: 8,
    backgroundColor: '#eee',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
});
