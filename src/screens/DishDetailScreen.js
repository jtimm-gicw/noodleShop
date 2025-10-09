import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const DishDetailScreen = ({ route }) => {
  // route.params will receive the dish data from navigation
  const { name, image, description, price } = route.params;

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.price}>${price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FAF8E1',
    padding: 20,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 20,
    marginBottom: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 15,
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    color: '#E74C3C',
  },
});

export default DishDetailScreen;
