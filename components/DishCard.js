// src/components/DishCard.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

/**
 * DishCard
 * Props:
 *  - dish: { id, name, price, image }
 *  - onPress: optional function when card pressed
 */
export default function DishCard({ dish, onPress = () => {} }) {
  // Format price to 2 decimals
  const priceText = `$${dish.price.toFixed(2)}`;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image
        source={
          // if user used local require(...) in data, it will be an object - pass through
          typeof dish.image === 'string' ? { uri: dish.image } : dish.image
        }
        style={styles.image}
        resizeMode="cover"
        accessibilityLabel={`${dish.name} image`}
      />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {dish.name}
        </Text>
        <Text style={styles.price}>{priceText}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
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
  },
  price: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
});
