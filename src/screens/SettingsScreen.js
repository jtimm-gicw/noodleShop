// SettingsScreen.js
import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
  Switch,
} from 'react-native';
import { ProfileContext } from '../context/ProfileContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

/*
  SettingsScreen
  - Edit profile (name, address, phone, credit card)
  - Dark mode toggle saved in AsyncStorage
*/

const maskCard = (num) => {
  const digits = (num || '').replace(/\D/g, '');
  const last4 = digits.slice(-4);
  const masked = last4 ? '**** **** **** ' + last4 : '';
  return { masked, last4 };
};

export default function SettingsScreen() {
  const { profile, saveProfile } = useContext(ProfileContext);

  const [name, setName] = useState(profile.name || '');
  const [address, setAddress] = useState(profile.address || '');
  const [phone, setPhone] = useState(profile.phone || '');
  const [cardNumber, setCardNumber] = useState('');
  const [cardMasked, setCardMasked] = useState(profile.cardNumberMasked || '');
  const [cardExpiry, setCardExpiry] = useState(profile.cardExpiry || '');
  const [darkMode, setDarkMode] = useState(false);

  // Load profile and dark mode from storage
  useEffect(() => {
    setName(profile.name || '');
    setAddress(profile.address || '');
    setPhone(profile.phone || '');
    setCardMasked(profile.cardNumberMasked || '');
    setCardExpiry(profile.cardExpiry || '');

    (async () => {
      try {
        const savedDarkMode = await AsyncStorage.getItem('@dark_mode');
        if (savedDarkMode !== null) setDarkMode(savedDarkMode === 'true');
      } catch (e) {
        console.warn('Failed to load dark mode', e);
      }
    })();
  }, [profile]);

  const validatePhone = (p) => /^[0-9\-\+\s\(\)]{7,20}$/.test(p);
  const validateExpiry = (e) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(e);

  const onSave = async () => {
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

    let masked = cardMasked;
    let last4 = profile.cardLast4;

    if (cardNumber.trim()) {
      const { masked: m, last4: l } = maskCard(cardNumber);
      masked = m;
      last4 = l;
    }

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
    setCardNumber('');

    // Save dark mode preference
    try {
      await AsyncStorage.setItem('@dark_mode', darkMode.toString());
    } catch (e) {
      console.warn('Failed to save dark mode', e);
    }
  };

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // Styles based on dark mode
  const dynamicStyles = {
    container: { padding: 16, backgroundColor: darkMode ? '#222' : '#fff' },
    label: { fontWeight: '600', marginTop: 12, color: darkMode ? '#fff' : '#000' },
    input: {
      borderWidth: 1,
      borderColor: darkMode ? '#555' : '#ccc',
      borderRadius: 6,
      padding: 8,
      marginTop: 6,
      color: darkMode ? '#fff' : '#000',
    },
    info: { marginTop: 8, color: darkMode ? '#ccc' : '#444' },
    note: { marginTop: 12, color: '#aa0000', fontSize: 12 },
  };

  return (
    <ScrollView contentContainerStyle={dynamicStyles.container}>
      <Text style={dynamicStyles.label}>Full name</Text>
      <TextInput
        style={dynamicStyles.input}
        value={name}
        onChangeText={setName}
        placeholder="Jane Doe"
        placeholderTextColor={darkMode ? '#888' : '#aaa'}
      />

      <Text style={dynamicStyles.label}>Delivery address</Text>
      <TextInput
        style={[dynamicStyles.input, { height: 80 }]}
        value={address}
        onChangeText={setAddress}
        multiline
        placeholder="123 Main St, Apt 4"
        placeholderTextColor={darkMode ? '#888' : '#aaa'}
      />

      <Text style={dynamicStyles.label}>Phone</Text>
      <TextInput
        style={dynamicStyles.input}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        placeholder="+1 (555) 555-5555"
        placeholderTextColor={darkMode ? '#888' : '#aaa'}
      />

      <Text style={dynamicStyles.label}>
        Credit card (enter full number to update)
      </Text>
      <TextInput
        style={dynamicStyles.input}
        value={cardNumber}
        onChangeText={setCardNumber}
        keyboardType="number-pad"
        placeholder="4111 1111 1111 1111"
        placeholderTextColor={darkMode ? '#888' : '#aaa'}
      />

      <Text style={dynamicStyles.label}>Expiry (MM/YY)</Text>
      <TextInput
        style={dynamicStyles.input}
        value={cardExpiry}
        onChangeText={setCardExpiry}
        placeholder="MM/YY"
        maxLength={5}
        placeholderTextColor={darkMode ? '#888' : '#aaa'}
      />

      <Text style={dynamicStyles.info}>Stored card: {cardMasked || 'none'}</Text>

      {/* Dark Mode Toggle */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
        <Text style={[dynamicStyles.label, { marginRight: 8 }]}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={toggleDarkMode} />
      </View>

      <View style={{ marginTop: 16 }}>
        <Button title="Save profile" onPress={onSave} />
      </View>

      <Text style={dynamicStyles.note}>
        Note: For production, integrate a payment provider (Stripe, Braintree). Do not store raw card numbers.
      </Text>
    </ScrollView>
  );
}
