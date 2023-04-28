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
import { AntDesign, Octicons } from '@expo/vector-icons';
import COLORS from '../../utils/colors';

const initialState = {
  login: '',
  email: '',
  password: '',
};

const RegistrationScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [isFocusedInput, setIsFocusedInput] = useState(null);
  const [isLoadedAvatar, setIsLoadedAvatar] = useState(false);

  const { height, width } = useWindowDimensions();

  const keyboardHide = () => {
    Keyboard.dismiss();
    setState(initialState);
  };

  const handleShowPassword = () => {
    const toggle = showPassword ? false : true;
    setShowPassword(toggle);
  };

  const handleSubmit = () => {
    if (state.name === '' || state.email === '' || state.password === '') {
      return Alert.alert('Please, enter your credentials');
    }
    console.log(state);
    // navigation.navigate('Home', { user: state });
    setState(initialState);
  };

  const handleLoadAvatar = () => {
    const toggle = isLoadedAvatar ? false : true;
    setIsLoadedAvatar(toggle);
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
                {isLoadedAvatar ? (
                  <Image
                    style={styles.avatar}
                    alt="user avatar"
                    source={require('../../assets/images/avatar.jpg')}
                  />
                ) : (
                  <Image style={styles.avatar} alt="user avatar" />
                )}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleLoadAvatar}
                >
                  {isLoadedAvatar ? (
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
                      color="#FF6C00"
                      style={styles.btnAdd}
                    />
                  )}
                </TouchableOpacity>
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
