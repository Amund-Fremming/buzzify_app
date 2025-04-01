import { StyleSheet } from "react-native";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../utils/dimensions";

export const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: horizontalScale(90),
    height: verticalScale(35),
  },
  text: {
    fontFamily: "SpaceMono",
    fontSize: moderateScale(18),
  },
});

export default styles;
