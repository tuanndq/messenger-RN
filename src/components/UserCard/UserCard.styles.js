import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingVertical: 15,
    paddingHorizontal: 15,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.gray02,
    marginLeft: 5,
  },
  userAvatar: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
  },
});
