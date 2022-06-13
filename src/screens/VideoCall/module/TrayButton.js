import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import theme from '../theme';
import {useOrientation, Orientation} from '../useOrientation';

export default function TrayButton({
  disabled = false,
  onPress,
  muted = false,
  robotId = '',
  text,
  type,
}) {
  const orientation = useOrientation();

  let source = require('../../../images/images/leave.png');
  const isLeaveButton = type === 'leave';
  if (isLeaveButton) {
  } else if (type === 'camera') {
    source = muted
      ? require('../../../images/images/camera-off.png')
      : require('../../../images/images/camera.png');
  } else if (type === 'mic') {
    source = muted
      ? require('../../../images/images/mic-off.png')
      : require('../../../images/images/mic.png');
  }

  return (
    <TouchableWithoutFeedback onPress={onPress} disabled={disabled}>
      <View style={styles.controlContainer}>
        <Image
          style={[
            styles.iconBase,
            orientation === Orientation.Portrait
              ? styles.iconPortrait
              : styles.iconLandscape,
            disabled && styles.disabled,
            isLeaveButton && styles.iconLeave,
          ]}
          source={source}
        />
        <Text
          style={[
            styles.controlText,
            (muted || isLeaveButton) && styles.offText,
          ]}>
          {text}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  iconBase: {
    height: 32,
    width: 32,
    backgroundColor: theme.colors.greyLight,
  },
  iconPortrait: {
    marginHorizontal: 16,
  },
  iconLandscape: {
    marginTop: 16,
  },
  iconLeave: {
    height: 28,
    width: 36,
  },
  disabled: {
    opacity: 0.6,
  },
  controlContainer: {
    alignItems: 'center',
  },
  controlText: {
    fontWeight: '500',
    paddingTop: 4,
    color: theme.colors.blueDark,
  },
  offText: {
    color: theme.colors.red,
  },
});
