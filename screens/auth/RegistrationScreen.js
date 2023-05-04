import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  ImageBackground,
  Image,
  Platform,
  useWindowDimensions,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { AntDesign, Octicons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';

import { db, storage } from '../../firebase/config';
import { authSignUpUser } from '../../redux/auth/authOperations';
import COLORS from '../../utils/colors';

const initialState = {
  login: '',
  email: '',
  password: '',
  avatar: null,
};

const RegistrationScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [avatar, setAvatar] = useState(initialState.avatar);
  const [showPassword, setShowPassword] = useState(false);
  const [isFocusedInput, setIsFocusedInput] = useState(null);

  const dispatch = useDispatch();
  const { height, width } = useWindowDimensions();

  const keyboardHide = () => {
    Keyboard.dismiss();
    setState(initialState);
  };

  const handleShowPassword = () => {
    const toggle = showPassword ? false : true;
    setShowPassword(toggle);
  };

  const handleSubmit = async () => {
    keyboardHide();

    if (state.login === '' || state.email === '' || state.password === '') {
      return Alert.alert('Please, enter your credentials');
    }
    const photo = await uploadPhotoToServer();
    const candidate = {
      login: state.login,
      email: state.email,
      password: state.password,
      avatar: photo,
    };
    console.log('RegisterScreen ==>', candidate);
    dispatch(authSignUpUser(candidate));

    setState(initialState);
    setAvatar(initialState.avatar);
  };

  const uploadPhotoToServer = async () => {
    try {
      const response = await fetch(avatar);
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
        setAvatar(result.assets[0].uri);
      } else {
        Alert.alert('You did not select any image.');
      }
    } catch (error) {
      console.log('error.message', error.message);
    }
  };

  const handleDeleteAvatar = () => {
    setAvatar(null);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={{
            ...styles.backgroundImage,
            width: width,
            height: height,
          }}
          source={require('../../assets/images/photo_BG.jpg')}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS == 'ios' ? '-170' : '-65'}
          >
            <View
              style={{
                ...styles.form,
                width: width,
              }}
            >
              <View style={styles.avatarWrap}>
                {avatar ? (
                  <Image
                    style={styles.avatar}
                    alt="user avatar"
                    source={{ uri: avatar }}
                  />
                ) : (
                  <Image style={styles.avatar} alt="user avatar" />
                )}

                {avatar !== null ? (
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
              </View>
              <Text style={styles.title}>Registration</Text>
              <TextInput
                style={{
                  ...styles.input,
                  borderColor:
                    isFocusedInput === 'login'
                      ? COLORS.accent
                      : COLORS.grey_colorBorder,
                }}
                placeholder="Login"
                value={state.login}
                onChangeText={value =>
                  setState(prevState => ({ ...prevState, login: value }))
                }
                onFocus={() => setIsFocusedInput('login')}
                onBlur={() => setIsFocusedInput(null)}
                returnKeyType="next"
              />
              <TextInput
                style={{
                  ...styles.input,
                  marginTop: 16,
                  borderColor:
                    isFocusedInput === 'email'
                      ? COLORS.accent
                      : COLORS.grey_colorBorder,
                }}
                placeholder="Email address"
                value={state.email}
                onChangeText={value =>
                  setState(prevState => ({ ...prevState, email: value }))
                }
                onFocus={() => setIsFocusedInput('email')}
                onBlur={() => setIsFocusedInput(null)}
                returnKeyType="next"
              />
              <View style={styles.fieldPassword}>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor:
                      isFocusedInput === 'password'
                        ? COLORS.accent
                        : COLORS.grey_colorBorder,
                  }}
                  placeholder="Password"
                  value={state.password}
                  secureTextEntry={!showPassword} // hides or shows password
                  onChangeText={value =>
                    setState(prevState => ({ ...prevState, password: value }))
                  }
                  onFocus={() => setIsFocusedInput('password')}
                  onBlur={() => setIsFocusedInput(null)}
                  returnKeyType="go"
                />
                {showPassword ? (
                  <Octicons
                    name="eye"
                    size={24}
                    style={styles.iconShow}
                    onPress={handleShowPassword}
                  />
                ) : (
                  <Octicons
                    name="eye-closed"
                    size={24}
                    style={styles.iconShow}
                    onPress={handleShowPassword}
                  />
                )}
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={handleSubmit}
              >
                <Text style={styles.btnTitle}>Sign Up</Text>
              </TouchableOpacity>
              <View style={styles.linkWrap}>
                <Text style={styles.link}>Already have an account? </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('Login')}
                >
                  <Text style={{ ...styles.link, fontWeight: '700' }}>
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
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
  form: {
    paddingHorizontal: 16,
    columnGap: 16,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  avatarWrap: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    position: 'absolute',
    top: -60,
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: 120,
    height: 120,
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
  title: {
    marginTop: 52,
    marginBottom: 32,
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
    color: COLORS.black_colorText,
  },
  input: {
    height: 50,
    padding: 16,
    color: COLORS.black_colorText,
    backgroundColor: COLORS.grey_bgColor,
    borderWidth: 1,
    borderColor: COLORS.grey_colorBorder,
    borderRadius: 8,
    placeholder: {
      fontFamily: 'Roboto-Regular',
      fontWeight: '400',
      fontSize: 16,
      lineHeight: 19,
      color: COLORS.grey_colorText,
    },
  },
  fieldPassword: {
    marginTop: 16,
    justifyContent: 'center',
  },
  iconShow: {
    position: 'absolute',
    right: 15,
    color: COLORS.grey_colorText,
  },
  btn: {
    marginHorizontal: 20,
    marginTop: 43,
    marginBottom: 16,
    height: 50,
    paddingVertical: 16,
    paddingHorizontal: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.accent,
    borderRadius: 100,
  },
  btnTitle: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: COLORS.white,
  },
  linkWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 78,
  },
  link: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: COLORS.blue_link,
  },
});

export default RegistrationScreen;
