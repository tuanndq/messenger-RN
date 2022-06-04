import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../components/Header/Header';
import SearchBox from '../../components/SearchBox/SearchBox';
import StorySlider from '../../components/StorySlider/StorySlider';
import {images} from '../../images';
import {getUserInfo} from '../../redux/userSlice';
import {getDataAPI} from '../../utils/fetchData';
import {styles} from './Chat.styles';
import UserListing from './UserListing/UserListing';
import moment from 'moment';
import {fetchConversations} from '../../redux/conversationSlice';

const Chats = ({navigation}) => {
  const auth = useSelector(state => state.auth);
  const users = useSelector(state => state.user.users);
  const conversations = useSelector(state => state.conversation.conversations);

  const [loggedUser, setLoggedUser] = useState({});
  const [lastMessages, setLastMessages] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUser = users.filter(user => user._id === auth?.id)[0];

    setLoggedUser(loggedUser);
  }, [users]);

  useEffect(() => {
    const getLastMess = async () => {
      const res1 = await getDataAPI(`message/last`, auth.token);

      const mapMess = conversations.map(e => e._id);

      const lastMess = res1.data.lastMessages
        .filter(mess => mapMess.includes(mess._id))
        .map(e => ({
          ...e,
          createdAt: moment(e.createdAt).format('HH:mm'),
        }));

      setLastMessages(lastMess);
    };

    getLastMess();
    // dispatch(setLastMessages(lastMess));
  }, [conversations]);

  useEffect(() => {
    dispatch(fetchConversations(auth.id, auth.token));
  }, [auth]);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        heading="Chats"
        icon1={images.take_photo}
        icon2={images.new_message}
        navigation={navigation}
        loggedUser={loggedUser}
      />

      <SearchBox navigation={navigation} userStore={users} auth={auth} />

      <StorySlider navigation={navigation} loggedUser={loggedUser} />

      <UserListing navigation={navigation} lastMessages={lastMessages} />
    </SafeAreaView>
  );
};

export default Chats;
