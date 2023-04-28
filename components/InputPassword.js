import { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Octicons } from '@expo/vector-icons';

const InputPassword = ({ onChangeText }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocusedInput, setIsFocusedInput] = useState(null);

  const handleShowPassword = () => {
    const toggle = showPassword ? false : true;
    setShowPassword(toggle);
  };

  return (
    <View style={styles.fieldPassword}>
      <TextInput
        style={{
          ...styles.input,
          borderColor: isFocusedInput === 'password' ? '#FF6C00' : '#E8E8E8',
        }}
        placeholder="Password"
        value={state.password}
        secureTextEntry={!showPassword} // hides or shows password
        onChangeText={onChangeText(value)}
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
  );
};

export default InputPassword;

const styles = StyleSheet.create({
  fieldPassword: {
    marginTop: 16,
    justifyContent: 'center',
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
      fontSize: 16,
      lineHeight: 19,
      color: '#BDBDBD',
    },
  },
  iconShow: {
    position: 'absolute',
    right: 15,
    color: '#BDBDBD',
  },
});
