import { useState } from 'react';
import { StyleSheet, View, TextInput, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const initialState = {
  id: '',
  avatar: '',
  text: '',
  data: '',
};

const InputCommentSend = ({ handleSend, handleChangeText, value }) => {
  const [comment, setComment] = useState(initialState);
  const { height, width } = useWindowDimensions();

  return (
    <View style={styles.fieldComment}>
      <TextInput
        style={{
          ...styles.input,
          width: width - 32,
        }}
        placeholder="Comment..."
        value={comment.text}
        // onChangeText={value =>
        //   setComment(prevState => ({ ...prevState, text: value }))
        // }
        onChangeText={handleChangeText(value)}
        returnKeyType="go"
      />
      <Ionicons
        name="arrow-up-circle"
        size={34}
        color="#FF6C00"
        style={styles.iconArrowUp}
        onPress={handleSend()}
      />
    </View>
  );
};

export default InputCommentSend;

const styles = StyleSheet.create({
  fieldComment: {
    justifyContent: 'center',
  },
  input: {
    height: 50,
    padding: 16,
    color: '#E8E8E8',
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 100,
    placeholder: {
      fontFamily: 'Roboto-Medium',
      fontWeight: '500',
      fontSize: 16,
      lineHeight: 19,
      color: '#BDBDBD',
    },
  },
  iconArrowUp: {
    position: 'absolute',
    right: 8,
  },
});
