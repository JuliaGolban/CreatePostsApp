import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import Post from '../../components/Post';

const initialState = [
  {
    id: 1,
    photo: require('../../assets/images/forest.jpg'),
    title: 'Forest',
    comments: 0,
    likes: 0,
    location: `Ivano-Frankivs'k Region, Ukraine`,
  },
  {
    id: 2,
    photo: require('../../assets/images/sunset.jpg'),
    title: 'Sunset',
    comments: 0,
    likes: 0,
    location: `Odessa, Ukraine`,
  },
];

const PostsScreen = ({ navigation, route }) => {
  // const { user } = route.params;
  // const { post } = route.params;
  const [posts, setPosts] = useState(initialState);

  return (
    <View style={styles.container}>
      <View style={styles.userBox}>
        <Image
          style={styles.avatar}
          alt="user avatar"
          source={require('../../assets/images/avatar.jpg')}
          // source={user.avatar}
        />
        <View style={styles.credentials}>
          {/* <Text style={styles.login}>{user.login}</Text>
          <Text style={styles.email}>{user.email}</Text> */}
          <Text style={styles.login}>Natali Romanova</Text>
          <Text style={styles.email}>email@example.com</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Post item={item} navigation={navigation} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  userBox: {
    marginBottom: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  avatar: {
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: 60,
    height: 60,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
  },
  credentials: {
    marginLeft: 8,
  },
  login: {
    fontFamily: 'Roboto-Bold',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 15,
    textAlign: 'left',
    color: '#212121',
  },
  email: {
    fontFamily: 'Roboto-Regular',
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 13,
    textAlign: 'left',
    color: '#212121',
    opacity: 0.8,
  },
  postBox: {
    marginBottom: 32,
    columnGap: 8,
  },
  postImage: {
    height: 240,
    maxWidth: 350,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
  },
  postTitle: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'left',
    color: '#212121',
  },
  postIcon: { marginRight: 6 },
  postIconLabel: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'left',
    color: '#212121',
  },
});

export default PostsScreen;
