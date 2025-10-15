// src/components/Header/Header.js
import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import tukTukLogo from '../../../assets/tuktuk-logo.png';
import { DarkModeContext } from '../../context/DarkModeContext'; // ✅ import dark mode context

const Header = () => {
  const navigation = useNavigation();
  const darkCtx = useContext(DarkModeContext) || {};
  const darkMode = darkCtx.darkMode ?? darkCtx.isDarkMode ?? false;

  // ✅ Set gradient dynamically based on dark mode
  const gradientColors = darkMode ? ['#004d00', '#00ff00'] : ['#006400', '#90ee90'];

  return (
    <>
      {/* StatusBar overlay to allow gradient behind it */}
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={darkMode ? "light-content" : "dark-content"}
      />

      {/* LinearGradient header */}
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          styles.headerContainer,
          {
            // Make header start from top of screen behind status bar
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 25,
          },
          darkMode && {
            shadowColor: '#00FF00', // neon green glow
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 15,
            elevation: 8,
          },
        ]}
      >
        {/* Left: logo + title */}
        <View style={styles.leftContainer}>
          <Image source={tukTukLogo} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>TukTuk My Noodles</Text>
        </View>

        {/* Right: clickable cart icon */}
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <MaterialIcons
            name="shopping-cart"
            size={24}
            color={darkMode ? '#00FF00' : '#006400'}
          />
        </TouchableOpacity>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    // paddingTop removed here, handled dynamically above
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    flexShrink: 1,
    fontFamily: 'ComicNeue-Bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  cartButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
});

export default Header;
