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
import { MaterialIcons } from '@expo/vector-icons';

const AuthStack = createStackNavigator();
const MainScreens = createStackNavigator();

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
  return (
    <MainScreens.Navigator
      initialRouteName="Posts"
      screenOptions={{
        headerStyle: {
          height: 100,
          backgroundColor: '#FFFFFF',
          borderBottomColor: 'rgba(0, 0, 0, 0.3)',
          borderBottomWidth: 0.5,
          boxShadow: '0 0.5 0 rgba(0, 0, 0, 0.3)',
        },
        headerTitleStyle: {
          fontFamily: 'Roboto-Medium',
          fontWeight: '500',
          fontSize: 17,
          lineHeight: 22,
          color: '#212121',
        },
        headerTitleAlign: 'center',
        headerTitleContainerStyle: { marginBottom: 11 },
        headerRightContainerStyle: { paddingRight: 16, paddingBottom: 10 },
        headerLeftContainerStyle: { paddingLeft: 16, paddingBottom: 10 },
      }}
    >
      <MainScreens.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <MainScreens.Screen
        name="Comments"
        component={CommentsScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerLeft: () => (
            <MaterialIcons
              name="keyboard-backspace"
              size={24}
              color="rgba(33, 33, 33, 0.8)"
              onPress={() => navigation.navigate('Profile')}
            />
          ),
        })}
      />
      <MainScreens.Screen
        name="Map"
        component={MapScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerLeft: () => (
            <MaterialIcons
              name="keyboard-backspace"
              size={24}
              color="rgba(33, 33, 33, 0.8)"
              onPress={() => navigation.navigate('Posts')}
            />
          ),
        })}
      />
    </MainScreens.Navigator>
  );
};
