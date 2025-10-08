import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

// Icon import (keeps you from needing a cart image file)
import { MaterialIcons } from '@expo/vector-icons';

// CHANGED: assets folder is at project root, so we go up three levels from
// src/components/Header/Header.js to reach project-root/assets
import tukTukLogo from '../../../assets/tuktuk-logo.png';

const Header = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#006400', '#90ee90']} // dark to light green left-to-right
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.headerContainer}
    >
      {/* Left: logo + title */}
      <View style={styles.leftContainer}>
        <Image source={tukTukLogo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>TukTuk My Noodles</Text>
      </View>

      {/* Right: clickable cart icon */}
      <TouchableOpacity
        style={styles.cartButton} // CHANGED: new rounded style container
        onPress={() => navigation.navigate('Cart')}
      >
        <MaterialIcons name="shopping-cart" size={24} color="#006400" />
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    paddingTop: 25, // ✅ ADDED: slight padding at top for breathing room
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 60,
    marginRight: 10,
  },
  title: {
  fontSize: 18, // adjust for balance with icon
  fontWeight: 'bold',
  color: '#FFD700', // bright yellow (you can also try '#FFEB3B' for softer tone)
  flexShrink: 1,

  // fun typeface (depends on available fonts — works great with Expo)
  fontFamily: 'ComicNeue-Bold', // try 'Pacifico-Regular', 'FredokaOne-Regular', etc.

  // add text shadow for depth
  textShadowColor: '#000',
  textShadowOffset: { width: 2, height: 2 },
  textShadowRadius: 3,
},
  // ✅ ADDED: rounded cart button (similar to LandingPage.js style)
  cartButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3, // Android shadow
  },
});

export default Header;
