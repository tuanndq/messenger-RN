import React from 'react';
import Button from './Button';
import {StyleSheet, View} from 'react-native';

const StartButton = ({onPress, disabled, starting}) => {
  return (
    <View style={styles.container}>
      <Button
        onPress={onPress}
        disabled={disabled}
        label={starting ? 'Joining...' : 'Join call'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
});

export default StartButton;
