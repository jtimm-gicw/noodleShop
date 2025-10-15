// src/screens/HomeScreen.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Header from '../components/Header/Header';
import DishCard from '../components/DishCard';
import dishes from '../data/dishes';
import { DarkModeContext } from '../context/DarkModeContext'; // ✅ ADDED: import dark mode context

export default function HomeScreen({ navigation }) {
  const darkCtx = useContext(DarkModeContext) || {};
  const darkMode = darkCtx.darkMode ?? darkCtx.isDarkMode ?? false;

  // Render each dish as a DishCard
  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.7} // subtle fade effect when tapped
      onPress={() => navigation.navigate('DishDetail', item)}
    >
      <DishCard dish={item} />
    </TouchableOpacity>
  );

  // Dynamic styles for dark mode
  const dynamicStyles = {
    container: {
      flex: 1,
      backgroundColor: darkMode ? '#1a1a1a' : '#FAF8E1', // dark gray in dark mode
    },
    title: {
      fontSize: 28,
      fontWeight: '900',
      color: darkMode ? '#ea00ffff' : '#FF0000',
      textShadowColor: darkMode ? '#de6fb9ff' : '#8B0000',
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 10,
      fontFamily: 'Cochin',
      textAlign: 'center',
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    subtitle: {
      marginTop: 4,
      fontSize: 11,
      color: darkMode ? '#ccc' : '#666',
    },
  };

  return (
    <View style={dynamicStyles.container}>
      {/* Header */}
      <Header />

      {/* Screen header text */}
      <View style={styles.header}>
        <Text style={dynamicStyles.title}>Sen Khong Rao Aroi Mak</Text>
        <Text style={dynamicStyles.subtitle}>
          Tap a dish to view details or add to cart
        </Text>
      </View>

      {/* Dish list */}
      <FlatList
        data={dishes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
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
