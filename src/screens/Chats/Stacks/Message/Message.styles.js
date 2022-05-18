import { StyleSheet } from "react-native";
import { colors } from "../../../../theme/colors";

export const styles = StyleSheet.create({
  left_container: {
    maxWidth: "69%",
    flexDirection: "row",
    marginVertical: 2,
    backgroundColor: colors.gray02,
    borderRadius: 16,
  },
  avatar: {
    marginHorizontal: 8,
    justifyContent: "flex-end",
  },
  avatarImg: {
    width: 33,
    height: 33,
    borderRadius: 100,
  },
  text: {
    flex: 1,
    backgroundColor: colors.mainColor,
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
    maxWidth: "70%",
    maxHeight: 400,
  },

  imageMessage: {
    width: 200,
    height: 200,
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

  right_container: {
    maxWidth: "69%",
    flexDirection: "row",
    marginLeft: "auto",
    marginVertical: 2,
    borderRadius: 16,
    // backgroundColor: colors.mainColor,
  },
  checkedIcon: {
    width: 16,
    height: 16,
    borderRadius: 100,
  },
});
