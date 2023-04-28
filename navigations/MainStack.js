import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  CommentsScreen,
  CreatePostsScreen,
  MapScreen,
  PostsScreen,
  ProfileScreen,
  Home,
} from '../screens';
import { MaterialIcons } from '@expo/vector-icons';
import COLORS from '../utils/colors';

const MainScreens = createStackNavigator();

export const MainStackNav = () => {
  return (
    <MainScreens.Navigator
      initialRouteName="Posts"
      screenOptions={{
        headerStyle: {
          height: 100,
          backgroundColor: COLORS.white,
          borderBottomColor: 'rgba(0, 0, 0, 0.3)',
          borderBottomWidth: 0.5,
          boxShadow: '0 0.5 0 rgba(0, 0, 0, 0.3)',
        },
        headerTitleStyle: {
          fontFamily: 'Roboto-Medium',
          fontWeight: '500',
          fontSize: 17,
          lineHeight: 22,
          color: COLORS.black_colorText,
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
              color={COLORS.black_opacity_80}
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
              color={COLORS.black_opacity_80}
              onPress={() => navigation.navigate('Posts')}
            />
          ),
        })}
      />
    </MainScreens.Navigator>
  );
};
