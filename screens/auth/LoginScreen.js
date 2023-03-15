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
  Platform,
  useWindowDimensions,
  Alert,
} from 'react-native';
import { Octicons } from '@expo/vector-icons';
import COLORS from '../../utils/colors';

const initialState = {
  email: '',
  password: '',
};

const LoginScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [isFocusedInput, setIsFocusedInput] = useState(null);
  // const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const { height, width } = useWindowDimensions();

  const keyboardHide = () => {
    // setIsShowKeyboard(false);
    Keyboard.dismiss();
    setState(initialState);
  };

  const handleShowPassword = () => {
    const toggle = showPassword ? false : true;
    setShowPassword(toggle);
  };

  const handleSubmit = () => {
    if (state.email === '' || state.password === '') {
      return Alert.alert('Please, enter your credentials');
    }
    console.log(state);
    // navigation.navigate('Home', { user: state });
    setState(initialState);
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
            keyboardVerticalOffset={Platform.OS == 'ios' ? '-235' : '-15'}
          >
            <View
              style={{
                ...styles.form,
                width: width,
                // marginBottom: isShowKeyboard ? -235 : 0,
              }}
            >
              <Text style={styles.title}>Login</Text>
              <TextInput
                style={{
                  ...styles.input,
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
                onFocus={() => {
                  // setIsShowKeyboard(true);
                  setIsFocusedInput('email');
                }}
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
                        : COLORS.grey_colorText,
                  }}
                  placeholder="Password"
                  value={state.password}
                  onChangeText={value =>
                    setState(prevState => ({ ...prevState, password: value }))
                  }
                  onFocus={() => {
                    // setIsShowKeyboard(true);
                    setIsFocusedInput('password');
                  }}
                  onBlur={() => setIsFocusedInput(null)}
                  secureTextEntry={!showPassword} // hides or shows password
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
                <Text style={styles.btnTitle}>Log In</Text>
              </TouchableOpacity>
              <View style={styles.linkWrap}>
                <Text style={styles.link}>Don't have an account? </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('Registration')}
                >
                  <Text style={{ ...styles.link, fontWeight: '700' }}>
                    Sing up
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
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    marginTop: 32,
    marginBottom: 32,
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    fontWeight: '500',
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
    borderColor: COLORS.grey_colorText,
    borderRadius: 8,
    placeholder: {
      fontFamily: 'Roboto-Regular',
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
    marginTop: 43,
    marginBottom: 16,
    marginHorizontal: 20,
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
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: COLORS.white,
  },
  linkWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 144,
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

export default LoginScreen;
