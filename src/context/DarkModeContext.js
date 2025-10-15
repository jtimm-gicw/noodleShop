import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1️⃣ Create a new context that other components can consume
export const DarkModeContext = createContext();

// 2️⃣ Create a Provider component that will wrap your app
export function DarkModeProvider({ children }) {
  // Local state to track if dark mode is enabled
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Key used to store dark mode preference in AsyncStorage
  const STORAGE_KEY = '@dark_mode_enabled';

  // 3️⃣ Load saved dark mode preference when the app starts
  useEffect(() => {
    (async () => {
      try {
        const savedPreference = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedPreference !== null) {
          // Convert the saved string ("true"/"false") into a boolean
          setIsDarkMode(JSON.parse(savedPreference));
        }
      } catch (error) {
        console.warn('Failed to load dark mode preference', error);
      }
    })();
  }, []);

  // 4️⃣ Function to toggle dark mode on/off
  const toggleDarkMode = async () => {
    try {
      const newMode = !isDarkMode; // invert the current mode
      setIsDarkMode(newMode); // update the state in memory
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newMode)); // save to device storage
    } catch (error) {
      console.warn('Failed to toggle dark mode', error);
    }
  };

  // 5️⃣ Provide the state and toggle function to the rest of the app
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
