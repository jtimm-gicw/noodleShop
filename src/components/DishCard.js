// src/components/DishCard.js
import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DarkModeContext } from '../context/DarkModeContext'; // ✅ ADDED: import dark mode context

// CHANGED:
// - Added useContext to read dark mode
// - Updated card background and price text color in dark mode
// - DID NOT change layout or main styling, only color adaptation for dark theme

export default function DishCard({ dish }) {
  const navigation = useNavigation();
  const darkCtx = useContext(DarkModeContext) || {}; // ✅ read dark mode
  const darkMode = darkCtx.darkMode ?? darkCtx.isDarkMode ?? false;

  // ✅ dynamic styles for dark mode
  const dynamicStyles = {
    card: {
      backgroundColor: darkMode ? '#333' : '#fff', // dark gray for card in dark mode
    },
    price: {
      color: darkMode ? '#FFD700' : '#333', // bright yellow in dark mode
    },
    name: {
      color: darkMode ? '#fff' : '#000', // white text for dish name in dark mode
    },
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        console.log('DishCard pressed:', dish?.name); // small debug line
        navigation.navigate('DishDetail', dish);
      }}
    >
      {/* --- ORIGINAL CARD CONTENT (styling mostly unchanged, dynamic colors applied) --- */}
      <View style={[styles.card, dynamicStyles.card]}>
        {dish.image ? <Image source={dish.image} style={styles.image} /> : null}

        <View style={styles.info}>
          <Text style={[styles.name, dynamicStyles.name]}>{dish.name}</Text>
          <Text style={[styles.price, dynamicStyles.price]}>
            ${Number(dish.price).toFixed(2)}
          </Text>
        </View>
      </View>
      {/* --- END ORIGINAL CONTENT --- */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff', // overridden dynamically
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 8,
    marginHorizontal: 12,
    // light shadow (iOS)
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    // elevation (Android)
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
  },
  info: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
    color: '#000', // overridden dynamically
  },
  price: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333', // overridden dynamically
  },
});
