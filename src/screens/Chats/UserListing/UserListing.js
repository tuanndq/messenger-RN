import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, Image, TouchableOpacity } from "react-native";

import { SwipeListView } from "react-native-swipe-list-view";

import { styles } from "./UserListing.styles";
import { images } from "../../../images";
import { setCurrentConversation } from "../../../redux/conversationSlice";
import { fetchCurrentMessages } from "../../../redux/messageSlice";

const UserListing = ({ navigation }) => {
  // let Data = [
  //   {
  //     id: 1,
  //     name: "Martin Randolph",
  //     image: images.user_1,
  //     lastMessage: "You: What's man! · 9:40 AM ",
  //   },
  // ];

  const dispatch = useDispatch();

  let Data = useSelector((state) => state.conversation.conversations);
  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.user.users);
  const { socket } = useSelector((state) => state.socket);

  // _id:"627784ba80a7cddb35c23955"
  // title:"1vs1"
  // createdAt:"2022-05-08T08:52:10.318Z"
  // updatedAt:"2022-05-08T08:52:10.318Z"
  // __v:0

  // const getRoom = (data) => {
  //   const foundRoom = rooms.find((room) => room === data);

  //   if (foundRoom && !username) {
  //     setErrorName(true);
  //   }

  //   if (foundRoom && username) {
  //     socket.emit("join_room", foundRoom);
  //   }
  // };

  // useEffect(() => {
  //   socket.on("show_rooms", (data) => {
  //     setRooms([...rooms, ...data]);
  //   });
  // }, [rooms]);

  // useEffect(() => {
  //   socket.on("show_new_rooms", (data) => {
  //     setRooms([...rooms, data]);
  //   });
  // }, [rooms]);

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <View style={styles.itemRowWrapper}>
        <Image style={styles.itemRowIcon} source={images.camera} />
        <Image style={styles.itemRowIcon} source={images.call} />
        <Image style={styles.itemRowIcon} source={images.video_call} />
      </View>
      <View style={styles.itemRowWrapper}>
        <Image
          style={styles.itemRowIcon}
          source={images.converation_settings}
        />
        <Image style={styles.itemRowIcon} source={images.notifications} />
        <Image style={styles.itemRowIcon} source={images.delete_conversation} />
      </View>
    </View>
  );

  const renderItem = ({ item }) => {

    const onSelectConversation = () => {
      dispatch(setCurrentConversation(item));
      dispatch(fetchCurrentMessages(item._id, auth.token))
      navigation.navigate("Chat");
    }
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          dispatch(setCurrentConversation(item));
          socket.emit("join_room", item._id);
          navigation.navigate("Chat");
        }}
      >
        <View style={styles.userItemContainer}>
          <Image source={{ uri: item.avatar }} style={styles.userIcon} />
          <View style={styles.userDetailsSectionContainer}>
            <View>
              <Text style={styles.label1}>{item.title}</Text>
              <Text style={styles.label2}>{item.lastMessage}</Text>
            </View>
            <Image source={images.checked} style={styles.checked} />
          </View>
        </View>
      </TouchableOpacity>

      // <TouchableOpacity
      //   activeOpacity={1}
      //   onPress={() => navigation.navigate("Chat")}
      // >
      //   <View style={styles.userItemContainer}>
      //     <Image source={item.image} style={styles.userIcon} />
      //     <View style={styles.userDetailsSectionContainer}>
      //       <View>
      //         <Text style={styles.label1}>{item.name}</Text>
      //         <Text style={styles.label2}>{item.lastMessage}</Text>
      //       </View>
      //       <Image source={images.checked} style={styles.checked} />
      //     </View>
      //   </View>
      // </TouchableOpacity>
    );
  };

  return (
    <SwipeListView
      data={Data}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      leftOpenValue={180}
      rightOpenValue={-180}
    />
  );
};

export default UserListing;
