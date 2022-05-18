import {View, Text, Image} from 'react-native';
import React, {useState} from 'react';
import {images} from '../../../images/index';
import {styles} from './LogIn.styles';
import CustomInput from '../../../components/CustomInput/CustomInput';
import CustomButton from '../../../components/CustomButton/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../../../theme/colors';
import {login} from '../../../redux/authSlice';
import {useEffect} from 'react';
import {fetchConversations} from '../../../redux/conversationSlice';

const LogIn = ({navigation}) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useSelector(state => state.auth);

  const onLogInPressed = () => {
    dispatch(login({email, password}));
  };

  useEffect(() => {
    if (auth.token) {
      navigation.navigate('Home');
    }
  }, [auth]);

  const onForgotPasswordPressed = () => {};

  const onSignInFacebook = () => {};

  const onSignInGoogle = () => {};

  const onSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <Image source={images.Logo} style={styles.logo} resizeMode="contain" />

      <Text style={styles.text}>Welcome to SnapChat</Text>

      <CustomInput placeholder="Username" value={email} setValue={setEmail} />

      <CustomInput
        placeholder="Password"
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
      />

      <CustomButton onPress={onLogInPressed} text="Log In" />

      <CustomButton
        onPress={onSignInFacebook}
        text="Log In with Facebook"
        bgColor={colors.secondColor}
      />

      <CustomButton
        onPress={onSignInGoogle}
        text="Log In with Google"
        bgColor={colors.redColor}
      />

      <CustomButton
        onPress={onForgotPasswordPressed}
        text="Forgot Password?"
        type="TERTIARY"
      />

      <CustomButton
        onPress={onSignUp}
        text="Don't have account? Create one"
        type="TERTIARY"
        fgColor={colors.secondColor}
      />
    </View>
  );
};

export default LogIn;
