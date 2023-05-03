import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import db from '../../firebase/config';
import Post from '../../components';
import COLORS from '../../utils/colors';

const PostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  const { login, email, avatar } = useSelector(state => state.auth);

  useEffect(() => {
    (async function getPosts() {
      try {
        await db
          .firestore()
          .collection('posts')
          .onSnapshot(data =>
            setPosts(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
          );
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.userBox}>
        <Image
          style={styles.avatar}
          alt="user avatar"
          source={{ uri: avatar }}
        />
        <View style={styles.credentials}>
          <Text style={styles.login}>{login}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
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
    backgroundColor: COLORS.white,
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
    backgroundColor: COLORS.grey_bgColor,
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
    color: COLORS.black_colorText,
  },
  email: {
    fontFamily: 'Roboto-Regular',
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 13,
    textAlign: 'left',
    color: COLORS.black_colorText,
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
    backgroundColor: COLORS.grey_bgColor,
    borderRadius: 8,
  },
  postTitle: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'left',
    color: COLORS.black_colorText,
  },
  postIcon: { marginRight: 6 },
  postIconLabel: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'left',
    color: COLORS.black_colorText,
  },
});

export default PostsScreen;
