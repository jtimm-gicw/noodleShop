// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import DishCard from '../components/DishCard';
// import dishes from '../data/dishes';
import DishCard from '../components/DishCard';
import dishes from './data/dishes';
/**
 * HomeScreen
 * Shows a list of noodle dishes with images, name and price.
 */
export default function HomeScreen({ navigation }) {
  // Render each dish as a DishCard. Later you can navigate to a detail screen by using navigation.
  const renderItem = ({ item }) => (
    <DishCard
      dish={item}
      onPress={() => {
        // OPTIONAL: navigate to "DishDetail" when ready
        // navigation.navigate('DishDetail', { dish: item });
        // For now we'll just log so behavior exists.
        console.log('Pressed', item.name);
      }}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Noodle Dishes</Text>
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
    backgroundColor: '#f6f6f8',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#666',
  },
  list: {
    paddingBottom: 16,
  },
});
