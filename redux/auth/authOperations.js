import { Alert } from 'react-native';
import { authSlice } from './authReducer';
import db from '../../firebase/config';

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const authSignUpUser =
  ({ login, email, password, avatar }) =>
  async (dispatch, getState) => {
    try {
      await db.auth().createUserWithEmailAndPassword(email, password);
      const user = await db.auth().currentUser;
      await user.updateProfile({
        displayName: login,
        photoURL: avatar,
      });
      const { displayName, uid } = await db.auth().currentUser;
      const userUpdateProfile = {
        login: displayName,
        userID: uid,
        email,
        avatar: photoURL,
      };

      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
      console.log('error', error);
      Alert.alert('error.message', error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await db.auth().signInWithEmailAndPassword(email, password);
      console.log('user', user);
    } catch (error) {
      console.log('error', error);
      console.log('error.code', error.code);
      Alert.alert('error.message', error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  await db.auth().signOut();
  dispatch(authSignOut());
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  await db.auth().onAuthStateChanged(user => {
    if (user) {
      const userUpdateProfile = {
        login: user.displayName,
        userID: user.uid,
      };

      dispatch(authStateChange({ stateChange: true }));
      dispatch(updateUserProfile(userUpdateProfile));
    }
  });
};
