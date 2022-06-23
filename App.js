import React, {useEffect} from 'react';
import {Image, LogBox} from 'react-native';
import 'react-native-gesture-handler';
import {Provider, useSelector, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import store from './src/redux/store';
import {images} from './src/images';

import LogIn from './src/screens/Auth/LogIn/LogIn';
import SignUp from './src/screens/Auth/SignUp/SignUp';
import Chats from './src/screens/Chats/Chats';
import People from './src/screens/People/People';
import Discover from './src/screens/Discover/Discover';
import Profile from './src/screens/Profile/Profile';
import Chat from './src/screens/Chats/Stacks/Chat/Chat';
import Camera from './src/screens/Camera/Camera';

import {isAuthenticated} from './src/redux/authSlice';
import {getUserInfo, getUsers} from './src/redux/userSlice';
import ForgotPassword from './src/screens/Auth/ForgotPassword/ForgotPassword';
import SendOTP from './src/screens/Auth/ForgotPassword/SendOTP';
import ChangePassword from './src/screens/Auth/ForgotPassword/ChangePassword';
import Story from './src/components/Story/Story';
import EditProfile from './src/screens/Profile/EditProfile/EditProfile';
import ConversationSettings from './src/screens/Chats/Stacks/Convesation/ConversationSettings';
import GroupChat from './src/screens/GroupChat/GroupChat';
import {colors} from './src/theme/colors';
import {socket} from './src/utils/socket';
import {WebRTCCall} from './src/screens/WebRTCCall/WebRTCCall';
import GroupMembers from './src/screens/GroupChat/GroupMembers';

const Tab = createBottomTabNavigator();

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (auth.token) {
      dispatch(getUsers(auth.token));
    }
  }, [auth]);

  useEffect(() => {
    socket.on(
      'video-call-start',
      ({sender, receiver, conversationId, offer, isVideoCall}) => {
        console.log(sender, receiver, conversationId, offer, isVideoCall);
        navigation.push('WebRTCCall', {
          sender: receiver,
          receiver: sender,
          conversationId,
          isCaller: false,
          sdp: offer,
          isVideoCall,
        });
      },
    );
  }, [socket]);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let icon = false;

          if (route.name === 'Chats') {
            iconName = focused ? (
              <Ionicons name="chatbubble" style={{fontSize: 28}} />
            ) : (
              <Ionicons
                name="chatbubble"
                style={{color: colors.grayMain, fontSize: 28}}
              />
            );
          } else if (route.name === 'People') {
            iconName = focused ? (
              <Ionicons name="people" style={{fontSize: 28}} />
            ) : (
              <Ionicons
                name="people"
                style={{color: colors.grayMain, fontSize: 28}}
              />
            );
          } else if (route.name === 'Discover') {
            iconName = focused ? (
              <MaterialIcons name="explore" style={{fontSize: 28}} />
            ) : (
              <MaterialIcons
                name="explore"
                style={{color: colors.grayMain, fontSize: 28}}
              />
            );
          } else if (route.name === 'Profile') {
            icon = true;
            iconName = focused ? 'user-circle' : 'user-circle-o';
          }

          // You can return any component that you like here!
          return icon ? (
            <FontAwesome name={iconName} style={{fontSize: 24}} />
          ) : (
            iconName
          );
        },
        headerShown: false,
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            display: 'flex',
          },
          null,
        ],
      })}>
      <Tab.Screen name="Chats" component={Chats} />
      <Tab.Screen name="People" component={People} />
      <Tab.Screen name="Discover" component={Discover} />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();

const Container = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const getToken = async () => {
      const res = await AsyncStorage.getItem('@user_token');
      const id = await AsyncStorage.getItem('@id');

      dispatch(
        isAuthenticated({
          access_token: res,
          id,
        }),
      );
    };

    if (!auth.token) {
      getToken();
    }
  }, []);

  useEffect(() => {
    const getToken = async () => {
      const id = await AsyncStorage.getItem('@id');

      if (id) {
        socket.auth = {
          userId: id,
        };
      }

      socket.connect();
    };

    getToken();

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={auth.token ? Home : LogIn}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SendOTP"
          component={SendOTP}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="GroupMembers"
          component={GroupMembers}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="WebRTCCall"
          component={WebRTCCall}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Camera"
          component={Camera}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ConversationSettings"
          component={ConversationSettings}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Story"
          component={Story}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="GroupChat"
          component={GroupChat}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  LogBox.ignoreAllLogs();

  const toggleTheme = () => {};
  return (
    <Provider store={store}>
      <Container />
    </Provider>
  );
};

export default App;
