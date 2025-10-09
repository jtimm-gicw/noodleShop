// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header/Header';
import DishCard from '../components/DishCard';
import dishes from '../data/dishes';
import { TouchableOpacity } from 'react-native'; // this import makes cards touchable

/**
 * HomeScreen
 * Shows a list of noodle dishes with images, name and price.
 */
export default function HomeScreen({ navigation }) {
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
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sen Khong Rao Aroi Mak</Text>
        <Text style={styles.subtitle}>Tap a dish to view details or add to cart</Text>
      </View>

      <FlatList
        data={dishes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        // optionally show a vertical scroll indicator or not
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8E1', // solid light red background,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
  fontSize: 28,
  fontWeight: '900',          // bold for readability
  color: '#FF0000',           // bright red text for high contrast
  textShadowColor: '#8B0000', // dark red glow for depth
  textShadowOffset: { width: 0, height: 0 },
  textShadowRadius: 10,       // creates neon-like glow
  fontFamily: 'Cochin',       // playful, still legible font
  textAlign: 'center',
  paddingHorizontal: 8,
  paddingVertical: 4,
},

  subtitle: {
    marginTop: 4,
    fontSize: 11,
    color: '#666',
  },
  list: {
    paddingBottom: 16,
  },
});
