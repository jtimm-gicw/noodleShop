import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Safe area
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Gesture handler
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import LandingPage from './src/components/LandingPage/LandingPage'; // Corrected import path

// Create the native stack
const Stack = createNativeStackNavigator();
// Components
// If folder is `components` and file is `Header.js`
import Header from './src/components/Header/Header';
 // Header import



export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
  initialRouteName="Landing"
  screenOptions={{
    // By default, use the custom Header for all screens
    header: () => <Header />,
  }}
>
  {/* Landing page: hide the header */}
  <Stack.Screen
    name="Landing"
    component={LandingPage}
    options={{
      headerShown: false, // Keep Landing page full-screen
    }}
  />

  {/* Home screen: custom header will show automatically */}
  <Stack.Screen
    name="Home"
    component={HomeScreen}
  />

  {/* Cart screen: custom header will show automatically */}
  {/* <Stack.Screen
    name="Cart"
    component={CartScreen}
  /> */}
</Stack.Navigator>

        </NavigationContainer>
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
