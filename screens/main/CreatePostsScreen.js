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
    navigation.navigate('Posts', { posts: post });
    setPost(initialState);
    setIsLoadedPhoto(false);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS == 'ios' ? '-170' : '-45'}
        >
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
                onPress={() => {
                  setPost(prevState => ({
                    ...prevState,
                    photo: 'upload',
                    id: postId,
                  }));
                  setIsLoadedPhoto(true);
                }}
              >
                <FontAwesome name="camera" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.8}
                style={{ ...styles.iconCamera, backgroundColor: '#FFFFFF4d' }}
                onPress={() => {
                  setPost(prevState => ({ ...prevState, photo: '' }));
                  setIsLoadedPhoto(false);
                }}
              >
                <FontAwesome name="camera" size={24} c color="#FFFFFF" />
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
                color="#BDBDBD"
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
                backgroundColor: '#F6F6F6',
              }}
              onPress={() => {
                if (!isLoadedPhoto) {
                  return Alert.alert('Please, upload your photo');
                }
              }}
              // disabled
            >
              <Text style={{ ...styles.btnTitle, color: '#BDBDBD' }}>
                Publish
              </Text>
            </TouchableOpacity>
          )}
        </KeyboardAvoidingView>
        <View style={{ ...styles.footer, width: width }}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.iconDel}
            onPress={() => {
              setPost(initialState);
              setIsLoadedPhoto(false);
            }}
          >
            <Feather name="trash-2" size={24} color="#BDBDBD" />
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
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
  },
  postInfo: {
    marginTop: 8,
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'left',
    color: '#BDBDBD',
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
    borderBottomColor: '#E8E8E8',
    borderRadius: 5,
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'left',
    color: '#212121',
    placeholder: {
      fontFamily: 'Roboto-Regular',
      fontWeight: '400',
      fontSize: 16,
      lineHeight: 19,
      textAlign: 'left',
      color: '#BDBDBD',
    },
  },
  btnPublish: {
    height: 50,
    paddingVertical: 16,
    paddingHorizontal: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6C00',
    borderRadius: 100,
  },
  btnTitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  iconCamera: {
    position: 'absolute',
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
  },
  iconLocation: {
    position: 'absolute',
    left: 0,
  },
  iconDel: {
    width: 70,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#F6F6F6',
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    height: 80,
    // left: '50%',
    // transform: [{ translateX: -50 }],
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CreatePostsScreen;
