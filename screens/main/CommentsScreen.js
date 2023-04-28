import React, { useState, useEffect } from 'react';
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
import { v4 as uuidv4 } from 'uuid';
import { Ionicons } from '@expo/vector-icons';
import Comment from '../../components/Comment';
import COLORS from '../../utils/colors';

const initialState = [
  {
    id: '1',
    userOwn: false,
    avatar: require('../../assets/images/ellipse.png'),
    text: 'Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!',
    data: '09 june, 2020 | 08:40',
  },
  {
    id: '2',
    userOwn: true,
    avatar: require('../../assets/images/avatar.jpg'),
    text: 'A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.',
    data: '09 june, 2020 | 09:14',
  },
  {
    id: '3',
    userOwn: false,
    avatar: require('../../assets/images/ellipse.png'),
    text: 'Thank you! That was very helpful!',
    data: '09 june, 2020 | 09:20',
  },
];

const initialStateComment = {
  id: '',
  userOwn: true,
  avatar: require('../../assets/images/avatar.jpg'),
  text: '',
  data: '',
};

const CommentsScreen = ({ navigation, route }) => {
  // const { post } = route.params;
  const [allComments, setAllComments] = useState(initialState);
  const [comment, setComment] = useState('');
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const { width } = useWindowDimensions();

  const commentId = uuidv4();
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

  const handleSend = () => {
    if (!comment.trim()) {
      return Alert.alert('Please, enter your comment');
    }
    const newComment = {
      id: commentId,
      text: comment,
      data: dateNow,
      avatar: require('../../assets/images/avatar.jpg'),
      userOwn: true,
    };
    setAllComments(prevState => [...prevState, newComment]);
    setComment('');
    keyboardHide();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View
        style={{ ...styles.container, marginBottom: isShowKeyboard ? 275 : 0 }}
      >
        <Image
          style={{ ...styles.postPhoto, width: width - 16 * 2 }}
          alt="Post"
          source={require('../../assets/images/sunset.jpg')}
          // source={post.photo}
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
