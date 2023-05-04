import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { AntDesign, MaterialIcons, Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { db, storage } from '../../firebase/config';
import {
  authChangeUser,
  authSignOutUser,
} from '../../redux/auth/authOperations';
import Post from '../../components/Post';
import COLORS from '../../utils/colors';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userID, login, avatar } = useSelector(state => state.auth);
  const [posts, setPosts] = useState([]);
  const [avatarProfile, setAvatarProfile] = useState(avatar);
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    (async function getUserPosts() {
      const array = [];
      try {
        const userProfilePosts = query(
          collection(db, 'posts'),
          where('userID', '==', userID)
        );
        const querySnapshot = await getDocs(userProfilePosts);
        querySnapshot.forEach(doc => {
          array.push({ ...doc.data(), id: doc.id });
        });
        setPosts(array);
        console.log('ProfileScreen ===>', posts);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const uploadPhotoToServer = async () => {
    try {
      const response = await fetch(avatarProfile);
      const file = await response.blob();
      const uniqueUserId = Date.now().toString();
      const storageRef = ref(storage, `avatar/${uniqueUserId}`);
      await uploadBytes(storageRef, file);
      const processedPhoto = await getDownloadURL(storageRef);
      return processedPhoto;
    } catch (error) {
      console.log('error.message', error.message);
    }
  };

  const handleDownloadAvatar = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert("You've refused to allow this app to access your photos!");
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setAvatarProfile(result.assets[0].uri);
      } else {
        Alert.alert('You did not select any image.');
      }

      const photo = await uploadPhotoToServer();
      const user = {
        login,
        avatar: photo,
      };
      console.log('ProfileScreen  ==>', user);
      dispatch(authChangeUser(user));
    } catch (error) {
      console.log('error.message', error.message);
    }
  };

  const handleDeleteAvatar = () => {
    setAvatarProfile(null);
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
            minHeight: height - 250,
          }}
        >
          <MaterialIcons
            name="logout"
            size={24}
            color={COLORS.grey_colorText}
            style={styles.btnLogout}
            onPress={() => {
              dispatch(authSignOutUser());
              navigation.navigate('Login');
            }}
          />
          <View style={styles.avatarWrap}>
            <Image
              style={styles.avatar}
              alt="user avatar"
              source={{ uri: avatar }}
            />
            {avatar ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleDeleteAvatar}
              >
                <AntDesign
                  name="closecircleo"
                  size={25}
                  color={COLORS.grey_colorBorder}
                  style={styles.btnAdd}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleDownloadAvatar}
              >
                <AntDesign
                  name="pluscircleo"
                  size={25}
                  color={COLORS.accent}
                  style={styles.btnAdd}
                />
              </TouchableOpacity>
            )}
            <Text style={styles.login}>{login}</Text>
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
                          onPress={() =>
                            navigation.navigate('Comments', { item })
                          }
                        >
                          <Feather
                            name="message-circle"
                            size={20}
                            color={COLORS.accent}
                            style={styles.postIcon}
                          />
                          <Text style={styles.postIconLabel}>
                            {item.comments}
                          </Text>
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
                        onPress={() =>
                          navigation.navigate('Comments', { item })
                        }
                      >
                        <Feather
                          name="message-circle"
                          size={20}
                          color={COLORS.grey_colorText}
                          style={styles.postIcon}
                        />
                        <Text style={styles.postIconLabel}>
                          {item.comments}
                        </Text>
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
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.grey_bgColor,
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
    backgroundColor: COLORS.white,
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
    backgroundColor: COLORS.grey_bgColor,
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
    backgroundColor: COLORS.white,
  },
  login: {
    marginTop: 92,
    marginBottom: 32,
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
    color: COLORS.black_colorText,
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

export default ProfileScreen;
