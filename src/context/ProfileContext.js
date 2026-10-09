
 // src/context/ProfileContext.js

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import Storage from '../utils/storage';
import { AuthContext } from './AuthContext';

// EXISTING: Create the profile context
export const ProfileContext = createContext();

// EXISTING: Default empty profile
const empty = {
  name: '',
  address: '',
  phone: '',
  cardNumberMasked: '',
  cardLast4: '',
  cardExpiry: '',
};

export function ProfileProvider({ children }) {

  // FIXED: Read AuthContext safely.
  // The provider should still be wrapped by AuthProvider.
  const auth = useContext(AuthContext);
  const user = auth?.user ?? null;

  // FIXED: Only create a user-specific storage key
  // when a user is signed in.
  const KEY = user
    ? `@user_profile_v2_${user.id}`
    : null;

  // EXISTING: Profile state
  const [profile, setProfile] = useState({ ...empty });

  // UPDATED: Load the correct user's saved profile.
  useEffect(() => {

    let active = true;

    // No logged-in user:
    // Reset the profile instead of accessing user.id.
    if (!user || !KEY) {
      setProfile({ ...empty });

      return () => {
        active = false;
      };
    }

    const loadProfile = async () => {
      try {
        const json = await Storage.getItem(KEY);

        if (active) {
          setProfile(
            json
              ? JSON.parse(json)
              : { ...empty, name: user.name || '' }
          );
        }
      } catch (error) {
        console.warn('Failed to load profile', error);

        if (active) {
          setProfile({
            ...empty,
            name: user.name || '',
          });
        }
      }
    };

    // Reset state while switching accounts.
    setProfile({ ...empty, name: user.name || '' });

    loadProfile();

    return () => {
      active = false;
    };

  }, [KEY, user?.name]);

  // EXISTING: Save profile for the signed-in user
  const saveProfile = async (nextProfile) => {

    if (!KEY) {
      throw new Error('Please sign in before saving a profile.');
    }

    await Storage.setItem(
      KEY,
      JSON.stringify(nextProfile)
    );

    setProfile(nextProfile);
  };

  // EXISTING: Clear the signed-in user's profile
  const clearProfile = async () => {

    if (!KEY) {
      setProfile({ ...empty });
      return;
    }

    await Storage.removeItem(KEY);

    setProfile({
      ...empty,
      name: user?.name || '',
    });
  };

  // EXISTING: Provide profile information to screens
  return (
    <ProfileContext.Provider
      value={{
        profile,
        saveProfile,
        clearProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
