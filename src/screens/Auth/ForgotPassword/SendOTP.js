import {View, Text} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../../../components/CustomInput/CustomInput';
import CustomButton from '../../../components/CustomButton/CustomButton';
import {setAlert} from '../../../redux/alertSlice';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';

const SendOTP = ({route, navigation}) => {
  const {email, otp} = route.params;
  const [otpInput, setOtpInput] = useState('');
  const dispatch = useDispatch();
  const alert = useSelector(state => state.alert);

  const checkOtp = () => {
    if (otp === otpInput) {
      navigation.navigate('ChangePassword', {email});
    } else {
      dispatch(setAlert({type: 'otp', value: 'Invalid OTP.'}));
    }
  };
  return (
    <View style={{
      marginHorizontal: 17,
      marginTop: 37
    }}>
      <Text style={{
        marginLeft: 2,
        marginBottom: 12,
        fontWeight: '600',
        fontSize: 16,
      }}>
        Please check your email account for the verification code we just sent
        you and enter that code below
      </Text>

      <CustomInput
        placeholder={'Enter OTP'}
        value={otpInput}
        setValue={setOtpInput}
      />

      {alert.otp ? <Text>Invalid OTP</Text> : null}

      <CustomButton text="Check OTP" onPress={checkOtp} />
    </View>
  );
};

export default SendOTP;
