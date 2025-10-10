import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Safe area
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Gesture handler
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// ---------------------------
// Components & Screens
// ---------------------------
import Header from './src/components/Header/Header';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import LandingPage from './src/components/LandingPage/LandingPage'; // Corrected import path
import DishDetailScreen from './src/screens/DishDetailScreen';

// --- NEW: Cart imports ---
import CartScreen from './src/screens/CartScreen';
import { CartProvider } from './src/context/CartContext';
// ---------------------------

// Create the native stack
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // Gesture handler root for react-native-gesture-handler
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Provide safe-area context */}
      <SafeAreaProvider>

        {/* --- NEW: Provide cart context to entire app --- */}
        <CartProvider>

          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Landing" // Start with the landing page
              screenOptions={{
                header: () => <Header />,       // uses your custom header on all screens 
                headerStyle: { height: 80 },    // Ensures header space is allocated
              }}
            >
              {/* Landing page screen */}
              <Stack.Screen 
                name="Landing" 
                component={LandingPage} 
                options={{ headerShown: false }} // ✅ Keep this so Landing is full-screen
              />
              
              {/* Home screen */}
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ 
                  title: 'TukTuk My Noodles',
                  headerShown: true, // Show header for HomeScreen
                }}
              />

              {/* Dish Detail Screen */}
              <Stack.Screen 
                name="DishDetail" 
                component={DishDetailScreen} 
              />

              {/* --- NEW: Cart screen route --- */}
              <Stack.Screen
                name="Cart"
                component={CartScreen}
                options={{
                  title: 'Your Cart',
                  headerShown: true,
                }}
              />

            </Stack.Navigator>
          </NavigationContainer>

        </CartProvider>

      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
