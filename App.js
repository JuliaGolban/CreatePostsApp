import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useRoute } from './router';

export default function App() {
  const routing = useRoute(true);
  const [fontsLoaded] = useFonts({
    'SFProDisplay-Light': require('./assets/fonts/SFProDisplay-Light.ttf'),
    'SFProDisplay-Regular': require('./assets/fonts/SFProDisplay-Regular.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return <NavigationContainer>{routing}</NavigationContainer>;
}
