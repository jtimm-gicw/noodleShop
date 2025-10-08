import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import tukTukLogo from '../../../assets/tuktuk-logo.png';

const LandingPage = () => {
  const navigation = useNavigation(); // Hook to navigate between screens

  // Animated value for spinning
  const spinAnim = useRef(new Animated.Value(0)).current;
  // Animated value for bounce (scaling)
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start continuous spinning animation
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,          // Spin from 0 to 1
        duration: 4000,      // 4 seconds per rotation
        useNativeDriver: true,
      })
    ).start();

    // Start subtle bouncing animation (scale up & down)
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1.05,   // Slightly larger
          duration: 800,   // Duration for scaling up
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0.95,   // Slightly smaller
          duration: 800,   // Duration for scaling down
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Navigate to HomeScreen after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace('Home'); // Prevent back swipe to landing page
    }, 3000);

    // Cleanup timer
    return () => clearTimeout(timer);
  }, []);

  // Interpolate rotation
  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    // Gradient background
    <LinearGradient
      colors={['#a8e6a3', '#2c6f2d']} // Light green to dark green
      style={styles.container}
    >
      {/* Logo with spinning + bouncing */}
      <Animated.Image
        source={tukTukLogo}
        style={[
          styles.logo,
          { transform: [{ rotate: spin }, { scale: bounceAnim }] },
        ]}
      />
      {/* App title */}
      <Text style={styles.title}>Tuk Tuk My Noodles</Text>
    </LinearGradient>
  );
};

export default LandingPage;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1, // Full screen
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 60,
    marginBottom: 20, // Space between logo and title
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffd700', // Fun yellow
    textShadowColor: '#000', // Black shadow
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
});
