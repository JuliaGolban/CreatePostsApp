import { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

const InputText = ({ state, label, onChangeText }) => {
  const [isFocusedInput, setIsFocusedInput] = useState(null);

  return (
    <TextInput
      style={{
        ...styles.input,
        borderColor: isFocusedInput === { label } ? '#FF6C00' : '#E8E8E8',
      }}
      placeholder={label}
      value={state.label}
      onChangeText={onChangeText(value)}
      onFocus={() => setIsFocusedInput({ label })}
      onBlur={() => setIsFocusedInput(null)}
      returnKeyType="next"
    />
  );
};

export default InputText;

const styles = StyleSheet.create({
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
});
