// import {Avatar} from 'native-base';
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ButtonCall} from '../../components/ButtonCall/ButtonCall';
// import {axiosAuth, getAvatarUrl} from '../../../libs';

export default function ReceiveCall({join, hangup, remoteInfo}) {
  return (
    <View style={styles.container}>
      {remoteInfo && (
        <View style={styles.background}>
          {/* <Avatar
            size="80px"
            source={{
              uri: remoteInfo.avatar,
            }}
            style={{marginBottom: 20}}
          /> */}
          <Text style={{color: '#000'}}>
            {remoteInfo.fullName} is calling...
          </Text>
        </View>
      )}
      <View style={styles.btnContainer}>
        <ButtonCall onPress={join} iconName="call" backgroundColor="green" />
        <ButtonCall
          onPress={hangup}
          iconName="call-end"
          backgroundColor="red"
          style={{marginLeft: 30}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  btnContainer: {
    flexDirection: 'row',
    bottom: 30,
  },
});
