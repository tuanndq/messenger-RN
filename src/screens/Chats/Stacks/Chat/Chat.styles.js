import { StyleSheet } from "react-native";
import { colors } from '../../../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
  },
  icon: {
    fontSize: 28,
    color: colors.mainColor,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  backIcon: {
    fontSize: 40,
    color: colors.mainColor,
  },
  headerInfo: {
    flex: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header_avatarIcon: {
    width: 30,
    height: 30,
    borderRadius: 10,
    marginLeft: 16,
    marginRight: 8,
  },
  header_actions: {
    flex: 1.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  body: {
    flex: 11,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  preview: {
    position: "absolute",
    width: 100,
    height: 200,
    top: -210,
    right: 16,
    elevation: 10,
  },
  previewVideo: {
    alignSelf: 'center',
    width: 100,
    height: 160,
  },
  previewClose: {
    width: 24,
    fontSize: 20,
    color: colors.white,
    padding: 2,
    borderRadius: 100,
    backgroundColor: colors.mainColor,
  },
  previewImg: {
    flex: 1,
    borderRadius: 10,
    marginBottom: 2,
  },
  previewSend: {
    width: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.mainColor,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  input: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.gray02,
    borderRadius: 16,
  },
  inputText: {
    flex: 1,
    paddingLeft: 8,
    color: colors.white,
    fontSize: 16,
  },
  inputEmoji: {
    padding: 4,
  },
})