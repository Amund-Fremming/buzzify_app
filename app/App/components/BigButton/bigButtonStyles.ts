import { StyleSheet } from "react-native";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../utils/dimensions";

export const styles = StyleSheet.create({
  container: {
    width: horizontalScale(200),
    height: verticalScale(60),
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "SpaceMono",
    fontSize: moderateScale(22),
  },
});

export default styles;
