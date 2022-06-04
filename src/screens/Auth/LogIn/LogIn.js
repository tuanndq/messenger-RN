import {View, Text, Image, ScrollView, Pressable} from 'react-native';
import React, {useState} from 'react';
import {images} from '../../../images/index';
import {styles} from './LogIn.styles';
import CustomInput from '../../../components/CustomInput/CustomInput';
import CustomButton from '../../../components/CustomButton/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../../../theme/colors';
import {login} from '../../../redux/authSlice';
import {useEffect} from 'react';
import {useReveal} from '../../../hooks/useReveal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {validateEmail, validatePassword} from '../../../utils/validate';

const LogIn = ({navigation}) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const {passwordVisibility, rightIcon, handlePasswordVisibility} = useReveal();
  const auth = useSelector(state => state.auth);
  const {loginError} = useSelector(state => state.alert);

  const onLogInPressed = () => {
    if (!email && !password) {
      setErrors({
        ...errors,
        email: 'Please add your email.',
        password: 'Please add your password.',
      });
    } else if (!email) {
      setErrors({...errors, email: 'Please add your email.'});
    } else if (!password) {
      setErrors({...errors, password: 'Please add your password.'});
    }
    if (!errors.email && !errors.password) dispatch(login({email, password}));
  };

  useEffect(() => {
    if (auth.token) {
      navigation.navigate('Home');
    }
  }, [auth]);

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  };

  const onSignInFacebook = () => {};

  const onSignInGoogle = () => {};

  const onSignUp = () => {
    navigation.navigate('SignUp');
  };

  const validate = {
    email: function (email) {
      if (!email) {
        setErrors({...errors, email: 'Please add your email.'});
      } else if (!validateEmail(email)) {
        setErrors({...errors, email: 'Please enter a valid email address.'});
      } else {
        setErrors({...errors, email: ''});
      }
    },
    password: function (password) {
      if (!password) {
        setErrors({...errors, password: 'Please add your password.'});
      } else if (!validatePassword(password)) {
        setErrors({
          ...errors,
          password: 'Password must be at least 8 characters.',
        });
      } else {
        setErrors({...errors, password: ''});
      }
    },
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={images.Logo} style={styles.logo} resizeMode="contain" />

        <Text style={styles.text}>Welcome to FlashMessage</Text>

        <CustomInput
          placeholder="Email"
          value={email}
          setValue={text => {
            setEmail(text);
          }}
          handleBlur={e => {
            validate.email(e.nativeEvent.text);
          }}
        />

        {errors.email ? (
          <Text style={{color: '#ff3333', alignSelf: 'flex-start'}}>
            {errors.email}
          </Text>
        ) : null}

        <View style={styles.inputContainer}>
          <CustomInput
            placeholder="Password"
            value={password}
            setValue={text => {
              setPassword(text);
            }}
            handleBlur={e => {
              validate.password(e.nativeEvent.text);
            }}
            secureTextEntry={passwordVisibility ? true : false}
          />
          {password ? (
            <Pressable style={styles.reveal} onPress={handlePasswordVisibility}>
              <Ionicons name={rightIcon} size={22} color="#232323" />
            </Pressable>
          ) : null}
        </View>

        {errors.password ? (
          <Text
            style={{
              color: '#ff3333',
              alignSelf: 'flex-start',
              marginBottom: 10,
            }}>
            {errors.password}
          </Text>
        ) : null}

        {loginError ? (
          <Text
            style={{
              backgroundColor: '#ffa00a',
              color: '#fff',
              borderRadius: 10,
              padding: 10,
              marginVertical: 10,
            }}>
            {loginError}
          </Text>
        ) : null}

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
    </ScrollView>
  );
};

export default LogIn;
