import React, { useState } from 'react';
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
  Alert,
} from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { Ionicons } from '@expo/vector-icons';
import Comment from '../../components/Comment';

const initialState = [
  {
    id: '2',
    photo: require('../../assets/images/sunset.jpg'),
    title: 'Sunset',
    comments: 3,
    likes: 200,
    location: `Ukraine`,
    commentList: [
      {
        id: '1',
        avatar: require('../../assets/images/ellipse.png'),
        text: 'Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!',
        data: '09 june, 2020 | 08:40',
      },
      {
        id: '2',
        avatar: require('../../assets/images/avatar.jpg'),
        text: 'A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.',
        data: '09 june, 2020 | 09:14',
      },
      {
        id: '3',
        avatar: require('../../assets/images/ellipse.png'),
        text: 'Thank you! That was very helpful!',
        data: '09 june, 2020 | 09:20',
      },
    ],
  },
];

const initialStateComment = {
  id: '',
  avatar: '',
  text: '',
  data: '',
};

const CommentsScreen = ({ navigation, route }) => {
  // const { post } = route.params;
  const [posts, setPosts] = useState(initialState);
  const [comment, setComment] = useState(initialStateComment);
  const { width } = useWindowDimensions();

  const commentId = uuidv4();

  // creates a date in  the format "DD MMMM, YYYY | HH:MM"
  const objDate = new Date();
  const year = objDate.getFullYear();
  const monthNames = [
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
  ];
  const monthNumber = objDate.getMonth();
  const month = monthNames[monthNumber];
  const day = ('0' + objDate.getDay()).slice(-2);

  const hours = objDate.getHours();
  const min = objDate.getMinutes();

  const dateNow =
    day + ' ' + month + ',' + ' ' + year + ' | ' + hours + ':' + min;

  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  const handleSend = () => {
    if (comment.text === '') {
      return Alert.alert('Please, enter your comment');
    }
    console.log(comment);
    console.log(posts);
    setComment(initialStateComment);
  };

  // === render headers and footers on screen ===
  const FlatList_Header = () => {
    return (
      <Image
        style={{ ...styles.postPhoto, width: width - 16 * 2 }}
        alt="Post"
        source={require('../../assets/images/sunset.jpg')}
        // source={posts.photo}
      />
    );
  };

  const FlatList_Footer = () => {
    return (
      <View style={styles.fieldComment}>
        <TextInput
          style={{
            ...styles.input,
            width: width - 32,
          }}
          placeholder="Comment..."
          value={comment.text}
          onChangeText={value =>
            setComment(prevState => ({
              ...prevState,
              text: value,
              id: commentId,
              data: dateNow,
              avatar: require('../../assets/images/avatar.jpg'),
            }))
          }
        />
        <Ionicons
          name="arrow-up-circle"
          size={34}
          color="#FF6C00"
          style={styles.iconArrowUp}
          onPress={handleSend}
        />
      </View>
    );
  };

  return (
    // <TouchableWithoutFeedback onPress={keyboardHide}>
    <View style={styles.container}>
      <FlatList
        // === photo as header ===
        ListHeaderComponent={FlatList_Header}
        ListHeaderComponentStyle={{ marginBottom: 32 }}
        // === comments ===
        data={state.comment}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Comment item={item} />}
        contentContainerStyle={{ flexGrow: 1 }}
        // showsVerticalScrollIndicator={false}
        // === input as footer ===
        ListFooterComponent={FlatList_Footer}
        ListFooterComponentStyle={{
          flex: 1,
          justifyContent: 'flex-end',
          marginBottom: 16,
        }}
      />
    </View>
    // </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
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
  fieldComment: {
    justifyContent: 'center',
  },
  input: {
    height: 50,
    padding: 16,
    color: '#BDBDBD',
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 100,
    placeholder: {
      fontFamily: 'Roboto-Medium',
      fontWeight: '500',
      fontSize: 16,
      lineHeight: 19,
      color: '#BDBDBD',
    },
  },
  iconArrowUp: {
    position: 'absolute',
    right: 8,
  },
});

export default CommentsScreen;
