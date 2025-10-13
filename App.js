// App.js
import React from 'react';
import { StyleSheet } from 'react-native';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // ✅ Needed for tab icons

// Safe area & gesture handler
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Components & screens
import Header from './src/components/Header/Header';
import LandingPage from './src/components/LandingPage/LandingPage';
import HomeScreen from './src/screens/HomeScreen';
import DishDetailScreen from './src/screens/DishDetailScreen';
import CartScreen from './src/screens/CartScreen';

// Context
import { CartProvider } from './src/context/CartContext';

// Stack & Tab creators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// ---------------------------
// MainTabs with icons
// ---------------------------
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        header: () => <Header />,            // ✅ Custom header for tabs
        headerStyle: { height: 80 },
        tabBarStyle: { backgroundColor: '#1A1A1A' },
        tabBarActiveTintColor: '#FFA500',
        tabBarInactiveTintColor: '#888',
        tabBarLabelStyle: { fontSize: 14, fontWeight: '700' },
      }}
    >
      {/* Home Tab */}
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />

      {/* Cart Tab */}
      <Tab.Screen
        name="CartTab"
        component={CartScreen}
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// ---------------------------
// App Component
// ---------------------------
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <CartProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Landing"
              screenOptions={{
                header: () => <Header />,   // Default header for stack screens
                headerStyle: { height: 80 },
              }}
            >
              {/* Landing full-screen */}
              <Stack.Screen
                name="Landing"
                component={LandingPage}
                options={{ headerShown: false }}
              />

              {/* MainTabs (Home + Cart) */}
              <Stack.Screen
                name="Main"
                component={MainTabs}
                options={{ headerShown: false }} // Important to hide stack header
              />

              {/* Dish details pushed on top */}
              <Stack.Screen
                name="DishDetail"
                component={DishDetailScreen}
                options={{ title: 'Dish Details' }}
              />

              {/* Optional: Cart screen push */}
              <Stack.Screen
                name="Cart"
                component={CartScreen}
                options={{ title: 'Your Cart' }}
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
