import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RegistrationScreen, LoginScreen } from '../screens';

const AuthStack = createStackNavigator();

export const AuthStackNav = () => {
  return (
    <AuthStack.Navigator initialRouteName="Registration">
      <AuthStack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};
