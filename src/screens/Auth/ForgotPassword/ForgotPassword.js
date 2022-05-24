import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomInput from '../../../components/CustomInput/CustomInput';
import CustomButton from '../../../components/CustomButton/CustomButton';
import {postDataAPI} from '../../../utils/fetchData';
import {setAlert} from '../../../redux/alertSlice';
import {useSelector, useDispatch} from 'react-redux';
import Toast from 'react-native-toast-message';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const alert = useSelector(state => state.alert);
  const dispatch = useDispatch();

  const sendAccountGetOTP = async () => {
    try {
      const res = await postDataAPI('auth/forgot', {email});

      if (res.data) {
        const otp = await postDataAPI('auth/otp', {email});

        if (otp.data) {
          navigation.navigate('SendOTP', {email, otp: otp.data.otp});
        }
      }
    } catch (e) {
      dispatch(setAlert({type: 'forgotPassword', value: e.response.data.msg}));
      Toast.show({
        text1: alert.forgotPassword,
        type: 'error',
      });
    }
  };
  return (
    <View>
      <Text>Enter Your Account To Receive OTP</Text>

      <CustomInput
        placeholder={'Please enter your email'}
        value={email}
        setValue={setEmail}
      />

      <CustomButton onPress={sendAccountGetOTP} text="Submit" />

      <Toast ref={ref => Toast.setRef(ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});

export default ForgotPassword;
