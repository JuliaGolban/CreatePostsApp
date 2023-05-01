import React, { useState, useEffect } from 'react';
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
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import { FontAwesome, Feather } from '@expo/vector-icons';
import COLORS from '../../utils/colors';

const initialState = {
  id: '',
  photo: '',
  title: '',
  location: '',
};

const CreatePostsScreen = ({ navigation }) => {
  const [post, setPost] = useState(initialState);
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState(null);
  const [location, setLocation] = useState(null);
  const [coords, setCoords] = useState(null);
  const [camera, setCamera] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const { width } = useWindowDimensions();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setCoords(location.coords);
    })();
  }, []);

  const keyboardHide = () => {
    setShowKeyboard(false);
    Keyboard.dismiss();
  };

  const toggleCameraType = () => {
    setType(type === CameraType.back ? CameraType.front : CameraType.back);
  };

  const handleCreatePhoto = async () => {
    if (camera) {
      try {
        const { uri } = await camera.takePictureAsync();
        console.log('handleCreatePhoto ~ uri:', uri);
        // await MediaLibrary.createAssetAsync(uri);
        let location = await Location.getCurrentPositionAsync({});
        console.log('handleCreatePhoto ~ location:', location);

        setPhoto(uri);
        setCoords(location.coords);
      } catch (e) {
        if (
          e.message.includes(
            "Call to function 'ExponentCamera.takePicture' has been rejected"
          )
        ) {
          await MediaLibrary.requestPermissionsAsync();
          await Camera.requestCameraPermissionsAsync();
          const { uri } = await camera.takePictureAsync();
          setPhoto(uri);
        } else {
          throw e;
        }
      }
    }
  };

  const handleSubmit = () => {
    setPost({
      title: title,
      photo: photo,
      location: location,
      coords: coords,
      comments: 0,
      likes: 0,
    });
    console.log(post);
    navigation.navigate('Posts', { post });
    // setPost(initialState);
  };

  const handleDeletePhoto = () => {
    setPhoto(null);
  };

  const reset = () => {
    setPost(initialState);
    setPhoto(null);
    setTitle(null);
    setLocation(null);
    setCoords(null);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === false) {
    return Alert.alert('No access to camera');
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <View style={styles.photoWrapper}>
          <Camera
            style={{
              ...styles.camera,
              width: width - 16 * 2,
            }}
            ref={setCamera}
            type={type}
          >
            {photo && (
              <>
                <Image
                  style={{ ...styles.postPhoto, width: width - 16 * 2 }}
                  source={{ uri: photo }}
                  alt="Photo"
                />
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.iconCameraType}
                  onPress={toggleCameraType}
                >
                  <FontAwesome name="refresh" size={24} color={COLORS.white} />
                </TouchableOpacity>
              </>
            )}
            {!photo ? (
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
                <FontAwesome name="camera" size={24} color={COLORS.white} />
              </TouchableOpacity>
            )}
          </Camera>
        </View>
        {!photo ? (
          <Text style={styles.postInfo}>Upload photo</Text>
        ) : (
          <Text style={styles.postInfo}>Edit photo</Text>
        )}
        {/* <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS == 'ios' ? '-170' : '-65'}
        > */}
        <View
          style={{
            ...styles.postInputSet,
            // marginBottom: isShowKeyboard ? -235 : 0,
          }}
        >
          <TextInput
            style={styles.postInput}
            placeholder="Post title..."
            value={title}
            onChangeText={value => setTitle(value)}
          />
          <View style={styles.postField}>
            <TextInput
              style={{ ...styles.postInput, paddingLeft: 26 }}
              placeholder="Location..."
              value={location}
              onChangeText={value => setLocation(value)}
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
        {/* </KeyboardAvoidingView> */}
        {photo ? (
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
              if (!photo) {
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
  camera: {
    height: 240,
    width: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.grey_bgColor,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.grey_colorBorder,
    overflow: 'hidden',
  },
  postPhoto: {
    height: 240,
    width: 240,
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
  iconCameraType: {
    position: 'absolute',
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
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
