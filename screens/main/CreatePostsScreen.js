import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  Alert,
} from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import COLORS from '../../utils/colors';

const initialState = {
  id: '',
  photo: '',
  title: '',
  location: '',
};

const CreatePostsScreen = ({ navigation }) => {
  const [post, setPost] = useState(initialState);
  const [isLoadedPhoto, setIsLoadedPhoto] = useState(false);
  const { width } = useWindowDimensions();

  const postId = uuidv4();

  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    console.log(post);
    navigation.navigate('Posts', post);
    setPost(initialState);
    setIsLoadedPhoto(false);
  };

  const handleCreatePhoto = () => {
    setPost(prevState => ({
      ...prevState,
      photo: 'upload',
      id: postId,
      comments: 0,
      likes: 0,
    }));
    setIsLoadedPhoto(true);
  };

  const handleDeletePhoto = () => {
    setPost(prevState => ({ ...prevState, photo: '' }));
    setIsLoadedPhoto(false);
  };

  const reset = () => {
    setPost(initialState);
    setIsLoadedPhoto(false);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <View style={styles.photoWrapper}>
          {post.photo !== '' ? (
            <Image
              style={{ ...styles.postPhoto, width: width - 16 * 2 }}
              alt="Post"
              source={require('../../assets/images/forest.jpg')}
            />
          ) : (
            <Image
              style={{ ...styles.postPhoto, width: width - 16 * 2 }}
              alt="Post"
            />
          )}
          {!isLoadedPhoto ? (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.iconCamera}
              onPress={handleCreatePhoto}
            >
              <FontAwesome
                name="camera"
                size={24}
                color={COLORS.grey_colorText}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                ...styles.iconCamera,
                backgroundColor: COLORS.white_opacity_30,
              }}
              onPress={handleDeletePhoto}
            >
              <FontAwesome name="camera" size={24} c color={COLORS.white} />
            </TouchableOpacity>
          )}
        </View>
        {!isLoadedPhoto ? (
          <Text style={styles.postInfo}>Upload photo</Text>
        ) : (
          <Text style={styles.postInfo}>Edit photo</Text>
        )}
        <View style={styles.postInputSet}>
          <TextInput
            style={styles.postInput}
            placeholder="Post title..."
            value={post.title}
            onChangeText={value =>
              setPost(prevState => ({ ...prevState, title: value }))
            }
          />
          <View style={styles.postField}>
            <TextInput
              style={{ ...styles.postInput, paddingLeft: 26 }}
              placeholder="Location..."
              value={post.location}
              onChangeText={value =>
                setPost(prevState => ({ ...prevState, location: value }))
              }
            />
            <Feather
              name="map-pin"
              size={22}
              color={COLORS.grey_colorText}
              style={styles.iconLocation}
              onPress={() => navigation.navigate('MapScreen')}
            />
          </View>
        </View>
        {isLoadedPhoto ? (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btnPublish}
            onPress={handleSubmit}
          >
            <Text style={styles.btnTitle}>Publish</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              ...styles.btnPublish,
              backgroundColor: COLORS.grey_bgColor,
            }}
            onPress={() => {
              if (!isLoadedPhoto) {
                return Alert.alert('Please, upload your photo');
              }
            }}
            // disabled
          >
            <Text style={{ ...styles.btnTitle, color: COLORS.grey_colorText }}>
              Publish
            </Text>
          </TouchableOpacity>
        )}
        <View style={{ ...styles.footer, width: width }}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.iconDel}
            onPress={reset}
          >
            <Feather name="trash-2" size={24} color={COLORS.grey_colorText} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: COLORS.white,
  },
  photoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
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
  postInfo: {
    marginTop: 8,
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'left',
    color: COLORS.grey_colorText,
  },
  postInputSet: {
    marginVertical: 32,
  },
  postField: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  postInput: {
    height: 50,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey_colorBorder,
    borderRadius: 5,
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'left',
    color: COLORS.black_colorText,
    placeholder: {
      fontFamily: 'Roboto-Regular',
      fontWeight: '400',
      fontSize: 16,
      lineHeight: 19,
      textAlign: 'left',
      color: COLORS.grey_colorText,
    },
  },
  btnPublish: {
    height: 50,
    marginBottom: 150,
    paddingVertical: 16,
    paddingHorizontal: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.accent,
    borderRadius: 100,
  },
  btnTitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: COLORS.white,
  },
  iconCamera: {
    position: 'absolute',
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 100,
  },
  iconLocation: {
    position: 'absolute',
    left: 0,
  },
  footer: {
    // position: 'absolute',
    // bottom: 10,
    height: 44,
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconDel: {
    width: 70,
    height: 40,
    marginLeft: -32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: COLORS.grey_bgColor,
  },
});

export default CreatePostsScreen;
