import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { images } from "../../images";
import { styles } from "./Profile.styles";
import Icon from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import Story from "../../components/Story/Story";
import { fetchConversation1vs1 } from "../../redux/conversationSlice";
import { fetchCurrentMessages } from "../../redux/messageSlice";

const Profile = ({ navigation, route }) => {
  const auth = useSelector((state) => state.auth);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const current_conversation = useSelector(
    (state) => state.conversation.current_conversation
  );

  useEffect(() => {
    const otherUser = route.params?.otherUser;
    if (otherUser) {
      setUser(otherUser);
    } else {
      const loggedUser = users.filter((user) => user._id === auth.id)[0];

      setUser(loggedUser);
    }
  }, [route.params?.otherUser, users]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.wallpaperContainer}>
        <Ionicons
          name="arrow-back"
          style={styles.back}
          onPress={() => navigation.navigate("Chats")}
        />
        <Image
          source={{ uri: user.wallpaper } || images.wallpaper}
          style={styles.coverPhoto}
        />
        <Image source={images.take_photo} style={styles.cameraWallpaper} />
      </View>

      <TouchableOpacity
        style={styles.dpContainer}
        onPress={() =>
          user.stories.length > 0 &&
          navigation.navigate("Story", {
            user: user,
          })
        }
      >
        <View style={styles.dpBlueRound}>
          <Image
            source={{ uri: user.avatar } || images.avatar}
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
            <Icon name="plus" style={styles.tabImage} />
          </View>
          <Text style={styles.tabText}>Add Story</Text>
        </View>

        {/* Edit Profile button */}
        <TouchableOpacity
          style={styles.tabContainer}
          onPress={() => {
            if (user._id === auth.id) {
              navigation.navigate("EditProfile", { user });
            }
          }}
        >
          <View style={styles.tabImageContainer}>
            <Icon
              name="user-edit"
              style={{ ...styles.tabImage, marginLeft: 7 }}
            />
          </View>
          <Text style={styles.tabText}>Edit Profile</Text>
        </TouchableOpacity>

        {/* Message button */}
        <TouchableOpacity
          style={styles.tabContainer}
          onPress={() => {
            dispatch(fetchConversation1vs1(auth.id, user._id, auth.token));
            navigation.navigate("Chat");
          }}
        >
          <View style={styles.tabContainer}>
            <View style={styles.tabImageContainer}>
              <Entypo name="message" style={styles.tabImage} />
            </View>
            <Text style={styles.tabText}>Message</Text>
          </View>
        </TouchableOpacity>

        {/* More Options button */}
        <View style={styles.tabContainer}>
          <View style={styles.tabImageContainer}>
            <Feather name="more-horizontal" style={styles.tabImage} />
          </View>
          <Text style={styles.tabText}>More</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text
          style={{
            marginLeft: 20,
            marginBottom: 10,
            fontWeight: "bold",
            fontSize: 24,
          }}
        >
          Information
        </Text>
      </View>
    </ScrollView>
  );
};

export default Profile;
