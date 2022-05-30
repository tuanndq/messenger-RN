import React, {useEffect, useState} from 'react';
import {View, Text, Image, SafeAreaView, TouchableOpacity} from 'react-native';
import {images} from '../../images';
import {styles} from './Profile.styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import Story from '../../components/Story/Story';
import {fetchConversation1vs1} from '../../redux/conversationSlice';
import {fetchCurrentMessages} from '../../redux/messageSlice';

const Profile = ({navigation, route}) => {
  const auth = useSelector(state => state.auth);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const users = useSelector(state => state.user.users);
  const current_conversation = useSelector(
    state => state.conversation.current_conversation,
  );

  useEffect(() => {
    const otherUser = route.params?.otherUser;
    if (otherUser) {
      setUser(otherUser);
    } else {
      const loggedUser = users.filter(user => user._id === auth.id)[0];

      setUser(loggedUser);
    }
  }, [route.params?.otherUser, users]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.wallpaperContainer}>
        {/* a.k.a back button */}
        <Ionicons
          name="arrow-back"
          onPress={() => {
            navigation.navigate('Home');
          }}
          style={styles.back}
        />

        <Image
          source={{uri: user.wallpaper} || images.wallpaper}
          style={styles.coverPhoto}
        />
        
        <Image source={images.take_photo} style={styles.cameraWallpaper} />
      </View>

      <TouchableOpacity
        style={styles.dpContainer}
        onPress={() =>
          user.stories.length > 0 &&
          navigation.navigate('Story', {
            user: user,
          })
        }>
        <View style={styles.dpBlueRound}>
          <Image
            source={{uri: user.avatar} || images.avatar}
            style={styles.dp}
          />
          <View style={styles.activeNowTick}></View>
          <Image source={images.take_photo} style={styles.cameraAvatar} />
        </View>
      </TouchableOpacity>

      <Text style={styles.name}>{user.fullName}</Text>
      <Text style={styles.shortBio}>{user.bio}</Text>

      <View style={styles.profileTabsContainer}>
        {/* Add Story button */}
        <View style={styles.tabContainer}>
          <View style={styles.tabImageContainer}>
            <Image source={images.add_story} style={styles.icon_profile} />
          </View>
          <Text style={styles.tabText}>Add Story</Text>
        </View>

        {/* Edit Profile button */}
        <TouchableOpacity
          style={styles.tabContainer}
          onPress={() => {
            if (user._id === auth.id) {
              navigation.navigate('EditProfile', {user});
            }
          }}>
          <View style={styles.tabImageContainer}>
            <Image source={images.edit_button} style={styles.icon_profile} />
          </View>
          <Text style={styles.tabText}>Edit Profile</Text>
        </TouchableOpacity>

        {/* Message button */}
        <TouchableOpacity
          style={styles.tabContainer}
          onPress={() => {
            dispatch(fetchConversation1vs1(auth.id, user._id, auth.token));
            navigation.navigate('Chat');
          }}>
          <View style={styles.tabContainer}>
            <View style={styles.tabImageContainer}>
              <Image
                source={images.message_button}
                style={styles.icon_profile}
              />
            </View>
            <Text style={styles.tabText}>Message</Text>
          </View>
        </TouchableOpacity>

        {/* More Options button */}
        <View style={styles.tabContainer}>
          <View style={styles.tabImageContainer}>
            <Image
              source={images.more_icon}
              style={{
                width: 26,
                height: 26,
              }}
            />
          </View>
          <Text style={styles.tabText}>More</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text
          style={{
            marginLeft: 20,
            marginBottom: 10,
            fontWeight: 'bold',
            fontSize: 24,
            color: 'black',
          }}>
          Information
        </Text>
        {user.gender ? (
          <View style={styles.itemContainer}>
            <FontAwesome name="transgender" style={styles.icon} />
            <Text style={styles.text}>
              <Text style={styles.valueText}>{user.gender}</Text>
            </Text>
          </View>
        ) : null}

        {user.address ? (
          <View style={styles.itemContainer}>
            <FontAwesome name="home" style={styles.icon} />
            <Text style={styles.text}>
              Lives in <Text style={styles.valueText}>{user.address}</Text>
            </Text>
          </View>
        ) : null}

        {user.school ? (
          <View style={styles.itemContainer}>
            <Ionicons name="school" style={styles.icon} />
            <Text style={styles.text}>
              Studies at <Text style={styles.valueText}>{user.school}</Text>
            </Text>
          </View>
        ) : null}

        {user.work ? (
          <View style={styles.itemContainer}>
            <MaterialIcons name="work" style={styles.icon} />
            <Text style={styles.text}>
              Works at <Text style={styles.valueText}>{user.work}</Text>
            </Text>
          </View>
        ) : null}

        {user.dateOfBirth ? (
          <View style={styles.itemContainer}>
            <FontAwesome name="birthday-cake" style={styles.icon} />
            <Text style={styles.text}>
              Born on <Text style={styles.valueText}>{user.dateOfBirth}</Text>
            </Text>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

export default Profile;
