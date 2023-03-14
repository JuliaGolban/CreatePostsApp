import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const Post = ({ item, navigation }) => {
  const { title, photo, comments, likes, location } = item;
  const { height, width } = useWindowDimensions();

  return (
    <View style={styles.postWrapper}>
      <Image
        style={{ ...styles.postPhoto, width: width - 16 * 2 }}
        alt={title}
        source={photo}
      />
      <Text style={styles.postTitle}>{title}</Text>
      <View style={styles.postIconContainer}>
        {comments !== 0 || likes !== 0 ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ ...styles.postIconWrap, marginRight: 24 }}
              onPress={() => navigation.navigate('Comments', { post: item })}
            >
              <Feather
                name="message-circle"
                size={20}
                color="#FF6C00"
                style={styles.postIcon}
              />
              <Text style={styles.postIconLabel}>{comments}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.postIconWrap}>
              <Feather
                name="thumbs-up"
                size={20}
                color="#FF6C00"
                style={styles.postIcon}
              />
              <Text style={styles.postIconLabel}>{likes}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ ...styles.postIconWrap, marginRight: 24 }}
            onPress={() => navigation.navigate('Comments')}
          >
            <Feather
              name="message-circle"
              size={20}
              color="#BDBDBD"
              style={styles.postIcon}
            />
            <Text style={styles.postIconLabel}>{comments}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.postIconWrap}
          onPress={() => navigation.navigate('MapScreen')}
        >
          <Feather
            name="map-pin"
            size={20}
            color="#BDBDBD"
            style={styles.postIcon}
          />
          <Text style={styles.postIconLabel}>{location}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  postWrapper: {
    marginBottom: 32,
    columnGap: 8,
  },
  postPhoto: {
    height: 240,
    width: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
  },
  postTitle: {
    marginVertical: 8,
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'left',
    color: '#212121',
  },
  postIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  postIconWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  postIcon: { marginRight: 6 },
  postIconLabel: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'left',
    color: '#212121',
  },
});
