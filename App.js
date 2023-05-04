import React from 'react';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Main } from './components';

export default function App() {
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

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
