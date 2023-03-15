import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const Link = ({ navigation, text, link, prop }) => {
  return (
    <View style={styles.linkWrap}>
      <Text style={styles.link}>{text}</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{ prop }}
        onPress={() => navigation.navigate({ link })}
      >
        <Text style={{ ...styles.link, fontWeight: '700' }}>{link}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Link;

const styles = StyleSheet.create({
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
