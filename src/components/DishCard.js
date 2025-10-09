// src/components/DishCard.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// CHANGED:
// - Added useNavigation & TouchableOpacity so this component handles its own press.
// - DID NOT change any styling values — styles below match the original visual rules.
// - IMPORTANT: TouchableOpacity is used without a style prop so it won't affect layout.

export default function DishCard({ dish }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        console.log('DishCard pressed:', dish?.name); // small debug line
        navigation.navigate('DishDetail', dish);
      }}
    >
      {/* --- ORIGINAL CARD CONTENT (styling unchanged) --- */}
      <View style={styles.card}>
        {dish.image ? <Image source={dish.image} style={styles.image} /> : null}

        <View style={styles.info}>
          <Text style={styles.name}>{dish.name}</Text>
          <Text style={styles.price}>${Number(dish.price).toFixed(2)}</Text>
        </View>
      </View>
      {/* --- END ORIGINAL CONTENT --- */}
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
