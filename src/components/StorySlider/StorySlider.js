import React, {useEffect, useState} from 'react';
import {View, Image, FlatList, Text, TouchableOpacity} from 'react-native';
// import { TouchableOpacity } from "react-native-gesture-handler";
import {useDispatch, useSelector} from 'react-redux';
import {images} from '../../images';
import {styles} from './StorySlider.styles';
// import UserPermissions from "../../utils/UserPermissions";
import Feather from 'react-native-vector-icons/Feather';
// import * as ImagePicker from "expo-image-picker";
// import { Camera } from "expo-camera";
import {getStoriesExist} from '../../redux/storySlice';

// For getting list of conversations of the user
import {fetchConversations} from '../../redux/conversationSlice';

const StorySlider = ({navigation, loggedUser}) => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.user.users);
  const [story, setStory] = useState({content: '', type: '', finish: 0});
  const storiesExist = useSelector(state => state.story.storiesExist);

  // For getting list of conversations of the user
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    const filterStories = users.filter(user => user.stories.length > 0);
    dispatch(getStoriesExist(filterStories));
    // Login successfully => Load conversations of the user
    dispatch(fetchConversations(auth.id, auth.token));
  }, [users, users.stories]);

  const handlePickerAvatar = async () => {
    //   UserPermissions.getCameraPermission();
    //   const resultPermision = await Camera.requestCameraPermissionsAsync();
    //   const resultPermisionCamera = resultPermision.status;
    //   if (resultPermisionCamera === "denied") {
    //     toastRef.current.show("Gallery permissions are needed");
    //   } else {
    //     const result = await ImagePicker.launchImageLibraryAsync({
    //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //       allowsEditing: true,
    //       aspect: [4, 3],
    //     });
    //     console.log(result);
    //     if (!result.cancelled) {
    //       dispatch(createStory({ ...story, content: result.uri, type: "image" }));
    //     }
    //   }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.userIconContainer}
      onPress={() =>
        item?.stories.length > 0 &&
        navigation.navigate('Story', {
          user: item,
          storiesExist: storiesExist,
        })
      }>
      <Image source={{uri: item.avatar}} />
      <Text style={styles.userName}>{item.fullName}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.userIconContainer}
        onPress={() =>
          loggedUser?.stories?.length > 0
            ? navigation.navigate('Story', {
                user: loggedUser,
                storiesExist: storiesExist,
              })
            : handlePickerAvatar()
        }>
        {loggedUser?.stories?.length > 0 ? (
          <Image source={{uri: loggedUser?.avatar}} />
        ) : (
          <Feather name="plus" />
        )}

        <Text style={styles.userName}>Your Story</Text>
      </TouchableOpacity>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={storiesExist}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

export default StorySlider;
