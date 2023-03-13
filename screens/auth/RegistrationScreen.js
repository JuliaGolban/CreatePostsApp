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
                      color="#E8E8E8"
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
                    isFocusedInput === 'login' ? '#FF6C00' : '#E8E8E8',
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
                    isFocusedInput === 'email' ? '#FF6C00' : '#E8E8E8',
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
                      isFocusedInput === 'password' ? '#FF6C00' : '#E8E8E8',
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
    backgroundColor: '#E5E5E5',
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
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#F6F6F6',
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
    backgroundColor: '#FFFFFF',
  },
  title: {
    marginTop: 52,
    marginBottom: 32,
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
    color: '#212121',
  },
  input: {
    height: 50,
    padding: 16,
    color: '#212121',
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    placeholder: {
      fontFamily: 'Roboto-Regular',
      fontWeight: '400',
      fontSize: 16,
      lineHeight: 19,
      color: '#BDBDBD',
    },
  },
  fieldPassword: {
    marginTop: 16,
    justifyContent: 'center',
  },
  iconShow: {
    position: 'absolute',
    right: 15,
    color: '#BDBDBD',
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
    backgroundColor: '#FF6C00',
    borderRadius: 100,
  },
  btnTitle: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#FFFFFF',
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
    color: '#1B4371',
  },
});

export default RegistrationScreen;
