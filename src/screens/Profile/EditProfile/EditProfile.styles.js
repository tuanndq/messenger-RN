import { StyleSheet } from "react-native";
import { colors } from "../../../theme/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 50,
  },
  headerEdit: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 3,
    borderBottomColor: colors.grayMain,
    alignItems: "center",
  },
  headerIcon: {
    fontSize: 24,
  },
  headerText: {
    fontSize: 24,
    marginLeft: 10,
    fontWeight: "bold",
  },
  editContainer: {
    marginHorizontal: 15,
    marginVertical: 20,
    borderBottomWidth: 2,
    borderBottomColor: colors.grayMain,
  },
  typeEditContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  typeEditText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  editText: {
    fontSize: 20,
    color: colors.secondColor,
  },
  profileAvatar: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginVertical: 20,
    borderRadius: 200,
  },
  profileWallpaper: {
    width: 345,
    height: 150,
    marginVertical: 20,
    borderRadius: 5,
  },
  textBio: {
    textAlign: "center",
    fontSize: 20,
    marginVertical: 20,
    color: colors.gray02,
  },
  aboutContainer: {
    marginVertical: 20,
  },
  aboutItem: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  iconAbout: {
    fontSize: 18,
    flex: 1,
  },
  containerText: {
    flex: 10,
  },
  normalText: {
    fontSize: 18,
  },
  boldText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  infoContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
    alignItems: "center",
  },
  typeInfo: {
    fontSize: 18,
    fontWeight: "600",
  },
  textInfo: {
    fontSize: 18,
  },
  modalView: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    maxHeight: 300,
    paddingHorizontal: 10,
  },
  modalInput: {
    height: 100,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "#000",
  },
  modalTypeText: {
    alignSelf: "center",
    marginTop: 10,
    fontSize: 20,
    fontWeight: "500",
  },
  containerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginVertical: 15,
  },
  noteText: {
    marginHorizontal: 10,
    color: colors.gray02,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.white,
  },
});
