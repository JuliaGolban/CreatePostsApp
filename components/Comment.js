import {
  StyleSheet,
  View,
  Text,
  Image,
  useWindowDimensions,
} from 'react-native';
import COLORS from '../utils/colors';

const Comment = ({ item }) => {
  const { userOwn, avatar, text, data } = item;
  const { width } = useWindowDimensions();

  return (
    <View
      style={{
        ...styles.commentContainer,
        flexDirection: userOwn ? 'row-reverse' : 'row',
      }}
    >
      <Image
        style={{
          ...styles.avatar,
          marginLeft: userOwn ? 16 : 0,
          marginRight: userOwn ? 0 : 16,
        }}
        alt="user avatar"
        source={{ uri: avatar }}
      />
      <View
        style={{
          ...styles.commentWrap,
          width: width - 16 - 60,
          borderTopLeftRadius: userOwn ? 6 : 0,
          borderTopRightRadius: userOwn ? 0 : 6,
          borderRadius: 6,
        }}
      >
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
  },
  avatar: {
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: 28,
    height: 28,
    backgroundColor: COLORS.grey_bgColor,
    borderRadius: 16,
  },
  commentWrap: {
    marginBottom: 24,
    padding: 16,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: '0px 6px 6px 6px',
  },
  text: {
    marginBottom: 6,
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'left',
    color: COLORS.black_colorText,
  },
  data: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 12,
    textAlign: 'right',
    color: COLORS.grey_colorText,
  },
});
