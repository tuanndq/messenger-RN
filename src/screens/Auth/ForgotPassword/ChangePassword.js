import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {postDataAPI} from '../../../utils/fetchData';
import CustomInput from '../../../components/CustomInput/CustomInput';
import CustomButton from '../../../components/CustomButton/CustomButton';

const ChangePassword = ({navigation, route}) => {
  const {email} = route.params;
  const [password, setPassword] = useState('');

  const changePass = async () => {
    await postDataAPI('auth/changepassword', {email, password});
    navigation.navigate('Home');
  };
  return (
    <View>
      <CustomInput
        placeholder={'Enter new password'}
        value={password}
        setValue={setPassword}
      />

      <CustomButton onPress={changePass} text="Submit" />
    </View>
  );
};

export default ChangePassword;
