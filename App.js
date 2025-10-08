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

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Landing" // Start with the landing page
            screenOptions={{
              headerShown: false, // Hide header for landing page
            }}
          >
            {/* Landing page screen */}
            <Stack.Screen name="Landing" component={LandingPage} />
            
            {/* Home screen */}
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ 
                title: 'TukTuk My Noodles',
                headerShown: true, // Show header for HomeScreen
              }}
            />
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
