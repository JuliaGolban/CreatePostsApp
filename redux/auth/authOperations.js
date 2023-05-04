import { Alert } from 'react-native';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { authSlice } from './authReducer';
import { auth } from '../../firebase/config';

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const authSignUpUser =
  ({ login, email, password, avatar }) =>
  async (dispatch, getState) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      const currentUser = await auth.currentUser;
      await updateProfile(currentUser, {
        displayName: login,
        photoURL: avatar,
      });

      dispatch(
        updateUserProfile({
          userID: auth.currentUser.uid,
          login: auth.currentUser.displayName,
          email: auth.currentUser.email,
          avatar: auth.currentUser.photoURL,
          stateChange: true,
        })
      );
    } catch (error) {
      console.log('error', error);
      Alert.alert('error.message', error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      const currentUser = auth.currentUser;
      dispatch(
        updateUserProfile({
          userID: currentUser.uid,
          login: currentUser.displayName,
          email: currentUser.email,
          avatar: currentUser.photoURL,
          stateChange: true,
        })
      );
      console.log('user', currentUser);
    } catch (error) {
      console.log('error', error);
      console.log('error.code', error.code);
      Alert.alert('error.message', error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(auth);
  dispatch(authSignOut());
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  await auth.onAuthStateChanged(user => {
    if (user) {
      const userUpdateProfile = {
        login: user.displayName,
        userID: user.uid,
        email: user.email,
        avatar: user.photoURL,
      };

      dispatch(authStateChange({ stateChange: true }));
      dispatch(updateUserProfile(userUpdateProfile));
    }
  });
};

export const authChangeUser =
  ({ login, avatar }) =>
  async (dispatch, getState) => {
    try {
      const currentUser = await auth.currentUser;
      await updateProfile(currentUser, {
        displayName: login,
        photoURL: avatar,
      });

      dispatch(
        updateUserProfile({
          userID: auth.currentUser.uid,
          login: auth.currentUser.displayName,
          email,
          avatar: auth.currentUser.photoURL,
          stateChange: true,
        })
      );
    } catch (error) {
      console.log('error', error);
      console.log('error.code', error.code);
      Alert.alert('error.message', error.message);
    }
  };
