// App.js
import React from 'react';
import { StyleSheet } from 'react-native';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Safe area & gesture handler
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Components & screens
import Header from './src/components/Header/Header';
import LandingPage from './src/components/LandingPage/LandingPage';
import HomeScreen from './src/screens/HomeScreen';
import DishDetailScreen from './src/screens/DishDetailScreen';
import CartScreen from './src/screens/CartScreen';
import SettingsScreen from './src/screens/SettingsScreen';

// Context
import { CartProvider } from './src/context/CartContext';
import { ProfileProvider } from './src/context/ProfileContext'; // ✅ Fixed import

// Stack & Tab creators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        header: () => <Header />,
        headerStyle: { height: 80 },
        tabBarStyle: { backgroundColor: '#1A1A1A' },
        tabBarActiveTintColor: '#FFA500',
        tabBarInactiveTintColor: '#888',
        tabBarLabelStyle: { fontSize: 14, fontWeight: '700' },
      }}
    >
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
      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        {/* ✅ Wrap ProfileProvider so all screens can access it */}
        <ProfileProvider>
          <CartProvider>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName="Landing"
                screenOptions={{
                  header: () => <Header />,
                  headerStyle: { height: 80 },
                }}
              >
                <Stack.Screen
                  name="Landing"
                  component={LandingPage}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Main"
                  component={MainTabs}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="DishDetail"
                  component={DishDetailScreen}
                  options={{ title: 'Dish Details' }}
                />
                <Stack.Screen
                  name="Cart"
                  component={CartScreen}
                  options={{ title: 'Your Cart' }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </CartProvider>
        </ProfileProvider>
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
