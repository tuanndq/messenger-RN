import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import SearchBox from "../../components/SearchBox/SearchBox";
import StorySlider from "../../components/StorySlider/StorySlider";
import { images } from "../../images";
import { getUserInfo } from "../../redux/userSlice";
import { styles } from "./Chat.styles";
import UserListing from "./UserListing/UserListing";

const Chats = ({ navigation }) => {
  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.user.users);

  const [loggedUser, setLoggedUser] = useState({});

  useEffect(() => {
    const loggedUser = users.filter((user) => user._id === auth?.id)[0];

    setLoggedUser(loggedUser);
  }, [users]);

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

      <UserListing navigation={navigation} />
    </SafeAreaView>
  );
};

export default Chats;
