import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  useWindowDimensions,
} from 'react-native';

const Comment = ({ item }) => {
  const { avatar, text, data } = item;
  const { width } = useWindowDimensions();

  return (
    <View style={styles.commentContainer}>
      <Image style={styles.avatar} alt="user avatar" source={avatar} />
      <View style={{ ...styles.commentWrap, width: width - 16 - 60 }}>
        <Text style={styles.text}>{text}</Text>
        <Text style={styles.data}>{data}</Text>
      </View>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 78,
  },
  avatar: {
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: 60,
    height: 60,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
  },
  commentWrap: {},
  text: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#1B4371',
  },
  data: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#1B4371',
  },
});
