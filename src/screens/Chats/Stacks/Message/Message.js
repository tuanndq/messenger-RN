import React, {useRef} from 'react';
import {View, Text, Image} from 'react-native';
// import { Video } from "expo-av";

import {styles} from './Message.styles';
import {images} from '../../../../images';

export const LeftMessage = ({type, message, time, userName, avatar}) => {
  const video = useRef(null);

  return (
    <View style={styles.left_container}>
      <View style={styles.avatar}>
        <Image source={{uri: avatar}} style={styles.avatarImg} />
      </View>

      {type === 0 && (
        <View style={styles.text}>
          <Text key={userName} style={styles.textValue}>
            {message}
          </Text>
          <Text>{userName}</Text>
          <Text>{time}</Text>
        </View>
      )}

      {type === 1 && (
        <View style={styles.image}>
          <Image source={{uri: message}} style={styles.imageMessage} />
        </View>
      )}

      {type === 2 && (
        <View style={styles.video}>
          {/* <Video
            ref={video}
            style={styles.videoMessage}
            source={{
              uri: message,
            }}
            useNativeControls
            resizeMode="contain"
            isLooping
          /> */}
        </View>
      )}
    </View>
  );
};

export const RightMessage = ({type, message, time, userName, avatar}) => {
  const video = useRef(null);

  return (
    <View style={styles.right_container}>
      {type === 0 && (
        <View style={styles.text}>
          <Text key={userName} style={styles.textValue}>
            {message}
          </Text>
          <Text>{userName}</Text>
          <Text>{time}</Text>
        </View>
      )}

      {type === 1 && (
        <View style={styles.image}>
          <Image source={{uri: message}} style={styles.imageMessage} />
        </View>
      )}

      {type === 2 && (
        <View style={styles.video}>
          {/* <Video
            ref={video}
            style={styles.videoMessage}
            source={{
              uri: message,
            }}
            useNativeControls
            resizeMode="contain"
            isLooping
          /> */}
        </View>
      )}

      <View style={styles.avatar}>
        <Image source={{uri: avatar}} style={styles.checkedIcon} />
      </View>
    </View>
  );
};
