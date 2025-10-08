// App.js
import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
// Platform is a React Native built-in module that lets you detect and handle differences between mobile operating systems — mainly iOS, Android, and sometimes web (if using Expo Web)


// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Safe area
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Gesture handler (wraps the app root)
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import LandingPage from './components/LandingPage/LandingPage'; // landing page

// Create the native stack
const Stack = createNativeStackNavigator();

export default function App() {
  // GestureHandlerRootView ensures gesture-handler works on Android & iOS.
  // SafeAreaProvider supplies safe area context to children.
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: true,
              // Basic header style — tune to your theme
              headerStyle: { backgroundColor: '#fff' },
              headerTitleStyle: { fontWeight: '600' },
            }}
          >
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: 'TukTuk My Noodles' }}
            />
            {/*
              Phase 1 only requires Home. Later you can add:
              <Stack.Screen name="DishDetail" component={DishDetail} />
              <Stack.Screen name="Cart" component={CartScreen} />
            */}
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
