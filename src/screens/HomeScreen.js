// src/screens/HomeScreen.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header/Header';
import DishCard from '../components/DishCard';
import dishes from '../data/dishes';
import { DarkModeContext } from '../context/DarkModeContext'; // ✅ ADDED: import dark mode context

/**
 * HomeScreen
 * Shows a list of noodle dishes with images, name and price.
 * 
 * CHANGED:
 * - SafeAreaView now covers top notch/status bar seamlessly using edges prop
 * - All other logic, styles, and comments remain intact
 */
export default function HomeScreen({ navigation }) {
  const darkCtx = useContext(DarkModeContext) || {}; // ✅ ADDED: read dark mode context
  const darkMode = darkCtx.darkMode ?? darkCtx.isDarkMode ?? false; // ✅ ADDED: support both naming options

  // Render each dish as a DishCard. Later you can navigate to a detail screen by using navigation.
  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.7} // ✅ added subtle fade effect when tapped
      onPress={() => {
        // Navigate to DishDetail screen, passing the clicked dish
        navigation.navigate('DishDetail', item);
      }}
    >
      <DishCard dish={item} />
    </TouchableOpacity>
  );

  // ✅ ADDED: dynamic styles for dark mode while keeping all existing styling
  const dynamicStyles = {
    container: {
      flex: 1,
      backgroundColor: darkMode ? '#1a1a1a' : '#FAF8E1', // dark gray background in dark mode
    },
    title: {
      fontSize: 28,
      fontWeight: '900', // bold for readability
      color: darkMode ? '#FFD700' : '#FF0000', // neon yellow in dark mode, bright red in light mode
      textShadowColor: darkMode ? '#006400' : '#8B0000', // dark green glow in dark mode, dark red in light
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 10, // creates neon-like glow
      fontFamily: 'Cochin', // playful, still legible font
      textAlign: 'center',
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    subtitle: {
      marginTop: 4,
      fontSize: 11,
      color: darkMode ? '#ccc' : '#666', // light gray in dark mode
    },
  };

  return (
    <SafeAreaView style={dynamicStyles.container} edges={['top', 'left', 'right']}>
      {/* Header component */}
      <Header />

      {/* Title and subtitle block */}
      <View style={styles.header}>
        <Text style={dynamicStyles.title}>Sen Khong Rao Aroi Mak</Text>
        <Text style={dynamicStyles.subtitle}>
          Tap a dish to view details or add to cart
        </Text>
      </View>

      <FlatList
        data={dishes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false} // optional
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  list: {
    paddingBottom: 16,
  },
});
