
 // App.js
import React, { useContext } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Safe area & gesture handler
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// EXISTING: Components & screens
import Header from './src/components/Header/Header';
import LandingPage from './src/components/LandingPage/LandingPage';
import HomeScreen from './src/screens/HomeScreen';
import DishDetailScreen from './src/screens/DishDetailScreen';
import CartScreen from './src/screens/CartScreen';
import SettingsScreen from './src/screens/SettingsScreen';

// NEW: Authentication and order tracking screens
import AuthScreen from './src/screens/AuthScreen';
import OrdersScreen from './src/screens/OrdersScreen';

// EXISTING: Context providers
import { CartProvider } from './src/context/CartContext';
import { ProfileProvider } from './src/context/ProfileContext';
import { DarkModeProvider } from './src/context/DarkModeContext';

// NEW: Authentication provider and context
import {
  AuthProvider,
  AuthContext,
} from './src/context/AuthContext';

// Stack & Tab creators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/*
  MainTabs

  EXISTING:
  - Home tab
  - Cart tab
  - Settings tab
  - Custom Header
  - Original navigation colors

  NEW:
  - Orders tab for tracking simulated deliveries
*/
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        header: () => <Header />,
        headerStyle: { height: 80 },
        tabBarStyle: { backgroundColor: '#1A1A1A' },
        tabBarActiveTintColor: '#FFA500',
        tabBarInactiveTintColor: '#888',
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '700',
        },
      }}
    >
      {/* EXISTING: Home tab */}
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />

      {/* EXISTING: Cart tab */}
      <Tab.Screen
        name="CartTab"
        component={CartScreen}
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="cart-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />

      {/* NEW: Orders tab */}
      <Tab.Screen
        name="OrdersTab"
        component={OrdersScreen}
        options={{
          title: 'Orders',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="receipt-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />

      {/* EXISTING: Settings tab */}
      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="settings-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

/*
  NEW: AppNavigator

  Determines which screens a customer can access.

  If authentication is still loading:
    Show a loading indicator.

  If the customer is not signed in:
    Show AuthScreen.

  If the customer is signed in:
    Show existing app screens.

  This prevents ProfileProvider and CartProvider
  from trying to access an account before login.
*/
function AppNavigator() {

  // NEW: Read authentication information
  const { user, loading } = useContext(AuthContext);

  // NEW: Wait for saved authentication to load
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color="#FFA500"
        />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: () => <Header />,
          headerStyle: { height: 80 },
        }}
      >
        {!user ? (
          // NEW: Show authentication when signed out
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            {/* EXISTING: Landing page */}
            <Stack.Screen
              name="Landing"
              component={LandingPage}
              options={{ headerShown: false }}
            />

            {/* EXISTING: Main tabs */}
            <Stack.Screen
              name="Main"
              component={MainTabs}
              options={{ headerShown: false }}
            />

            {/* EXISTING: Dish details */}
            <Stack.Screen
              name="DishDetail"
              component={DishDetailScreen}
              options={{ title: 'Dish Details' }}
            />

            {/* EXISTING: Standalone cart route */}
            <Stack.Screen
              name="Cart"
              component={CartScreen}
              options={{ title: 'Your Cart' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/*
  App

  UPDATED PROVIDER ORDER:

  DarkModeProvider
    └── AuthProvider
          └── ProfileProvider
                └── CartProvider
                      └── AppNavigator

  IMPORTANT:
  ProfileProvider and CartProvider depend on AuthContext.
  Therefore, AuthProvider MUST wrap both providers.
*/
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>

        {/* EXISTING: App-wide dark mode */}
        <DarkModeProvider>

          {/* NEW: Authentication available to child providers */}
          <AuthProvider>

            {/* EXISTING: Customer profile */}
            <ProfileProvider>

              {/* EXISTING: Shopping cart */}
              <CartProvider>

                {/* UPDATED: Authentication-aware navigation */}
                <AppNavigator />

              </CartProvider>

            </ProfileProvider>

          </AuthProvider>

        </DarkModeProvider>

      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

// EXISTING: Original styles preserved
// NEW: Added loadingContainer style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
