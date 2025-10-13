// src/components/LandingPage/LandingPage.jsx
import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import tukTukLogo from '../../../assets/tuktuk-logo.png'; // adjust path if needed

const LandingPage = () => {
  const navigation = useNavigation();

  const spinAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Continuous spin
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      })
    ).start();

    // Bounce animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1.05,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0.95,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Navigate to MainTabs and start on HomeTab
    const timer = setTimeout(() => {
      navigation.replace('Main', { screen: 'HomeTab' }); 
      // ✅ 'Main' = Stack route for tabs
      // ✅ 'screen: HomeTab' = start on Home tab
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <LinearGradient
      colors={['#a8e6a3', '#2c6f2d']}
      style={styles.container}
    >
      <Animated.Image
        source={tukTukLogo}
        style={[
          styles.logo,
          { transform: [{ rotate: spin }, { scale: bounceAnim }] },
        ]}
      />
      <Text style={styles.title}>Tuk Tuk My Noodles</Text>
    </LinearGradient>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 100, // circular
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffd700',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
});
