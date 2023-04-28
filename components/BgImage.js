import {
  StyleSheet,
  View,
  ImageBackground,
  useWindowDimensions,
} from 'react-native';

const BgImage = ({ children }) => {
  const { height, width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <ImageBackground
        style={{
          ...styles.backgroundImage,
          width: width,
          height: height,
        }}
        source={require('../assets/images/photo_BG.jpg')}
      >
        {children}
      </ImageBackground>
    </View>
  );
};

export default BgImage;

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
});
