import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons';
import COLORS from '../utils/colors';

export const BtnIconGoBack = ({ navigation, name }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      oonPress={() => navigation.navigate(name)}
    >
      <MaterialIcons
        name="keyboard-backspace"
        size={24}
        color={COLORS.black_opacity_80}
      />
    </TouchableOpacity>
  );
};

export const BtnIconLogout = ({ navigation }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Login')}
    >
      <MaterialIcons name="logout" size={24} color={COLORS.grey_colorText} />
    </TouchableOpacity>
  );
};

export const BtnIconLocation = ({ navigation, location }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.postIconWrap}
      onPress={() => navigation.navigate('MapScreen')}
    >
      <Feather
        name="map-pin"
        size={20}
        color={COLORS.grey_colorText}
        style={styles.postIcon}
      />
      <Text style={styles.postIconLabel}>{location}</Text>
    </TouchableOpacity>
  );
};

export const BtnIconComments = ({ color, comments, navigation }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{ ...styles.postIconWrap, marginRight: 24 }}
      onPress={() => navigation.navigate('Comments')}
    >
      <Feather
        name="message-circle"
        size={20}
        color={color}
        style={styles.postIcon}
      />
      <Text style={styles.postIconLabel}>{comments}</Text>
    </TouchableOpacity>
  );
};

export const BtnIconLikes = ({ likes }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.postIconWrap}>
      <Feather
        name="thumbs-up"
        size={20}
        color={COLORS.accent}
        style={styles.postIcon}
      />
      <Text style={styles.postIconLabel}>{likes}</Text>
    </TouchableOpacity>
  );
};

export const BtnIconCamera = ({
  isLoadedPhoto,
  handleCreatePhoto,
  handleDeletePhoto,
}) => {
  return !isLoadedPhoto ? (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.iconCamera}
      onPress={handleCreatePhoto}
    >
      <FontAwesome name="camera" size={24} color={COLORS.grey_colorText} />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        ...styles.iconCamera,
        backgroundColor: COLORS.white_opacity_30,
      }}
      onPress={handleDeletePhoto}
    >
      <FontAwesome name="camera" size={24} color={COLORS.white} />
    </TouchableOpacity>
  );
};

export const BtnIconDel = ({ reset }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.iconDel}
      onPress={reset}
    >
      <Feather name="trash-2" size={24} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconCamera: {
    position: 'absolute',
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 100,
  },
  iconDel: {
    width: 70,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: COLORS.grey_bgColor,
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
    color: COLORS.black_colorText,
  },
});
