import { StyleSheet } from "react-native";
import { colors } from "../../../../theme/colors";

export const styles = StyleSheet.create({
  left_container: {
    maxWidth: "80%",
    flexDirection: "row",
    marginVertical: 2,
    // backgroundColor: colors.gray02,
  },

  right_container: {
    width: "80%",
    marginLeft: "auto",
    marginVertical: 2,
  },

  containerRightContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },

  avatar: {
    marginRight: 5,
    marginLeft: 3,
    justifyContent: "flex-end",
  },

  avatarImg: {
    width: 33,
    height: 33,
    borderRadius: 100,
  },

  message: {
    display: 'flex',
  },

  text: {
    backgroundColor: colors.mainColor,
    borderRadius: 19,
    paddingRight: 5,
    paddingLeft: 5,
  },
  
  textValue: {
    color: colors.white,
    fontSize: 16,
    borderRadius: 16,
    padding: 8,
    marginBottom: 1,
  },

  image: {
    flex: 1,
  },

  imageMessage: {
    borderRadius: 19,
    height: 180,
  },

  video: {
    flex: 1,
    maxWidth: "70%",
    maxHeight: 400,
  },
  videoMessage: {
    width: 200,
    height: 200,
  },

  checkedIcon: {
    width: 16,
    height: 16,
    borderRadius: 100,
  },
});
