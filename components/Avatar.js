import { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import COLORS from '../utils/colors';

const Avatar = ({ placeholderImageSource, selectedImage }) => {
  const imageSource =
    selectedImage !== null ? { uri: selectedImage } : placeholderImageSource;

  return (
    <View style={styles.imageBox}>
      <Image style={styles.image} alt="user avatar" source={imageSource} />
      <TouchableOpacity activeOpacity={0.8} onPress={handleLoadAvatar}>
        {selectedImage !== null ? (
          <AntDesign
            name="closecircleo"
            size={25}
            color={COLORS.grey_colorBorder}
            style={styles.btnAdd}
          />
        ) : (
          <AntDesign
            name="pluscircleo"
            size={25}
            color={COLORS.accent}
            style={styles.btnAdd}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  imageBox: {
    alignItems: 'center',
    marginBottom: 32,
  },
  image: {
    position: 'absolute',
    top: -60,
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: 120,
    height: 120,
    backgroundColor: COLORS.grey_bgColor,
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
    backgroundColor: COLORS.white,
  },
});
