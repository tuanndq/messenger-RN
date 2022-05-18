import { View, Text, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { styles } from "./SignUp.styles";
import { images } from "../../../images/index";
import { colors } from "../../../theme/colors";
import CustomInput from "../../../components/CustomInput/CustomInput";
import CustomButton from "../../../components/CustomButton/CustomButton";
import CustomRadio from "../../../components/CustomRadio/CustomRadio";
import { useDispatch } from "react-redux";
import { register } from "../../../redux/authSlice";

const SignUp = ({ navigation }) => {
  const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dateOfBirth: "",
  });

  const dispatch = useDispatch();

  const radioButtonsData = [
    {
      id: "0",
      label: "Male",
      value: "Male",
    },
    {
      id: "1",
      label: "Female",
      value: "Female",
    },
    {
      id: "2",
      label: "Others",
      value: "Others",
    },
  ];

  const handleData = (field, text) => {
    setInfo({ ...info, [field]: text });
  };

  const onLogIn = () => {
    navigation.navigate("Home");
  };

  const onSignUp = () => {
    dispatch(register(info));

    navigation.navigate("Home");
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={images.Logo} style={styles.logo} resizeMode="contain" />

      <Text style={styles.text}>Welcome to SnapChat</Text>

      <CustomButton
        onPress={onLogIn}
        text="Already have account? Log In"
        type="TERTIARY"
        fgColor={colors.secondColor}
      />

      <CustomInput
        placeholder="First Name"
        value={info.firstName}
        setValue={(text) => handleData("firstName", text)}
      />

      <CustomInput
        placeholder="Last Name"
        value={info.lastName}
        setValue={(text) => handleData("lastName", text)}
      />

      <CustomInput
        placeholder="Email"
        value={info.email}
        setValue={(text) => handleData("email", text)}
      />

      <CustomInput
        placeholder="Password"
        value={info.password}
        setValue={(text) => handleData("password", text)}
        secureTextEntry={true}
      />

      <CustomInput
        placeholder="Confirm password"
        value={info.confirmPassword}
        setValue={(text) => handleData("confirmPassword", text)}
        secureTextEntry={true}
      />

      <CustomInput
        placeholder="Date of birth"
        value={info.dateOfBirth}
        setValue={(text) => handleData("dateOfBirth", text)}
      />

      <CustomRadio
        radioButtonsData={radioButtonsData}
        layout="row"
        setValue={(text) => handleData("gender", text)}
      />

      <View>
        <Text style={{ marginVertical: 10 }}>
          By choosing Sign Up, you agree to our{" "}
          <Text style={{ color: colors.mainColor }}>Terms, Data Policy</Text>.
          You may receive SMS notifications or email from us and can opt out at
          anytime.
        </Text>
        <CustomButton onPress={onSignUp} text="Sign Up" />
      </View>
    </ScrollView>
  );
};

export default SignUp;
