// src/screens/DishDetailScreen.jsx
import React, { useContext } from 'react'; // <-- added useContext
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

// <-- added import: use the same path you used before when creating CartContext
import { CartContext } from '../context/CartContext';

export default function DishDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const dish = route.params;

  // Get addItem from CartContext so we can add dishes to the cart
  const { addItem } = useContext(CartContext);

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

        {/* ✅ Home button (unchanged) */}
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>🏠 Home</Text>
        </TouchableOpacity>

        {/* ✅ Add to Cart button: now calls addItem */}
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => {
            console.log('Add to Cart pressed for:', dish?.name);

            // --- ADDED: call addItem from CartContext to add this dish to the cart ---
            // Pass an object with at least id, name, price, image so CartContext can store it.
            // Use qty = 1 for a single add.
            try {
              addItem(
                {
                  id: dish.id,           // make sure dish.id exists and is unique
                  name: dish.name,
                  price: Number(dish.price) || 0,
                  image: dish.image,
                },
                1 // quantity
              );
              console.log('DEBUG: addItem called for:', dish.name);

              // optional: navigate to Cart so user sees the item immediately
              navigation.navigate('Cart');
            } catch (err) {
              console.warn('Failed to add to cart:', err);
            }
          }}
        >
          <Text style={styles.buttonText}>🛒 Add to Cart</Text>
        </TouchableOpacity>
      </View>
      {/* ✅ End of added buttons */}
    </View>
  );
}

// --- STYLES --- (unchanged)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8E1',
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
    color: '#FF0000',
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
