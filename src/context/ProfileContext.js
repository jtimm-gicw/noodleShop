import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/*
  ProfileContext
  - Provides app-wide profile state (name, address, phone, masked card info).
  - Loads saved profile from AsyncStorage on mount and exposes save/clear helpers.
  - IMPORTANT: For production, never store raw card numbers; use a payment provider/tokenization.
*/

// Create the context object that components will consume
export const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  // Local state for the profile
  const [profile, setProfile] = useState({
    name: '',
    address: '',
    phone: '',
    cardNumberMasked: '', // only store masked/tokenized data, not full card numbers
    cardLast4: '',
    cardExpiry: '',
  });

  // Key used to persist profile to device storage
  const STORAGE_KEY = '@user_profile_v1';

  // useEffect: runs once on mount to load profile from AsyncStorage
  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) {
          // Parse and set the saved profile into state
          setProfile(JSON.parse(json));
        }
      } catch (e) {
        console.warn('Failed to load profile', e);
      }
    })();
  }, []);

  // saveProfile: updates state and persists to AsyncStorage
  const saveProfile = async (newProfile) => {
    try {
      setProfile(newProfile); // update in-memory state
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile)); // persist
    } catch (e) {
      console.warn('Failed to save profile', e);
    }
  };

  // clearProfile: resets state and removes stored profile
  const clearProfile = async () => {
    try {
      setProfile({
        name: '',
        address: '',
        phone: '',
        cardNumberMasked: '',
        cardLast4: '',
        cardExpiry: '',
      });
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to clear profile', e);
    }
  };

  // Provide the profile object and helper functions to children
  return (
    <ProfileContext.Provider value={{ profile, saveProfile, clearProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}
