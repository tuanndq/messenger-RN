import React, {useState, useEffect, useRef} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {RNCamera} from 'react-native-camera';
// import { Audio } from "expo-av";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {colors} from '../../theme/colors';
import {styles} from './Camera.styles';

export default function CameraScreen({navigation, route}) {
  const {setImage, setVideoUri} = route.params;

  const [hasPermission, setHasPermission] = useState(null);
  // const [type, setType] = useState(Camera.Constants.Type.back);
  const [isRatioSet, setIsRatioSet] = useState(false);
  const [camera, setCamera] = useState({});
  const [recording, setRecording] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     const {status} = await RNCamera.requestCameraPermissionsAsync();
  //     setHasPermission(status === 'granted');
  //   })();
  // }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = () => {
    if (camera) {
      camera.takePictureAsync({onPictureSaved: onPictureSaved});
    }
  };

  const onPictureSaved = photo => {
    setImage(photo.uri);
    navigation.navigate('Chat');
  };

  const onVideoRecordPress = async () => {
    // await Audio.requestPermissionsAsync();
    // if (!recording) {
    //   setRecording(true);
    //   let video = await camera.recordAsync();
    //   setVideoUri(video.uri);
    //   navigation.navigate('Chat');
    // } else {
    //   setRecording(false);
    //   camera.stopRecording();
    // }
    // console.log('Is recording: ', recording);
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.camera}
        type={type}
        ref={ref => setCamera(ref)}
        ratio={'18:9'}>
        <View style={styles.headerButton}>
          <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
            <AntDesign name="close" style={{fontSize: 40}} />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          {/* <View style={styles.button}>
            <TouchableOpacity
              onPress={() => {
                setType(
                  'Back'
                );
              }}>
              <MaterialIcons
                name="flip-camera-android"
                style={styles.buttonIcon}
              />
            </TouchableOpacity>
          </View> */}
          <View style={styles.button}>
            <TouchableOpacity onPress={takePicture}>
              <Ionicons name="radio-button-on" style={styles.buttonIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={() => {}}>
              <AntDesign
                name="videocamera"
                style={{
                  fontSize: 50,
                  color: recording ? colors.redColor : colors.white,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </RNCamera>
    </View>
  );
}
