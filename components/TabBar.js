import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, Feather } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { CreatePostsScreen, PostsScreen, ProfileScreen } from '../screens';

const MainTabs = createBottomTabNavigator();

const TabBar = () => {
  return (
    <MainTabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          height: 80,
          paddingTop: 10,
        },
      }}
    >
      <MainTabs.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons
              name="grid-outline"
              size={24}
              color="#212121"
              style={styles.btnTab}
            />
          ),
        }}
      />
      <MainTabs.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({ focused, size, color }) => (
            <View style={{ ...styles.btnTabWrap, backgroundColor: '#FF6C00' }}>
              <Ionicons name="add" size={24} color="#FFFFFF" />
            </View>
          ),
        }}
      />
      <MainTabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Feather
              name="user"
              size={24}
              color="#212121"
              style={styles.btnTab}
            />
          ),
        }}
      />
    </MainTabs.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    paddingTop: 10,
    rowGap: 39,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F6F6F6',
  },
  btnTab: { opacity: 0.8 },
  btnTabWrap: {
    width: 70,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});

export default TabBar;
