// src/screens/DishDetailScreen.jsx 
import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

// ✅ Use CartContext to access cart functions
import { CartContext } from '../context/CartContext';

// ✅ ADDED: Import DarkModeContext for dark theme
import { DarkModeContext } from '../context/DarkModeContext';

export default function DishDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const dish = route.params;

  // Get addItem function from CartContext
  const { addItem } = useContext(CartContext);

  // ✅ ADDED: Read dark mode from context
  const darkCtx = useContext(DarkModeContext) || {};
  const darkMode = darkCtx.darkMode ?? darkCtx.isDarkMode ?? false;

  // If dish not passed, render nothing
  if (!dish) return null;

  // ✅ Dynamic styles for dark mode
  const dynamicStyles = {
    container: {
      backgroundColor: darkMode ? '#222' : '#FAF8E1', // dark background in dark mode
    },
    name: {
      color: darkMode ? '#FFD700' : '#FF0000', // bright yellow for dark mode
    },
    price: {
      color: darkMode ? '#FFD700' : '#444',
    },
    description: {
      color: darkMode ? '#ccc' : '#666',
    },
  };

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      {/* --- Dish image --- */}
      <Image source={dish.image} style={styles.image} />

      {/* --- Dish name --- */}
      <Text style={[styles.name, dynamicStyles.name]}>{dish.name}</Text>

      {/* --- Dish price --- */}
      <Text style={[styles.price, dynamicStyles.price]}>
        ${Number(dish.price).toFixed(2)}
      </Text>

      {/* --- Dish description --- */}
      <Text style={[styles.description, dynamicStyles.description]}>
        A delicious Thai noodle dish made fresh with authentic ingredients.
        Enjoy bold flavors and vibrant colors in every bite!
      </Text>

      {/* --- Button container --- */}
      <View style={styles.buttonContainer}>
        {/* ✅ Home button */}
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => {
            // Navigate to Home tab inside MainTabs
            navigation.navigate('Main', { screen: 'HomeTab' });
          }}
        >
          <Text style={styles.buttonText}>🏠 Home</Text>
        </TouchableOpacity>

        {/* ✅ Add to Cart button */}
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => {
            try {
              // Add this dish to cart
              addItem(
                {
                  id: dish.id,
                  name: dish.name,
                  price: Number(dish.price) || 0,
                  image: dish.image,
                },
                1 // quantity
              );
              console.log('DEBUG: addItem called for:', dish.name);

              // Optional: navigate to Cart tab
              navigation.navigate('Main', { screen: 'CartTab' });
            } catch (err) {
              console.warn('Failed to add to cart:', err);
            }
          }}
        >
          <Text style={styles.buttonText}>🛒 Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8E1', // overridden dynamically
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 16,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginTop: 60,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FF0000', // overridden dynamically
    marginTop: 16,
    textAlign: 'center',
  },
  price: {
    fontSize: 18,
    color: '#444', // overridden dynamically
    marginTop: 6,
  },
  description: {
    fontSize: 15,
    color: '#666', // overridden dynamically
    marginTop: 12,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 30,
    gap: 16,
  },
  homeButton: {
    backgroundColor: '#00FF66',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    shadowColor: '#00FF66',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 6,
  },
  cartButton: {
    backgroundColor: '#00CCFF',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    shadowColor: '#00CCFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
});
