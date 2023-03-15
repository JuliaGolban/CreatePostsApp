import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const BtnText = ({ text, handleSubmit }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.btn}
      onPress={handleSubmit}
    >
      <Text style={styles.btnTitle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default BtnText;

const styles = StyleSheet.create({
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
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#FFFFFF',
  },
});
