import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import Post from '../../components/Post';

const initialState = [
  {
    id: 1,
    photo: require('../../assets/images/forest.jpg'),
    title: 'Forest',
    comments: 8,
    likes: 153,
    location: `Ukraine`,
  },
  {
    id: 2,
    photo: require('../../assets/images/sunset.jpg'),
    title: 'Sunset',
    comments: 3,
    likes: 200,
    location: `Ukraine`,
  },
  {
    id: 3,
    photo: require('../../assets/images/house.jpg'),
    title: 'Old house',
    comments: 50,
    likes: 200,
    location: `Italy`,
  },
];

const ProfileScreen = ({ navigation, route }) => {
  // const { posts } = route.params;
  // const { user } = route.params;
  const [posts, setPosts] = useState(initialState);
  const [isLoadedAvatar, setIsLoadedAvatar] = useState(true);
  const { height, width } = useWindowDimensions();

  const handleLoadAvatar = () => {
    const toggle = isLoadedAvatar ? false : true;
    setIsLoadedAvatar(toggle);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={{
          ...styles.backgroundImage,
          width: width,
          height: height,
        }}
        source={require('../../assets/images/photo_BG.jpg')}
      >
        <View
          style={{
            ...styles.content,
            width: width,
          }}
        >
          <MaterialIcons
            name="logout"
            size={24}
            color="#BDBDBD"
            style={styles.btnLogout}
            onPress={() => navigation.navigate('Login')}
          />
          <View style={styles.avatarWrap}>
            <Image
              style={styles.avatar}
              alt="user avatar"
              source={require('../../assets/images/avatar.jpg')}
              // source={user.avatar}
            />
            <TouchableOpacity activeOpacity={0.8} onPress={handleLoadAvatar}>
              {isLoadedAvatar ? (
                <AntDesign
                  name="closecircleo"
                  size={25}
                  color="#E8E8E8"
                  style={styles.btnAdd}
                />
              ) : (
                <AntDesign
                  name="pluscircleo"
                  size={25}
                  color="#FF6C00"
                  style={styles.btnAdd}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.login}>Natali Romanova</Text>
            {/* <Text style={styles.login}>{user.login}</Text> */}
            <FlatList
              data={posts}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <Post item={item} navigation={navigation} />
              )}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  content: {
    marginTop: 310,
    paddingHorizontal: 16,
    columnGap: 16,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  btnLogout: {
    position: 'absolute',
    top: 22,
    right: 16,
  },
  avatarWrap: {
    alignItems: 'center',
  },
  avatar: {
    position: 'absolute',
    top: -60,
    width: 120,
    height: 120,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
  },
  btnAdd: {
    position: 'absolute',
    top: 21,
    left: 46,
    width: 25,
    height: 25,
    borderRadius: 13,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  login: {
    marginTop: 92,
    marginBottom: 32,
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
    color: '#212121',
  },
});

export default ProfileScreen;
