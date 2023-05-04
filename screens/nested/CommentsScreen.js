import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  StyleSheet,
  View,
  FlatList,
  Platform,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  useWindowDimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import db from '../../firebase/config';
import Comment from '../../components/Comment';
import COLORS from '../../utils/colors';

const CommentsScreen = ({ navigation, route }) => {
  const { postID, photo } = route.params;
  const { login, avatar } = useSelector(state => state.auth);
  const [allComments, setAllComments] = useState([]);
  const [comment, setComment] = useState('');
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const { width } = useWindowDimensions();

  // creates a date in  the format "DD MMMM, YYYY | HH:MM"
  const year = new Date().getFullYear();
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ][new Date().getMonth()];
  const day = ('0' + new Date().getDay()).slice(-2);

  const hours = new Date().getHours();
  const min = new Date().getMinutes();

  const dateNow =
    day + ' ' + month + ',' + ' ' + year + ' | ' + hours + ':' + min;

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleComment = comment => {
    setComment(comment);
  };

  const handleSend = async () => {
    if (!comment.trim()) {
      return Alert.alert('Please, enter your comment');
    }
    db.firestore()
      .collection('posts')
      .doc(postID)
      .collection('comments')
      .add({ text: comment, data: dateNow, login, avatar, userOwn: true });

    setComment('');
    keyboardHide();
  };

  useEffect(() => {
    (async function getPosts() {
      try {
        await db
          .firestore()
          .collection('posts')
          .doc(postID)
          .collection('comments')
          .onSnapshot(data =>
            setAllComments(
              data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
            )
          );
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View
        style={{ ...styles.container, marginBottom: isShowKeyboard ? 275 : 0 }}
      >
        <Image
          style={{ ...styles.postPhoto, width: width - 16 * 2 }}
          alt="Post"
          source={{ uri: photo }}
        />
        <FlatList
          data={allComments}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Comment item={item} />}
          contentContainerStyle={{
            flexGrow: 1,
          }}
        />
        <View style={styles.fieldComment}>
          <TextInput
            style={{
              ...styles.input,
              width: width - 32,
            }}
            placeholder="Comment..."
            value={comment}
            onChangeText={handleComment}
            onFocus={() => setIsShowKeyboard(true)}
          />
          <TouchableOpacity style={styles.iconArrowUp} onPress={handleSend}>
            <Ionicons name="arrow-up-circle" size={34} color={COLORS.accent} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: COLORS.white,
  },
  postPhoto: {
    height: 240,
    width: '100%',
    marginBottom: 32,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.grey_bgColor,
    borderRadius: 8,
  },
  fieldComment: {
    justifyContent: 'center',
    marginBottom: 32,
  },
  input: {
    height: 50,
    padding: 16,
    color: COLORS.black_colorText,
    backgroundColor: COLORS.grey_bgColor,
    borderWidth: 1,
    borderColor: COLORS.grey_colorBorder,
    borderRadius: 100,
    placeholder: {
      fontFamily: 'Roboto-Medium',
      fontWeight: '500',
      fontSize: 16,
      lineHeight: 19,
      color: COLORS.grey_colorText,
    },
  },
  iconArrowUp: {
    position: 'absolute',
    right: 8,
  },
});

export default CommentsScreen;
