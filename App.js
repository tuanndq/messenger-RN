import React, {useEffect} from 'react';
import {Image} from 'react-native';
import 'react-native-gesture-handler';
import {Provider, useSelector, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import io from 'socket.io-client';

import store from './src/redux/store';
import {images} from './src/images';

import LogIn from './src/screens/Auth/LogIn/LogIn';
import SignUp from './src/screens/Auth/SignUp/SignUp';
import Chats from './src/screens/Chats/Chats';
import People from './src/screens/People/People';
import Discover from './src/screens/Discover/Discover';
import Profile from './src/screens/Profile/Profile';
// import EditProfile from './src/screens/Profile/EditProfile/EditProfile';
import Chat from './src/screens/Chats/Stacks/Chat/Chat';
import Camera from './src/screens/Camera/Camera';
// import ConversationSettings from './src/screens/Chats/Stacks/Convesation/ConversationSettings';
// import Story from './src/components/Story/Story';

import {isAuthenticated} from './src/redux/authSlice';
import {getUserInfo, getUsers} from './src/redux/userSlice';
import {SOCKER_SERVER_URL} from './src/utils/ip';
import {getSocket} from './src/redux/socketSlice';

const Tab = createBottomTabNavigator();

const Home = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (auth.token) {
      dispatch(getUsers(auth.token));
    }
  }, [auth]);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let icon = false;

          if (route.name === 'Chats') {
            iconName = focused ? images.chat_active : images.chat_inactive;
          } else if (route.name === 'People') {
            iconName = focused ? images.people_active : images.people_inactive;
          } else if (route.name === 'Discover') {
            iconName = focused
              ? images.discover_active
              : images.discover_inactive;
          } else if (route.name === 'Profile') {
            icon = true;
            iconName = focused ? 'user-circle' : 'user-circle-o';
          }

          // You can return any component that you like here!
          return icon ? (
            <FontAwesome name={iconName} style={{fontSize: 24}} />
          ) : (
            <Image source={iconName} />
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
    const socket = io(SOCKER_SERVER_URL, {
      transports: ['websocket'],
      jsonp: false,
    });
    dispatch(getSocket(socket));
  }, []);

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
        {/* <Stack.Screen
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
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Container />
    </Provider>
  );
};

export default App;
