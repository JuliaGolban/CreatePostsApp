import { StyleSheet, View, Text } from 'react-native';
import { getHeaderTitle } from '@react-navigation/elements';
import { MaterialIcons } from '@expo/vector-icons';
import COLORS from '../utils/colors';

const Header = ({ navigation, route, options, back }) => {
  const title = getHeaderTitle(options, route.name);
  return (
    <Header
      title={title}
      leftButton={
        back ? (
          <MaterialIcons
            name="keyboard-backspace"
            size={24}
            color={COLORS.black_colorText}
            style={styles.btnBack}
            onPress={navigation.goBack}
          />
        ) : undefined
      }
      rightButton={
        logout ? (
          <MaterialIcons
            name="logout"
            size={24}
            color={COLORS.grey_colorText}
            style={styles.btnLogout}
            onPress={() => navigation.navigate('Login')}
          />
        ) : undefined
      }
      style={options.header}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F6F6F6',
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 22,
    color: '#212121',
  },
  btnLogout: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  btnBack: {
    opacity: 0.8,
  },
});

export default Header;
