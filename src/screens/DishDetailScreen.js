import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function DishDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const dish = route.params;

  if (!dish) return null;

  return (
    <View style={styles.container}>
      {/* --- Dish image --- */}
      <Image source={dish.image} style={styles.image} />

      {/* --- Dish name --- */}
      <Text style={styles.name}>{dish.name}</Text>

      {/* --- Dish price --- */}
      <Text style={styles.price}>${Number(dish.price).toFixed(2)}</Text>

      {/* --- Dish description --- */}
      <Text style={styles.description}>
        A delicious Thai noodle dish made fresh with authentic ingredients. Enjoy bold flavors and vibrant colors in every bite!
      </Text>

      {/* ✅ Added: Button section for Home + Add to Cart */}
      <View style={styles.buttonContainer}>
        
        {/* ✅ Added: Home button (glowing neon green) */}
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate('Home')} // Navigates back to HomeScreen
        >
          <Text style={styles.buttonText}>🏠 Home</Text>
        </TouchableOpacity>

        {/* ✅ Added: Add to Cart button (glowing neon blue) */}
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => {
            console.log('Add to Cart pressed for:', dish?.name);
            // ✅ Future: This will add the dish to the cart once CartScreen is created
          }}
        >
          <Text style={styles.buttonText}>🛒 Add to Cart</Text>
        </TouchableOpacity>
      </View>
      {/* ✅ End of added buttons */}
    </View>
  );
}

// --- STYLES ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8E1', // same background as HomeScreen for consistency
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
    color: '#FF0000', // bright red matches app’s neon theme
    marginTop: 16,
    textAlign: 'center',
  },
  price: {
    fontSize: 18,
    color: '#444',
    marginTop: 6,
  },
  description: {
    fontSize: 15,
    color: '#666',
    marginTop: 12,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
  },

  /* ✅ Added: Button styling section */
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 30,
    gap: 16, // space between buttons
  },

  // ✅ Home button: Neon green glow
  homeButton: {
    backgroundColor: '#00FF66', // neon green
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    shadowColor: '#00FF66',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 6, // Android glow
  },

  // ✅ Add to Cart button: Neon blue glow
  cartButton: {
    backgroundColor: '#00CCFF', // neon blue
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    shadowColor: '#00CCFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 6,
  },

  // ✅ Shared button text style
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
});
