import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  RegistrationScreen,
  LoginScreen,
  CommentsScreen,
  CreatePostsScreen,
  MapScreen,
  PostsScreen,
  ProfileScreen,
  Home,
} from './screens';

const AuthStack = createStackNavigator();
const MainTabs = createBottomTabNavigator();

export const useRoute = isAuth => {
  if (!isAuth) {
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
  }
  return <Home />;
};
