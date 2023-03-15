import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, Feather } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CreatePostsScreen, PostsScreen, ProfileScreen } from '../screens';
import COLORS from '../utils/colors';

const MainTabs = createBottomTabNavigator();

const TabBar = () => {
  return (
    <MainTabs.Navigator
      screenOptions={{
        headerStyle: {
          // height: 44,
          // marginTop: 44,
          // paddingHorizontal: 16,
          // paddingVertical: 11,
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
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 83,
          paddingTop: 10,
          paddingHorizontal: 80,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTopColor: 'rgba(0, 0, 0, 0.3)',
          borderTopWidth: 0.5,
          boxShadow: '0 -0.5 0 rgba(0, 0, 0, 0.3)',
        },
      }}
    >
      <MainTabs.Screen
        name="Posts"
        component={PostsScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: 'Posts',
          headerRight: () => (
            <MaterialIcons
              name="logout"
              size={24}
              color={COLORS.grey_colorText}
              onPress={() => navigation.navigate('Login')}
            />
          ),
          tabBarIcon: () => (
            <Ionicons
              name="grid-outline"
              size={24}
              color={COLORS.black_colorText}
              style={styles.btnTab}
            />
          ),
        })}
      />
      <MainTabs.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: 'Create post',
          headerLeft: () => (
            <MaterialIcons
              name="keyboard-backspace"
              size={24}
              color={COLORS.black_opacity_80}
              onPress={() => navigation.navigate('Posts')}
            />
          ),
          tabBarStyle: { display: 'none' },
          tabBarIcon: () => (
            <View
              style={{
                ...styles.btnTabWrap,
                backgroundColor: COLORS.accent,
              }}
            >
              <Ionicons name="add" size={24} color={COLORS.white} />
            </View>
          ),
        })}
      />
      <MainTabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          headerShown: false,
          headerRight: () => (
            <MaterialIcons
              name="logout"
              size={24}
              color={COLORS.grey_colorText}
              onPress={() => navigation.navigate('Login')}
            />
          ),
          tabBarIcon: () => (
            <Feather
              name="user"
              size={24}
              color={COLORS.black_colorText}
              style={styles.btnTab}
            />
          ),
        })}
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
    borderTopColor: COLORS.grey_bgColor,
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
