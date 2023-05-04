import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import Post from '../../components';
import COLORS from '../../utils/colors';

const PostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  const { login, email, avatar } = useSelector(state => state.auth);
  const { width } = useWindowDimensions();

  useEffect(() => {
    (async function getPosts() {
      const array = [];
      try {
        const querySnapshot = await getDocs(collection(db, 'posts'));
        querySnapshot.forEach(doc => {
          array.push({ ...doc.data(), id: doc.id });
        });
        setPosts(array);
        console.log(doc.id, ' ==> ', doc.data());
        console.log('PostsScreen ==>', posts);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [route?.params]);

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
        keyExtractor={item => item.id}
        // renderItem={({ item }) => <Post item={item} navigation={navigation} />}
        renderItem={({ item }) => (
          <View style={styles.postWrapper}>
            <Image
              style={{ ...styles.postPhoto, width: width - 16 * 2 }}
              alt={item.title}
              source={{ uri: item.photo }}
            />
            <Text style={styles.postTitle}>{item.title}</Text>
            <View style={styles.postIconContainer}>
              {item.comments !== 0 || item.likes !== 0 ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{ ...styles.postIconWrap, marginRight: 24 }}
                    onPress={() => navigation.navigate('Comments', { item })}
                  >
                    <Feather
                      name="message-circle"
                      size={20}
                      color={COLORS.accent}
                      style={styles.postIcon}
                    />
                    <Text style={styles.postIconLabel}>{item.comments}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.postIconWrap}
                  >
                    <Feather
                      name="thumbs-up"
                      size={20}
                      color={COLORS.accent}
                      style={styles.postIcon}
                    />
                    <Text style={styles.postIconLabel}>{item.likes}</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{ ...styles.postIconWrap, marginRight: 24 }}
                  onPress={() => navigation.navigate('Comments', { item })}
                >
                  <Feather
                    name="message-circle"
                    size={20}
                    color={COLORS.grey_colorText}
                    style={styles.postIcon}
                  />
                  <Text style={styles.postIconLabel}>{item.comments}</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.postIconWrap}
                onPress={() =>
                  navigation.navigate('Map', {
                    latitude: item.coords.latitude,
                    longitude: item.coords.longitude,
                  })
                }
              >
                <Feather
                  name="map-pin"
                  size={20}
                  color={COLORS.grey_colorText}
                  style={styles.postIcon}
                />
                <Text style={styles.postIconLabel}>{item.location}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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

  postWrapper: {
    marginBottom: 32,
    columnGap: 8,
  },
  postPhoto: {
    height: 240,
    width: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.grey_bgColor,
    borderRadius: 8,
  },
  postTitle: {
    marginVertical: 8,
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'left',
    color: COLORS.black_colorText,
  },
  postIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  postIconWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
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
