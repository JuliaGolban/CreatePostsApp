import React, { useState } from 'react';
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
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import db from '../../firebase/config';
import { authSignOutUser } from '../../redux/auth/authOperations';
import Post from '../../components/Post';
import COLORS from '../../utils/colors';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userID, login, avatar } = useSelector(state => state.auth);
  const [posts, setPosts] = useState([]);
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    (async function getUserPosts() {
      try {
        await db
          .firestore()
          .collection('posts')
          .where('userID', '==', userID)
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
            <TouchableOpacity activeOpacity={0.8} onPress={handleLoadAvatar}>
              {avatar !== null ? (
                <AntDesign
                  name="closecircleo"
                  size={25}
                  color={COLORS.grey_colorBorder}
                  style={styles.btnAdd}
                />
              ) : (
                <AntDesign
                  name="pluscircleo"
                  size={25}
                  color={COLORS.accent}
                  style={styles.btnAdd}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.login}>{login}</Text>
            <FlatList
              data={posts}
              keyExtractor={(item, index) => index.toString()}
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
});

export default ProfileScreen;
